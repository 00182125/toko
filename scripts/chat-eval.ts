// Mide qué tan bien responde el chat. Se ejecuta con: npm run eval:chat
// (agrega -- --verbose para ver cada caso)
//
// 1. Reglamento: cada forma de preguntar se busca SIN ella misma en el banco (como si fuera
//    una frase nueva que nadie escribió antes) y se revisa qué haría Toko:
//      responder bien · responder otra pregunta · sugerir opciones · no saber.
// 2. Preguntas oficiales del PDF por el chat completo: deben responder exactamente.
// 3. Banco general (300 preguntas de otros temas): cuáles responde con el reglamento.
import { canSuggestFaq, faqBelongsTo, isGoodFaq, keywordTopic, matchFaq } from '../src/chat/faq'
import { routeMessage } from '../src/chat/router'
import { faqEntries, faqTopics } from '../src/data/faq'
import { allQuestions } from '../src/data/questionBank'
import { identityIntents } from '../src/data/identity'
import { matchIdentity } from '../src/chat/identity'
import { normalizeText } from '../src/chat/normalize'
import { stepsFor, stepsRequest } from '../src/chat/steps'
import { procedureCards } from '../src/data/procedures'
import { reservationCards } from '../src/data/reservations'
import { stepGuides } from '../src/data/steps'
import { buildingList } from '../src/data/buildings'

const pct = (n: number, total: number) => `${((n / total) * 100).toFixed(1)}%`
const verbose = process.argv.includes('--verbose')

type Case = { text: string; kind: 'entry' | 'topic'; id: string }
const cases: Case[] = [
  ...faqEntries.flatMap((e) => e.variants.map((text) => ({ text, kind: 'entry' as const, id: e.id }))),
  ...faqTopics.flatMap((t) => t.variants.map((text) => ({ text, kind: 'topic' as const, id: t.id }))),
]

// Correcta si es la misma pregunta, o el tema general que la contiene (o al revés).
const inTopic = (topicId: string, entryId: string) =>
  faqTopics.find((t) => t.id === topicId)?.related.includes(entryId) ?? false
const isRight = (kind: string, id: string, c: Case) =>
  (kind === c.kind && id === c.id) ||
  (kind === 'topic' && c.kind === 'entry' && inTopic(id, c.id)) ||
  (kind === 'entry' && c.kind === 'topic' && inTopic(c.id, id))

// 1. Reglamento con frases nuevas
let right = 0
let wrong = 0
let suggestedRight = 0
let suggestedWrong = 0
let unknown = 0
const log: string[] = []
for (const c of cases) {
  const m = matchFaq(c.text, { exclude: c.text })
  if (m && isGoodFaq(m)) {
    if (isRight(m.kind, m.id, c)) right++
    else {
      wrong++
      log.push(`  ✗ (${m.score.toFixed(2)}) "${c.text}" → esperaba ${c.id}, respondió ${m.id}`)
    }
    continue
  }
  const s = matchFaq(c.text, { exclude: c.text, shortTopicsOnly: false })
  if (s && canSuggestFaq(s)) {
    const offered = [s, s.runnerUp && s.runnerUp.score >= s.score * 0.85 ? s.runnerUp : null]
    if (offered.some((o) => o && isRight(o.kind, o.id, c))) suggestedRight++
    else suggestedWrong++
  } else {
    unknown++
    log.push(`  ? "${c.text}" → ${c.id}`)
  }
}
console.log(`\n1. Reglamento con frases nuevas (${cases.length}):`)
console.log(`   responde bien ............... ${right} (${pct(right, cases.length)})`)
console.log(`   responde otra pregunta ...... ${wrong} (${pct(wrong, cases.length)})`)
console.log(`   sugiere opciones, la buena está ${suggestedRight} (${pct(suggestedRight, cases.length)})`)
console.log(`   sugiere opciones, no está ... ${suggestedWrong} (${pct(suggestedWrong, cases.length)})`)
console.log(`   no sabe ..................... ${unknown} (${pct(unknown, cases.length)})`)
if (verbose) console.log(log.join('\n'))

