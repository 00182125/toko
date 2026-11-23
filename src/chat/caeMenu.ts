import { directory } from '@/data/directory'
import type { Pending, Routed } from '@/types/chat'
import { directoryReply } from './directory'
import { locationReply } from './locations'

// "CAE" a secas puede ser el edificio o su contacto: Toko pregunta cuál de los dos quiere.
// Si la frase ya lo dice ("¿cómo llego al CAE?", "quiero contactar al CAE"), no pregunta.

const ONLY_CAE =
  /^(y |oye |hola |toko )?(el |al |del )?(cae|centro de asuntos estudiantiles|asuntos estudiantiles)( de la uca| uca)?( por favor| porfa)?$/

export const isCaeOnly = (text: string) => ONLY_CAE.test(text)

export const CAE_MENU: Pending = { domain: 'rules', text: 'menu|cae' }

export const isCaeMenu = (pending: Pending) => pending?.domain === 'rules' && pending.text === CAE_MENU.text

export function caeMenu(): Routed {
  return {
    text: '¿Qué necesitas del CAE?\n1. Ver dónde queda en el mapa\n2. Ver su contacto en el directorio\nResponde con el número o escríbeme lo que necesitas.',
    domain: null,
    pending: CAE_MENU,
  }
}

const PLACE = /(^| )(la |el |opcion |numero )?(1|uno|primera|primero)$|mapa|donde|ubica|queda|llegar|llego|edificio/
const CONTACT = /(^| )(la |el |opcion |numero )?(2|dos|segunda|segundo)$|directorio|contact|telefono|correo|numero|llamar/

// Respuesta al menú. null si escribió otra cosa (se toma como una pregunta nueva).
export function answerCaeMenu(text: string): Routed | null {
  if (CONTACT.test(text)) {
    const entry = directory.find((e) => e.id === 'cae')!
    return { ...directoryReply(entry), domain: 'support', pending: null }
  }
  if (PLACE.test(text)) {
    return { ...locationReply('cae')!.reply, domain: 'location', pending: null }
  }
  return null
}
