import { useEffect, useState, type FormEvent } from 'react'
import { CodeInput } from '@/components/auth/CodeInput'
import { Logo } from '@/components/brand/Logo'
import { ShyToko } from '@/components/brand/ShyToko'
import type { Navigate } from '@/types/navigation'
import { Asset } from '@/ui/Asset'
import { Button } from '@/ui/Button'
import { IconButton } from '@/ui/IconButton'
import { ScreenLayout } from '@/ui/ScreenLayout'
import { TextField } from '@/ui/TextField'

// Recuperar contraseña, en tres pasos dentro de la misma pantalla:
//  1. email    → escribe su correo y toca "Enviar enlace" (burbuja: "Revisa el código…")
//  2. code     → escribe el código de 6 dígitos que le llegó
//  3. password → nueva contraseña + confirmarla → "Cambiar contraseña" → iniciar sesión
type Step = 'email' | 'code' | 'password'

const CODE_LENGTH = 6
const TOAST_DURATION = 3200
// Después de cambiar la contraseña, se ve la burbuja un momento y pasa a iniciar sesión.
const DONE_DELAY = 1600

const errorIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="#b3261e" strokeWidth="1.4" />
    <path d="M8 4.6V8.4" stroke="#b3261e" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="11" r="0.9" fill="#b3261e" />
  </svg>
)

export function RecoveryScreen({ navigate }: { navigate: Navigate }) {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null)
  const [done, setDone] = useState(false)

  // Búho de la nueva contraseña: se tapa los ojos igual que en el inicio de sesión.
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const showToast = (text: string) => setToast({ id: Date.now(), text })

  // La burbuja se va sola después de unos segundos.
  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), TOAST_DURATION)
    return () => window.clearTimeout(timer)
  }, [toast])

  // Contraseña cambiada: un momento para leer la burbuja y luego a iniciar sesión.
  useEffect(() => {
    if (!done) return
    const timer = window.setTimeout(() => navigate('login-student'), DONE_DELAY)
    return () => window.clearTimeout(timer)
  }, [done, navigate])

  const goTo = (next: Step) => {
    setError('')
    setStep(next)
  }

  const back = () => {
    if (step === 'password') goTo('code')
    else if (step === 'code') goTo('email')
    else navigate('login-student')
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (done) return

    if (step === 'email') {
      if (!email.trim()) return setError('Ingresa tu correo institucional.')
      setCode('')
      showToast('Revisa el código que te hemos enviado a tu correo.')
      return goTo('code')
    }

    if (step === 'code') {
      if (code.length < CODE_LENGTH) return setError(`Escribe los ${CODE_LENGTH} dígitos del código.`)
      return goTo('password')
    }

    if (!password.trim() || !confirm.trim()) return setError('Completa los dos campos.')
    if (password !== confirm) return setError('Las contraseñas no coinciden.')
    setError('')
    showToast('¡Contraseña actualizada! Ya puedes iniciar sesión.')
    setDone(true)
  }

  const copy: Record<Step, { title: string; text: string; action: string }> = {
    email: {
      title: 'Recuperar contraseña',
      text: 'Ingresa tu correo institucional para recuperar tu contraseña.',
      action: 'Enviar enlace',
    },
    code: {
      title: 'Ingresa el código',
      text: `Escribe el código de ${CODE_LENGTH} dígitos que enviamos a ${email.trim()}.`,
      action: 'Verificar código',
    },
    password: {
      title: 'Nueva contraseña',
      text: 'Crea tu nueva contraseña y confírmala para terminar.',
      action: 'Cambiar contraseña',
    },
  }
  const { title, text, action } = copy[step]

  return (
    <ScreenLayout variant="auth">
      <IconButton variant="back" icon="71473.svg" label="Volver" onClick={back} />

      {toast ? (
        <div className="recovery-toast" key={toast.id} role="status">
          <div className="sent-bubble">
            <span className="sent-check">
              <Asset name="1b5eb.svg" />
            </span>
            <p>{toast.text}</p>
          </div>
        </div>
      ) : null}

      <form className="auth-content recovery-content" onSubmit={submit} noValidate>
        <Logo />
        {step === 'password' ? (
          <ShyToko className="auth-toko" covered={passwordFocused && !passwordVisible} />
        ) : (
          <Asset className="auth-toko" name="d2168.svg" />
        )}

        {/* Cada paso entra con una animación suave */}
        <div className="recovery-step" key={step}>
          <div className="recovery-copy">
            <h1>{title}</h1>
            <p>{text}</p>
          </div>

          <div className="auth-fields">
            {step === 'email' ? (
              <TextField
                icon="9e8ca.svg"
                placeholder="Correo institucional"
                type="email"
                value={email}
                onChange={(value) => {
                  setEmail(value)
                  setError('')
                }}
                invalid={Boolean(error)}
              />
            ) : null}

            {step === 'code' ? (
              <CodeInput
                value={code}
                length={CODE_LENGTH}
                invalid={Boolean(error)}
                onChange={(value) => {
                  setCode(value)
                  setError('')
                }}
              />
            ) : null}

            {step === 'password' ? (
              <>
                <TextField
                  icon="47417.svg"
                  placeholder="Nueva contraseña"
                  type="password"
                  value={password}
                  onChange={(value) => {
                    setPassword(value)
                    setError('')
                  }}
                  invalid={Boolean(error) && (!password.trim() || password !== confirm)}
                  passwordVisible={passwordVisible}
                  onPasswordVisibleChange={setPasswordVisible}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <TextField
                  icon="47417.svg"
                  placeholder="Confirmar contraseña"
                  type="password"
                  value={confirm}
                  onChange={(value) => {
                    setConfirm(value)
                    setError('')
                  }}
                  invalid={Boolean(error) && (!confirm.trim() || password !== confirm)}
                  passwordVisible={passwordVisible}
                  onPasswordVisibleChange={setPasswordVisible}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              </>
            ) : null}

            {error ? (
              <p className="auth-error" role="alert">
                {errorIcon}
                {error}
              </p>
            ) : null}
          </div>

          <div className="auth-actions">
            <Button variant="primary" type="submit" disabled={done}>
              {action}
            </Button>
            {step === 'code' ? (
              <Button
                variant="text"
                className="recovery-action"
                onClick={() => {
                  setCode('')
                  setError('')
                  showToast('Te enviamos un código nuevo. Revisa tu correo.')
                }}
              >
                ¿No te llegó? Reenviar código
              </Button>
            ) : null}
          </div>
        </div>
      </form>
    </ScreenLayout>
  )
}
