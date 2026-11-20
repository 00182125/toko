import type { IconName } from '@/types/icons'

export const recentActivity: Array<{ icon: IconName; text: string; count: number }> = [
  { icon: 'pin', text: 'Biblioteca CRAI', count: 45 },
  { icon: 'book', text: 'Guía de Trámites - Becas', count: 32 },
  { icon: 'help', text: '¿dónde está el decanato?', count: 18 },
]

export const donutSegments = [
  { label: 'Reglamento', value: 25, color: '#103357' },
  { label: 'Trámites', value: 20, color: '#2e7da6' },
  { label: 'Reservar espacios', value: 15, color: '#2ea693' },
  { label: 'Dónde queda', value: 15, color: '#8a3220' },
  { label: 'Fechas clave', value: 15, color: '#e0a030' },
  { label: 'Atención al cliente', value: 10, color: '#7b5fc4' },
]

export const unansweredQueries = [
  { query: '¿qué pasa si pierdo mi carné?', module: 'Reglamento', date: '14 nov.' },
  { query: '¿dónde pago la matricula?', module: 'Trámites', date: '13 nov.' },
  { query: '¿cuándo es el examen de admisión?', module: 'Fechas clave', date: '12 nov.' },
]
