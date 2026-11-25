import type { CalendarMonth } from '@/data/calendar'
import { Asset } from '@/ui/Asset'

// Encabezado fijo del calendario (Figma: «Calendario» → «Encabezado»): nombre del mes con selector
// y flechas. No se desliza con los meses: el nombre cambia al mes visible, sin animación.
//  onPrev / onNext: flechas; sin función, la flecha se ve apagada (primer o último mes)
export function CalendarHeader({
  months,
  index,
  onPrev,
  onNext,
  onPickMonth,
  pickerOpen,
}: {
  months: CalendarMonth[]
  index: number
  onPrev?: () => void
  onNext?: () => void
  onPickMonth: () => void
  pickerOpen: boolean
}) {
  return (
    <div className="month-head">
      <button
        type="button"
        className="month-picker"
        onClick={onPickMonth}
        aria-expanded={pickerOpen}
        aria-haspopup="listbox"
        aria-label={`${months[index].name}, elegir mes`}
      >
        <span className="month-title">
          <h2>{months[index].name}</h2>
          <Asset name="c8e5d.svg" className={`month-picker-chevron ${pickerOpen ? 'is-open' : ''}`} />
        </span>
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
  )
}
