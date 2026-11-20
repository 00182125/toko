import type { ChatTopic, LockedFeature, Reply } from '@/types/chat'

// Modo invitado: qué puede y qué no puede pedirle a Toko alguien sin cuenta UCA.
//  Puede: ubicar edificios, contactos de la UCA, reglamentos (información pública) y conversar.
//  No puede: calendario académico, reservas de espacios ni trámites, porque son de estudiantes UCA.

// Temas del chat que el invitado no puede usar.
export const GUEST_LOCKED: Partial<Record<ChatTopic, LockedFeature>> = {
  dates: 'dates',
  reservation: 'reservation',
  procedures: 'procedures',
}

const lockedText: Record<LockedFeature, string> = {
  dates:
    'El calendario académico es solo para estudiantes UCA. Si quieres estudiar en la UCA, la información de nuevo ingreso se publica en el sitio oficial uca.edu.sv, o puedes llamar a la central al 2210-6600.',
  reservation: 'Reservar salas y espacios es solo para estudiantes y personal UCA con cuenta.',
  procedures:
    'Los trámites (constancias, notas, certificados…) son solo para estudiantes UCA, porque se hacen con tu cuenta institucional.',
}

export function guestLockedReply(feature: LockedFeature): Reply {
  return { text: lockedText[feature], card: { kind: 'guest-locked', feature } }
}

// Primer mensaje de Toko para invitados.
export const GUEST_WELCOME =
  '¡Hola! Estás en modo invitado. Puedo ayudarte a ubicar edificios del campus, darte contactos de la UCA y contarte lo que dicen los reglamentos. Para trámites, reservas y el calendario académico necesitas una cuenta UCA.'

// Qué sabe hacer Toko, según quién pregunta (se usa en la conversación casual).
export const skillsFor = (guest: boolean) =>
  guest
    ? 'ubicar edificios del campus, darte contactos de la UCA y contarte lo que dicen los reglamentos'
    : 'trámites, reglamento, fechas importantes, reservar espacios, ubicar edificios y darte contactos de la UCA'
