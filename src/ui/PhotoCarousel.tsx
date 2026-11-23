import { useRef, useState } from 'react'

// Maneja el deslizamiento con el dedo o el mouse: devuelve la foto actual
// y los eventos que se le pegan al contenedor que se puede arrastrar.
export function useSwipe(count: number, threshold = 30) {
  const [index, setIndex] = useState(0)
  const dragStart = useRef<number | null>(null)

  const finish = (clientX: number) => {
    if (dragStart.current === null) return
    const distance = clientX - dragStart.current
    if (Math.abs(distance) > threshold) {
      setIndex((current) => (distance < 0 ? Math.min(current + 1, count - 1) : Math.max(current - 1, 0)))
    }
    dragStart.current = null
  }

  const handlers = {
    onPointerDown: (event: React.PointerEvent<HTMLElement>) => {
      if ((event.target as HTMLElement).closest('button')) return
      dragStart.current = event.clientX
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    onPointerUp: (event: React.PointerEvent<HTMLElement>) => finish(event.clientX),
    onPointerCancel: () => {
      dragStart.current = null
    },
  }

  return { index, handlers }
}

export type CarouselPhoto = { src: string; caption: string }

// Fotos en fila con puntitos que indican cuál se ve.
// index viene de useSwipe. Cada foto ocupa el 100% del ancho visible.
export function PhotoCarousel({
  photos,
  index,
}: {
  photos: CarouselPhoto[]
  index: number
}) {
  return (
    <div className="building-carousel">
      <div
        className="building-slides"
        style={{ width: `${photos.length * 100}%`, transform: `translateX(${(-index * 100) / photos.length}%)` }}
      >
        {photos.map((photo, photoIndex) => (
          <div className="building-photo" key={photo.caption} style={{ flexBasis: `${100 / photos.length}%`, width: `${100 / photos.length}%` }}>
            {/* draggable=false: el dedo desliza el carrusel en vez de arrastrar la imagen */}
            <img src={photo.src} alt={photo.caption} draggable={false} loading={photoIndex === 0 ? 'eager' : 'lazy'} decoding="async" />
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 'calc(140 * var(--u))',
          left: 'calc(121 * var(--u))',
          display: 'flex',
          alignItems: 'center',
          gap: 'calc(5 * var(--u))',
          padding: 'calc(5 * var(--u)) calc(7 * var(--u))',
          borderRadius: 999,
          background: '#07181f',
        }}
      >
        {photos.map((photo, photoIndex) => (
          <span
            key={photo.caption}
            style={{
              width: photoIndex === index ? 'calc(16 * var(--u))' : 'calc(6 * var(--u))',
              height: 'calc(6 * var(--u))',
              borderRadius: 3,
              background: '#ffffff',
              transition: 'width 300ms ease-out',
            }}
          />
        ))}
      </div>
    </div>
  )
}
