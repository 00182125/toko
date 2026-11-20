import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Asset } from '@/ui/Asset'
import { Button } from '@/ui/Button'

// Tarjeta "Sugerir una pregunta" de la pantalla de Ayuda (Figma: Tarjeta de ayuda · Sugerir pregunta).
// La persona escribe una pregunta que Toko no supo responder y la envía.
//  Cerrada → Abierta (campo + "Enviar") → Enviada (burbuja "¡Pregunta enviada correctamente!")
//  Después de unos segundos vuelve a cerrarse sola.
//  onSend: recibe el texto de la pregunta
//  initialText: si llega (desde la tarjeta "No entendí tu pregunta"), la tarjeta se abre con ese texto
type State = 'closed' | 'open' | 'sent'

const SENT_DURATION = 3200

export function SuggestionCard({
  onSend,
  initialText = '',
  delay = 0,
}: {
  onSend: (text: string) => void
  initialText?: string
  delay?: number
}) {
  const [state, setState] = useState<State>(initialText ? 'open' : 'closed')
  const [text, setText] = useState(initialText)
  const field = useRef<HTMLTextAreaElement | null>(null)

  // Al abrir, el cursor va directo al campo.
  useEffect(() => {
    if (state === 'open') field.current?.focus()
  }, [state])

  // La burbuja de confirmación se queda un momento y la tarjeta vuelve a cerrarse.
  useEffect(() => {
    if (state !== 'sent') return
    const timer = window.setTimeout(() => setState('closed'), SENT_DURATION)
    return () => window.clearTimeout(timer)
  }, [state])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const question = text.trim()
    if (!question) return
    onSend(question)
    setText('')
    setState('sent')
  }

  const expanded = state !== 'closed'

  return (
    <article
      className={`help-card suggest-card ${expanded ? 'suggest-card-expanded' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        type="button"
        className="suggest-head"
        aria-expanded={state === 'open'}
        aria-controls="suggest-body"
        onClick={() => setState(state === 'open' ? 'closed' : 'open')}
      >
        <span className="suggest-title">
          <strong>Sugerir una pregunta</strong>
          <span className={`suggest-chevron ${state === 'open' ? 'suggest-chevron-up' : ''}`}>
            <Asset name="4b8cd.svg" />
          </span>
        </span>
        {expanded ? null : <span className="help-desc suggest-desc">Cuéntanos qué querías saber.</span>}
      </button>

      {state === 'open' ? (
        <form className="suggest-body" id="suggest-body" onSubmit={submit}>
          <textarea
            ref={field}
            className="suggest-field"
            placeholder="Escribe tu pregunta…"
            aria-label="Escribe tu pregunta"
            maxLength={300}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <Button variant="primary" type="submit" className="suggest-send" disabled={!text.trim()}>
            Enviar
          </Button>
        </form>
      ) : null}

      {state === 'sent' ? (
        <div className="suggest-body">
          <div className="sent-bubble" role="status">
            <span className="sent-check">
              <Asset name="1b5eb.svg" />
            </span>
            <p>¡Pregunta enviada correctamente!</p>
          </div>
        </div>
      ) : null}
    </article>
  )
}
