import { identityIntents, type IdentityIntent } from '@/data/identity'
import type { Reply } from '@/types/chat'
import { skillsFor } from './guest'
import { pick, TOPIC_HINT } from './smallTalk'

// Preguntas sobre Toko mismo ("¿eres una IA?", "¿cómo funcionas?", "¿de qué me sirves?").
// Se compara el mensaje con todas las formas de preguntar cada tema (src/data/identity.ts)
// por las palabras que comparten, sin importar el orden ni los saludos alrededor.

// Palabras que no cambian la pregunta: saludos, artículos, muletillas.
const FILLER = new Set(
  'hola oye hey ey porfa favor bueno pues pero entonces y o a el la los las lo un una unos unas de del al me mi ya osea este mira digame'.split(
    ' ',
  ),
)
// Formas distintas de decir lo mismo.
const PHRASES: [RegExp, string][] = [
  [/inteligencias? artificial(es)?|modelos? de lenguaje|redes? neuronal(es)?|machine learning/g, 'ia'],
  [/chat ?gpt|open ?ai|gpt ?\d*|gemini|copilot|siri|alexa|bard|claude|deepseek/g, 'chatgpt'],
  [/(^| )(por que|porque|xq|pq|porq)( |$)/g, ' porque '],
]
const WORDS: Record<string, string> = {
  sos: 'eres',
  vos: 'tu',
  usted: 'tu',
  ti: 'tu',
  toko: 'tu',
  ai: 'ia',
  ias: 'ia',
  llm: 'ia',
  artificial: 'ia',
  q: 'que',
  k: 'que',
  ke: 'que',
  bot: 'robot',
  chatbot: 'robot',
  limitaciones: 'limites',
  limitacion: 'limites',
  limite: 'limites',
  nop: 'no',
  nunca: 'no',
}
// "Hacer a Toko" y quien lo hizo: crearon, programaron, hecho, creador, dueño...
const CREATE =
  /^(cre(o|aron|ado|ada)|creador(es)?|duen[oa]s?|papa|mama|hi(zo|cieron)|hecho|program(o|aron|ado)|desarroll(o|aron|ado)|disen(o|aron|ado)|invent(o|aron|ado))$/

// Raíz corta para que "funcionas" y "funciona", "puedes" y "puede" cuenten igual
// (sin cortar tanto que "interciclo" se confunda con "internet").
const stem = (word: string) =>
  CREATE.test(word) ? 'crear' : word.length > 4 ? word.replace(/s$/, '').slice(0, 6) : word

function tokens(text: string) {
  let value = ` ${text} `
  for (const [pattern, replacement] of PHRASES) value = value.replace(pattern, ` ${replacement} `)
  return new Set(
    value
      .split(' ')
      .map((word) => WORDS[word] ?? word)
      .filter((word) => word && !FILLER.has(word))
      .map(stem),
  )
}

type Indexed = { intent: IdentityIntent; variant: string; words: Set<string>; topical: boolean }
const index: Indexed[] = identityIntents.flatMap((intent) =>
  intent.variants.map((variant) => ({
    intent,
    variant,
    words: tokens(variant),
    topical: TOPIC_HINT.test(variant),
  })),
)

// Peso de cada palabra: las que aparecen en pocos temas ("ia", "chatgpt", "buho", "gratis")
// dicen mucho más que las que están en todos ("que", "eres", "tu").
const topicsWith = new Map<string, Set<string>>()
for (const item of index) {
  for (const word of item.words) {
    if (!topicsWith.has(word)) topicsWith.set(word, new Set())
    topicsWith.get(word)!.add(item.intent.id)
  }
}
const TOPICS = identityIntents.length
const weightOf = (word: string) => {
  const df = topicsWith.get(word)?.size
  // Una palabra que Toko no conoce pesa como una poco común: si el mensaje trae mucho
  // de otra cosa ("¿cómo funciona el préstamo de tablets?"), ya no es una pregunta sobre Toko.
  return df ? Math.log(1 + TOPICS / df) : UNKNOWN_WEIGHT
}
const UNKNOWN_WEIGHT = Math.log(1 + TOPICS)

// Parecido entre dos conjuntos de palabras según su peso (0 = nada en común, 1 = las mismas).
const similarity = (a: Set<string>, b: Set<string>) => {
  let shared = 0
  let total = 0
  for (const word of a) {
    const w = weightOf(word)
    total += w
    if (b.has(word)) shared += 2 * w
  }
  for (const word of b) total += weightOf(word)
  if (!total) return 0
  // "¿Qué NO puedes hacer?" no es "¿qué puedes hacer?"
  const negated = a.has('no') !== b.has('no')
  return (shared / total) * (negated ? NEGATION_PENALTY : 1)
}
const NEGATION_PENALTY = 0.7

const MIN_SCORE = 0.55
const MAX_WORDS = 14
const SECOND_SHARE = 0.3