// 1b. Palabras clave: de las frases que el buscador no respondía, ¿cuántas tienen una
// palabra clave que lleva al tema correcto (el que contiene esa pregunta)?
{
  let ok = 0
  let other = 0
  let none = 0
  const otherLog: string[] = []
  for (const c of cases) {
    const m = matchFaq(c.text, { exclude: c.text })
    if (m && isGoodFaq(m)) continue
    const topic = keywordTopic(c.text)
    if (!topic) none++
    else if (isRight('topic', topic, c) || (c.kind === 'entry' && faqBelongsTo({ ...m!, kind: 'entry', id: c.id }, topic))) ok++
    else {
      other++
      otherLog.push(`  "${c.text}" (${c.id}) → tema ${topic}`)
    }
  }
  console.log(`\n1b. De las ${cases.length - right - wrong} que el buscador no respondía:`)
  console.log(`   la palabra clave lleva al tema correcto .. ${ok}`)
  console.log(`   la palabra clave lleva a otro tema ....... ${other}`)
  console.log(`   no tienen palabra clave .................. ${none}`)
  if (verbose) console.log(otherLog.join('\n'))
}

// 2. Preguntas oficiales del PDF por el chat completo
let exact = 0
const failed: string[] = []
for (const e of faqEntries) {
  const r = routeMessage(e.question, null, null)
  if (r.text === e.answer) exact++
  else failed.push(`  ${e.id} ${e.question}\n     → ${r.text.slice(0, 80)}`)
}
console.log(`\n2. Preguntas oficiales del PDF por el chat: ${exact}/${faqEntries.length}`)
if (failed.length) console.log(failed.join('\n'))

// 2b. Parciales diferidos: las 315 preguntas del banco por el chat completo,
// y las mismas plantillas con materias que NO están en el banco.
{
  const deferred = faqEntries.filter((e) => e.id.startsWith('D'))
  const topicAnswer = faqTopics.find((t) => t.id === 'deferred')!.answer
  let ok = 0
  let total = 0
  const bad: string[] = []
  for (const e of deferred) {
    for (const text of e.variants) {
      total++
      const r = routeMessage(text, null, null)
      if (r.text === e.answer) ok++
      else bad.push(`  ${e.id} "${text}"\n     → ${r.text.split('\n')[0].slice(0, 90)}`)
    }
  }
  console.log(`\n2b. Diferidos: preguntas del banco y coloquiales por el chat: ${ok}/${total}`)
  if (bad.length) console.log(bad.slice(0, verbose ? bad.length : 15).join('\n'))

  // Materias nuevas: se toma cada pregunta con "Matemática I" y se cambia por otra materia.
  const newSubjects = ['Cálculo III', 'Biología Celular', 'Historia del Arte', 'Termodinámica', 'Redacción']
  let exact = 0
  let topic = 0
  let other = 0
  const otherLog: string[] = []
  for (const e of deferred) {
    for (const text of e.variants.filter((v) => v.includes('Matemática I'))) {
      for (const subject of newSubjects) {
        const q = text.replace('Matemática I', subject)
        const r = routeMessage(q, null, null)
        if (r.text === e.answer) exact++
        else if (r.text === topicAnswer) topic++
        else {
          other++
          otherLog.push(`  ${e.id} "${q}"\n     → ${r.text.split('\n')[0].slice(0, 90)}`)
        }
      }
    }
  }
  const n = exact + topic + other
  console.log(`    con materias nuevas (${n}): respuesta exacta ${exact} · resumen de diferidos ${topic} · otra ${other}`)
  if (otherLog.length) console.log(otherLog.slice(0, verbose ? otherLog.length : 10).join('\n'))
}

