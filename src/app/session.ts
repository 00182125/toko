import { useCallback, useState } from 'react'
import type { Screen, Session } from '@/types/navigation'

// Quién está usando la app. Se guarda en sessionStorage para que recargar la página
// no cierre la sesión (se borra al cerrar la pestaña).
const KEY = 'toko-session'

function readSession(): Session | null {
  try {
    const value = window.sessionStorage.getItem(KEY)
    return value === 'student' || value === 'admin' || value === 'guest' ? value : null
  } catch {
    return null
  }
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(readSession)

  const start = useCallback((next: Session) => {
    setSession(next)
    try {
      window.sessionStorage.setItem(KEY, next)
    } catch {
      // Sin almacenamiento (modo privado): la sesión dura hasta recargar.
    }
  }, [])

  const end = useCallback(() => {
    setSession(null)
    try {
      window.sessionStorage.removeItem(KEY)
    } catch {
      // nada que borrar
    }
  }, [])

  return { session, start, end }
}

// Quién puede entrar a cada pantalla. Las que no están aquí son públicas
// (carga, acceso, iniciar sesión, crear cuenta, recuperar contraseña).
//  Invitado: solo chat, ayuda y ajustes reducidos.
//  Estudiante: además calendario y notificaciones.
//  Administrativo: además los dashboards.
export const allowed: Partial<Record<Screen, Session[]>> = {
  home: ['student', 'admin', 'guest'],
  help: ['student', 'admin', 'guest'],
  settings: ['student', 'admin', 'guest'],
  calendar: ['student', 'admin'],
  notifications: ['student', 'admin'],
  dashboard: ['admin'],
  'dashboard-content': ['admin'],
}

// A dónde mandar a alguien que no puede ver una pantalla.
export const fallbackFor = (session: Session | null): Screen => (session ? 'home' : 'access')
