import type { ReactNode } from 'react'

// Variantes del botón y cómo se ven:
//  access     -> botones grandes de la pantalla de acceso (ícono + texto)
//  primary    -> botón principal de color (Iniciar sesión, Enviar enlace...)
//  text       -> texto que se toca, sin fondo
//  link       -> botón sin estilo propio (el que va dentro de una frase)
//  card-action-> botón redondeado al pie de una tarjeta (usa tone para el color)
//  pill       -> botón pequeño tipo píldora (Hoy)
export type ButtonVariant = 'access' | 'primary' | 'text' | 'link' | 'card-action' | 'pill'

const baseClass: Record<ButtonVariant, string> = {
  access: 'access-button',
  primary: 'primary-action',
  text: 'text-action',
  link: '',
  'card-action': 'chat-card-action',
  pill: 'today-pill',
}

// Estas variantes envuelven el texto en <span> para poder ponerle ícono al lado.
const wrapsLabel: ButtonVariant[] = ['access', 'card-action']

export type ButtonProps = {
  variant?: ButtonVariant
  // Color de las tarjetas: transcript, reservation, support, dates, rules...
  tone?: string
  // Clases extra (por ejemplo la que da color a un botón de acceso).
  className?: string
  // Ícono que va antes del texto (un <Asset /> o un <svg>).
  icon?: ReactNode
  // Si lleva href se dibuja como enlace que abre en otra pestaña.
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  children: ReactNode
}

export function Button({
  variant = 'primary',
  tone,
  className,
  icon,
  href,
  type = 'button',
  disabled,
  onClick,
  children,
}: ButtonProps) {
  const classes =
    [baseClass[variant], variant === 'card-action' && tone ? `chat-card-action-${tone}` : '', className]
      .filter(Boolean)
      .join(' ') || undefined

  const content = (
    <>
      {icon}
      {wrapsLabel.includes(variant) ? <span>{children}</span> : children}
    </>
  )

  if (href) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    )
  }

  return (
    <button className={classes} type={type} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  )
}