// 3. Banco general: qué responde con el reglamento
const answers = new Set([...faqEntries.map((e) => e.answer), ...faqTopics.map((t) => t.answer)])
const answered: string[] = []
const suggestions: string[] = []
let suggested = 0
for (const q of allQuestions) {
  if (q.after) continue
  const r = routeMessage(q.text, null, null)
  if (answers.has(r.text)) {
    const m = matchFaq(q.text)
    answered.push(`  [${q.category}/${q.intent}] ${q.text}  → ${m?.id} (${m?.score.toFixed(2)})`)
  } else if (r.text.startsWith('No estoy seguro de haberte entendido')) {
    suggested++
    suggestions.push(`  (sugiere) [${q.category}/${q.intent}] ${q.text} → ${r.text.split('\n')[1]}`)
  }
}
console.log(`\n3. Banco general (${allQuestions.length}) respondido con el reglamento: ${answered.length} · con sugerencias: ${suggested}`)
console.log(answered.join('\n'))
if (verbose) console.log(suggestions.join('\n'))

// 4. Preguntas sobre Toko ("¿eres una IA?", "¿cómo funcionas?"...)
//  · cada forma de preguntar, buscada SIN ella misma en el banco (como frase nueva)
//  · frases escritas a mano que no están en el banco
//  · que no le robe preguntas al reglamento ni al banco general
{
  const asked = (text: string) => normalizeText(text)
  let ok = 0
  let bad = 0
  let none = 0
  const idLog: string[] = []
  for (const intent of identityIntents) {
    for (const variant of intent.variants) {
      const m = matchIdentity(asked(variant), variant, undefined, Boolean(intent.guestOnly))
      if (!m) {
        none++
        idLog.push(`  ? "${variant}" → ${intent.id}`)
      } else if (m.id === intent.id) ok++
      else {
        bad++
        idLog.push(`  ✗ "${variant}" → esperaba ${intent.id}, respondió ${m.id} ("${m.variant}")`)
      }
    }
  }
  const total = ok + bad + none
  console.log(`\n4. Preguntas sobre Toko con frases nuevas (${total}): bien ${ok} (${pct(ok, total)}) · otro tema ${bad} · no entiende ${none}`)
  if (verbose) console.log(idLog.join('\n'))

  const unseen: [string, string][] = [
    ['Oye Toko, ¿tú eres una inteligencia artificial?', 'is-ai'],
    ['¿Funcionas con inteligencia artificial o algo así?', 'is-ai'],
    ['¿Y tú qué diferencia tienes con ChatGPT?', 'ai-difference'],
    ['¿Por qué te usaría a ti en vez de ChatGPT?', 'ai-difference'],
    ['¿Hay una persona contestando esto?', 'is-human'],
    ['¿De dónde sacas todo lo que sabes?', 'how-works'],
    ['¿Cómo es que funcionas?', 'how-works'],
    ['¿Y tú para qué me sirves?', 'usefulness'],
    ['¿Qué cosas me puedes responder?', 'capabilities'],
    ['¿Quién fue el que te creó?', 'creator'],
    ['¿Te puedes equivocar en lo que dices?', 'reliability'],
    ['¿Alguien más lee lo que te escribo?', 'privacy'],
    ['¿Tú aprendes de lo que te pregunto?', 'learning'],
    ['¿Puedes buscarme algo en Google?', 'internet'],
    ['¿Tú sientes algo?', 'feelings'],
    ['¿Por qué eres un búho?', 'owl'],
    ['¿Cuántos años tienes, Toko?', 'age'],
    ['¿Estás disponible todo el día?', 'availability'],
    ['¿Esto tiene algún costo?', 'cost'],
    ['Do you speak English?', 'languages'],
    ['¿Me puedes hacer la tarea de cálculo?', 'homework'],
    ['¿Cómo te tengo que preguntar las cosas?', 'how-to-ask'],
    ['qué trámites me ayudas a sacar?', 'which-procedures'],
    ['cuales son los tramites que tienes', 'which-procedures'],
    ['qué lugares del campus sabes ubicar', 'which-buildings'],
    ['puedes decirme dónde están los edificios?', 'which-buildings'],
    ['para qué es la tarjeta que me mandaste', 'how-cards'],
    ['¿Cómo funciona lo del calendario?', 'how-calendar'],
    ['qué significan los colores en el calendario?', 'how-calendar'],
    ['qué cosas me puedes reservar', 'which-reservations'],
    ['qué contactos tienes de la UCA', 'which-contacts'],
    ['para qué sirve cada pestaña', 'app-tabs'],
    ['me puedes explicar trámites paso a paso?', 'how-steps'],
    ['qué fechas importantes me puedes decir', 'which-dates'],
  ]
  const missed = unseen.filter(([text, id]) => matchIdentity(asked(text))?.id !== id)
  console.log(`   frases escritas a mano: ${unseen.length - missed.length}/${unseen.length}`)
  for (const [text, id] of missed) console.log(`  ✗ "${text}" → esperaba ${id}, respondió ${matchIdentity(asked(text))?.id ?? 'nada'}`)

  const others = [
    ...faqEntries.flatMap((e) => e.variants),
    ...faqTopics.flatMap((t) => t.variants),
    ...allQuestions.map((q) => q.text),
  ]
  const stolen = others.filter((text) => matchIdentity(asked(text)))
  console.log(`   preguntas de otros temas que toma como "sobre Toko": ${stolen.length}/${others.length}`)
  for (const text of stolen.slice(0, verbose ? stolen.length : 15)) {
    const m = matchIdentity(asked(text))!
    console.log(`  ! "${text}" → ${m.id} ("${m.variant}")`)
  }
}

