import { useEffect } from 'react'
import { Asset } from '@/ui/Asset'

// Duración total de la animación (debe coincidir con los tiempos de .intro en global.css).
const INTRO_DURATION = 3000
const REDUCED_DURATION = 900

// Pantalla de carga del Figma: aparece cada vez que se entra o se recarga el sitio.
//  1. Fondo azul: el búho entra saludando.
//  2. Un círculo blanco crece desde el centro y deja la versión blanca, en el mismo lugar.
//  3. Se desvanece y queda la app, que ya está lista debajo.
//  onDone: se llama al terminar, para quitarla
export function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(onDone, reduced ? REDUCED_DURATION : INTRO_DURATION)
    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <div className="intro" role="status" aria-label="Cargando Toko">
      <div className="intro-layer intro-blue">
        <Asset className="intro-owl" name="1e3cd.svg" />
      </div>
      <div className="intro-layer intro-white">
        <Asset className="intro-owl" name="5a857.svg" />
      </div>
    </div>
  )
}
