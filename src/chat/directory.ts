import { directory, type DirectoryEntry } from '@/data/directory'
import type { Reply } from '@/types/chat'
import { normalizeText } from './normalize'

// Directorio UCA: reconoce de qué oficina o persona pide el contacto y devuelve su tarjeta.

// Palabras que dicen "quiero un contacto".
const CONTACT_INTENT =
  /(^| )(telefono|numero|correo|email|mail|contacto|contactar|llamar|llamo|comunicarme|comunicar|extension|ext|directorio|escribirle|escribir a|pagina web|hablar con|a quien)( |$)/

// Mismo formato que las palabras clave de los temas: "=palabra" exacta, frase completa o inicio de palabra.
function matches(text: string, alias: string): boolean {
  const words = text.split(' ')
  if (alias.startsWith('=')) return words.includes(alias.slice(1))
  if (alias.includes(' ')) return ` ${text} `.includes(` ${alias} `) || ` ${text}`.includes(` ${alias}`)
  return words.some((word) => word.startsWith(alias))
}

// ¿Qué oficina o persona menciona el mensaje?
// Los nombres propios bastan si el mensaje es corto ("rectoría") o pide un contacto;
// las palabras genéricas ("ciencias sociales") solo si pide un contacto.
export function findDirectoryEntry(request: string): DirectoryEntry | null {
  const text = normalizeText(request)
  const wantsContact = CONTACT_INTENT.test(text)
  const short = text.split(' ').filter((w) => w.length > 2).length <= 3

  let best: { entry: DirectoryEntry; strength: number } | null = null
  for (const entry of directory) {
    const strong = entry.aliases.strong.some((a) => matches(text, a))
    const weak = (entry.aliases.weak ?? []).some((a) => matches(text, a))
    const strength = strong && (short || wantsContact) ? 2 : weak && wantsContact ? 1 : 0
    if (strength > (best?.strength ?? 0)) best = { entry, strength }
  }
  return best?.entry ?? null
}

// ¿Pide un contacto, aunque no diga de quién?
export const wantsContact = (request: string) => CONTACT_INTENT.test(normalizeText(request))

export function directoryReply(entry: DirectoryEntry): Reply {
  return {
    text: entry.kind === 'person' ? 'Este es su contacto:' : 'Claro, este es el contacto:',
    card: { kind: 'directory', entry },
  }
}

// "directorio" a secas: qué oficinas hay.
export function directoryListReply(): Reply {
  const offices = directory
    .filter((e) => e.kind === 'office')
    .map((e) => `• ${e.title.replace('Directorio · ', '')}`)
    .join('\n')
  return {
    text: `Tengo el contacto de estas oficinas:\n${offices}\nDime cuál necesitas, por ejemplo "teléfono de Admisiones".`,
  }
}
