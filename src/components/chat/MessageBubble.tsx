import type { ReactNode } from 'react'
import { Avatar } from '@/ui/Avatar'

// Un mensaje del chat.
//  user: true si lo escribió la persona (burbuja de color a la derecha)
//  avatar: muestra la foto de Toko a la izquierda
//  animate: entra con animación
//  delay: milisegundos antes de entrar
//  preserve: respeta los saltos de línea del texto
export function MessageBubble({
  children,
  preserve = false,
  user = false,
  avatar = true,
  animate = true,
  delay,
}: {
  children: ReactNode
  preserve?: boolean
  user?: boolean
  avatar?: boolean
  animate?: boolean
  delay?: number
}) {
  return (
    <div
      className={`message-row ${user ? 'message-row-user' : ''} ${animate ? 'msg-in' : ''}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {!user && avatar ? <Avatar /> : null}
      <div
        className={`message-bubble ${user ? 'message-user' : 'message-toko'} ${preserve ? 'message-preserve' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}

// Los tres puntitos que se ven mientras Toko "escribe".
export function TypingBubble() {
  return (
    <div className="message-row msg-in">
      <Avatar />
      <div className="message-bubble message-toko typing" aria-label="Toko está escribiendo">
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}

// Respuesta de Toko con tarjeta: el texto va arriba y la tarjeta debajo, con una sola foto al lado.
export function ResponseWithCard({
  text,
  animate,
  children,
}: {
  text: string
  animate: boolean
  children: ReactNode
}) {
  return (
    <div className={`message-row ${animate ? 'msg-in' : ''}`}>
      <Avatar />
      <div className="toko-response">
        <MessageBubble avatar={false} animate={false}>
          {text}
        </MessageBubble>
        {children}
      </div>
    </div>
  )
}
