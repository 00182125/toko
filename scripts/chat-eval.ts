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
