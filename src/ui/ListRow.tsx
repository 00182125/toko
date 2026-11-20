import type { ReactNode } from 'react'
import type { IconName } from '@/types/icons'
import { Icon } from './Icon'

// Fila de lista con ícono, título y (opcional) subtítulo.
//  variant 'settings'     -> filas de Ajustes. Con onClick es un botón; sin onClick es solo texto.
//  variant 'notification' -> filas de Notificaciones, con el ícono dentro de un círculo.
//  trailing: lo que va a la derecha. 'chevron' dibuja la flecha; también puede ser un <Switch />.
export function ListRow({
  variant = 'settings',
  icon,
  title,
  subtitle,
  trailing,
  onClick,
}: {
  variant?: 'settings' | 'notification'
  icon: IconName
  title: string
  subtitle?: string
  trailing?: 'chevron' | ReactNode
  onClick?: () => void
}) {
  const text = (
    <span className="row-text">
      <strong>{title}</strong>
      {subtitle ? <small>{subtitle}</small> : null}
    </span>
  )
  const end = trailing === 'chevron' ? <Icon name="chevron-right" size={20} /> : trailing

  if (variant === 'notification') {
    return (
      <div className="notif-row">
        <span className="notif-icon">
          <Icon name={icon} />
        </span>
        {text}
        {end}
      </div>
    )
  }

  const content = (
    <>
      <Icon name={icon} />
      {text}
      {end}
    </>
  )
  return onClick ? (
    <button type="button" className="settings-row" onClick={onClick}>
      {content}
    </button>
  ) : (
    <div className="settings-row">{content}</div>
  )
}
