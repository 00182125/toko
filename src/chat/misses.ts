import type { Reply } from '@/types/chat'
import { normalizeText } from './normalize'

// Qué responde Toko cuando no entiende, según los intentos (no se rinde a la primera):
//  1.er y 2.º mensaje seguido sin entender → "No te entendí bien…, escríbela de otra forma"
//  3.er mensaje seguido, o si repite una pregunta que ya no entendió antes →
//    tarjeta "No entendí tu pregunta" con el botón para sugerirla en Ayuda.
//  Cuando entiende algo, la cuenta vuelve a cero (pero recuerda las preguntas no entendidas).

export type MissState = {
  // Mensajes seguidos que no entendió
  streak: number
  // Preguntas que no entendió en esta conversación (para notar si se repiten)
  history: string[]
}

export const NO_MISSES: MissState = { streak: 0, history: [] }

export const NOT_UNDERSTOOD = 'No te entendí bien. ¿Puedes escribir tu pregunta de otra forma?'
export const SUGGEST_QUESTION =
  'Parece que todavía no sé responder eso. Sugiere tu pregunta aquí y ayúdame a aprender:'

const MAX_TRIES = 3

const words = (text: string) => normalizeText(text).split(/[^a-z0-9]+/).filter((w) => w.length > 2)

// ¿Es casi la misma pregunta? (mismas palabras importantes en su mayoría)
function similar(a: string, b: string): boolean {
  if (normalizeText(a) === normalizeText(b)) return true
  const wa = new Set(words(a))
  const wb = new Set(words(b))
  if (wa.size === 0 || wb.size === 0) return false
  const shared = [...wa].filter((w) => wb.has(w)).length
  return shared / Math.max(wa.size, wb.size) >= 0.6
}

// Toko no entendió `request`: devuelve qué decir y cómo queda la cuenta.
export function onMiss(state: MissState, request: string): { reply: Reply; state: MissState } {
  const repeated = state.history.some((previous) => similar(previous, request))
  const streak = state.streak + 1
  const history = [...state.history, request].slice(-20)

  if (repeated || streak >= MAX_TRIES) {
    return {
      reply: { text: SUGGEST_QUESTION, card: { kind: 'suggest-question', question: request } },
      // Después de ofrecer la tarjeta se empieza a contar de nuevo.
      state: { streak: 0, history },
    }
  }
  return { reply: { text: NOT_UNDERSTOOD }, state: { streak, history } }
}

// Toko sí entendió: se reinicia la cuenta de intentos.
export const onUnderstood = (state: MissState): MissState => ({ ...state, streak: 0 })
