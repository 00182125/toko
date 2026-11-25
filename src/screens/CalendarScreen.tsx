import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import { CalendarHeader } from '@/components/calendar/CalendarHeader'
import { MonthCard } from '@/components/calendar/MonthCard'
import { MonthPicker } from '@/components/calendar/MonthPicker'
import { ChatHeader } from '@/components/navigation/ChatHeader'
import { calendarMonths } from '@/data/calendar'
import { ScreenLayout } from '@/ui/ScreenLayout'

// Cuánto hay que arrastrar (en proporción al ancho de la tarjeta) o qué tan rápido (px/ms)
// para pasar de mes al soltar. Menos que eso, la tarjeta regresa al mes en que estaba.
const SWIPE_DISTANCE = 0.18
const SWIPE_SPEED = 0.35

// Calendario académico (Figma: «Calendario - Fechas importantes»): una sola tarjeta y los meses
// uno al lado del otro. Se pasa de mes deslizando hacia los lados, con las flechas o eligiendo
// el mes en el selector que abre su nombre (año + cuadrícula de meses). Abre en el mes actual.
// Como en el Figma, el encabezado queda fijo: solo los días y la leyenda se deslizan, y el nombre
// del mes cambia al del mes visible, sin animación.
//
// El deslizamiento lo maneja la app (no el desplazamiento del navegador): la tarjeta sigue al
// dedo y, al soltar, pasa exactamente un mes o regresa. Así, por fuerte que sea el gesto,
// nunca salta dos meses ni parpadea por el impulso del navegador.
export function CalendarScreen({ onBack }: { onBack: () => void }) {
  const today = new Date()
  const current = calendarMonths.findIndex(
    (item) => item.year === today.getFullYear() && item.month === today.getMonth(),
  )
  const last = calendarMonths.length - 1
  const [index, setIndex] = useState(current >= 0 ? current : 0)
  const [pickerOpen, setPickerOpen] = useState(false)
  // Sin animación al cambiar de mes (salto desde el selector)
  const [instant, setInstant] = useState(true)
  const trackRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()
  // Al abrir o cerrar el selector, la tarjeta cambia de golpe (sin animar la altura),
  // para que no se vean los días encogiéndose detrás del selector.
  const lastOpen = useRef(pickerOpen)
  const toggled = lastOpen.current !== pickerOpen
  lastOpen.current = pickerOpen

  // La tarjeta toma la altura del mes visible (un mes con 6 semanas o más eventos es más alto).
  useLayoutEffect(() => {
    const measure = () => {
      const panel = stripRef.current?.children[index] as HTMLElement | undefined
      if (panel) setHeight(panel.offsetHeight)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [index])

  // Tras un salto sin animación, los siguientes cambios de mes vuelven a deslizarse.
  useEffect(() => {
    if (!instant) return
    const frame = requestAnimationFrame(() => setInstant(false))
    return () => cancelAnimationFrame(frame)
  }, [instant])

  const show = (target: number, animate = true) => {
    setInstant(!animate)
    setIndex(Math.max(0, Math.min(last, target)))
  }

  // Mes elegido en el selector: se va directo a él, sin animación.
  const pickMonth = (target: number) => {
    setPickerOpen(false)
    show(target, false)
  }

  // ---- Deslizar con el dedo (o arrastrar con el mouse) ----
  const drag = useRef<{ id: number; x: number; y: number; time: number; dx: number; horizontal: boolean | null } | null>(
    null,
  )
  const moveStrip = (dx: number) => {
    const strip = stripRef.current
    if (strip) strip.style.transform = `translateX(calc(${-index * 100}% + ${dx}px))`
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp, dx: 0, horizontal: null }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current
    if (!state || state.id !== event.pointerId) return
    const dx = event.clientX - state.x
    const dy = event.clientY - state.y
    // Primero se decide si el gesto es hacia los lados (mes) o hacia arriba/abajo (página).
    if (state.horizontal === null) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
      state.horizontal = Math.abs(dx) > Math.abs(dy)
      if (!state.horizontal) {
        drag.current = null
        return
      }
      event.currentTarget.setPointerCapture(event.pointerId)
      stripRef.current?.classList.add('is-dragging')
    }
    // En el primer y el último mes, la tarjeta se resiste a ir más allá.
    const atEdge = (index === 0 && dx > 0) || (index === last && dx < 0)
    state.dx = atEdge ? dx / 3 : dx
    moveStrip(state.dx)
  }

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current
    if (!state || state.id !== event.pointerId) return
    drag.current = null
    if (!state.horizontal) return
    stripRef.current?.classList.remove('is-dragging')
    const width = trackRef.current?.clientWidth || 1
    const speed = state.dx / Math.max(1, event.timeStamp - state.time)
    const far = Math.abs(state.dx) > width * SWIPE_DISTANCE || Math.abs(speed) > SWIPE_SPEED
    // Solo un mes por gesto, hacia donde se deslizó.
    const step = far ? (state.dx < 0 ? 1 : -1) : 0
    const target = Math.max(0, Math.min(last, index + step))
    // Se deja la tarjeta en el mes final (React no la toca si el mes no cambió).
    if (stripRef.current) stripRef.current.style.transform = `translateX(${-target * 100}%)`
    setInstant(false)
    setIndex(target)
  }

  // Rueda o trackpad hacia los lados (computadora): un mes por gesto.
  const wheelLock = useRef(0)
  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY) || Math.abs(event.deltaX) < 20) return
    if (event.timeStamp < wheelLock.current) return
    wheelLock.current = event.timeStamp + 600
    show(index + (event.deltaX > 0 ? 1 : -1))
  }

  return (
    <ScreenLayout variant="chat">
      <ChatHeader onBack={onBack} />
      <section className="calendar-body" style={{ paddingBottom: 'calc(112 * var(--u))' }}>
        <div className="calendar-card">
          <CalendarHeader
            months={calendarMonths}
            index={index}
            onPrev={index > 0 ? () => show(index - 1) : undefined}
            onNext={index < last ? () => show(index + 1) : undefined}
            onPickMonth={() => setPickerOpen((open) => !open)}
            pickerOpen={pickerOpen}
          />
          {/* Con el selector abierto, los meses se encogen a 0 (sin perder en qué mes iban) */}
          <div
            className="month-track"
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onWheel={onWheel}
            style={{ height: pickerOpen ? 0 : height, transition: toggled ? 'none' : undefined }}
            aria-hidden={pickerOpen}
          >
            <div
              className={`month-strip ${instant ? 'is-instant' : ''}`}
              ref={stripRef}
              style={{ transform: `translateX(${-index * 100}%)` }}
            >
              {calendarMonths.map((item) => (
                <MonthCard key={item.name} item={item} today={today} />
              ))}
            </div>
          </div>
          {pickerOpen && <MonthPicker months={calendarMonths} index={index} onPick={pickMonth} />}
        </div>
      </section>
    </ScreenLayout>
  )
}
