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
const BOOK = word('libros?|ejemplar(es)?|material bibliografico|prestamos?')

export function findReservationCard(request: string): ReservationMatch {
  const text = normalizeText(request)
  const card = (id: string) => reservationCards.find((item) => item.id === id)!

  if (text.includes('primer nivel') || text.includes('nivel 1')) {
    return { type: 'card', card: card('crai-first-floor') }
  }
  if (text.includes('segundo nivel') || text.includes('nivel 2')) {
    return { type: 'card', card: card('crai-second-floor') }
  }
  if (text.includes('tercer nivel') || text.includes('nivel 3')) {
    return { type: 'card', card: card('crai-third-floor') }
  }
  if (
    text.includes('sala de reunion') ||
    text.includes('sala en la biblioteca') ||
    text.includes('sala de la biblioteca') ||
    text.includes('sala del crai') ||
    text.includes('sala en el crai') ||
    text.includes('sala de estudio') ||
    text.includes('sala grupal') ||
    text.includes('sala para estudiar') ||
    text.includes('cubiculo')
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
