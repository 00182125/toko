import {
  BOTH_GABYS_TEXT,
  GABY_OPTIONS,
  GABY_QUESTION,
  GABY_WORDS,
  NICKNAMES,
  teamMembers,
  type TeamMember,
  type TeamMemberId,
} from '@/data/team'
import type { Pending, Routed } from '@/types/chat'
import { TOPIC_HINT } from './smallTalk'

// Easter egg del equipo (ver src/data/team.ts y "Toko_easter_egg_equipo.pdf").
// Reglas:
//  · Se compara por palabra completa, sin tildes; los apodos valen como el nombre ("rodri" = "rodrigo").
//  · Apellidos poco comunes (Minero, Dubón, Cabezas, Alvarado, Alfaro, Mármol), el nombre de pila
//    (Rodrigo, Rafael) o dos palabras de la misma persona: activan siempre.
//  · Nombres comunes (Javier, Alejandro, Romero, Rosa, Alejandra): solo en mensajes cortos
//    (5 palabras o menos) que no hablen de otra cosa de la app ("aula", "trámite", "Magna"...).
//  · "Romero" no cuenta junto a "Monseñor", "Centro", "Óscar" o "Arnulfo" (Centro Monseñor Romero).
//  · "Gabriela"/"Gaby"/"Alejandra" sin apellido: Toko pregunta a cuál de las dos se refiere.
//  · Un error de una letra en palabras de 6 o más letras también vale ("dubonn", "alvardo"),
//    pero solo en mensajes cortos que preguntan por alguien (así "me duele la cabeza" no cuenta).

const SHORT = 5
// Palabras de otras funciones de la app: con ellas, los nombres comunes no activan el easter egg.
const OTHER_TOPIC = /(centro|monsenor|oscar|arnulfo|mapa|magna|parroquia|edificio|aula|reserv|tramite|constancia)/
const NEAR_ROMERO = /(^| )(monsenor|centro|oscar|arnulfo|monse)( |$)/
// Pregunta por una persona: "¿quién es…?", "cuéntame de…", "¿conoces a…?"
const ASKS_ABOUT = /(^| )(quien|quienes|conoces|cuentame|hablame|sabes de|que hizo|que hace|es)( |$)/

// Palabras reales parecidas a un nombre que no deben activar nada por "error de una letra".
const NOT_TYPOS = new Set(['cabeza', 'minera', 'gabriel', 'rafaela', 'mineral', 'rodrigues'])

const toWords = (text: string) => {
  const words = text
    .replace(/[^a-z0-9ñ ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => NICKNAMES[word] ?? word)
  // "de la rosa" se trata como una sola palabra: "rosa"
  return ` ${words.join(' ')} `.replace(/ de la rosa /g, ' rosa ').trim().split(' ')
}

// ¿Están a una letra de distancia? (una letra cambiada, de más o de menos)
function oneEditAway(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1 || a === b) return false
  let i = 0
  let j = 0
  let edits = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++
      j++
      continue
    }
    if (++edits > 1) return false
    if (a.length > b.length) i++
    else if (a.length < b.length) j++
    else {
      i++
      j++
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1
}

type Strength = 'distinctive' | 'name' | 'common' | 'typo'
type Hit = { id: TeamMemberId; word: string; at: number; strength: Strength }

// Nombres con los que se compara una palabra escrita de 6 letras o más ("dubonn" → "dubon").
const LONG_WORDS = teamMembers.flatMap((m) =>
  [...m.distinctive, ...m.names].filter((w) => w.length >= 5).map((w) => ({ id: m.id, w })),
)

function findHits(words: string[]): Hit[] {
  const hits: Hit[] = []
  words.forEach((word, at) => {
    for (const member of teamMembers) {
      if (member.distinctive.includes(word)) hits.push({ id: member.id, word, at, strength: 'distinctive' })
      else if (member.names.includes(word)) hits.push({ id: member.id, word, at, strength: 'name' })
      else if (member.common.includes(word)) hits.push({ id: member.id, word, at, strength: 'common' })
    }
    if (word.length >= 6 && !NOT_TYPOS.has(word) && !hits.some((h) => h.at === at)) {
      const near = LONG_WORDS.find(({ w }) => oneEditAway(word, w))
      if (near) hits.push({ id: near.id, word: near.w, at, strength: 'typo' })
    }
  })
  return hits
}

