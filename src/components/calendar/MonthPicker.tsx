import { useState } from 'react'
import type { CalendarMonth } from '@/data/calendar'
import { Asset } from '@/ui/Asset'

const SHORT = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

// Selector de mes y año (Figma: «Calendario» → «Vista=Selector 2026» y «Selector 2027»).
// Se abre al tocar el nombre del mes: el año con flechas y los 12 meses en una cuadrícula.
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
  const [year, setYear] = useState(months[index].year)
  const yearAt = years.indexOf(year)
  const prevYear = years[yearAt - 1]
  const nextYear = years[yearAt + 1]

  return (
    <div className="month-picker-panel">
      <div className="picker-year-row">
        <button
          type="button"
          className="picker-year-arrow"
          onClick={() => prevYear !== undefined && setYear(prevYear)}
          disabled={prevYear === undefined}
          aria-label="Año anterior"
        >
          <Asset name="baea3.svg" />
        </button>
        <span className="picker-year">{year}</span>
        <button
          type="button"
          className="picker-year-arrow"
          onClick={() => nextYear !== undefined && setYear(nextYear)}
          disabled={nextYear === undefined}
          aria-label="Año siguiente"
        >
          <Asset name="38fce.svg" />
        </button>
      </div>
      <div className="picker-months" role="listbox" aria-label={`Meses de ${year}`}>
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
    </div>
  )
}
