import { useState } from 'react'
import { Asset } from './Asset'

// Campo de texto con ícono a la izquierda.
// Si es de contraseña, a la derecha va el botón del ojo para mostrarla u ocultarla
// (se puede reemplazar por otro ícono fijo con trailingIcon).
//  passwordVisible / onPasswordVisibleChange: opcionales, para que la pantalla sepa
//  si la contraseña se ve (por ejemplo, para que el búho no se tape los ojos).
export function TextField({
  icon,
  placeholder,
  type = 'text',
  value,
  invalid = false,
  trailingIcon,
  passwordVisible,
  onPasswordVisibleChange,
  onChange,
  onFocus,
  onBlur,
}: {
  icon: string
  placeholder: string
  type?: 'text' | 'email' | 'password'
  value?: string
  invalid?: boolean
  trailingIcon?: string
  passwordVisible?: boolean
  onPasswordVisibleChange?: (visible: boolean) => void
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}) {
  const [ownVisible, setOwnVisible] = useState(false)
  const visible = passwordVisible ?? ownVisible
  const setVisible = (next: boolean) => {
    setOwnVisible(next)
    onPasswordVisibleChange?.(next)
  }
  const isPassword = type === 'password' && !trailingIcon

  return (
    <label className={`field ${invalid ? 'field-invalid' : ''}`}>
      <Asset name={icon} />
      <input
        aria-label={placeholder}
        aria-invalid={invalid}
        type={isPassword && visible ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isPassword ? <PasswordToggle visible={visible} onToggle={() => setVisible(!visible)} /> : null}
      {trailingIcon ? <Asset name={trailingIcon} /> : null}
    </label>
  )
}

// Ojo para mostrar u ocultar la contraseña.
// Oculta = ojo con barra en medio. Visible = la barra se retrae y queda el ojo abierto.
function PasswordToggle({ visible, onToggle }: { visible: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={`password-toggle ${visible ? 'password-toggle-visible' : ''}`}
      aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
      aria-pressed={visible}
      // Evita que el campo pierda el foco al tocar el ojo (el búho seguiría tapándose los ojos).
      onMouseDown={(event) => event.preventDefault()}
      onClick={onToggle}
    >
      <Asset name="42c56.svg" />
      <svg className="eye-slash" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <line className="eye-slash-gap" x1="3" y1="3" x2="17" y2="17" pathLength={1} />
        <line className="eye-slash-bar" x1="3" y1="3" x2="17" y2="17" pathLength={1} />
      </svg>
    </button>
  )
}
