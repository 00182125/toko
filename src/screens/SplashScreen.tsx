import { useEffect } from 'react'
import { SplashOwl } from '@/components/brand/SplashOwl'

// Duración total de la animación (debe coincidir con los tiempos de .intro en global.css).
const INTRO_DURATION = 2500
const REDUCED_DURATION = 900

// Pantalla de carga: aparece cada vez que se entra o se recarga el sitio.
//  Sobre fondo azul: pop del búho → se mueve, parpadea y saluda → pop invertido → la app.
//  onDone: se llama al terminar, para quitarla
export function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(onDone, reduced ? REDUCED_DURATION : INTRO_DURATION)
    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <div className="intro" role="status" aria-label="Cargando Toko">
      <SplashOwl />
    </div>
  )
}
