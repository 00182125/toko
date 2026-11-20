import { faqEntries, faqRegulations, faqTopics } from '@/data/faq'
import type { Reply } from '@/types/chat'
import { normalizeText } from './normalize'

// Buscador de preguntas frecuentes de los reglamentos.
// Compara lo que escribió la persona con todas las formas de preguntar guardadas
// (pregunta oficial + 10 variantes por pregunta + temas generales) y devuelve las más parecidas.
//
// Cómo compara:
//  1. Palabras: cada una se reduce a su raíz (primeras 5 letras) y se ignoran las de relleno.
//  2. Fragmentos de 3 letras: toleran errores de dedo ("bibloteca", "matricla").
//  Cada rasgo pesa más cuanto menos común es en el banco, y el puntaje va de 0 a 1.
//  3. Además se detecta de qué reglamento habla el mensaje ("ceuca", "beca", "instructor"...)
//     y las preguntas de ese reglamento reciben un empujón.

export type FaqCandidate = {
  kind: 'entry' | 'topic'
  id: string
  question: string
  score: number
  reply: Reply
}

export type FaqMatch = FaqCandidate & {
  // Segunda opción más parecida (para preguntar "¿te refieres a esta o a esta?")
  runnerUp: FaqCandidate | null
  // Cuántas palabras con contenido tiene el mensaje (sin "de", "que", "la"...)
  contentWords: number
  // Qué parte del mensaje (0 a 1) aparece en la pregunta elegida: 1 = todas sus palabras
  coverage: number
  // Qué tan claramente habla el mensaje del reglamento de esa pregunta (0 a 1)
  signal: number
  // El reglamento del que más habla el mensaje (0 a 1); si es otro, la pregunta no encaja
  strongestSignal: number
  // ¿Comparte con la pregunta una palabra clave de su reglamento ("beca", "biblioteca"...)?
  anchored: boolean
  // Parecido con su forma de preguntar más cercana (1 = idéntica)
  closest: number
}

// Palabras de relleno: no ayudan a distinguir una pregunta de otra.
const STOP_WORDS = new Set(
  (
    'a al algo algun alguna ante con como cual cuales de del el ella en es esa ese eso esta este esto ' +
    'ha hay la las le les lo los me mi mis o para pero por pues q que quien se si sin sobre su sus te ' +
    'tu un una uno unos y ya yo uca puedo puede pueden tengo tiene tienen hacer hago pa nos son ser ' +
    'estoy necesito quiero saber pasa dice hace muy mas tambien cosa cosas favor porfa decir dime explicame ' +
    // Palabras de pregunta: dicen qué se pregunta, no de qué tema
    'cuando donde cuanto cuanta cuantos cuantas'
  ).split(' '),
)

// Raíz sencilla: "retirar", "retiro" y "retiros" quedan como "retir".
function stem(word: string): string {
  if (word.length > 5) return word.slice(0, 5)
  if (word.length > 3 && word.endsWith('s')) return word.slice(0, -1)
  return word
}

function words(text: string): string[] {
  return normalizeText(text)
    .split(/[^a-z0-9]+/)
    .filter((word) => word && !STOP_WORDS.has(word))
}

// Rasgos de un texto: raíces de palabras ("w:") y fragmentos de 3 letras.
function features(text: string): string[] {
  const out: string[] = []
  for (const word of words(text)) {
    out.push(`w:${stem(word)}`)
    const padded = ` ${word} `
    for (let i = 0; i < padded.length - 2; i++) out.push(padded.slice(i, i + 3))
  }
  return out
}

type Vector = Map<string, number>
type Doc = { text: string; key: string; vector: Vector }
type Target = {
  kind: FaqCandidate['kind']
  id: string
  question: string
  reply: Reply
  regulations: string[]
  // Raíces de todas sus formas de preguntar
  vocabulary: Set<string>
}

type Index = {
  docs: Doc[]
  targets: Map<string, Target>
  vectorize: (text: string) => Vector
  // Para cada raíz: en qué reglamentos aparece (proporción de 0 a 1).
  regulationOf: Map<string, Map<string, number>>
  // En cuántas frases de preguntas aparece cada raíz
  stemCount: Map<string, number>
  idf: (feature: string) => number
}

let index: Index | null = null

