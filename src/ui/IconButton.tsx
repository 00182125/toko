import { Asset } from './Asset'

// Botón que solo lleva un dibujo (flecha de volver, enviar mensaje...).
//  variant 'back'      -> flecha de las pantallas de acceso
//  variant 'chat-back' -> flecha dentro de los encabezados
//  sin variant         -> botón sin estilo propio
export function IconButton({
  icon,
  label,
  variant,
  type = 'button',
  disabled,
  onClick,
}: {
  icon: string
  label: string
  variant?: 'back' | 'chat-back'
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}) {
  const className = variant === 'back' ? 'back-button' : variant === 'chat-back' ? 'chat-back' : undefined
  return (
    <button className={className} type={type} disabled={disabled} onClick={onClick} aria-label={label}>
      <Asset name={icon} />
    </button>
  )
}
