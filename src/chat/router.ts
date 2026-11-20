import { procedureCards } from '@/data/procedures'
import type { ChatTopic, Pending, Reply, Routed } from '@/types/chat'
import {
  FAQ_CLOSE,
  FAQ_WEAK,
  type FaqMatch,
  canSuggestFaq,
  faqBelongsTo,
  keywordTopic,
  faqOverview,
  faqReply,
  isGoodFaq,
  isSureFaq,
  matchFaq,
} from './faq'
import { directoryListReply, directoryReply, findDirectoryEntry } from './directory'
import { GUEST_LOCKED, guestLockedReply } from './guest'
import { findReservationCard, reservationReply } from './reservations'
import { findProcedureCard, procedureReply } from './procedures'
import { NOT_FOUND_BUILDING, findBuilding, locationReply } from './locations'
import { SOON } from './messages'
import { identityReply } from './identity'
import { answerLibraryMenu, isLibraryOnly, libraryMenu } from './libraryMenu'
import { refOf, stepsFollowUp, stepsFor, stepsRequest } from './steps'
import { normalizeText } from './normalize'
import { TOPIC_HINT, smallTalk } from './smallTalk'
import { supportReply } from './support'

// Respuesta del reglamento. Si hay dos preguntas casi igual de parecidas,
// Toko pregunta cuál de las dos es (y lo recuerda en "pending").
function faqAnswer(match: FaqMatch): { reply: Reply; next: Pending } {
  const other = match.runnerUp
  if (other && match.closest < 0.97 && match.score - other.score < FAQ_CLOSE) {
    return {
      reply: {
        text: `Encontré dos respuestas que podrían servirte. ¿Cuál se parece más a tu pregunta?\n1. ${match.question}\n2. ${other.question}\nResponde 1, 2 o "las dos".`,
      },
      next: { domain: 'rules', text: `faq|${match.kind}:${match.id}|${other.kind}:${other.id}` },
    }
  }
  return { reply: match.reply, next: null }
}

// Cuando Toko no está seguro: en vez de "no sé", ofrece las preguntas más parecidas.
function faqSuggestion(match: FaqMatch): { reply: Reply; next: Pending } {
  // La segunda opción solo se muestra si es casi tan parecida como la primera.
  const second = match.runnerUp && match.runnerUp.score >= match.score * 0.85 ? match.runnerUp : null
  const options = second ? [match, second] : [match]
  const list = options.map((o, i) => `${i + 1}. ${o.question}`).join('\n')
  const ask = options.length > 1 ? 'Responde 1, 2 o "las dos".' : 'Responde "sí" o escríbeme tu pregunta de otra forma.'
  return {
    reply: { text: `No estoy seguro de haberte entendido. ¿Tu pregunta se parece a ${options.length > 1 ? 'alguna de estas' : 'esta'}?\n${list}\n${ask}` },
    next: { domain: 'rules', text: ['faq', ...options.map((o) => `${o.kind}:${o.id}`)].join('|') },
  }
}

// Motor del chat: lee lo que escribió la persona y decide qué responder.
// No dibuja nada; solo devuelve texto y qué tarjeta mostrar.
//  pending: pregunta que Toko dejó abierta ("¿cuál de los dos?")
//  lastDomain: tema del que se venía hablando
//  guest: true en modo invitado → calendario, reservas y trámites quedan bloqueados
//  lastRef: qué fue lo último que respondió Toko ("entry:P2", "procedure:grades"...),
//    para "explícame cómo lo hago" (ver chat/steps.ts)
export function routeMessage(
  request: string,
  pending: Pending,
  lastDomain: ChatTopic | null,
  { guest = false, lastRef = null }: { guest?: boolean; lastRef?: string | null } = {},
): Routed {
  const routed = withSteps(request, pending, lastDomain, guest, lastRef)
  const locked = guest && routed.domain ? GUEST_LOCKED[routed.domain] : undefined
  if (locked) return { ...guestLockedReply(locked), domain: routed.domain, pending: null }
  return routed
}

