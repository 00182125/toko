import { useState, type FormEvent } from 'react'
import { Logo } from '@/components/brand/Logo'
import { ShyToko } from '@/components/brand/ShyToko'
import type { Navigate, Role } from '@/types/navigation'
import { Button } from '@/ui/Button'
import { IconButton } from '@/ui/IconButton'
import { ScreenLayout } from '@/ui/ScreenLayout'
import { TextField } from '@/ui/TextField'

const errorIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="#b3261e" strokeWidth="1.4" />
    <path d="M8 4.6V8.4" stroke="#b3261e" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.9" fill="#b3261e" />
  </svg>
)

// Iniciar sesión (estudiante o administrativo) y crear cuenta.
//  mode: 'login' o 'signup'
//  role: quién entra; cambia el ejemplo de correo y a dónde va después
//  onAuthenticated: avisa a la app quién entró (al crear cuenta se entra como estudiante)
export function AuthScreen({
  mode,
  role = 'student',
  navigate,
  onAuthenticated,
}: {
  mode: 'login' | 'signup'
  role?: Role
  navigate: Navigate
  onAuthenticated: (role: Role) => void
}) {
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)
  // El búho va igual que el ojo: contraseña oculta = se tapa; visible = mira.
  const owlCovered = passwordFocused && !passwordVisible
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [triedToSend, setTriedToSend] = useState(false)
  const isSignup = mode === 'signup'
  const isStudent = role === 'student'

  const missingName = isSignup && !name.trim()
  const missingEmail = !email.trim()
  const missingPassword = !password.trim()
  const hasMissing = missingName || missingEmail || missingPassword

  const submit = (event: FormEvent) => {
    event.preventDefault()
    // Si falta algún dato, avisamos en lugar de entrar.
    if (hasMissing) {
      setTriedToSend(true)
      return
    }
    const admin = !isSignup && !isStudent
    onAuthenticated(admin ? 'admin' : 'student')
    navigate(admin ? 'dashboard' : 'home')
  }

  return (
    <ScreenLayout variant="auth">
      <IconButton variant="back" icon="71473.svg" label="Volver" onClick={() => navigate('access')} />
      <form className="auth-content" onSubmit={submit}>
        <Logo />
        <ShyToko className="auth-toko" covered={owlCovered} />
        <div className="auth-fields">
          {isSignup && (
            <TextField
              icon="e098e.svg"
              placeholder="Nombre completo"
              value={name}
              onChange={setName}
              invalid={triedToSend && missingName}
            />
          )}
          <TextField
            icon="9e8ca.svg"
            placeholder={isStudent ? '00123456@uca.edu.sv' : 'nombre@uca.edu.sv'}
            type="email"
            value={email}
            onChange={setEmail}
            invalid={triedToSend && missingEmail}
          />
          <TextField
            icon="47417.svg"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={setPassword}
            invalid={triedToSend && missingPassword}
            passwordVisible={passwordVisible}
            onPasswordVisibleChange={setPasswordVisible}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          {triedToSend && hasMissing ? (
            <p className="auth-error" role="alert">
              {errorIcon}
              {isSignup ? 'Por favor, completa todos los campos.' : 'Por favor, ingresa tus datos.'}
            </p>
          ) : null}
        </div>
        <div className="auth-actions">
          <Button variant="primary" type="submit">
            {isSignup ? 'Crear cuenta' : 'Iniciar sesión'}
          </Button>
          {!isSignup && (
            <Button variant="text" className="recovery-action" onClick={() => navigate('recovery')}>
              ¿Olvidaste tu contraseña?
            </Button>
          )}
          {(isSignup || isStudent) && (
            <p className="account-link">
              <span>{isSignup ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}</span>
              <Button variant="link" onClick={() => navigate(isSignup ? 'login-student' : 'signup')}>
                {isSignup ? 'Inicia sesión' : 'Créala'}
              </Button>
            </p>
          )}
        </div>
      </form>
    </ScreenLayout>
  )
}
