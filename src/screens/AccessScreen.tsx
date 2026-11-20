import { Logo } from '@/components/brand/Logo'
import type { Navigate } from '@/types/navigation'
import { Asset } from '@/ui/Asset'
import { Button } from '@/ui/Button'
import { ScreenLayout } from '@/ui/ScreenLayout'

// Pantalla para elegir cómo entrar: estudiante, administrativo o invitado.
export function AccessScreen({ navigate }: { navigate: Navigate }) {
  return (
    <ScreenLayout variant="access">
      <div className="access-content">
        <Logo />
        <Asset className="selector-toko" name="d2168.svg" />
        <div className="access-actions">
          <Button
            variant="access"
            className="student-access"
            icon={<Asset name="e51b5.svg" />}
            onClick={() => navigate('login-student')}
          >
            Soy estudiante UCA
          </Button>
          <Button
            variant="access"
            className="admin-access"
            icon={<Asset name="7c465.svg" />}
            onClick={() => navigate('login-admin')}
          >
            Soy administrativo UCA
          </Button>
          <Button
            variant="access"
            className="guest-access"
            icon={<Asset name="cc17c.svg" />}
            onClick={() => navigate('home')}
          >
            Soy invitado
          </Button>
          <p className="account-link">
            <span>¿No tienes cuenta?</span>
            <Button variant="link" onClick={() => navigate('signup')}>
              Créala
            </Button>
          </p>
        </div>
      </div>
    </ScreenLayout>
  )
}