// Paso a paso: "dime los pasos para pedir un diferido" o "explícame cómo lo hago".
// Cada respuesta lleva su "ref" para que la siguiente pueda pedir sus pasos.
function withSteps(
  request: string,
  pending: Pending,
  lastDomain: ChatTopic | null,
  guest: boolean,
  lastRef: string | null,
): Routed {
  const asks = stepsRequest(normalizeText(request))
  // Solo pide los pasos de lo anterior: no hay tema nuevo que buscar.
  if (asks === 'follow-up') {
    const steps = stepsFollowUp(lastRef)
    return { ...steps, pending: null, ref: stepsFor(lastRef) ? lastRef : null }
  }
  const routed = route(request, pending, lastDomain, guest)
  const ref = refOf(routed)
  if (asks === 'own') {
    // Trae su propio tema: si ese tema es un trámite, se dan sus pasos;
    // si no (es solo información), se responde normal.
    // (si la respuesta oficial ya trae los pasos, como la del trámite de diferidos, se usa esa)
    const steps = stepsFor(ref)
    const alreadySteps = /\bpasos?\b|(^|\n)1\. /i.test(routed.text)
    if (steps && !alreadySteps) return { ...steps, pending: null, ref }
  }
  return { ...routed, ref }
}

function route(request: string, pending: Pending, lastDomain: ChatTopic | null, guest: boolean): Routed {
  const text = normalizeText(request)
  const has = (...words: string[]) => words.some((word) => text.includes(word))
  const done = (domain: ChatTopic, reply: Reply, next: Pending = null): Routed => ({
    ...reply,
    domain,
    pending: next,
  })

  // 1. Respuesta a una pregunta que Toko acaba de hacer
  if (pending) {
    const combined = `${pending.text} ${text}`
    if (pending.domain === 'location') {
      const found = locationReply(text, pending.text)
      if (found) {
        return done('location', found.reply, found.waiting ? { domain: 'location', text: combined } : null)
      }
    }
    if (pending.domain === 'procedures') {
      const match = findProcedureCard(combined)
      if (match.type === 'card') return done('procedures', procedureReply(match)!)
      if (combined.includes('nota') && has('ambos', 'ambas', 'los dos', 'las dos', 'todos')) {
        const both = ['certified-grades', 'grades'].map((id) => procedureCards.find((c) => c.id === id)!)
        return done('procedures', {
          text: '¡Claro! Acá tienes los dos enlaces para solicitar tu documento.',
          card: { kind: 'procedure-group', cards: both },
        })
      }
    }
    if (pending.domain === 'reservation') {
      const match = findReservationCard(combined)
      if (match.type === 'card') return done('reservation', reservationReply(match)!)
    }
    // Menú de la biblioteca ("biblioteca" a secas → ¿qué quieres saber?)
    if (pending.domain === 'rules' && pending.text === 'menu|library') {
      const chosen = answerLibraryMenu(text, guest)
      if (chosen) return chosen
      // Escribió otra cosa: se toma como una pregunta nueva.
      pending = null
    }
    if (pending && pending.domain === 'rules' && pending.text.startsWith('faq|')) {
      const [first, second] = pending.text.split('|').slice(1)
      const pick = (key: string) => faqReply(key)!
      if (second && /(^| )(ambas|ambos|las dos|los dos|las 2|los 2)( |$)/.test(text)) {
        return done('rules', { text: `${pick(first).text}\n\n${pick(second).text}` })
      }
      if (/^(la |el |opcion |numero )?(1|uno|una|primer|primera|primero|si|sip|esa|esa misma|exacto|correcto)$/.test(text)) {
        return done('rules', pick(first))
      }
      if (second && /^(la |el |opcion |numero )?(2|dos|segunda|segundo)$/.test(text)) return done('rules', pick(second))
      // "No" a las opciones: Toko no entendió la pregunta (cuenta como intento fallido).
      if (/^(no|ninguna|ninguno|nop|ni una)$/.test(text)) {
        return { text: SOON, domain: null, pending: null, miss: true }
      }
      // Si escribió otra cosa, se toma como una pregunta nueva.
      pending = null
    }
  }

  // "Biblioteca" o "CRAI" a secas: Toko pregunta qué quiere saber de ahí y da opciones.
  if (isLibraryOnly(text)) return libraryMenu(guest)

  // Tema del reglamento por palabra clave ("acoso", "beca", "plagio"...)
  const keyword = keywordTopic(request)

  // Preguntas sobre Toko mismo: "¿eres una IA?", "¿cómo funcionas?", "¿de qué me sirves?"
  // (no si trae un tema del reglamento: "¿qué sabes del acoso?")
  const about = keyword ? null : identityReply(text, guest)
  if (about) return { ...about, domain: null, pending }

  // Conversación amigable: saludos, gracias, "¿cómo estás?"...
  // (no si el mensaje trae un tema: "¿qué sabes del acoso?" es una pregunta, no charla)
  const talk = smallTalk(text, guest)
  if (talk && ((!TOPIC_HINT.test(text) && !keyword) || /gracias por/.test(text))) {
    return { ...talk, domain: null, pending }
  }

  // Reglamentos: si la pregunta se parece mucho a una del banco, se responde ya,
  // antes de que palabras como "cuando" o "donde" la manden a fechas o ubicaciones.
  const faq = matchFaq(request)
  const answerFaq = (match: FaqMatch) => {
    const { reply, next } = faqAnswer(match)
    return done('rules', reply, next)
  }
  if (faq && isSureFaq(faq)) return answerFaq(faq)

  const sensitive = ['harassment', 'substances', 'cheating', 'conduct', 'due-process', 'complaints', 'deferred']
  const asksPlace = has('magna', 'edificio', 'donde queda', 'donde esta', 'donde encuentro', 'ubicacion', 'como llego')

  // 2. Contacto y Directorio UCA
  //  · Si nombra una oficina o persona ("teléfono de Admisiones", "rectoría") → su tarjeta.
  //    No si pregunta dónde queda (eso es ubicación) ni si el mensaje es de un tema delicado.
  //  · "directorio" a secas → lista de oficinas; otro pedido de contacto → central telefónica.
  const office = findDirectoryEntry(request)
  if (office && !asksPlace && !(keyword && sensitive.includes(keyword))) {
    return done('support', directoryReply(office))
  }
  if (
    has('atencion', 'telefono', 'llamar', 'llamada', 'contactar', 'contacto', 'comunicarme') ||
    has('hablar con', 'directorio')
  ) {
    return done('support', /^(el )?directorio( uca)?$/.test(text) ? directoryListReply() : supportReply())
  }

  // ¿Se responde el tema de la palabra clave? (se usa en los pasos 3 y 4)
  //  · Los temas delicados (acoso, drogas, plagio...) siempre se responden.
  //  · Los demás ceden si hay una tarjeta de trámite o reserva para el mensaje
  //    ("constancia pa' la beca" → trámite; "renovar un libro" → enlace para renovar).
  //  · Exámenes, retiros, graduación y salud ceden al calendario si preguntan "cuándo".
  //  · La biblioteca cede si preguntan el horario (el reglamento no lo trae).
  //  (los diferidos también: "diferido" es tan específico que nunca es un trámite ni una reserva)
  const hasServiceCard =
    findReservationCard(text).type !== 'unavailable' || findProcedureCard(text).type !== 'unavailable'
  const asksWhen = has('fecha', 'cuando', 'calendario', 'periodo')
  const asksHours = has('horario', 'a que hora', 'abre', 'cierra')
  const yields =
    (['exams', 'withdrawals', 'graduation', 'health'].includes(keyword ?? '') && asksWhen) ||
    (keyword === 'library' && asksHours)
  const useKeyword = keyword !== null && (sensitive.includes(keyword) || (!hasServiceCard && !yields))

  // 3. Dónde queda
  const otherTopic = has('reserv', 'sala', 'renov', 'prestamo', 'prestar', 'tablet', 'cubiculo', 'tramite', 'constancia', 'certificado', 'fecha', 'cuando', 'calendario', 'reglamento', 'periodo', 'multimedia', 'radio', 'estudio', 'ciclorama', 'taller')
  // Si el mensaje no pide un lugar y trae un tema del reglamento ("servicio social"),
  // se responde el tema aunque coincida con el nombre de un edificio.
  if (asksPlace || (!otherTopic && !hasServiceCard && !useKeyword && (findBuilding(text) || has('aula', 'modulo', 'auditorio')))) {
    const found = locationReply(text)
    if (found) return done('location', found.reply, found.waiting ? { domain: 'location', text } : null)
    return done('location', { text: NOT_FOUND_BUILDING }, { domain: 'location', text: '' })
  }

  // 4. Tema del reglamento por palabra clave: se responde sea como sea la redacción.
  // Si además la pregunta coincide claramente con una pregunta puntual de ese tema,
  // se da esa respuesta concreta; si no, el resumen del tema.
  if (keyword && useKeyword) {
    // (con la palabra clave ya se sabe el tema, así que basta un parecido razonable aunque
    //  el mensaje traiga relleno: "oye, este mes me cobraron 20 dólares más" → "¿por qué me
    //  cobraron más?", no el resumen de pagos)
    const specific = faq && faq.kind === 'entry' && faqBelongsTo(faq, keyword) && faq.score >= FAQ_WEAK
    if (specific) return answerFaq(faq)
    return done('rules', faqReply(`topic:${keyword}`)!)
  }

  // 5. Reglamento y fechas (solo cuando se piden de forma clara)
  // "reglamento" a secas → lista de reglamentos; con más detalle → la pregunta más parecida.
  if (has('reglamento', 'reglas', 'normas')) {
    return faq && isGoodFaq(faq) && faq.id !== 'overview' ? answerFaq(faq) : done('rules', faqOverview())
  }
  const wantsDate =
    has('fecha', 'cuando', 'calendario', 'periodo', 'vacacion', 'feriado', 'asueto', 'inicio de clases') ||
    (lastDomain === 'dates' && has('preinscrip', 'inscrip', 'adicion', 'retiro', 'retirar', 'agregar', 'anadir'))
  if (wantsDate) {
    // Como en el Figma: Toko dice "¡Claro!" y se abre el calendario.
    return {
      ...done('dates', { text: '¡Claro!', card: { kind: 'calendar-link' } }),
      autoOpen: true,
    }
  }

  // 5. Reservas
  const reservation = findReservationCard(text)
  if (reservation.type !== 'unavailable') {
    return done(
      'reservation',
      reservationReply(reservation)!,
      reservation.type === 'clarify' ? { domain: 'reservation', text } : null,
    )
  }

  // 6. Trámites
  const procedure = findProcedureCard(text)
  if (procedure.type !== 'unavailable') {
    return done(
      'procedures',
      procedureReply(procedure)!,
      procedure.type === 'clarify' ? { domain: 'procedures', text } : null,
    )
  }

  // 7. Reglamentos con menos seguridad: solo si ningún otro tema la reconoció.
  if (faq && isGoodFaq(faq)) return answerFaq(faq)

  // Si Toko estaba esperando una respuesta y le contestaron algo corto ("la tercera"),
  // la sigue esperando. Una pregunta completa ("¿cómo pago la mensualidad?") ya es otra
  // conversación: sigue al paso 8 como cualquier pregunta nueva.
  if (pending && text.split(' ').length <= 3) {
    return {
      text: 'No logré entenderte. Puedes responder con una de las opciones que te mencioné o preguntarme otra cosa.',
      domain: null,
      pending,
    }
  }

  // 8. Última opción: sugerir las preguntas del reglamento más parecidas.
  const suggestion = matchFaq(request, { shortTopicsOnly: false })
  if (suggestion && canSuggestFaq(suggestion)) {
    const { reply, next } = faqSuggestion(suggestion)
    return done('rules', reply, next)
  }

  // No se entendió: chat/misses.ts decide si pedir que lo repita o sugerir la pregunta.
  return { text: SOON, domain: null, pending: null, miss: true }
}
