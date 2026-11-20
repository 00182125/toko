import type { FaqEntry, FaqRegulation } from '@/types/faq'
import { gradoFaq } from './01-grado'
import { becasFaq } from './02-becas'
import { servicioSocialFaq } from './03-servicio-social'
import { bibliotecaFaq } from './04-biblioteca'
import { instructoriasFaq } from './05-instructorias'
import { lactanciaFaq } from './06-lactancia'
import { faltasFaq } from './07-faltas'
import { incorporacionFaq } from './08-incorporacion'
import { posgradoFaq } from './09-posgrado'
import { ceucaFaq } from './10-ceuca'
import { escalafonFaq } from './11-escalafon'
import { trabajoFaq } from './12-trabajo'

export { faqTopics } from './topics'

// Preguntas frecuentes de los 12 reglamentos UCA (guía FAQ v2): 240 preguntas,
// cada una con su respuesta oficial y 10 formas distintas de escribirla.
export const faqRegulations: FaqRegulation[] = [
  gradoFaq,
  becasFaq,
  servicioSocialFaq,
  bibliotecaFaq,
  instructoriasFaq,
  lactanciaFaq,
  faltasFaq,
  incorporacionFaq,
  posgradoFaq,
  ceucaFaq,
  escalafonFaq,
  trabajoFaq,
]

// Todas las preguntas en una sola lista, con el reglamento al que pertenecen.
export const faqEntries: Array<FaqEntry & { regulation: string }> = faqRegulations.flatMap((regulation) =>
  regulation.entries.map((entry) => ({ ...entry, regulation: regulation.title })),
)
