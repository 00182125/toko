import type { FormEvent } from 'react'
import { Logo } from '@/components/brand/Logo'
import type { Navigate } from '@/types/navigation'
import { Asset } from '@/ui/Asset'
import { Button } from '@/ui/Button'
import { IconButton } from '@/ui/IconButton'
import { ScreenLayout } from '@/ui/ScreenLayout'
import { TextField } from '@/ui/TextField'

// Pantalla para pedir el enlace de recuperación de contraseña.
export function RecoveryScreen({ navigate }: { navigate: Navigate }) {
  const submit = (event: FormEvent) => {
    event.preventDefault()
    navigate('login-student')
  }

  return (
    <ScreenLayout variant="auth">
      <IconButton variant="back" icon="71473.svg" label="Volver" onClick={() => navigate('login-student')} />
      <form className="auth-content recovery-content" onSubmit={submit}>
        <Logo />
        <Asset className="auth-toko" name="d2168.svg" />
        <div className="recovery-copy">
          <h1>Recuperar contraseña</h1>
          <p>Ingresa tu correo institucional para recuperar tu contraseña.</p>
        </div>
        <div className="auth-fields">
          <TextField icon="9e8ca.svg" placeholder="Correo institucional" type="email" />
        </div>
        <div className="auth-actions">
          <Button variant="primary" type="submit">
            Enviar enlace
          </Button>
        </div>
      </form>
    </ScreenLayout>
  )
}
