import {
  VIGILIA,
  calendarDayStyle,
  calendarEventsFor,
  eventFill,
  eventRing,
  type CalendarMonth,
} from '@/data/calendar'
import { Asset } from '@/ui/Asset'

// Un mes del calendario (Figma: «Calendario» → «Panel · Noviembre 2026»):
// nombre con selector, flechas de mes anterior/siguiente, cuadrícula y leyenda de eventos.
// Los meses van uno al lado del otro y se pasa de uno a otro deslizando (ver CalendarScreen).
//  today: fecha de hoy (se marca con un círculo oscuro)
//  onPrev / onNext: flechas; sin función, la flecha se ve apagada (primer o último mes)
//  onPickMonth: toque en el nombre del mes (abre la lista de meses)
export function MonthCard({
  item,
  today,
  onPrev,
  onNext,
  onPickMonth,
  pickerOpen = false,
}: {
  item: CalendarMonth
  today: Date
  onPrev?: () => void
  onNext?: () => void
  onPickMonth: () => void
  pickerOpen?: boolean
}) {
  const firstWeekday = new Date(item.year, item.month, 1).getDay()
  const daysInMonth = new Date(item.year, item.month + 1, 0).getDate()
  const daysInPrevMonth = new Date(item.year, item.month, 0).getDate()
  // Como en el Figma: los días del mes anterior y del siguiente completan las semanas, en gris.
  const leading = Array.from({ length: firstWeekday }, (_, i) => daysInPrevMonth - firstWeekday + 1 + i)
  const trailing = Array.from({ length: (7 - ((firstWeekday + daysInMonth) % 7)) % 7 }, (_, i) => i + 1)

  // Leyenda: eventos del mes en el orden en que aparecen.
  const legend: string[] = []
  let vigiliaWithRing = false
  for (let day = 1; day <= daysInMonth; day++) {
    const parts = calendarEventsFor(item, day)
    if (parts.includes(VIGILIA) && parts.length > 1) vigiliaWithRing = true
    for (const part of parts) if (!legend.includes(part)) legend.push(part)
  }

  return (
    <section className="month-panel" aria-label={item.name}>
      <div className="month-head">
        <button
          type="button"
          className="month-picker"
          onClick={onPickMonth}
          aria-expanded={pickerOpen}
          aria-haspopup="listbox"
        >
          <h2>{item.name}</h2>
          <Asset name="c8e5d.svg" className={`month-picker-chevron ${pickerOpen ? 'is-open' : ''}`} />
        </button>
        <div className="month-arrows">
          <button type="button" className="month-arrow" onClick={onPrev} disabled={!onPrev} aria-label="Mes anterior">
            <Asset name="baea3.svg" />
          </button>
          <button type="button" className="month-arrow" onClick={onNext} disabled={!onNext} aria-label="Mes siguiente">
            <Asset name="38fce.svg" />
          </button>
        </div>
      </div>
      <div className="month-grid">
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((letter, index) => (
          <span className="weekday" key={`${letter}-${index}`}>
            {letter}
          </span>
        ))}
        {leading.map((day) => (
          <span className="day-cell" key={`prev-${day}`}>
            <span className="day-dot day-outside">{day}</span>
          </span>
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
          const isToday =
            item.year === today.getFullYear() && item.month === today.getMonth() && day === today.getDate()
          return (
            <span className="day-cell" key={day}>
              <span
                className={`day-dot ${isToday ? 'day-today' : ''}`}
                style={isToday ? undefined : calendarDayStyle(item, calendarEventsFor(item, day))}
                aria-current={isToday ? 'date' : undefined}
              >
                {day}
              </span>
            </span>
          )
        })}
        {trailing.map((day) => (
          <span className="day-cell" key={`next-${day}`}>
            <span className="day-dot day-outside">{day}</span>
          </span>
        ))}
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
    </section>
  )
}