// Qué personas menciona el mensaje (en el orden en que aparecen) y si hay que preguntar por la Gaby.
export function detectTeam(text: string): { members: TeamMember[]; askGaby: boolean } {
  const words = toWords(text)
  const short = words.length <= SHORT
  const otherTopic = OTHER_TOPIC.test(text) || TOPIC_HINT.test(text)
  const asksAbout = ASKS_ABOUT.test(` ${words.join(' ')} `) || words.length <= 2
  let hits = findHits(words)
  // "Centro Monseñor Romero" es un edificio, no Rafael.
  if (NEAR_ROMERO.test(` ${words.join(' ')} `)) hits = hits.filter((h) => h.word !== 'romero')

  const gabyAt = words.findIndex((w) => GABY_WORDS.includes(w))
  const hasGabriela = words.includes('gabriela')

  const active: Array<{ member: TeamMember; at: number }> = []
  for (const member of teamMembers) {
    const own = hits.filter((h) => h.id === member.id)
    if (!own.length) continue
    const distinctWords = new Set(own.map((h) => h.word)).size
    const strong = own.some((h) => h.strength === 'distinctive' || h.strength === 'name')
    const isGaby = member.id === 'gaby_alvarado' || member.id === 'gaby_alfaro'
    // Para las Gabys, "Gabriela"/"Alejandra" + su apellido también es una combinación ("Gabriela Rosa").
    const combined = distinctWords >= 2 || (isGaby && gabyAt >= 0)
    const typoOk = own.some((h) => h.strength === 'typo') && short && asksAbout
    const commonOk = own.some((h) => h.strength === 'common') && short && !otherTopic
    if (strong || combined || typoOk || commonOk) {
      active.push({ member, at: Math.min(...own.map((h) => h.at)) })
    }
  }
  active.sort((a, b) => a.at - b.at)

  // "Gabriela"/"Gaby" (o "Alejandra" en un mensaje corto) sin apellido: ¿cuál de las dos?
  const gabyNamed = active.some((a) => a.member.id === 'gaby_alvarado' || a.member.id === 'gaby_alfaro')
  const askGaby = !gabyNamed && gabyAt >= 0 && (hasGabriela || (short && !otherTopic))
  return { members: active.map((a) => a.member), askGaby }
}

const gabyPending = (tries: number): Pending => ({ domain: 'support', text: `team|gaby|${tries}` })

function askGabyReply(before: string[], tries: number): Routed {
  return {
    text: [...before, GABY_QUESTION].join('\n\n'),
    card: { kind: 'quick-replies', options: GABY_OPTIONS },
    domain: null,
    pending: gabyPending(tries),
  }
}

// Respuesta del easter egg, o null si el mensaje no menciona a nadie del equipo.
export function teamReply(text: string): Routed | null {
  const { members, askGaby } = detectTeam(text)
  if (!members.length && !askGaby) return null
  const texts = members.map((m) => m.text)
  if (askGaby) return askGabyReply(texts, 0)
  return { text: texts.join('\n\n'), domain: null, pending: null }
}

export const isGabyPending = (pending: Pending) => pending?.text.startsWith('team|gaby') ?? false

// Respuesta a "¿A cuál Gaby te refieres?". Si no se entiende, se pregunta una vez más;
// a la segunda, se sale de la pregunta (null) y el mensaje sigue el flujo normal del chat.
export function answerGaby(text: string, pending: Pending): Routed | null {
  const tries = Number(pending?.text.split('|')[2] ?? 0)
  const words = ` ${toWords(text).join(' ')} `
  const member = (id: TeamMemberId) => teamMembers.find((m) => m.id === id)!.text
  const done = (reply: string): Routed => ({ text: reply, domain: null, pending: null })

  if (/ (las dos|los dos|ambas|ambos|las 2|las gabriela|las gabrielas|las dos gabrielas|las dos gabriela) /.test(words)) return done(BOTH_GABYS_TEXT)
  if (/ (alvarado|rosa|buho|logo|interfaz|pantallas|disenadora|diseno|primera|1) /.test(words)) return done(member('gaby_alvarado'))
  if (/ (alfaro|marmol|presupuesto|contadora|numeros|cuentas|basquetbolista|basquet|segunda|2) /.test(words)) return done(member('gaby_alfaro'))
  if (tries === 0) return askGabyReply([], 1)
  return null
}
