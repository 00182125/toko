import { useState, type ReactNode } from 'react'
import { Asset } from './Asset'

// Guarda qué tarjetas están abiertas. Se pueden abrir varias a la vez.
export function useMultiOpen() {
  const [open, setOpen] = useState<string[]>([])
  const toggle = (id: string) =>
    setOpen((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  return { isOpen: (id: string) => open.includes(id), toggle }
}

// Tarjeta que se despliega al tocarla.
//  title / description: lo que se ve siempre
//  image: dibujo de la derecha (nombre de archivo de assets)
//  tone: color de la tarjeta (clase tone-...)
//  delay: milisegundos de espera antes de su animación de entrada
//  children: el contenido que aparece al abrir
export function AccordionItem({
  id,
  title,
  description,
  image,
  tone,
  open,
  delay = 0,
  onToggle,
  children,
}: {
  id: string
  title: string
  description: string
  image: string
  tone: string
  open: boolean
  delay?: number
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <article
      className={`help-card ${tone} ${open ? 'help-card-open' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        type="button"
        className="help-head"
        aria-expanded={open}
        aria-controls={`guide-${id}`}
        onClick={onToggle}
      >
        <span className="help-copy">
          <span className="help-title">
            <strong>{title}</strong>
            <svg
              className="help-chevron"
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
          <span className="help-desc">{description}</span>
        </span>
        <span className="help-art">
          <Asset name={image} />
        </span>
      </button>
      <div className="help-guide" id={`guide-${id}`} role="region">
        <div className="help-guide-inner">
          <div className="help-guide-pad">
            <div className="help-line" />
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}
