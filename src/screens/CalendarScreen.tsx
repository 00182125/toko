import { useRef } from 'react'
import { MonthCard } from '@/components/calendar/MonthCard'
import { ChatHeader } from '@/components/navigation/ChatHeader'
import { calendarMonths } from '@/data/calendar'
import { ScreenLayout } from '@/ui/ScreenLayout'

// Calendario académico: un mes debajo de otro. El botón "Hoy" baja al mes actual.
export function CalendarScreen({ onBack }: { onBack: () => void }) {
  const monthRefs = useRef<Array<HTMLElement | null>>([])
  const today = new Date()

  const goToday = () => {
    const index = calendarMonths.findIndex(
      (item) => item.year === today.getFullYear() && item.month === today.getMonth(),
    )
    monthRefs.current[index >= 0 ? index : 0]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <ScreenLayout variant="chat">
      <ChatHeader onBack={onBack} />
      <section className="calendar-scroll" style={{ paddingBottom: "calc(112 * var(--u))" }}>
        {calendarMonths.map((item, monthIndex) => (
          <MonthCard
            key={item.name}
            item={item}
            today={today}
            onToday={goToday}
            cardRef={(element) => {
              monthRefs.current[monthIndex] = element
            }}
          />
        ))}
      </section>
    </ScreenLayout>
  )
}
