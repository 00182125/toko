import { Icon } from '@/ui/Icon'
import { IconButton } from '@/ui/IconButton'

// Encabezado de las pantallas internas: flecha, título centrado y (opcional) engranaje.
export function PageHeader({
  title,
  onBack,
  withGear = false,
}: {
  title: string
  onBack: () => void
  withGear?: boolean
}) {
  return (
    <header className="page-header">
      <IconButton variant="chat-back" icon="71473.svg" label="Volver" onClick={onBack} />
      <h1>{title}</h1>
      <span className="page-icon" aria-hidden="true">
        {withGear ? <Icon name="gear" /> : null}
      </span>
    </header>
  )
}
