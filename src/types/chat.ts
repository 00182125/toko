import type { Building } from '@/data/buildings'
import type { ProcedureCard } from '@/data/procedures'
import type { ReservationCard } from '@/data/reservations'

export type ChatTopic = 'procedures' | 'dates' | 'reservation' | 'location' | 'support' | 'rules'

// Una fila de una tarjeta de información: ícono + texto.
export type InfoRow = {
  icon: string
  text: string
  emphasized?: boolean
  trailingIcon?: string
}

export type InfoTone = 'transcript' | 'reservation' | 'support' | 'dates' | 'rules'

// Datos para dibujar una tarjeta de información genérica.
export type InfoCardData = {
  title: string
  description: string
  rows?: InfoRow[]
  action: string
  actionIcon?: string
  href?: string
  tone: InfoTone
}

// Lo que el motor del chat decide mostrar. La pantalla lo convierte en tarjeta.
export type ChatCard =
  | { kind: 'procedure'; card: ProcedureCard }
  | { kind: 'procedure-group'; cards: ProcedureCard[] }
  | { kind: 'reservation'; card: ReservationCard }
  | { kind: 'info'; data: InfoCardData }
  | { kind: 'building'; building: Building }
  | { kind: 'calendar-link' }
  // Función bloqueada para invitados: invita a crear una cuenta.
  | { kind: 'guest-locked'; feature: LockedFeature }

// Funciones que solo tienen los estudiantes y administrativos UCA.
export type LockedFeature = 'dates' | 'reservation' | 'procedures'

export type Reply = { text: string; card?: ChatCard }

export type ChatMessage = {
  id: number
  role: 'assistant' | 'user'
  text: string
  card?: ChatCard
}

// Pregunta que Toko dejó pendiente ("¿cuál de los dos?") y espera respuesta.
export type Pending = { domain: ChatTopic; text: string } | null

export type Routed = Reply & { domain: ChatTopic | null; pending: Pending; autoOpen?: boolean }
