import type { ComponentPropsWithRef, ElementType } from 'react'

// Cada variante usa el estilo (clase) de un tipo de tarjeta de la app.
export type CardVariant = 'info' | 'building' | 'donut' | 'metric-dark' | 'metric-blue'

const cardClass: Record<CardVariant, string> = {
  info: 'chat-info-card',
  building: 'building-card',
  donut: 'donut-card',
  'metric-dark': 'metric-card metric-dark',
  'metric-blue': 'metric-card metric-blue',
}

type CardProps<T extends ElementType> = {
  variant: CardVariant
  // Etiqueta HTML que se usa: article (por defecto) o section.
  as?: T
} & Omit<ComponentPropsWithRef<T>, 'variant' | 'as'>

// Contenedor de tarjeta. Acepta cualquier atributo normal (onClick, ref, etc.).
export function Card<T extends ElementType = 'article'>({ variant, as, className, ...rest }: CardProps<T>) {
  const Tag: ElementType = as ?? 'article'
  return <Tag className={[cardClass[variant], className].filter(Boolean).join(' ')} {...rest} />
}
