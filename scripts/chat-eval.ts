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
      const m = matchIdentity(asked(variant), variant)
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
