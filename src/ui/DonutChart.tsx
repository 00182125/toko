import { CountUp, useProgress } from './motion'

export type DonutSegment = { label: string; value: number; color: string }

// Gráfica de dona. Cada segmento ocupa su porcentaje (value) del círculo.
// Al aparecer, los segmentos se dibujan en orden alrededor del círculo y la cifra central cuenta.
export function DonutChart({
  segments,
  centerValue,
  centerLabel,
  ariaLabel,
}: {
  segments: DonutSegment[]
  centerValue: string
  centerLabel: string
  ariaLabel: string
}) {
  const radius = 58
  const circumference = 2 * Math.PI * radius
  // Cuánto del círculo ya está dibujado (0 a 1)
  const drawn = useProgress(1200, 250) * circumference
  let offset = 0

  return (
    <div className="donut-wrap">
      <svg width="144" height="144" viewBox="0 0 144 144" role="img" aria-label={ariaLabel}>
        {segments.map((segment) => {
          const length = (segment.value / 100) * circumference
          // Parte visible de este segmento: crece cuando el trazo llega a su posición.
          const visible = Math.min(Math.max(drawn - offset, 0), length)
          const circle = (
            <circle
              key={segment.label}
              cx="72"
              cy="72"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="24"
              strokeDasharray={`${Math.max(visible - 4, 0)} ${circumference}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 72 72)"
            />
          )
          offset += length
          return circle
        })}
      </svg>
      <div className="donut-center">
        <strong>
          <CountUp value={centerValue} duration={1200} delay={250} />
        </strong>
        <span>{centerLabel}</span>
      </div>
    </div>
  )
}

// Lista con la leyenda de colores de la dona.
export function DonutLegend({ segments }: { segments: DonutSegment[] }) {
  return (
    <ul className="donut-legend">
      {segments.map((segment) => (
        <li key={segment.label}>
          <span className="legend-dot" style={{ background: segment.color }} />
          <span className="legend-name">{segment.label}</span>
          <b>{segment.value}%</b>
        </li>
      ))}
    </ul>
  )
}
