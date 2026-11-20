import { reservationCards, reservationLevels, type ReservationCard } from '@/data/reservations'
import type { Reply } from '@/types/chat'
import { normalizeText } from './normalize'

export type ReservationMatch =
  | { type: 'card'; card: ReservationCard }
  | { type: 'clarify'; text: string }
  | { type: 'unavailable' }

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
    text.includes('sala del crai') ||
    text.includes('cubiculo')
  ) {
    return {
      type: 'clarify',
      text: 'Claro, ¿en qué nivel lo necesitas? Primer nivel, segundo nivel o tercer nivel.',
    }
  }
  if (
    text.includes('tablet') ||
    text.includes('smart tv') ||
    text.includes('mobiliario') ||
    text.includes('equipo')
  ) {
    return { type: 'card', card: card('crai-equipment') }
  }
  if (text.includes('renov') && (text.includes('libro') || text.includes('prestamo'))) {
    return { type: 'card', card: card('crai-renewal') }
  }
  if (
    (text.includes('reserv') || text.includes('pedir')) &&
    (text.includes('libro') || text.includes('material bibliografico'))
  ) {
    return { type: 'card', card: card('crai-book') }
  }
  if (text.includes('libro') || text.includes('prestamo')) {
    return {
      type: 'clarify',
      text: '¿Quieres reservar un libro prestado o renovar un préstamo?',
    }
  }
  if (text.includes('radio')) {
    return { type: 'card', card: card('radio-studios') }
  }
  if (text.includes('fotografia') || text.includes('fotografico')) {
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
  if (text.includes('laboratorio') || text.includes('labs') || text.includes('comunicaciones')) {
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
    (text.includes('crai') || text.includes('biblioteca'))
  ) {
    return {
      type: 'clarify',
      text: 'Claro, ¿qué necesitas reservar en el CRAI? Una sala de reuniones, equipo (tablets, Smart TV o mobiliario) o un libro.',
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
