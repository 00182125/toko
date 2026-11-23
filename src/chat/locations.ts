import { buildingList, type Building } from '@/data/buildings'
import type { Reply } from '@/types/chat'

const romanNumbers: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6 }
const wordNumbers: Record<string, number> = {
  uno: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
}

// Saca el número de Magna de un texto: "magna 3", "magna iii", "3", "tres"...
export function readMagnaNumber(text: string): number | null {
  const token = text.match(/\b(\d|vi|iv|iii|ii|v|i|uno|dos|tres|cuatro|cinco|seis)\b/)?.[1]
  if (!token) return null
  if (/^\d$/.test(token)) return Number(token)
  return romanNumbers[token] ?? wordNumbers[token] ?? null
}

// Grupos que necesitan una aclaración ("Aulas" -> A, B, C o D).
const locationGroups: Array<{ words: string[]; ask: string }> = [
  { words: ['magna'], ask: 'Hay varios Magna, del I al VI. ¿Cuál?' },
  { words: ['aula'], ask: 'Hay Aulas A, B, C y D. ¿Cuál buscas?' },
  { words: ['modulo'], ask: 'Hay Módulo A y Módulo B de Profesores. ¿Cuál buscas?' },
  {
    words: ['auditorio'],
    ask: 'Hay tres auditorios: Elba y Celina Ramos, Ignacio Ellacuría y Segundo Montes. ¿Cuál buscas?',
  },
  {
    words: ['laboratorio'],
    ask: 'Hay Laboratorios de Psicología y de Ingeniería. ¿Cuáles buscas?',
  },
  {
    words: ['centro'],
    ask: 'Hay varios centros: Orientación Profesional, Asuntos Estudiantiles, Cultural Universitario y Monseñor Romero. ¿Cuál buscas?',
  },
]

export const NOT_FOUND_BUILDING =
  'No encontré ese edificio. ¿Me dices su nombre? Por ejemplo: Biblioteca, Cafetería Central o Magna III.'

// "icas" va como palabra completa: si no, "prácticas", "clínicas" o "matemáticas" serían el ICAS.
const WHOLE_WORD = new Set(['icas', 'ikas', 'ycas', 'hicas', 'mb'])
const hasWord = (text: string, word: string) =>
  ` ${text} `.includes(` ${word} `) && !(word === 'mb' && /\d ?mb( |$)/.test(text)) // "5 mb" son megabytes
// Los nombres que terminan en una letra ("edificio d", "aula a") también van completos:
// si no, "edificio del MB" se leería como "edificio d".
const hasAlias = (text: string, alias: string) =>
  WHOLE_WORD.has(alias) || / [a-d]$/.test(alias) ? hasWord(text, alias) : text.includes(alias)

// "ICAS" y "MB" solo pueden ser esos edificios: con nombrarlos ya se da su tarjeta,
// sea como sea la frase ("tengo clase en el ICAS", "voy para el MB").
export const namesUniqueBuilding = (text: string) => [...WHOLE_WORD].some((word) => hasWord(text, word))

export function findBuilding(text: string): Building | 'ask-magna' | null {
  // Magna: "magna 3", "magna iii", "tres"...
  if (text.includes('magna')) {
    const number = readMagnaNumber(text.slice(text.indexOf('magna')))
    if (number && number >= 1 && number <= 6) return buildingList.find((b) => b.magna === number) ?? null
    return 'ask-magna'
  }
  // Aulas A-D: "aulas b", "edificio d"
  const letter = text.match(/\b(?:aulas?|edificio)\s+([abcd])\b/)?.[1]
  if (letter) {
    const found = buildingList.find((b) => b.aliases.includes(`aulas ${letter}`))
    if (found) return found
  }
  // Módulos de profesores A y B (el nombre del B incluye "Martín-Baró", que es otro edificio)
  const module = text.match(/\bmodulo\s+([ab])\b/)?.[1]
  if (module) {
    const found = buildingList.find((b) => b.aliases.includes(`modulo ${module}`))
    if (found) return found
  }
  // El alias más largo que aparezca en el texto gana.
  let best: Building | null = null
  let bestLength = 0
  for (const b of buildingList) {
    for (const alias of b.aliases) {
      if (hasAlias(text, alias) && alias.length > bestLength) {
        best = b
        bestLength = alias.length
      }
    }
  }
  if (best) return best
  // Un error de una letra en un nombre de 6 letras o más ("mercaduka", "ceditek", "parroquía").
  for (const word of text.split(' ')) {
    if (word.length < 6) continue
    const near = buildingList.find((b) => b.aliases.some((alias) => !alias.includes(' ') && alias.length >= 6 && oneEditAway(word, alias)))
    if (near) return near
  }
  return null
}

// ¿Están a una letra de distancia? (una letra cambiada, de más o de menos)
function oneEditAway(a: string, b: string): boolean {
  if (a === b || Math.abs(a.length - b.length) > 1) return false
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

// "Busco la biblioteca", "¿cómo encuentro Mercaduca?": también es buscar un lugar, pero solo si
// el mensaje es corto y lo que sigue es el nombre de un edificio ("busco una beca" no lo es).
export const LOOKS_FOR = /^(busco|ando buscando|estoy buscando|necesito encontrar|como encuentro|no encuentro) /
export const looksForBuilding = (text: string) => {
  if (!LOOKS_FOR.test(text) || text.split(' ').length > 14) return false
  const found = findBuilding(text)
  return found !== null && found !== 'ask-magna'
}

// El mensaje pregunta claramente cómo llegar a un lugar: "¿cómo llego a…?", "¿dónde queda…?",
// "¿por dónde se va a…?", "llévame a…", "necesito ir a…", "indicaciones para…".
// Si además nombra un edificio, su tarjeta gana sobre cualquier otro tema.
export const ASKS_WAY =
  /(donde (queda|quedan|esta|estan|se encuentra|se encuentran|se ubica|lo encuentro|la encuentro)|como (llego|llegar|voy|se llega|puedo llegar|hago para (llegar|ir)|lo encuentro|la encuentro)|por donde (se va|queda|esta|llego|se llega)|(^| )(llegar|ir|irme|llego) (a|al|hasta|hacia)( |$)|llevame|guiame (a|al|hasta|hacia)|ubicacion|ubicame|indicaciones|en que parte (queda|esta)|como encuentro (el|la|al|a) )/

// Devuelve null si el mensaje no habla de un edificio.
// `before` es lo que la persona dijo antes cuando Toko le preguntó "¿cuál?".
export function locationReply(
  text: string,
  before = '',
): { reply: Reply; waiting: boolean } | null {
  const combined = before ? `${before} ${text}` : text
  const found = findBuilding(combined)
  if (found && found !== 'ask-magna') {
    return {
      reply: {
        text: `Aquí está ${found.name}:`,
        card: { kind: 'building', building: found },
      },
      waiting: false,
    }
  }
  if (found === 'ask-magna') {
    return { reply: { text: 'Hay varios Magna, del I al VI. ¿Cuál?' }, waiting: true }
  }
  const group = locationGroups.find((g) => g.words.some((w) => combined.includes(w)))
  if (group) return { reply: { text: group.ask }, waiting: true }
  return null
}
