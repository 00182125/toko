import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CalendarHeader } from '@/components/calendar/CalendarHeader'
import { MonthCard } from '@/components/calendar/MonthCard'
import { MonthPicker } from '@/components/calendar/MonthPicker'
import { ChatHeader } from '@/components/navigation/ChatHeader'
import { calendarMonths } from '@/data/calendar'
import { ScreenLayout } from '@/ui/ScreenLayout'

// Calendario académico (Figma: «Calendario - Fechas importantes»): una sola tarjeta y los meses
// uno al lado del otro. Se pasa de mes deslizando hacia los lados, con las flechas o eligiendo
// el mes en el selector que abre su nombre (año + cuadrícula de meses). Abre en el mes actual.
// Como en el Figma, el encabezado queda fijo: solo los días y la leyenda se deslizan, y el nombre
// del mes cambia al del mes visible, sin animación.
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
  // Al abrir o cerrar el selector, la tarjeta cambia de golpe (sin animar la altura),
  // para que no se vean los días encogiéndose detrás del selector.
  const lastOpen = useRef(pickerOpen)
  const toggled = lastOpen.current !== pickerOpen
  lastOpen.current = pickerOpen

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

  // Mes elegido en el selector: se salta a él justo después de cerrarlo, cuando los meses
  // ya volvieron a su tamaño (si se salta antes, mientras están encogidos, el salto se pierde).
  const pendingJump = useRef<number | null>(null)
  useLayoutEffect(() => {
    const track = trackRef.current
    const target = pendingJump.current
    if (pickerOpen || target === null || !track) return
    pendingJump.current = null
    track.scrollLeft = target * track.clientWidth
    setIndex(target)
  }, [pickerOpen])

  const pickMonth = (target: number) => {
    pendingJump.current = target
    setPickerOpen(false)
  }

  // Flechas: se desliza al mes de al lado.
  const goTo = (target: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' })
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
          <CalendarHeader
            months={calendarMonths}
            index={index}
            onPrev={index > 0 ? () => goTo(index - 1) : undefined}
            onNext={index < calendarMonths.length - 1 ? () => goTo(index + 1) : undefined}
            onPickMonth={() => setPickerOpen((open) => !open)}
            pickerOpen={pickerOpen}
          />
          {/* Con el selector abierto, los meses se encogen a 0 (sin perder en qué mes iban) */}
          <div
            className="month-track"
            ref={trackRef}
            onScroll={onScroll}
            style={{ height: pickerOpen ? 0 : height, transition: toggled ? 'none' : undefined }}
            aria-hidden={pickerOpen}
          >
            {calendarMonths.map((item) => (
              <MonthCard key={item.name} item={item} today={today} />
            ))}
          </div>
          {pickerOpen && <MonthPicker months={calendarMonths} index={index} onPick={pickMonth} />}
        </div>
      </section>
    </ScreenLayout>
  )
}
