import type { Ref } from 'react'
import {
  VIGILIA,
  calendarDayStyle,
  calendarEventsFor,
  eventFill,
  eventRing,
  type CalendarMonth,
} from '@/data/calendar'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'

// Un mes del calendario: nombre, cuadrícula de días con colores y leyenda de eventos.
//  today: fecha de hoy (se marca con un círculo)
//  onToday: acción del botón "Hoy"
export function MonthCard({
  item,
  today,
  onToday,
  cardRef,
}: {
  item: CalendarMonth
  today: Date
  onToday: () => void
  cardRef?: Ref<HTMLElement>
}) {
  const firstWeekday = new Date(item.year, item.month, 1).getDay()
  const daysInMonth = new Date(item.year, item.month + 1, 0).getDate()
  const cells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ]

  // Leyenda: eventos del mes en el orden en que aparecen.
  const legend: string[] = []
  let vigiliaWithRing = false
  for (let day = 1; day <= daysInMonth; day++) {
    const parts = calendarEventsFor(item, day)
    if (parts.includes(VIGILIA) && parts.length > 1) vigiliaWithRing = true
    for (const part of parts) if (!legend.includes(part)) legend.push(part)
  }

  return (
    <Card variant="month" as="section" ref={cardRef}>
      <div className="month-head">
        <h2>{item.name}</h2>
        <Button variant="pill" onClick={onToday}>
          Hoy
        </Button>
      </div>
      <div className="month-grid">
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((letter, index) => (
          <span className="weekday" key={`${letter}-${index}`}>
            {letter}
          </span>
        ))}
        {cells.map((day, index) => {
          if (day === null) return <span key={`blank-${index}`} />
          const isToday =
            item.year === today.getFullYear() && item.month === today.getMonth() && day === today.getDate()
          return (
            <span className="day-cell" key={day}>
              <span
                className={`day-dot ${isToday ? 'day-today' : ''}`}
                style={isToday ? undefined : calendarDayStyle(item, calendarEventsFor(item, day))}
              >
                {day}
              </span>
            </span>
          )
        })}
      </div>
      <ul className="month-legend">
        {legend.map((part) => (
          <li key={part}>
            <span
              style={{
                background: eventFill[part],
                boxShadow:
                  eventRing[part] && (part !== VIGILIA || vigiliaWithRing)
                    ? `inset 0 0 0 2px ${eventRing[part]}`
                    : undefined,
              }}
            />
            {part}
          </li>
        ))}
      </ul>
    </Card>
  )
}