// El índice se arma una sola vez, la primera vez que se busca.
function getIndex(): Index {
  if (index) return index

  const raw: Array<{ text: string; key: string }> = []
  const targets = new Map<string, Target>()
  const regulationById = new Map<string, string>()

  for (const regulation of faqRegulations) {
    for (const entry of regulation.entries) {
      const key = `entry:${entry.id}`
      regulationById.set(entry.id, regulation.id)
      targets.set(key, {
        kind: 'entry',
        id: entry.id,
        question: entry.question,
        reply: { text: entry.answer },
        regulations: [regulation.id],
        vocabulary: new Set(),
      })
      raw.push({ text: entry.question, key })
      entry.variants.forEach((text) => raw.push({ text, key }))
    }
  }
  for (const topic of faqTopics) {
    const key = `topic:${topic.id}`
    targets.set(key, {
      kind: 'topic',
      id: topic.id,
      question: `Información general: ${topic.title}`,
      reply: { text: topic.answer },
      regulations: [...new Set(topic.related.map((id) => regulationById.get(id)!))],
      vocabulary: new Set(),
    })
    topic.variants.forEach((text) => raw.push({ text, key }))
  }

  // Peso de cada rasgo: los que aparecen en pocas frases valen más.
  const docFeatures = raw.map((doc) => features(doc.text))
  raw.forEach((doc, i) => {
    const vocabulary = targets.get(doc.key)!.vocabulary
    docFeatures[i].forEach((f) => f.startsWith('w:') && vocabulary.add(f))
  })
  const df = new Map<string, number>()
  docFeatures.forEach((list) => new Set(list).forEach((f) => df.set(f, (df.get(f) ?? 0) + 1)))
  const total = raw.length
  const idf = (feature: string) => Math.log(1 + total / (df.get(feature) ?? 1))

  const vectorize = (list: string[]): Vector => {
    const vector: Vector = new Map()
    list.forEach((f) => vector.set(f, (vector.get(f) ?? 0) + 1))
    let norm = 0
    vector.forEach((count, f) => {
      const w = (1 + Math.log(count)) * idf(f)
      vector.set(f, w)
      norm += w * w
    })
    norm = Math.sqrt(norm) || 1
    vector.forEach((w, f) => vector.set(f, w / norm))
    return vector
  }

  const docs: Doc[] = raw.map((doc, i) => ({
    text: normalizeText(doc.text),
    key: doc.key,
    vector: vectorize(docFeatures[i]),
  }))

  // En qué reglamento suele aparecer cada raíz ("ceuca" → CEUCA casi siempre).
  const regulationOf = new Map<string, Map<string, number>>()
  raw.forEach((doc, i) => {
    const target = targets.get(doc.key)!
    if (target.kind !== 'entry') return
    for (const f of new Set(docFeatures[i])) {
      if (!f.startsWith('w:')) continue
      const counts = regulationOf.get(f) ?? new Map<string, number>()
      counts.set(target.regulations[0], (counts.get(target.regulations[0]) ?? 0) + 1)
      regulationOf.set(f, counts)
    }
  })
  const stemCount = new Map<string, number>()
  regulationOf.forEach((counts, f) => {
    const sum = [...counts.values()].reduce((a, b) => a + b, 0)
    stemCount.set(f, sum)
    counts.forEach((n, reg) => counts.set(reg, n / sum))
  })

  index = { docs, targets, vectorize: (text) => vectorize(features(text)), regulationOf, stemCount, idf }
  return index
}

function cosine(a: Vector, b: Vector): number {
  const [small, big] = a.size < b.size ? [a, b] : [b, a]
  let sum = 0
  small.forEach((w, f) => {
    const other = big.get(f)
    if (other) sum += w * other
  })
  return sum
}

// Qué tan claramente habla el mensaje de cada reglamento (0 a 1).
function regulationSignal(request: string, idx: Index): Map<string, number> {
  const signal = new Map<string, number>()
  let totalWeight = 0
  for (const word of new Set(words(request))) {
    const f = `w:${stem(word)}`
    const counts = idx.regulationOf.get(f)
    if (!counts) continue
    const w = idx.idf(f)
    totalWeight += w
    counts.forEach((share, reg) => signal.set(reg, (signal.get(reg) ?? 0) + w * share))
  }
  if (totalWeight > 0) signal.forEach((v, reg) => signal.set(reg, v / totalWeight))
  return signal
}