// 5. Paso a paso ("explícame cómo lo hago", "dime los pasos para pedir un diferido")
//  · frases de seguimiento: deben reconocerse como pedido de pasos de lo anterior
//  · cada guía debe apuntar a respuestas que existen
//  · conversaciones: respuesta → "explícame cómo lo hago" → los pasos de ESA respuesta
{
  const follow = [
    'explícame cómo lo hago', 'explícame cómo hacer eso', 'explícame lo que dijiste', 'dime paso a paso cómo lo hago',
    'cómo hago ese trámite', 'y cómo lo hago?', 'dame los pasos', 'cuáles son los pasos', 'qué pasos tengo que seguir',
    'explícamelo paso a paso', 'cómo se hace eso', 'cómo lo saco', 'cómo lo pido', 'cómo lo solicito', 'guíame',
    'me guías?', 'ayúdame a hacerlo', 'cuál es el procedimiento', 'explícame mejor', 'explícamelo', 'cómo puedo hacerlo',
    'qué tengo que hacer entonces', 'qué debo hacer primero', 'los pasos porfa', 'dime los pasos a seguir',
    'explícame el trámite', 'explícame el proceso', 'cómo sería el trámite', 'cómo es el proceso',
    'cómo hago lo que me dijiste', 'pasos a seguir', 'explícame cómo se hace eso', 'cómo lo podría hacer',
    'ok y cómo lo tramito', 'bueno, cómo le hago entonces', 'paso a paso porfa', 'dime cómo lo hago paso a paso',
    'explícame detalladamente', 'me explicas cómo se hace eso?', 'y eso cómo lo hago',
  ]
  const missedFollow = follow.filter((f) => stepsRequest(normalizeText(f)) !== 'follow-up')
  console.log(`\n5. Paso a paso: frases de seguimiento reconocidas ${follow.length - missedFollow.length}/${follow.length}`)
  for (const f of missedFollow) console.log(`  ✗ "${f}"`)

  const known = new Set([
    ...faqEntries.map((e) => `entry:${e.id}`),
    ...faqTopics.map((t) => `topic:${t.id}`),
    ...procedureCards.map((c) => `procedure:${c.id}`),
    ...reservationCards.map((c) => `reservation:${c.id}`),
  ])
  const broken = stepGuides.flatMap((g) => g.refs.filter((r) => !known.has(r)).map((r) => `${g.id} → ${r}`))
  console.log(`   guías: ${stepGuides.length} · referencias rotas: ${broken.length}`)
  for (const b of broken) console.log(`  ✗ ${b}`)
  const withSteps = [...known].filter((ref) => stepsFor(ref)).length
  console.log(`   respuestas con paso a paso: ${withSteps}/${known.size} (todos los trámites y reservas, y las preguntas que son un trámite)`)

  // Conversaciones de dos mensajes
  const talks: [string, string][] = [
    ['que pasa si quiero retirar una materia?', 'retirar una materia'],
    ['quiero una constancia de estudiante inscrito', 'Estudiante inscrito'],
    ['cuanto cuesta el parqueo', 'Pago de parqueo'],
    ['cuántas horas de servicio social son?', 'servicio social'],
    ['¿Puedo pedir revisión de nota si siento que el profe me calificó mal en un examen parcial?', 'revisión de una nota'],
    ['me enfermé el día del parcial', 'parcial diferido'],
    ['como pago la mensualidad', 'pagar tu mensualidad'],
    ['requisitos para ser instructor', 'ser instructor'],
  ]
  let okTalks = 0
  for (const [first, expected] of talks) {
    const r1 = routeMessage(first, null, null)
    const r2 = routeMessage('explícame cómo lo hago', null, null, { lastRef: r1.ref ?? null })
    if (r2.text.includes(expected)) okTalks++
    else console.log(`  ✗ "${first}" (${r1.ref}) → ${r2.text.split('\n')[0]}`)
  }
  console.log(`   conversaciones "respuesta → explícame cómo lo hago": ${okTalks}/${talks.length}`)
}

