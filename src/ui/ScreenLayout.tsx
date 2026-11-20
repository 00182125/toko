import type { ComponentPropsWithoutRef } from 'react'

// Contenedor de una pantalla completa (<main>).
//  variant: el tipo de pantalla (access, auth, page, chat, help, splash, empty)
//  withNav: deja espacio abajo para la barra de navegación
//  className: clases extra (por ejemplo splash-dark)
export type ScreenVariant = 'access' | 'auth' | 'page' | 'chat' | 'help' | 'splash' | 'empty'

export function ScreenLayout({
  variant,
  withNav = false,
  className,
  children,
  ...rest
}: {
  variant: ScreenVariant
  withNav?: boolean
} & ComponentPropsWithoutRef<'main'>) {
  const classes = [`${variant}-screen`, withNav ? 'with-nav' : '', className].filter(Boolean).join(' ')
  return (
    <main className={classes} {...rest}>
      {children}
    </main>
  )
}
