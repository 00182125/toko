import { useEffect, useState } from 'react'

// Animaciones hechas en código (las que CSS no puede hacer solo: contar números, dibujar la dona).
// Si la persona pidió "reducir movimiento" en su sistema, todo aparece directo en su valor final.

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Arranca rápido y frena suave al final.
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

// Avance de 0 a 1 durante "duration" ms, después de esperar "delay" ms.
export function useProgress(duration = 900, delay = 0): number {
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 1 : 0))

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(1)
      return
    }
    let frame = 0
    let start: number | null = null
    const tick = (now: number) => {
      start ??= now + delay
      const t = Math.min(Math.max((now - start) / duration, 0), 1)
      setProgress(easeOutCubic(t))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration, delay])

  return progress
}

// Número que cuenta desde 0 hasta su valor: "2,804", "867", "100%".
// Respeta lo que va antes y después del número y las comas de miles.
// Si el texto no tiene número, se muestra tal cual.
export function CountUp({ value, duration = 1100, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const progress = useProgress(duration, delay)
  const match = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/)
  if (!match) return <>{value}</>

  const [, before, digits, after] = match
  const target = Number(digits.replace(/,/g, ''))
  const decimals = digits.includes('.') ? digits.split('.')[1].length : 0
  const current = (target * progress).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: digits.includes(','),
  })

  // El lector de pantalla oye el valor final, no cada número intermedio.
  return (
    <span aria-label={value}>
      <span aria-hidden="true">
        {before}
        {current}
        {after}
      </span>
    </span>
  )
}