// 6. Easter egg del equipo ("Toko_easter_egg_equipo.pdf", lista de comprobación)
{
  const who = (t: string) =>
    t.split('\n\n').map((p) =>
      p.startsWith('Ah, preguntas por Rodrigo') ? 'rodrigo'
      : p.startsWith('Rafael Alejandro') ? 'rafael'
      : p.startsWith('Gabriela Alejandra Alvarado') ? 'alvarado'
      : p.startsWith('Gabriela Alejandra Alfaro') ? 'alfaro'
      : p.startsWith('Las dos Gabys') ? 'las-dos'
      : p.startsWith('¿A cuál Gaby') ? 'pregunta'
      : 'otro').join('+')
  const cases: [string, string][] = [
    ['Rodrigo Javier Minero Dubón', 'rodrigo'], ['rodri', 'rodrigo'], ['Minero Dubón', 'rodrigo'], ['javier', 'rodrigo'], ['dubonn', 'rodrigo'],
    ['Rafa', 'rafael'], ['Cabezas', 'rafael'], ['Rafael Romero', 'rafael'], ['quién es Rafael Alejandro Cabezas Romero?', 'rafael'],
    ['Gaby', 'pregunta'], ['Gabriela', 'pregunta'], ['Alejandra', 'pregunta'],
    ['Gaby Alvarado', 'alvarado'], ['Gabriela Alfaro', 'alfaro'], ['Gabriela Alejandra Alvarado de la Rosa', 'alvarado'],
    ['Rodrigo y Rafael', 'rodrigo+rafael'],
    ['Centro Monseñor Romero', 'otro'], ['me duele la cabeza', 'otro'], ['Javier me dijo que la constancia de notas cuesta 25', 'otro'],
  ]
  const failed = cases.filter(([q, want]) => who(routeMessage(q, null, null).text) !== want)
  const gaby = routeMessage('gaby', null, null)
  const followUps: [string, string][] = [['la primera', 'alvarado'], ['Alfaro', 'alfaro'], ['las dos', 'las-dos']]
  const failedFollow = followUps.filter(([q, want]) => who(routeMessage(q, gaby.pending, null).text) !== want)
  console.log(`\n6. Easter egg del equipo: nombres ${cases.length - failed.length}/${cases.length} · respuestas a "¿a cuál Gaby?" ${followUps.length - failedFollow.length}/${followUps.length}`)
  for (const [q, want] of [...failed, ...failedFollow]) console.log(`  ✗ "${q}" → esperaba ${want}`)
}