// Busca las preguntas más parecidas.
//  exclude: texto a ignorar (solo para las pruebas: así no se encuentra a sí misma)
//  shortTopicsOnly: con mensajes de 1 o 2 palabras, considerar solo temas generales
//    (false para sugerir opciones, donde una pregunta puntual también sirve)
export function matchFaq(
  request: string,
  { exclude, shortTopicsOnly = true }: { exclude?: string; shortTopicsOnly?: boolean } = {},
): FaqMatch | null {
  const idx = getIndex()
  const query = idx.vectorize(request)
  if (query.size === 0) return null
  const skip = exclude ? normalizeText(exclude) : null

  // Puntajes de cada forma de preguntar, agrupados por pregunta (o tema).
  const byTarget = new Map<string, number[]>()
  for (const doc of idx.docs) {
    if (doc.text === skip) continue
    const score = cosine(query, doc.vector)
    if (score <= 0) continue
    const list = byTarget.get(doc.key) ?? []
    list.push(score)
    byTarget.set(doc.key, list)
  }

  const signal = regulationSignal(request, idx)
  const queryStems = [...new Set(words(request).map((w) => `w:${stem(w)}`))]
  // Con 1 o 2 palabras ("parqueo", "registro academico") no hay contexto para elegir
  // una pregunta puntual: solo se consideran los temas generales.
  const shortMessage = shortTopicsOnly && queryStems.length <= 2
  // Palabra muy propia de un reglamento ("biblioteca", "ceuca", "beca"...):
  // aparece en varias frases y casi siempre del mismo reglamento.
  const ownerOf = (f: string): string | null => {
    // Los números ("20 dólares", "3 días") no son de ningún reglamento.
    if (/^w:\d+$/.test(f)) return null
    const counts = idx.regulationOf.get(f)
    if (!counts || (idx.stemCount.get(f) ?? 0) < 3) return null
    for (const [reg, share] of counts) if (share >= 0.6) return reg
    return null
  }
  // La pregunta no encaja si el mensaje trae una palabra propia de OTRO reglamento que ella no usa.
  const hasForeignWord = (target: Target) =>
    queryStems.some((f) => {
      const owner = ownerOf(f)
      return owner !== null && !target.regulations.includes(owner) && !target.vocabulary.has(f)
    })

  const ranked = [...byTarget.entries()]
    // Mensajes cortos: solo temas generales, salvo que sea idéntico a una pregunta guardada.
    .filter(([key, scores]) => !shortMessage || key.startsWith('topic:') || Math.max(...scores) >= 0.97)
    .filter(([key]) => !hasForeignWord(idx.targets.get(key)!))
    .map(([key, scores]) => {
      const target = idx.targets.get(key)!
      // Una pregunta gana si se parece mucho a sus dos formas más cercanas.
      scores.sort((a, b) => b - a)
      let score = (scores[0] + (scores[1] ?? 0)) / 2
      // Empujón si el mensaje habla claramente de su reglamento.
      const boost = Math.max(0, ...target.regulations.map((reg) => signal.get(reg) ?? 0))
      score *= 1 + 0.35 * boost
      // Los temas generales ceden un poco ante una pregunta puntual igual de parecida.
      if (target.kind === 'topic') score *= 0.95
      // Una forma de preguntar idéntica siempre gana.
      if (scores[0] >= 0.97) score = Math.max(score, scores[0])
      return { target, score: Math.min(score, 1), closest: scores[0] }
    })
    // Empate: gana la que tiene la forma de preguntar más parecida.
    .sort((a, b) => b.score - a.score || b.closest - a.closest)

  if (ranked.length === 0) return null
  const toCandidate = ({ target, score }: (typeof ranked)[number]): FaqCandidate => ({
    kind: target.kind,
    id: target.id,
    question: target.question,
    score,
    reply: target.reply,
  })
  const best = ranked[0].target
  const queryWeight = queryStems.reduce((sum, f) => sum + idx.idf(f), 0)
  const coveredWeight = queryStems
    .filter((f) => best.vocabulary.has(f))
    .reduce((sum, f) => sum + idx.idf(f), 0)

  return {
    ...toCandidate(ranked[0]),
    runnerUp: ranked[1] ? toCandidate(ranked[1]) : null,
    contentWords: queryStems.length,
    coverage: queryWeight > 0 ? coveredWeight / queryWeight : 0,
    signal: Math.max(0, ...best.regulations.map((reg) => signal.get(reg) ?? 0)),
    strongestSignal: Math.max(0, ...signal.values()),
    anchored: queryStems.some((f) => {
      const owner = ownerOf(f)
      return owner !== null && best.regulations.includes(owner) && best.vocabulary.has(f)
    }),
    closest: ranked[0].closest,
  }
}

// ¿El mensaje habla del reglamento de la pregunta elegida y no más de otro?
// ("biblioteca abre sábado?" no debe responder el horario de la sala de lactancia)
const fitsRegulation = (m: FaqMatch) => m.signal >= m.strongestSignal - 0.15

// ¿Se puede responder con seguridad, aunque el mensaje parezca de otro tema (fechas, lugares)?
// Sí si es idéntica a una pregunta guardada, o si es una pregunta completa,
// todas sus palabras importantes están en la elegida y habla claramente de ese reglamento.
export function isSureFaq(match: FaqMatch | null): boolean {
  if (!match || match.contentWords < 3) return false
  if (match.closest >= 0.97) return true
  return (
    match.score >= FAQ_STRONG &&
    match.coverage >= FAQ_COVERAGE &&
    match.signal >= 0.35 &&
    fitsRegulation(match)
  )
}

