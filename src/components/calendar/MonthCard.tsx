import {
  VIGILIA,
  calendarDayStyle,
  calendarEventsFor,
  eventFill,
  eventRing,
  type CalendarMonth,
} from '@/data/calendar'

// Un mes del calendario (Figma: «Calendario» → «Panel · Noviembre 2026»): cuadrícula de días
// con colores y leyenda de eventos. El encabezado (nombre del mes y flechas) no va aquí: queda
// fijo arriba de la tarjeta mientras los meses se deslizan debajo (ver CalendarHeader).
//  today: fecha de hoy (se marca con un círculo oscuro)
export function MonthCard({ item, today }: { item: CalendarMonth; today: Date }) {
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
