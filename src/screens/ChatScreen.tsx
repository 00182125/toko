import { useEffect, useRef, useState, type FormEvent } from 'react'
import { GUEST_WELCOME, WELCOME_MESSAGE } from '@/chat'
import { WavingToko } from '@/components/brand/WavingToko'
import { ChatCardView } from '@/components/chat/ChatCardView'
import { ChatComposer } from '@/components/chat/ChatComposer'
import { MessageBubble, ResponseWithCard, TypingBubble } from '@/components/chat/MessageBubble'
import { ChatHeader } from '@/components/navigation/ChatHeader'
import type { ChatMessage } from '@/types/chat'
import { ScreenLayout } from '@/ui/ScreenLayout'

// Pantalla principal: la conversación con Toko.
//  messages: todo lo que se ha dicho hasta ahora
//  typing: true mientras Toko "escribe"
//  onSend: se llama al enviar un mensaje
//  onOpenCalendar: lo usa la tarjeta "Ver calendario"
//  guest: modo invitado (cambia el saludo de Toko)
//  onCreateAccount: lo usa la tarjeta de función bloqueada del modo invitado
export function ChatScreen({
  messages,
  typing,
  onSend,
  onOpenCalendar,
  guest = false,
  onCreateAccount,
  onSuggestQuestion,
}: {
  messages: ChatMessage[]
  typing: boolean
  onSend: (text: string) => void
  onOpenCalendar: () => void
  guest?: boolean
  onCreateAccount?: () => void
  onSuggestQuestion?: (question: string) => void
}) {
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)
  // Los mensajes que ya existían al entrar no vuelven a animarse.
  const seen = useRef(messages.length)

  useEffect(() => {
    if (messages.length === 0 && !typing) return
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const text = input.trim()
    if (!text) return
    onSend(text)
    setInput('')
  }

  return (
    <ScreenLayout variant="chat" withNav>
      <ChatHeader />
      <section className="chat-messages">
        <div className="chat-intro">
          <WavingToko />
          <div className="intro-copy">
            <h2>¡Bienvenido a Toko!</h2>
            <p>Tu asistente UCA</p>
          </div>
        </div>
        <MessageBubble delay={380}>{guest ? GUEST_WELCOME : WELCOME_MESSAGE}</MessageBubble>
        {messages.map((message, index) => {
          const animate = index >= seen.current
          if (message.card) {
            return (
              <ResponseWithCard key={message.id} text={message.text} animate={animate}>
                <ChatCardView
                  card={message.card}
                  onOpenCalendar={onOpenCalendar}
                  onCreateAccount={onCreateAccount}
                  onSuggestQuestion={onSuggestQuestion}
                />
              </ResponseWithCard>
            )
          }
          return (
            <MessageBubble key={message.id} user={message.role === 'user'} animate={animate}>
              {message.text}
            </MessageBubble>
          )
        })}
        {typing ? <TypingBubble /> : null}
        <div ref={endRef} />
      </section>
      <ChatComposer value={input} onChange={setInput} onSubmit={submit} />
    </ScreenLayout>
  )
}
