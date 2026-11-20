import type { ReactNode } from 'react'
import { Card } from '@/ui/Card'

// Tarjeta con una cifra grande. tone: 'dark' o 'blue'. caption puede llevar un ícono antes del texto.
export function StatCard({
  tone,
  label,
  value,
  caption,
}: {
  tone: 'dark' | 'blue'
  label: string
  value: string
  caption: ReactNode
}) {
  return (
    <Card variant={tone === 'dark' ? 'metric-dark' : 'metric-blue'}>
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
      <p className="metric-sub">{caption}</p>
    </Card>
  )
}