// 7. Cómo llegar: 30 formas de preguntar por un lugar, con cada nombre de cada edificio.
// Todas deben dar la tarjeta de ESE edificio (con su mapa e indicaciones).
{
  const ways = [
    'como llego a {x}', '¿cómo llego al {x}?', 'donde queda {x}', 'dónde está el {x}', 'como encuentro {x}',
    'me ayudas a llegar a {x}', 'ubicación de {x}', 'como hago para llegar a {x}', 'por donde se va a {x}',
    'donde se encuentra {x}', 'indicaciones para llegar a {x}', 'llevame a {x}', 'necesito ir a {x}',
    'en que parte queda {x}', '{x} donde queda?', 'busco {x}', 'quiero ir a {x}', 'como voy a {x}',
    'estoy perdido, como llego a {x}', 'como llegar a {x}', 'me puedes decir como llegar a {x}',
    'oye toko donde esta {x}', 'por donde queda {x}', 'tengo que ir a {x}, como llego?', 'guiame a {x}',
    'como puedo llegar a {x}', 'donde queda ubicado {x}', 'no encuentro {x}', 'ando buscando {x}', 'como se llega a {x}',
  ]
  let ok = 0
  let total = 0
  const misses: string[] = []
  for (const building of buildingList) {
    for (const name of [building.name, ...building.aliases]) {
      for (const way of ways) {
        const q = way.replace('{x}', name)
        total++
        const r = routeMessage(q, null, null)
        if (r.card?.kind === 'building' && r.card.building.name === building.name) ok++
        else misses.push(`  ✗ "${q}" → ${r.card?.kind === 'building' ? r.card.building.name : r.text.slice(0, 60)}`)
      }
    }
  }
  console.log(`\n7. Cómo llegar a los ${buildingList.length} edificios (${ways.length} formas × cada nombre): ${ok}/${total}`)
  console.log(misses.slice(0, verbose ? misses.length : 10).join('\n'))
}

// 8. ICAS y MB: formas naturales de preguntar por ellos.
{
  const ways = [
    '{x}', 'el {x}', 'edificio {x}', 'edificio del {x}', '{x} uca', 'donde queda el {x}', 'donde esta el {x}', 'donde es el {x}',
    'a donde queda el {x}', 'hacia donde queda el {x}', 'por donde queda el {x}', 'en que parte de la uca esta el {x}',
    'como llego al {x}', 'como llego a {x}', 'como llegar al {x}', 'como se llega al {x}', 'como hago para llegar al {x}',
    'como le hago para llegar al {x}', 'como me voy al {x}', 'como voy al {x}', 'por donde se va al {x}', 'por donde agarro para el {x}',
    'me dices donde esta el {x}', 'me dices como llegar al {x}', 'me ayudas a llegar al {x}', 'me puedes llevar al {x}',
    'llevame al {x}', 'guiame al {x}', 'ubicame el {x}', 'ubicacion del {x}', 'mapa del {x}', 'indicaciones para el {x}',
    'necesito ir al {x}', 'quiero ir al {x}', 'tengo que ir al {x}', 'voy para el {x}', 'tengo clase en el {x}',
    'estoy perdido busco el {x}', 'no encuentro el {x}', 'ando buscando el {x}', 'oye toko donde queda el {x}',
    'queda lejos el {x}', 'quiero ver el {x}', 'fotos del {x}', 'cual es el edificio {x}',
  ]
  const targets: [string, string][] = [['ICAS', 'Edificio del ICAS'], ['icas', 'Edificio del ICAS'], ['MB', 'Edificio P. Ignacio Martín-Baró, S.J.'], ['mb', 'Edificio P. Ignacio Martín-Baró, S.J.']]
  let ok = 0
  const wrong: string[] = []
  for (const [word, name] of targets) for (const way of ways) {
    const q = way.replace('{x}', word)
    const r = routeMessage(q, null, null)
    if (r.card?.kind === 'building' && r.card.building.name === name) ok++
    else wrong.push(`  ✗ "${q}" → ${r.card?.kind === 'building' ? r.card.building.name : r.text.slice(0, 50)}`)
  }
  const safe = ['donde hago practicas', 'clinicas de la uca', 'preguntas basicas', 'materias academicas', 'el archivo pesa 5 mb', 'pesa 20mb']
  const stolen = safe.filter((q) => { const c = routeMessage(q, null, null).card; return c?.kind === 'building' && /ICAS|Martín-Baró/.test(c.building.name) })
  console.log(`\n8. ICAS y MB (${ways.length} formas × 4 escrituras): ${ok}/${ways.length * targets.length} · falsos positivos: ${stolen.length}/${safe.length}`)
  console.log(wrong.slice(0, 12).join('\n'))
}
