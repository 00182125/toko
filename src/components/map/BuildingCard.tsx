import { useState } from 'react'
import { buildingPhotos } from '@/data/buildingPhotos'
import type { Building } from '@/data/buildings'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { Divider } from '@/ui/Divider'
import { PhotoCarousel, useSwipe } from '@/ui/PhotoCarousel'
import { MapOverlay } from './MapOverlay'

const mapIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.333 4.333 L6 3 L10 4.333 L13.667 3 L13.667 11.667 L10 13 L6 11.667 L2.333 13 Z" />
      <path d="M6 3 V11.667 M10 4.333 V13" />
    </g>
  </svg>
)

// Tarjeta de un edificio: fotos deslizables, indicaciones y botón "Ver mapa".
export function BuildingCard({ building }: { building: Building }) {
  const { name, directions } = building
  const [mapOpen, setMapOpen] = useState(false)
  const photos = buildingPhotos(name)
  const { index, handlers } = useSwipe(photos.length)

  return (
    <>
      <Card variant="building" {...handlers}>
        <PhotoCarousel photos={photos} index={index} />
        <div className="building-info">
          <h2>{name}</h2>
          <p>{directions}</p>
          <Divider variant="building" />
          <Button variant="card-action" tone="transcript" icon={mapIcon} onClick={() => setMapOpen(true)}>
            Ver mapa
          </Button>
        </div>
      </Card>
      {mapOpen ? <MapOverlay building={building} onClose={() => setMapOpen(false)} /> : null}
    </>
  )
}
