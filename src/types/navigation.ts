// Todas las pantallas a las que se puede navegar.
export type Screen =
  | 'loading-dark'
  | 'loading-light'
  | 'access'
  | 'login-student'
  | 'login-admin'
  | 'signup'
  | 'recovery'
  | 'home'
  | 'help'
  | 'settings'
  | 'notifications'
  | 'calendar'
  | 'dashboard'
  | 'dashboard-content'

export type Role = 'student' | 'admin'

// Quién está usando la app. El invitado entra sin cuenta y tiene acceso limitado:
// sin calendario, reservas, trámites, notificaciones ni datos de cuenta.
export type Session = Role | 'guest'

// Pestañas de la barra inferior.
export type Tab = 'home' | 'calendar' | 'help' | 'settings'

export type Navigate = (screen: Screen) => void
