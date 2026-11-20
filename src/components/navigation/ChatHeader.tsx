import { Avatar } from '@/ui/Avatar'
import { IconButton } from '@/ui/IconButton'

// Encabezado con la foto de Toko. Si recibe onBack, muestra la flecha para regresar.
export function ChatHeader({
  title = 'Toko',
  subtitle = 'Asistente UCA',
  onBack,
}: {
  title?: string
  subtitle?: string
  onBack?: () => void
}) {
  return (
    <header className="chat-header">
      {onBack ? <IconButton variant="chat-back" icon="71473.svg" label="Regresar al chat" onClick={onBack} /> : null}
      <Avatar size="header" />
      <div className="chat-heading">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  )
}
