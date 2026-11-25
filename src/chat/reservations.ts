import { reservationCards, reservationLevels, type ReservationCard } from '@/data/reservations'
import type { Reply } from '@/types/chat'
import { normalizeText } from './normalize'

export type ReservationMatch =
  | { type: 'card'; card: ReservationCard }
  | { type: 'clarify'; text: string }
  | { type: 'unavailable' }

const word = (alternatives: string) => new RegExp(`(^| )(${alternatives})( |$)`)
const EQUIPMENT = word(
  'smart ?tv|tv|tele|teles|televisor(es)?|television(es)?|pantallas?|tablets?|tabletas?|ipads?|' +
    'mobiliario|muebles?|equipos?|equipo multimedia',
)
const SPORTS = /(futbol|deport|basquet|volei|seleccion|torneo|jugar)/
// Los tres niveles del CRAI y las formas de nombrarlos ("segundo", "2", "la segunda", "2do").
const LEVEL_WORDS: [string, string][] = [
  ['crai-first-floor', 'primer|primero|primera|1|1ro|1er|uno|planta baja'],
  ['crai-second-floor', 'segundo|segunda|2|2do|dos'],
  ['crai-third-floor', 'tercer|tercero|tercera|3|3ro|3er|tres'],
]
const ROOM =
  /(sala de reunion|sala en la biblioteca|sala de la biblioteca|sala del crai|sala en el crai|sala de estudio|sala grupal|sala para estudiar|cubiculo)/
const BOOK = word('libros?|ejemplar(es)?|material bibliografico|prestamos?')

export function findReservationCard(request: string): ReservationMatch {
  const text = normalizeText(request)
  const card = (id: string) => reservationCards.find((item) => item.id === id)!

  // Nivel dicho completo: "segundo nivel", "nivel 2", "segundo piso", "piso dos"...
  const level = (() => {
    for (const [floor, words] of LEVEL_WORDS) {
      if (new RegExp(`(^| )((${words}) (nivel|piso|planta)|(nivel|piso|planta) (${words}))( |$)`).test(text)) return floor
    }
    return null
  })()
  if (level) return { type: 'card', card: card(level) }
  // Pide una sala del CRAI: si además trae solo el nivel ("segundo", "2", "la tercera"), ese es.
  // (Toko pregunta "¿en qué nivel?" y la respuesta llega junto a lo que pidió antes)
  const wantsRoom = ROOM.test(text) || (/(^| )salas?( |$)/.test(text) && /(crai|cry|biblio)/.test(text))
  if (wantsRoom) {
    const clean = text.replace(/(^| )(\d+|dos|tres|cuatro|cinco|seis) (personas?|horas?|estudiantes?|companeros?|amigos?)( |$)/g, ' ')
    for (const [floor, words] of LEVEL_WORDS) {
      if (new RegExp(`(^| )(${words})( |$)`).test(clean)) return { type: 'card', card: card(floor) }
    }
  }
  if (
    wantsRoom
  ) {
    return {
      type: 'clarify',
      text: 'Claro, ¿en qué nivel lo necesitas? Primer nivel, segundo nivel o tercer nivel.',
    }
  }
  // Mobiliario y equipo del CRAI: tablets, Smart TV y muebles, con sus sinónimos
  // ("tele", "televisor", "pantalla", "tableta", "iPad", "mesas", "sillas"...).
  // "equipo" no cuenta si habla de deportes ("equipo de fútbol").
  if (EQUIPMENT.test(text) && !SPORTS.test(text)) {
    return { type: 'card', card: card('crai-equipment') }
  }
  if (text.includes('renov') && BOOK.test(text)) {
    return { type: 'card', card: card('crai-renewal') }
  }
  if ((text.includes('reserv') || text.includes('pedir') || text.includes('apartar')) && BOOK.test(text)) {
    return { type: 'card', card: card('crai-book') }
  }
  if (BOOK.test(text)) {
    return {
      type: 'clarify',
      text: '¿Quieres reservar un libro prestado o renovar un préstamo?',
    }
  }
  if (text.includes('radio')) {
    return { type: 'card', card: card('radio-studios') }
  }
  // El estudio de fotografía, no "una sesión fotográfica en el campus" (eso es un permiso
  // en Administración Central: ver data/faq/15-permisos-audiovisuales.ts).
  if ((text.includes('fotografia') || text.includes('fotografico')) && /(estudio|reserv|apartar|labs?( |$)|laboratorio)/.test(text)) {
    return { type: 'card', card: card('photo-studio') }
  }
  if (text.includes('ciclorama')) {
    return { type: 'card', card: card('cyclorama') }
  }
  if (
    text.includes('multimedia') ||
    text.includes('laboratorio 1') ||
    text.includes('laboratorio 2')
  ) {
    return { type: 'card', card: card('multimedia-labs') }
  }
  // "Laboratorios de Ingeniería/Psicología" son edificios del mapa, no laboratorios para reservar.
  if (
    (text.includes('laboratorio') || text.includes('labs') || text.includes('comunicaciones')) &&
    !/(ingenieria|psicologia)/.test(text)
  ) {
    return {
      type: 'clarify',
      text: '¿Necesitas laboratorios multimedia, estudios de radio, estudio de fotografía o ciclorama?',
    }
  }
  if (
    /^(necesito |quiero |busco )?(reservar |una reserva de )?(un |una )?(sala|espacio|reserva)s?$/.test(
      text,
    )
  ) {
    return {
      type: 'clarify',
      text: '¿Qué espacio o recurso necesitas reservar?',
    }
  }

  // Pedidos de reserva más generales: Toko pregunta qué necesita en vez de rendirse.
  if (
    /(reserv|apartar|agendar)/.test(text) &&
    /(crai|cry|biblio)/.test(text)
  ) {
    return {
      type: 'clarify',
      text: 'Claro, ¿qué necesitas reservar en el CRAI? Una sala de reuniones, equipo (tablets, TV o mobiliario) o un libro.',
    }
  }
  if (/(reserv|apartar|agendar)/.test(text) && /(sala|espacio|lugar|cancha|auditorio|aula)/.test(text)) {
    return {
      type: 'clarify',
      text: '¿Qué espacio o recurso necesitas reservar? Por ejemplo: sala de reuniones del CRAI, equipo, un libro, laboratorios multimedia, estudios de radio, estudio de fotografía o ciclorama.',
    }
  }
  if (/^(necesito |quiero |busco |puedes |podrias )?(hacer |darme |que me des )?(una |la )?reserva(r|cion)?( por favor| porfa)?$/.test(text)) {
    return {
      type: 'clarify',
      text: '¿Qué espacio o recurso necesitas reservar? Por ejemplo: sala de reuniones del CRAI, equipo, un libro, laboratorios multimedia, estudios de radio, estudio de fotografía o ciclorama.',
    }
  }

  return { type: 'unavailable' }
}

export function reservationReply(match: ReservationMatch): Reply | null {
  if (match.type === 'card') {
    const level = reservationLevels[match.card.id]
    return {
      text: level
        ? `Aquí está el enlace para reservar en el ${level} nivel:`
        : '¡Claro! Aquí tienes la opción que mejor coincide.',
      card: { kind: 'reservation', card: match.card },
    }
  }
  if (match.type === 'clarify') return { text: match.text }
  return null
}
