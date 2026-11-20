import { telHref, type DirectoryEntry } from '@/data/directory'
import { Asset } from '@/ui/Asset'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { Divider } from '@/ui/Divider'

// Tarjeta del Directorio UCA (Figma: "Tarjeta – Contacto (Central UCA)").
// Oficina: teléfono, correo, página web y botón "Llamar". Persona: solo su correo.
// Las filas que no tienen dato no aparecen.
export function DirectoryCard({ entry }: { entry: DirectoryEntry }) {
  return (
    <Card variant="info" className="directory-card">
      <h2>{entry.title}</h2>
      <p className="info-description">{entry.description}</p>
      <Divider variant="info" />

      {entry.phone ? (
        <div className="info-row">
          <span className="info-icon info-icon-support">
            <Asset name="3ad59.svg" />
          </span>
          <p>{entry.phone}</p>
        </div>
      ) : null}

      {entry.email ? (
        <a className="info-row directory-link" href={`mailto:${entry.email}`}>
          <span className="info-icon info-icon-support">
            <Asset name="256c1.svg" />
          </span>
          <p className="directory-email">{entry.email}</p>
          <span className="directory-go" aria-hidden="true">
            <Asset name="2dc69.svg" />
          </span>
        </a>
      ) : null}

      {entry.web ? (
        <a className="info-row directory-link" href={entry.web} target="_blank" rel="noreferrer">
          <span className="info-icon info-icon-support">
            <Asset name="91120.svg" />
          </span>
          <p className="directory-web">Página Web</p>
          <span className="directory-go" aria-hidden="true">
            <Asset name="2dc69.svg" />
          </span>
        </a>
      ) : null}

      {entry.phone ? (
        <Button variant="card-action" tone="support" href={telHref(entry.phone)} icon={<Asset name="97635.svg" />}>
          Llamar
        </Button>
      ) : null}
    </Card>
  )
}
