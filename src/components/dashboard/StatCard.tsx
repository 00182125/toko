import type { ReactNode } from 'react'
import { Card } from '@/ui/Card'
import { CountUp } from '@/ui/motion'

// Tarjeta con una cifra grande. tone: 'dark' o 'blue'. caption puede llevar un ícono antes del texto.
//  delay: milisegundos antes de que la cifra empiece a contar (para escalonar varias tarjetas)
export function StatCard({
  tone,
  label,
  value,
  caption,
  delay = 0,
}: {
  tone: 'dark' | 'blue'
  label: string
  value: string
  caption: ReactNode
  delay?: number
}) {
  return (
    <Card variant={tone === 'dark' ? 'metric-dark' : 'metric-blue'}>
      <p className="metric-label">{label}</p>
      <p className="metric-value">
        <CountUp value={value} delay={delay} />
      </p>
      <p className="metric-sub">{caption}</p>
    </Card>
  )
}
