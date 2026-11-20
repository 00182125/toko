import { useRef, useState } from 'react'
import { routeMessage } from '@/chat'
import type { ChatMessage, ChatTopic, Pending } from '@/types/chat'

// Memoria del chat. Vive en la app (no en la pantalla) para que la conversación
// no se pierda al cambiar de pestaña.
//  onAutoOpenCalendar: se llama cuando Toko decide abrir solo el calendario
//  guest: modo invitado (Toko no ofrece calendario, reservas ni trámites)
export function useChat({ onAutoOpenCalendar, guest = false }: { onAutoOpenCalendar: () => void; guest?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [typing, setTyping] = useState(false)
  const nextMessageId = useRef(0)
  const pendingQuestion = useRef<Pending>(null)
  const lastDomain = useRef<ChatTopic | null>(null)
  const waitingReplies = useRef(0)
  const timers = useRef<number[]>([])

  const later = (action: () => void, ms: number) => {
    timers.current.push(window.setTimeout(action, ms))
  }

  const sendMessage = (text: string) => {
    const routed = routeMessage(text, pendingQuestion.current, lastDomain.current, { guest })
    pendingQuestion.current = routed.pending
    if (routed.domain) lastDomain.current = routed.domain
    const userId = nextMessageId.current++
    const assistantId = nextMessageId.current++
    setMessages((current) => [...current, { id: userId, role: 'user', text }])
    waitingReplies.current += 1
    setTyping(true)
    // Toko "escribe" un momento antes de responder.
    later(() => {
      waitingReplies.current -= 1
      setTyping(waitingReplies.current > 0)
      setMessages((current) => [
        ...current,
        { id: assistantId, role: 'assistant', text: routed.text, card: routed.card },
      ])
      if (routed.autoOpen) later(onAutoOpenCalendar, 1300)
    }, 800)
  }

  const resetChat = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    waitingReplies.current = 0
    setTyping(false)
    setMessages([])
    nextMessageId.current = 0
    pendingQuestion.current = null
    lastDomain.current = null
  }

  return { messages, typing, sendMessage, resetChat }
}
