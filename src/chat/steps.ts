import { faqEntries, faqTopics } from '@/data/faq'
import { normalizeText } from './normalize'
import { procedureCards, type ProcedureCard } from '@/data/procedures'
import { reservationCards, type ReservationCard } from '@/data/reservations'
import { stepGuides, type StepGuide } from '@/data/steps'
import type { ChatCard, ChatTopic, Routed } from '@/types/chat'

// "Dime los pasos", "explícame cómo lo hago", "¿cómo hago ese trámite?":
// Toko responde con una guía paso a paso (src/data/steps.ts).
//  · Si el mensaje trae su propio tema ("dime los pasos para pedir un diferido"),
//    se busca ese tema y se dan sus pasos.
//  · Si solo pide los pasos ("explícame cómo lo hago"), se usan los de lo último que respondió Toko.

// Frases que piden un paso a paso. Van completas para no confundir preguntas normales:
// "¿cómo le hago si necesito retirarme?" es una pregunta, no un pedido de pasos.
const ASKS_STEPS = new RegExp(
  [
    'paso a paso',
    '(los|que|cuales son los|cuales serian los|dame los|dime los|explicame los) pasos',
    'pasos (a seguir|para|de)',
    'explica(me|nos)? (como|eso|esto|lo que|el tramite|el proceso|mejor|bien|detalladamente)',
    'explicamelo|explicanoslo|explicalo',
    'me (explicas|explica|puedes explicar|podrias explicar) (como|eso|esto|el tramite|el proceso|los pasos)',
    'como (lo|la) (hago|hacemos|realizo|tramito|saco|pido|solicito|gestiono)( |$)',
    // "¿cómo le hago?" solo si es la pregunta sola (no "¿cómo le hago si necesito retirarme?")
    '^(y |bueno |ok |pero )?como le (hago|hacemos)( entonces| ahora)?$',
    'como (hago|hacemos|se hace|hacer|seria|es) (eso|esto|ese tramite|esa gestion|el tramite|ese proceso|el proceso|lo que dijiste|lo que me dijiste)',
    'como hacerlo|como se hace eso|como lo podria hacer|como puedo hacerlo',
    'que (tengo|debo|necesito) (que )?hacer (para hacerlo|para eso|entonces|primero)',
    'guiame|me guias|ayudame a hacerlo|el procedimiento|cual es el procedimiento',
  ].join('|'),
)

// Palabras que no dicen de qué tema se trata ("explícame eso que dijiste, porfa").
const FILLER = new Set(
  (
    'y o pero bueno ok okay vale toko porfa por favor oye entonces ahora bien mejor ya pues ' +
    'eso esto ese esa esos lo la le el los las un una de del para que me te se tu cual cuales ' +
    'como hago hace haria hacer hacerlo hacemos hacerla seria es son realizo tramito saco pido solicito gestiono podria puedo ' +
    'paso pasos a seguir dime dame explicas explicar podrias puedes explicame explicamelo explicalo explica explicanos explicanoslo detalladamente detalle ' +
    'tramite proceso procedimiento gestion guiame guias ayudame tengo debo necesito primero ' +
    'dijiste dijo mencionaste anterior acabas decir mismo'
  ).split(' '),
)

export type StepsRequest = 'own' | 'follow-up' | null

// ¿Pide los pasos? 'own' si trae su propio tema, 'follow-up' si se refiere a lo anterior.
export function stepsRequest(text: string): StepsRequest {
  if (!ASKS_STEPS.test(text)) return null
  const rest = text.split(' ').filter((word) => word && !FILLER.has(word))
  return rest.length >= 1 ? 'own' : 'follow-up'
}

// Una pregunta oficial escrita tal cual (de los PDF) siempre recibe su respuesta oficial,
// aunque diga "¿cuál es el procedimiento?"; los pasos se pueden pedir después.
const officialQuestions = new Set(faqEntries.map((entry) => normalizeText(entry.question)))
export const isOfficialQuestion = (text: string) => officialQuestions.has(text)

// ── Qué respondió Toko ─────────────────────────────────────────────────────
// Cada respuesta del reglamento se reconoce por su texto ("entry:P2", "topic:withdrawals").
const answerKeys = new Map<string, string>([
  ...faqEntries.map((entry) => [entry.answer, `entry:${entry.id}`] as [string, string]),
  ...faqTopics.map((topic) => [topic.answer, `topic:${topic.id}`] as [string, string]),
])

export function refOf(routed: Routed): string | null {
  const card = routed.card
  if (card?.kind === 'procedure') return `procedure:${card.card.id}`
  if (card?.kind === 'reservation') return `reservation:${card.card.id}`
  return answerKeys.get(routed.text) ?? null
}

// ── Respuestas paso a paso ─────────────────────────────────────────────────
const numbered = (steps: string[]) => steps.map((step, i) => `${i + 1}. ${step}`).join('\n')

