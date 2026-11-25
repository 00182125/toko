import type { CalendarMonth } from '@/data/calendar'
import { Asset } from '@/ui/Asset'

// Encabezado fijo del calendario (Figma: «Calendario» → «Encabezado»): nombre del mes con selector
// y flechas. No se desliza con los meses: el nombre cambia al mes visible, sin animación.
//  onPrev / onNext: flechas; sin función, la flecha se ve apagada (primer o último mes)
//  pickerOpen: con el selector de mes abierto, la flecha del nombre apunta hacia arriba y las
//    flechas de mes se esconden (el selector trae las suyas para el año), como en el Figma
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
        aria-haspopup="dialog"
        aria-label={`${months[index].name}, elegir mes`}
      >
        <span className="month-title">
          <h2>{months[index].name}</h2>
          <Asset name={pickerOpen ? '0c5d1.svg' : 'c8e5d.svg'} className="month-picker-chevron" />
        </span>
      </button>
      <div className="month-arrows" hidden={pickerOpen}>
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
