import type { ReactNode } from 'react'

// Título pequeño que abre una sección (Cuenta, Preferencias, Módulos...).
export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={['settings-title', className].filter(Boolean).join(' ')}>{children}</h3>
}