// Una pregunta sobre Toko le habla a Toko: "tú", "te", "eres", un verbo en segunda persona
// ("¿puedes…?", "¿sabes…?", "¿funcionas…?") o algo propio de Toko (IA, ChatGPT, el búho, la app).
// Sin eso, "¿para qué sirve el CUM?" o "horario de la biblioteca" no son sobre Toko.
const TO_TOKO = new RegExp(
  '(^| )(' +
    [
      'tu|te|ti|tus|eres|sos|toko|contigo|usted|vos',
      'aburres|aciertas|actualizas|acuerdas|apagas|aparentas|aprendes|aprendiste|atiendes|ayudas|basas|buscas',
      'cansas|casarias|cierras|cobras|comes|cometes|compartes|conectas|conoces|contestas|corriges|das|decides',
      'dedicas|descansas|dices|diferencias|duermes|empezaste|encuentras|enojas|entiendas|entiendes|equivocas',
      'espias|estas|estudias|existes|explicas|funcionas|guardas|hablas|haces|inventas|lees|llamas|llegas',
      'llevas|mejoras|mientes|molestas|naciste|navegas|necesitas|ofreces|opinas|pareces|perteneces|piensas',
      'pones|puedes|quieres|recomiendas|recuerdas|representas|respetas|respondes|revisas|sabes|sacas|saliste',
      'saludas|sepas|sientes|sigues|sirves|suenas|tapas|tapaste|tienes|trabajas|usas|vas|vendes|ves|vienes|vives|vuelves',
      'podes|sabe|presentate|hazme|resuelve|resuelveme|escribeme|redactame|pasame|traduce|buscame|busca|dime quien|dime que',
      'ia|ias|inteligencia artificial|chat ?gpt|gpt|gemini|copilot|siri|alexa|llm|robot|bot|chatbot|buho|tecolote|lechuza|animalito',
      'las tarjetas|la tarjeta|tarjetas del chat|pestanas?|que edificios|cuales edificios|que lugares|que tramites|cuales tramites|lista de tramites|que reservas|que fechas|que contactos|que oficinas|paso a paso|instrucciones|el calendario|del calendario|boton hoy',
      'invitad[oa]s?|sin cuenta|sin registrarme|sin iniciar sesion|cuenta uca|una cuenta|bloquead[oa]s?',
      'esta app|esta aplicacion|la app|esto|este chat|el chat|gratis|gratuit[oa]|premium|suscripcion|english|speak',
      'tarea|programar|2 mas 2|clima|noticias|google|wikipedia',
    ].join('|') +
    ')( |$)',
)
// Quejas ("no sirves", "esto no funciona"): las atiende la charla casual, no son preguntas sobre Toko.
const COMPLAINT = /(no sirves|no funcionas|no funciona|inutil|no me sirves|no me ayudas)/

export type IdentityMatch = { id: string; score: number; variant: string }

// text: mensaje ya normalizado (sin tildes, en minúsculas)
//  exclude: ignora esa forma de preguntar (la evaluación la usa para probar frases "nuevas")
//  guest: modo invitado (solo entonces cuentan los temas guestOnly)
export function matchIdentity(text: string, exclude?: string, min = MIN_SCORE, guest = false): IdentityMatch | null {
  if (!text || text.split(' ').length > MAX_WORDS) return null
  if (!TO_TOKO.test(text) || COMPLAINT.test(text)) return null
  const words = tokens(text)
  if (words.size === 0) return null
  // Si el mensaje habla de un tema de la UCA ("constancia", "reglamento", "edificio"...),
  // solo vale una forma de preguntar que también lo mencione ("¿cuándo te crearon?").
  const topical = TOPIC_HINT.test(text)

  // Por tema: su forma de preguntar más parecida, y un poco de la segunda
  // (un tema con varias frases cercanas es más probable que uno con una sola).
  const byIntent = new Map<string, { first: number; second: number; variant: string }>()
  for (const item of index) {
    if (item.variant === exclude || (topical && !item.topical) || (item.intent.guestOnly && !guest)) continue
    const score = similarity(words, item.words)
    const top = byIntent.get(item.intent.id) ?? { first: 0, second: 0, variant: '' }
    if (score > top.first) byIntent.set(item.intent.id, { first: score, second: top.first, variant: item.variant })
    else if (score > top.second) byIntent.set(item.intent.id, { ...top, second: score })
  }
  let best: IdentityMatch | null = null
  for (const [id, top] of byIntent) {
    const score = top.first === 1 ? 1 : SECOND_SHARE * top.second + (1 - SECOND_SHARE) * top.first
    if (!best || score > best.score) best = { id, score, variant: top.variant }
  }
  return best && best.score >= min ? best : null
}

export function identityReply(text: string, guest = false): Reply | null {
  const match = matchIdentity(text, undefined, MIN_SCORE, guest)
  if (!match) return null
  const intent = identityIntents.find((item) => item.id === match.id)!
  const answers = guest && intent.guestAnswers ? intent.guestAnswers : intent.answers
  return { text: pick(answers).split('{skills}').join(skillsFor(guest)) }
}