// ¿Vale la pena sugerir esta pregunta ("¿tu pregunta se parece a esta?")?
// Al menos la mitad del mensaje debe aparecer en ella y debe ser del reglamento del que se habla.
export function canSuggestFaq(match: FaqMatch | null): boolean {
  if (!match) return false
  return match.score >= FAQ_SUGGEST && match.coverage >= 0.5 && match.anchored && fitsRegulation(match)
}

// ¿Se puede responder si ningún otro tema reconoció el mensaje?
// Los mensajes cortos (1 o 2 palabras) necesitan más parecido.
export function isGoodFaq(match: FaqMatch | null): boolean {
  if (!match) return false
  if (match.closest >= 0.97) return true
  const minimum = match.contentWords <= 2 ? FAQ_SHORT : FAQ_WEAK
  return match.score >= minimum && match.coverage >= FAQ_COVERAGE && fitsRegulation(match)
}

// Qué tan seguro debe estar el buscador para responder:
//  STRONG: responde aunque la frase parezca de otro tema (fechas, ubicaciones...)
//  WEAK: responde solo si ningún otro tema la reconoció
//  CLOSE: si la segunda opción está a menos de esto, Toko pregunta cuál de las dos es
//  COVERAGE: parte mínima del mensaje que debe aparecer en la pregunta elegida
//  SHORT: parecido mínimo para mensajes de 1 o 2 palabras
export const FAQ_STRONG = 0.75
export const FAQ_WEAK = 0.45
export const FAQ_SHORT = 0.7
export const FAQ_CLOSE = 0.05
export const FAQ_COVERAGE = 0.65
// Parecido mínimo para sugerir opciones en vez de decir "no sé"
export const FAQ_SUGGEST = 0.35

// ---------- Palabras clave por tema ----------
// Si el mensaje tiene una palabra clave de un tema ("acoso", "beca", "plagio"...),
// ese tema se responde sin importar cómo esté redactado el mensaje.

// Si un mensaje toca varios temas, ganan primero los delicados.
// Después, los diferidos: "me enfermé y perdí el parcial" es sobre diferidos antes que sobre salud.
const KEYWORD_PRIORITY = ['harassment', 'substances', 'cheating', 'conduct', 'due-process', 'complaints', 'deferred']

function keywordHits(text: string, keywords: string[]): number {
  const wordList = text.split(/[^a-z0-9]+/).filter(Boolean)
  return keywords.filter((raw) => {
    const keyword = normalizeText(raw)
    if (keyword.startsWith('=')) return wordList.includes(keyword.slice(1))
    if (keyword.includes(' ')) return ` ${text} `.includes(` ${keyword}`)
    return wordList.some((word) => word.startsWith(keyword))
  }).length
}

// Tema cuya palabra clave aparece en el mensaje (o null).
export function keywordTopic(request: string): string | null {
  const text = normalizeText(request)
  const rank = (id: string) => {
    const i = KEYWORD_PRIORITY.indexOf(id)
    return i === -1 ? KEYWORD_PRIORITY.length : i
  }
  let best: { id: string; hits: number } | null = null
  for (const topic of faqTopics) {
    if (!topic.keywords) continue
    const hits = keywordHits(text, topic.keywords)
    if (hits === 0) continue
    if (!best || hits > best.hits || (hits === best.hits && rank(topic.id) < rank(best.id))) {
      best = { id: topic.id, hits }
    }
  }
  return best?.id ?? null
}

// ¿La pregunta encontrada es de ese tema? (el tema mismo, una de sus preguntas
// relacionadas, o cualquier pregunta de los reglamentos que abarca)
export function faqBelongsTo(match: FaqMatch, topicId: string): boolean {
  if (match.kind === 'topic') return match.id === topicId
  const topic = getIndex().targets.get(`topic:${topicId}`)
  const entry = getIndex().targets.get(`entry:${match.id}`)
  if (!topic || !entry) return false
  const related = faqTopics.find((t) => t.id === topicId)?.related ?? []
  return related.includes(match.id) || entry.regulations.some((reg) => topic.regulations.includes(reg))
}

// Respuesta para "reglamento" a secas: la lista de reglamentos.
export const faqOverview = (): Reply => getIndex().targets.get('topic:overview')!.reply

// Respuesta guardada por clave ("entry:P21" o "topic:harassment").
export const faqReply = (key: string): Reply | null => getIndex().targets.get(key)?.reply ?? null
export const faqQuestion = (key: string): string | null => getIndex().targets.get(key)?.question ?? null

// Todas las preguntas oficiales (para pruebas).
export const faqOfficialQuestions = () => faqEntries.map((e) => ({ id: e.id, question: e.question, answer: e.answer }))
