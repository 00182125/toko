export type DonutSegment = { label: string; value: number; color: string }

// Gráfica de dona. Cada segmento ocupa su porcentaje (value) del círculo.
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
  let offset = 0

  return (
    <div className="donut-wrap">
      <svg width="144" height="144" viewBox="0 0 144 144" role="img" aria-label={ariaLabel}>
        {segments.map((segment) => {
          const length = (segment.value / 100) * circumference
          const circle = (
            <circle
              key={segment.label}
              cx="72"
              cy="72"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth="24"
              strokeDasharray={`${length - 4} ${circumference - length + 4}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 72 72)"
            />
          )
          offset += length
          return circle
        })}
      </svg>
      <div className="donut-center">
        <strong>{centerValue}</strong>
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
