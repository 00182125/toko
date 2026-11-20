import type { FormEvent } from 'react'
import { IconButton } from '@/ui/IconButton'

// Caja para escribir y enviar mensajes.
export function ChatComposer({
  value,
  onChange,
  onSubmit,
  placeholder = 'Escribe tu mensaje…',
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: (event: FormEvent) => void
  placeholder?: string
}) {
  return (
    <form className="chat-composer procedure-composer" onSubmit={onSubmit}>
      <div className="composer-field">
        <input
          aria-label="Escribe tu mensaje"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          value={value}
        />
        <IconButton type="submit" icon="97a27.svg" label="Enviar mensaje" disabled={!value.trim()} />
      </div>
    </form>
  )
}
