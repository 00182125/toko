import { useRef, type ClipboardEvent, type KeyboardEvent } from 'react'

// Código de verificación en cuadritos, un dígito por cuadro.
//  · Al escribir un dígito, el cursor pasa solo al siguiente cuadro.
//  · Borrar en un cuadro vacío regresa al anterior.
//  · Se puede pegar el código completo de una vez.
//  value: los dígitos escritos ("123" = tres cuadros llenos)
//  length: cuántos cuadros (6 por defecto)
//  invalid: borde rojo, igual que los campos con error
export function CodeInput({
  value,
  onChange,
  length = 6,
  invalid = false,
}: {
  value: string
  onChange: (value: string) => void
  length?: number
  invalid?: boolean
}) {
  const boxes = useRef<Array<HTMLInputElement | null>>([])
  const focusNow = (index: number) => boxes.current[Math.max(0, Math.min(length - 1, index))]?.focus()
  // Después de cambiar el valor, el foco se mueve cuando React ya dibujó el nuevo dígito
  // (si no, el cuadro siguiente todavía "ve" el valor viejo y devuelve el cursor).
  const focus = (index: number) => requestAnimationFrame(() => focusNow(index))

  const write = (index: number, typed: string) => {
    const digits = typed.replace(/\D/g, '')
    if (!digits) return
    // Si escribió (o el teclado sugirió) varios dígitos, se reparten desde este cuadro.
    const next = (value.slice(0, index) + digits).slice(0, length)
    onChange(next)
    focus(next.length)
  }

  const keyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault()
      // Borra este cuadro; si ya estaba vacío, borra el anterior y regresa.
      const at = value[index] ? index : index - 1
      if (at < 0) return
      onChange(value.slice(0, at))
      focus(at)
    } else if (event.key === 'ArrowLeft') {
      focus(index - 1)
    } else if (event.key === 'ArrowRight') {
      focus(index + 1)
    }
  }

  const paste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const digits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!digits) return
    onChange(digits)
    focus(digits.length)
  }

  return (
    <div className={`code-input ${invalid ? 'code-input-invalid' : ''}`} role="group" aria-label="Código de verificación">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            boxes.current[index] = element
          }}
          className={`code-box ${value[index] ? 'code-box-filled' : ''}`}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={length}
          aria-label={`Dígito ${index + 1} de ${length}`}
          value={value[index] ?? ''}
          // Solo se puede escribir en el siguiente cuadro libre (así no quedan huecos).
          onFocus={() => {
            if (index > value.length) focus(value.length)
          }}
          // Si el cuadro ya tenía un dígito, se queda solo con el nuevo.
          onChange={(event) => write(index, event.target.value.replace(value[index] ?? '', ''))}
          onKeyDown={(event) => keyDown(index, event)}
          onPaste={paste}
        />
      ))}
    </div>
  )
}
