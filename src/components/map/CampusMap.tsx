import { Asset } from '@/ui/Asset'

const layers = ['1a24e.svg', 'c98a9.svg', 'a0b93.svg', 'a182d.svg', '014c0.svg', 'e6429.svg']

// Mapa del campus armado con 6 capas de dibujo.
export function CampusMap() {
  return (
    <div className="campus-map campus-map-card">
      {layers.map((layer, index) => (
        <div className={`campus-map-layer campus-map-layer-${index + 1}`} key={layer}>
          <Asset name={layer} />
        </div>
      ))}
    </div>
  )
}
