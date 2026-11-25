import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MonthCard } from '@/components/calendar/MonthCard'
import { ChatHeader } from '@/components/navigation/ChatHeader'
import { calendarMonths } from '@/data/calendar'
import { ScreenLayout } from '@/ui/ScreenLayout'

// Calendario académico (Figma: «Calendario - Fechas importantes»): una sola tarjeta y los meses
// uno al lado del otro. Se pasa de mes deslizando hacia los lados, con las flechas o eligiendo
// el mes en la lista que abre su nombre. Abre en el mes actual.
export function CalendarScreen({ onBack }: { onBack: () => void }) {
  const today = new Date()
  const current = calendarMonths.findIndex(
    (item) => item.year === today.getFullYear() && item.month === today.getMonth(),
  )
  const start = current >= 0 ? current : 0
  const [index, setIndex] = useState(start)
  const [pickerOpen, setPickerOpen] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()

  // La tarjeta toma la altura del mes visible (un mes con 6 semanas o más eventos es más alto).
  useLayoutEffect(() => {
    const measure = () => {
      const panel = trackRef.current?.children[index] as HTMLElement | undefined
      if (panel) setHeight(panel.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [index])

  // Al abrir, el carrusel se coloca en el mes actual sin animación.
  useEffect(() => {
    const track = trackRef.current
    if (track) track.scrollLeft = start * track.clientWidth
  }, [start])

  const goTo = (target: number) => {
    const track = trackRef.current
    setPickerOpen(false)
    if (!track) return
    // Al mes de al lado se desliza; a uno lejano (desde la lista) se salta directo, porque una
    // animación larga se corta a medio camino al cambiar la altura de la tarjeta en cada mes.
    const far = Math.abs(target - index) > 1
    track.scrollTo({ left: target * track.clientWidth, behavior: far ? 'auto' : 'smooth' })
  }

  // El mes visible sale de cuánto se deslizó el carrusel.
  const onScroll = () => {
    const track = trackRef.current
    if (!track || track.clientWidth === 0) return
    const visible = Math.round(track.scrollLeft / track.clientWidth)
    if (visible !== index) {
      setIndex(visible)
      setPickerOpen(false)
    }
  }

  return (
    <ScreenLayout variant="chat">
      <ChatHeader onBack={onBack} />
      <section className="calendar-body" style={{ paddingBottom: 'calc(112 * var(--u))' }}>
        <div className="calendar-card">
          <div className="month-track" ref={trackRef} onScroll={onScroll} style={{ height }}>
            {calendarMonths.map((item, monthIndex) => (
              <MonthCard
                key={item.name}
                item={item}
                today={today}
                onPrev={monthIndex > 0 ? () => goTo(monthIndex - 1) : undefined}
                onNext={monthIndex < calendarMonths.length - 1 ? () => goTo(monthIndex + 1) : undefined}
                onPickMonth={() => setPickerOpen((open) => !open)}
                pickerOpen={pickerOpen && monthIndex === index}
              />
            ))}
          </div>
          {pickerOpen && (
            <ul className="month-picker-list" role="listbox" aria-label="Elegir mes">
              {calendarMonths.map((item, monthIndex) => (
                <li key={item.name}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={monthIndex === index}
                    className={monthIndex === index ? 'is-current' : undefined}
                    onClick={() => goTo(monthIndex)}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </ScreenLayout>
  )
}
