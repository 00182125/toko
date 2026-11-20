import type { ReactNode } from 'react'
import type { InfoRow, InfoTone } from '@/types/chat'
import { Asset } from '@/ui/Asset'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { Divider } from '@/ui/Divider'

// Tarjeta de información del chat: título, descripción, filas con ícono y un botón.
//  rows: si no se pasa, la tarjeta no lleva línea ni filas (solo título, texto y botón)
//  tone: color del botón y de los íconos
//  action: texto del botón; con href abre un enlace, con onAction ejecuta algo
//  actionIcon: dibujo (de assets) que va junto al texto del botón
//  footer: contenido extra debajo del botón
export function InfoCard({
  title,
  description,
  rows,
  action,
  actionIcon,
  href,
  onAction,
  tone,
  footer,
}: {
  title: string
  description: string
  rows?: InfoRow[]
  action: string
  actionIcon?: string
  href?: string
  onAction?: () => void
  tone: InfoTone
  footer?: ReactNode
}) {
  return (
    <Card variant="info">
      <h2>{title}</h2>
      <p className="info-description">{description}</p>
      {rows ? (
        <>
          <Divider variant="info" />
          <div className="info-rows">
            {rows.map((row) => (
              <div className="info-row" key={row.text}>
                <span className={`info-icon info-icon-${tone}`}>
                  <Asset name={row.icon} />
                </span>
                <p className={row.emphasized ? 'info-emphasized' : ''}>{row.text}</p>
                {row.trailingIcon ? <Asset className="info-trailing-icon" name={row.trailingIcon} /> : null}
              </div>
            ))}
          </div>
        </>
      ) : null}
      <Button
        variant="card-action"
        tone={tone}
        href={href}
        onClick={onAction}
        icon={actionIcon ? <Asset name={actionIcon} /> : undefined}
      >
        {action}
      </Button>
      {footer}
    </Card>
  )
}