const guideByRef = new Map<string, StepGuide>()
for (const guide of stepGuides) for (const ref of guide.refs) if (!guideByRef.has(ref)) guideByRef.set(ref, guide)

const procedure = (id: string) => procedureCards.find((card) => card.id === id)
const reservation = (id: string) => reservationCards.find((card) => card.id === id)

// Pasos de un trámite que no tiene guía propia (constancias, certificados, servicios).
function procedureSteps(card: ProcedureCard): string[] {
  switch (card.id) {
    case 'parking-payment':
      return [
        'Toca «Comprar tickets» en la tarjeta para abrir el portal de estudiantes.',
        'Inicia sesión con tu cuenta UCA.',
        'Compra tus tickets de parqueo.',
        'Ahí mismo puedes consultar tu saldo disponible.',
      ]
    case 'mercaduca':
      return [
        'Toca «Registrar emprendimiento» en la tarjeta para abrir el formulario.',
        'Llena los datos de tu emprendimiento.',
        'Envía el formulario para ser parte del mercadito estudiantil.',
      ]
    case 'internships-jobs':
      return [
        'Toca «Ver Oportunidades» en la tarjeta para abrir el centro de empleo.',
        'Explora las pasantías, prácticas profesionales y vacantes.',
        'Postula a la que te interese.',
      ]
  }
  const delivery = card.delivery.charAt(0).toLowerCase() + card.delivery.slice(1)
  return [
    ...(card.id === 'student-id-validation'
      ? ['Revisa que tu carné esté en buenas condiciones; si no, tendrás que tramitar la reposición.']
      : []),
    'Toca el botón de la tarjeta para abrir el trámite en Pagos en línea.',
    'Inicia sesión con tu cuenta UCA.',
    'Revisa los requisitos del trámite.',
    card.price ? `Paga el arancel de ${card.price}.` : 'Paga el arancel correspondiente.',
    `Espera tu documento: ${delivery}.`,
  ]
}

// Pasos de una reserva (salas, equipo, laboratorios, estudios).
function reservationSteps(card: ReservationCard): string[] {
  if (card.href.startsWith('mailto:')) {
    return [
      `Toca «${card.action}» en la tarjeta para escribir un correo.`,
      'Indica qué libro quieres reservar y tus datos.',
      'Espera la confirmación del CRAI.',
    ]
  }
  return [
    `Toca «${card.action}» en la tarjeta.`,
    'Elige el espacio o el equipo, y la fecha y el horario disponibles.',
    'Completa tus datos y confirma la reserva.',
  ]
}

type StepsReply = Pick<Routed, 'text' | 'card' | 'domain'>

function guideReply(guide: StepGuide): StepsReply {
  const card = guide.card ? procedure(guide.card) : undefined
  return {
    text: `Claro, así puedes ${guide.title}:\n${numbered(guide.steps)}${guide.note ? `\n\n${guide.note}` : ''}`,
    card: card ? { kind: 'procedure', card } : undefined,
    domain: card ? 'procedures' : 'rules',
  }
}

// Pasos de una respuesta concreta, o null si esa respuesta no es un trámite.
export function stepsFor(ref: string | null): StepsReply | null {
  if (!ref) return null
  const guide = guideByRef.get(ref)
  if (guide) return guideReply(guide)

  const [kind, id] = ref.split(':')
  if (kind === 'procedure') {
    const card = procedure(id)
    if (!card) return null
    return {
      text: `Claro, así puedes solicitar «${card.title}»:\n${numbered(procedureSteps(card))}`,
      card: { kind: 'procedure', card },
      domain: 'procedures',
    }
  }
  if (kind === 'reservation') {
    const card = reservation(id)
    if (!card) return null
    const chatCard: ChatCard = { kind: 'reservation', card }
    return {
      text: `Claro, así puedes reservar «${card.title}»:\n${numbered(reservationSteps(card))}`,
      card: chatCard,
      domain: 'reservation' as ChatTopic,
    }
  }
  return null
}

// "Explícame cómo lo hago" sin decir qué: los pasos de lo último que respondió Toko.
export function stepsFollowUp(lastRef: string | null): StepsReply {
  const steps = stepsFor(lastRef)
  if (steps) return steps
  if (lastRef) {
    return {
      text: 'Lo que te conté no es un trámite con pasos, es información para que la tengas en cuenta. Si quieres, pregúntame por un trámite concreto, como retirar una materia, pedir un parcial diferido, solicitar una beca o sacar una constancia, y te digo paso a paso cómo hacerlo.',
      domain: null,
    }
  }
  return {
    text: '¿De qué trámite quieres los pasos? Por ejemplo: retirar una materia, pedir un parcial diferido, solicitar una beca, pagar la mensualidad o sacar una constancia.',
    domain: null,
  }
}
