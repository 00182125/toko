import { buildingList, type Building } from '@/data/buildings'
import type { Reply } from '@/types/chat'

const romanNumbers: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6 }
const wordNumbers: Record<string, number> = {
  uno: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
}

// Saca el número de Magna de un texto: "magna 3", "magna iii", "3", "tres"...
export function readMagnaNumber(text: string): number | null {
  const token = text.match(/\b(\d|vi|iv|iii|ii|v|i|uno|dos|tres|cuatro|cinco|seis)\b/)?.[1]
  if (!token) return null
  if (/^\d$/.test(token)) return Number(token)
  return romanNumbers[token] ?? wordNumbers[token] ?? null
}

// Grupos que necesitan una aclaración ("Aulas" -> A, B, C o D).
const locationGroups: Array<{ words: string[]; ask: string }> = [
  { words: ['magna'], ask: 'Hay varios Magna, del I al VI. ¿Cuál?' },
  { words: ['aula'], ask: 'Hay Aulas A, B, C y D. ¿Cuál buscas?' },
  { words: ['modulo'], ask: 'Hay Módulo A y Módulo B de Profesores. ¿Cuál buscas?' },
  {
    words: ['auditorio'],
    ask: 'Hay tres auditorios: Elba y Celina Ramos, Ignacio Ellacuría y Segundo Montes. ¿Cuál buscas?',
  },
  {
    words: ['laboratorio'],
    ask: 'Hay Laboratorios de Psicología y de Ingeniería. ¿Cuáles buscas?',
  },
  {
    words: ['centro'],
    ask: 'Hay varios centros: Orientación Profesional, Asuntos Estudiantiles, Cultural Universitario y Monseñor Romero. ¿Cuál buscas?',
  },
]

export const NOT_FOUND_BUILDING =
  'No encontré ese edificio. ¿Me dices su nombre? Por ejemplo: Biblioteca, Cafetería Central o Magna III.'

export function findBuilding(text: string): Building | 'ask-magna' | null {
  // Magna: "magna 3", "magna iii", "tres"...
  if (text.includes('magna')) {
    const number = readMagnaNumber(text.slice(text.indexOf('magna')))
    if (number && number >= 1 && number <= 6) return buildingList.find((b) => b.magna === number) ?? null
    return 'ask-magna'
  }
  // Aulas A-D: "aulas b", "edificio d"
  const letter = text.match(/\b(?:aulas?|edificio)\s+([abcd])\b/)?.[1]
  if (letter) {
    const found = buildingList.find((b) => b.aliases.includes(`aulas ${letter}`))
    if (found) return found
  }
  // El alias más largo que aparezca en el texto gana.
  let best: Building | null = null
  let bestLength = 0
  for (const b of buildingList) {
    for (const alias of b.aliases) {
      if (text.includes(alias) && alias.length > bestLength) {
        best = b
        bestLength = alias.length
      }
    }
  }
  return best
}

// Devuelve null si el mensaje no habla de un edificio.
// `before` es lo que la persona dijo antes cuando Toko le preguntó "¿cuál?".
export function locationReply(
  text: string,
  before = '',
): { reply: Reply; waiting: boolean } | null {
  const combined = before ? `${before} ${text}` : text
  const found = findBuilding(combined)
  if (found && found !== 'ask-magna') {
    return {
      reply: {
        text: `Aquí está ${found.name}:`,
        card: { kind: 'building', building: found },
      },
      waiting: false,
    }
  }
  if (found === 'ask-magna') {
    return { reply: { text: 'Hay varios Magna, del I al VI. ¿Cuál?' }, waiting: true }
  }
  const group = locationGroups.find((g) => g.words.some((w) => combined.includes(w)))
  if (group) return { reply: { text: group.ask }, waiting: true }
  return null
}
