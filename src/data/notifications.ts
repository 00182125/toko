import type { IconName } from '@/types/icons'

export type NotificationModule = {
  id: string
  title: string
  description: string
  icon: IconName
  initial: boolean
}

export const notificationModules: NotificationModule[] = [
  {
    id: 'dates',
    title: 'Fechas importantes',
    description: 'Avisos de entregas, exámenes y plazos',
    icon: 'calendar',
    initial: true,
  },
  {
    id: 'reservations',
    title: 'Reservar espacios',
    description: 'Confirmación y recordatorio de tu reserva',
    icon: 'door',
    initial: false,
  },
  {
    id: 'procedures',
    title: 'Trámites',
    description: 'Cambios de estado de tus solicitudes',
    icon: 'clipboard',
    initial: false,
  },
  {
    id: 'support',
    title: 'Atención al cliente',
    description: 'Respuestas a tus consultas',
    icon: 'chat-dots',
    initial: false,
  },
  {
    id: 'rules',
    title: 'Reglamento',
    description: 'Novedades y cambios normativos',
    icon: 'book',
    initial: false,
  },
]
