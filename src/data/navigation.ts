import type { IconName } from '@/types/icons'
import type { Tab } from '@/types/navigation'

// Pestañas de la barra inferior, en el orden en que aparecen.
export const navTabs: Array<{ id: Tab; label: string; icon: IconName }> = [
  { id: 'home', label: 'Chat', icon: 'message-circle' },
  { id: 'calendar', label: 'Calendario', icon: 'calendar' },
  { id: 'help', label: 'Ayuda', icon: 'help' },
  { id: 'settings', label: 'Ajustes', icon: 'gear' },
]
