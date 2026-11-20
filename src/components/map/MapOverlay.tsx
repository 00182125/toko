import { useEffect, useState } from 'react'
import { buildingList, type Building } from '@/data/buildings'
import { CampusMap } from './CampusMap'

// Mapa completo a pantalla completa con el edificio pedido resaltado. Se cierra tocándolo.
export function MapOverlay({ building, onClose }: { building: Building; onClose: () => void }) {
  // El mapa mide 330 unidades de diseño de ancho; se ajusta al ancho real del teléfono.
  const [phoneWidth, setPhoneWidth] = useState(() => Math.min(window.innerWidth, 430))
  useEffect(() => {
    const update = () => setPhoneWidth(Math.min(window.innerWidth, 430))
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  const scale = (330 * (phoneWidth / 393)) / 859.6
  // El dibujo base trae Magna III resaltado; se pinta de gris para que solo se vea el edificio pedido.
  const magnaIII = buildingList.find((b) => b.magna === 3)

  return (
    <div className="full-map-overlay" role="dialog" aria-label="Mapa del campus" onClick={onClose}>
      <div className="full-map-window">
        <div
          style={{
            position: 'relative',
            width: 859.6,
            height: 902.239,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <CampusMap />
          <svg
            aria-hidden="true"
            width="859.6"
            height="902.239"
            viewBox="0 0 330 346.369"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {magnaIII ? (
              <path d={magnaIII.d} transform={`translate(${magnaIII.x} ${magnaIII.y})`} fill="#cdd1d2" />
            ) : null}
            <path d={building.d} transform={`translate(${building.x} ${building.y})`} fill="#d9694b" />
          </svg>
        </div>
      </div>
    </div>
  )
}
