import { useLayoutEffect, useRef, useState } from 'react'
import { buildingList, type Building } from '@/data/buildings'
import { CampusMap } from './CampusMap'

// Tamaño real del dibujo del mapa. La base gris y la marca roja usan exactamente este tamaño
// y se escalan juntas, así el edificio marcado siempre cae encima de su forma en cualquier pantalla.
const MAP_WIDTH = 859.6
const MAP_HEIGHT = 902.239

// Mapa completo a pantalla completa con el edificio pedido resaltado. Se cierra tocándolo.
export function MapOverlay({ building, onClose }: { building: Building; onClose: () => void }) {
  const frame = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(0)

  // La escala sale del ancho real de la ventana del mapa.
  useLayoutEffect(() => {
    const element = frame.current
    if (!element) return
    const update = () => setScale(element.clientWidth / MAP_WIDTH)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // El dibujo base (e6429.svg) tiene todos los edificios en gris: solo se pinta de rojo el pedido.
  // Los edificios nuevos que el dibujo no trae (Mercaduca) se dibujan aquí en gris.
  const added = buildingList.filter((b) => b.notInBaseMap && b !== building)

  return (
    <div className="full-map-overlay" role="dialog" aria-label="Mapa del campus" onClick={onClose}>
      <div className="full-map-window" ref={frame}>
        <div
          style={{
            position: 'relative',
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <CampusMap />
          <svg
            aria-hidden="true"
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            viewBox="0 0 330 346.369"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {added.map((b) => (
              <path key={b.name} d={b.d} transform={`translate(${b.x} ${b.y})`} fill="#cdd1d2" />
            ))}
            <path d={building.d} transform={`translate(${building.x} ${building.y})`} fill="#d9694b" />
          </svg>
        </div>
      </div>
    </div>
  )
}
