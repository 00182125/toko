import { useLayoutEffect, useRef, useState } from 'react'
import type { CalendarMonth } from '@/data/calendar'
import { Asset } from '@/ui/Asset'

const SHORT = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

// Selector de mes y año (Figma: «Calendario» → «Vista=Selector 2026» y «Selector 2027»).
// Se abre al tocar el nombre del mes: el año con flechas y los 12 meses en una cuadrícula.
// Como el calendario, los años van uno al lado del otro y se cambia de año deslizando
// la cuadrícula hacia los lados (o con las flechas). La fila del año queda fija.
//  · El mes que se está viendo va resaltado en azul oscuro.
//  · Los meses que no tienen calendario se ven apagados y no se pueden elegir.
//  · Las flechas del año se apagan cuando no hay calendario antes o después.
export function MonthPicker({
  months,
  index,
  onPick,
}: {
  months: CalendarMonth[]
  index: number
  onPick: (monthIndex: number) => void
}) {
  const years = [...new Set(months.map((item) => item.year))]
  const startYear = years.indexOf(months[index].year)
  const [yearAt, setYearAt] = useState(startYear)
  const trackRef = useRef<HTMLDivElement>(null)

  // Abre en el año del mes que se está viendo, sin animación.
  useLayoutEffect(() => {
    const track = trackRef.current
    if (track) track.scrollLeft = startYear * track.clientWidth
  }, [startYear])

  const goToYear = (target: number) => {
    const track = trackRef.current
    if (track) track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' })
  }

  // El año visible sale de cuánto se deslizó la cuadrícula.
  const onScroll = () => {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    const visible = Math.round(track.scrollLeft / track.clientWidth)
    if (visible !== yearAt) setYearAt(visible)
  }

  return (
    <div className="month-picker-panel">
      <div className="picker-year-row">
        <button
          type="button"
          className="picker-year-arrow"
          onClick={() => goToYear(yearAt - 1)}
          disabled={yearAt === 0}
          aria-label="Año anterior"
        >
          <Asset name="baea3.svg" />
        </button>
        <span className="picker-year">{years[yearAt]}</span>
        <button
          type="button"
          className="picker-year-arrow"
          onClick={() => goToYear(yearAt + 1)}
          disabled={yearAt === years.length - 1}
          aria-label="Año siguiente"
        >
          <Asset name="38fce.svg" />
        </button>
      </div>
      <div className="picker-track" ref={trackRef} onScroll={onScroll}>
        {years.map((year) => (
          <div className="picker-months" role="listbox" aria-label={`Meses de ${year}`} key={year}>
            {SHORT.map((label, month) => {
              const monthIndex = months.findIndex((item) => item.year === year && item.month === month)
              const selected = monthIndex === index
              return (
                <button
                  key={label}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`picker-month ${selected ? 'is-selected' : ''}`}
                  disabled={monthIndex < 0}
                  onClick={() => onPick(monthIndex)}
                >
                  {label}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
