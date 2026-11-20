import { useRef, useState } from 'react'
import { NO_MISSES, onMiss, onUnderstood, routeMessage, type MissState } from '@/chat'
import type { ChatMessage, ChatTopic, Pending, Reply } from '@/types/chat'

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
  // Intentos sin entender (ver chat/misses.ts) y la última pregunta de verdad que se hizo
  // (si contesta "no" a las opciones, la pregunta a sugerir es la anterior, no el "no").
  const misses = useRef<MissState>(NO_MISSES)
  const lastQuestion = useRef('')
  const lastRef = useRef<string | null>(null)

  const later = (action: () => void, ms: number) => {
    timers.current.push(window.setTimeout(action, ms))
  }

  const sendMessage = (text: string) => {
    const routed = routeMessage(text, pendingQuestion.current, lastDomain.current, { guest, lastRef: lastRef.current })
    pendingQuestion.current = routed.pending
    if (routed.domain) lastDomain.current = routed.domain
    // Lo último que se respondió (para "explícame cómo lo hago"). La charla casual no lo
    // borra; una respuesta de otro tema (o no entender) sí, para no dar pasos de algo viejo.
    if (routed.ref) lastRef.current = routed.ref
    else if (routed.domain || routed.miss) lastRef.current = null
    if (text.trim().split(/\s+/).length >= 2) lastQuestion.current = text

    // Si no entendió, la respuesta depende de cuántas veces seguidas lleva sin entender.
    let reply: Reply = routed
    if (routed.miss) {
      const result = onMiss(misses.current, text.trim().split(/\s+/).length >= 2 ? text : lastQuestion.current || text)
      misses.current = result.state
      reply = result.reply
    } else {
      misses.current = onUnderstood(misses.current)
    }
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
        { id: assistantId, role: 'assistant', text: reply.text, card: reply.card },
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
    misses.current = NO_MISSES
    lastQuestion.current = ''
    lastRef.current = null
  }

  return { messages, typing, sendMessage, resetChat }
}
