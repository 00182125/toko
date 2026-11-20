import { Asset } from '@/ui/Asset'
import { ScreenLayout } from '@/ui/ScreenLayout'

// Pantalla de carga con el búho. dark = fondo oscuro; si no, claro.
export function SplashScreen({ dark }: { dark: boolean }) {
  return (
    <ScreenLayout variant="splash" className={dark ? 'splash-dark' : 'splash-light'}>
      <Asset className="splash-toko" name={dark ? 'ea175.svg' : 'ac1e0.svg'} />
    </ScreenLayout>
  )
}
