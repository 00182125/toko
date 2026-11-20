import type { Pending, Routed } from '@/types/chat'
import { faqReply } from './faq'
import { locationReply } from './locations'
import { findReservationCard, reservationReply } from './reservations'

// "Biblioteca" o "CRAI" a secas: en vez de adivinar, Toko pregunta qué quiere saber
// y ofrece opciones. La respuesta ("1", "reservar", "dónde queda"...) se atiende en answerLibraryMenu.

// El mensaje es solo el nombre de la biblioteca ("biblioteca", "el CRAI", "cry", "la biblio uca"...).
const ONLY_LIBRARY =
  /^(y |oye |hola )?(la |el )?(biblioteca|biblio|crai|cry|cray|crei|biblioteca crai|biblioteca florentino idoate)( de la uca| uca| del campus)?( por favor| porfa)?$/

export const isLibraryOnly = (text: string) => ONLY_LIBRARY.test(text)

export const LIBRARY_MENU: Pending = { domain: 'rules', text: 'menu|library' }

type Option = { id: 'place' | 'reserve' | 'renew' | 'rules'; label: string; words: RegExp }

const OPTIONS: Option[] = [
  { id: 'place', label: 'Dónde queda', words: /(donde|ubica|queda|mapa|llegar|llego|encuentro)/ },
  {
    id: 'reserve',
    label: 'Reservar una sala, equipo (tablets o TV) o un libro',
    words: /(reserv|apartar|sala|cubiculo|tablet|tableta|ipad|tv|tele|pantalla|equipo|mobiliario|mueble|libro|ejemplar)/,
  },
  { id: 'renew', label: 'Renovar un préstamo', words: /(renov|extender|alargar)/ },
  {
    id: 'rules',
    label: 'Las normas: préstamos, multas, carné y más',
    words: /(norma|regla|reglamento|multa|prestamo|carne|carnet|horario|comida|ruido|copias)/,
  },
]

// En modo invitado no hay reservas ni renovaciones (necesitan cuenta UCA).
const optionsFor = (guest: boolean) => OPTIONS.filter((o) => !guest || o.id === 'place' || o.id === 'rules')

export function libraryMenu(guest: boolean): Routed {
  const list = optionsFor(guest)
    .map((option, i) => `${i + 1}. ${option.label}`)
    .join('\n')
  return {
    text: `¿Qué quieres saber de la Biblioteca (CRAI)?\n${list}\nResponde con el número o escríbeme lo que necesitas.`,
    domain: null,
    pending: LIBRARY_MENU,
  }
}

const NUMBERS: Record<string, number> = { '1': 1, uno: 1, primera: 1, '2': 2, dos: 2, segunda: 2, '3': 3, tres: 3, tercera: 3, '4': 4, cuatro: 4, cuarta: 4 }

// Respuesta al menú. null si escribió otra cosa (se toma como una pregunta nueva).
export function answerLibraryMenu(text: string, guest: boolean): Routed | null {
  const options = optionsFor(guest)
  const number = text.match(/^(la |el |opcion |numero )?(1|2|3|4|uno|dos|tres|cuatro|primera|segunda|tercera|cuarta)$/)
  // Por palabras se revisa primero lo más específico: "renovar un libro" es renovar,
  // "multa por un libro" son las normas, y "reservar un libro" es reservar.
  const byWords = ['renew', 'rules', 'place', 'reserve']
    .map((id) => options.find((o) => o.id === id))
    .find((o) => o?.words.test(text))
  const chosen = number ? options[NUMBERS[number[2]] - 1] : byWords
  if (!chosen) return null

  if (chosen.id === 'place') {
    const found = locationReply('biblioteca')!
    return { ...found.reply, domain: 'location', pending: null }
  }
  if (chosen.id === 'rules') {
    return { ...faqReply('topic:library')!, domain: 'rules', pending: null }
  }
  if (chosen.id === 'renew') {
    return { ...reservationReply(findReservationCard('renovar prestamo de libro'))!, domain: 'reservation', pending: null }
  }
  // Reservar: si ya dijo qué ("una tele", "una sala"), va directo; si no, pregunta qué.
  const match = findReservationCard(text)
  if (match.type !== 'unavailable') {
    return {
      ...reservationReply(match)!,
      domain: 'reservation',
      pending: match.type === 'clarify' ? { domain: 'reservation', text } : null,
    }
  }
  return {
    text: 'Claro, ¿qué necesitas reservar en el CRAI? Una sala de reuniones, equipo (tablets, TV o mobiliario) o un libro.',
    domain: 'reservation',
    pending: { domain: 'reservation', text: 'reservar en el crai' },
  }
}
