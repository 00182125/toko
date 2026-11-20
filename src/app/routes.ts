import type { Screen, Tab } from '@/types/navigation'

// La dirección (URL) de cada pantalla. Para cambiar una ruta, cámbiala solo aquí.
export const paths: Record<Exclude<Screen, 'loading-dark' | 'loading-light'>, string> = {
  access: '/acceso',
  'login-student': '/login/estudiante',
  'login-admin': '/login/administrativo',
  signup: '/registro',
  recovery: '/recuperar',
  home: '/chat',
  calendar: '/calendario',
  help: '/ayuda',
  settings: '/ajustes',
  notifications: '/ajustes/notificaciones',
  dashboard: '/dashboard',
  'dashboard-content': '/dashboard/contenido',
}

// Dirección de una pantalla. Las de carga viven en la raíz "/".
export const pathOf = (screen: Screen): string =>
  screen === 'loading-dark' || screen === 'loading-light' ? '/' : paths[screen]

// Pestaña que se marca en la barra inferior según la URL (null = la barra no se muestra).
export function tabFromPath(pathname: string): Tab | null {
  if (pathname === paths.home) return 'home'
  if (pathname === paths.calendar) return 'calendar'
  if (pathname === paths.help) return 'help'
  if (pathname === paths.settings || pathname === paths.notifications) return 'settings'
  return null
}
