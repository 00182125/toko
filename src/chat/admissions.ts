import { careerChangeCard, readmissionCard } from '@/data/admissionsCards'
import { faqEntries } from '@/data/faq'
import type { ChatCard, Reply } from '@/types/chat'
import { faqReply } from './faq'
import { normalizeText } from './normalize'

// Cambio de carrera y reingreso a grado: sus preguntas comparten palabras, así que el buscador
// general a veces elige la equivocada. Aquí se decide por lo que pregunta.
//  · La pregunta general ("quiero cambiarme de carrera", "quiero regresar a la UCA") recibe la TARJETA.
//  · "Explícame cómo hacerlo" da después el paso a paso (ver data/steps.ts).
//  · Volver a OTRA carrera es cambio de carrera (C8); volver a la misma es reingreso.
const ABOUT_CHANGE =
  /cambi\w* (uno )?(de )?carrera|(otra|nueva|segunda) carrera|carrera (diferente|distinta)|equivalencias internas|carrera .*(quiero (cambiarme|otra|estudiar otra)|como me cambio)|(pasarme|pasarse|me paso|quiero pasar|puedo pasar|cambiarme|cambiarse|me cambio) (a|para) (la |el )?(carrera de )?(licenciatura en |ingenieria|arquitectura|derecho|economia|administracion|contaduria|mercadeo|psicologia|comunicaciones|filosofia|teologia|letras|diseno|sociologia|educacion|idiomas|ingles)/
// Volver a la UCA o a los estudios ("quiero regresar a mi casa" o "volver a hacer un examen" no cuentan).
const ABOUT_READMISSION =
  /reingres|(regresar|regreso|regresa|volver|vuelvo|retomar) .*(a la uca|a la u( |$)|a la universidad|a estudiar|mis estudios|mi carrera)|(deje|me retire|sin estudiar|no estudio).*(regres|volver|vuelvo)|volver si me sacaron|me aceptan de (nuevo|regreso)/

const CHANGE_INTENTS: Array<[RegExp, string]> = [
  [/(gradu|titulo|segunda carrera)/, 'C9'],
  [/(reingres|regres|volver|deje de estudiar|deje la u|me retire|sin estudiar|no estudio)/, 'C8'],
  [/(cuanto (cuesta|sale|vale|pago|me sale|cobran)|precio|arancel|costo|gratis|cobran|se paga|pagar|donde pago)/, 'C7'],
  [/(cuanto cum|que cum|piden cum)/, 'C3'],
  [
    /(negar|niegan|rechaz|decir que no|no me acepta|no puede|con (mal )?cum|cum (bajo|menor)|voy mal|me sacaron|tercera matricula|tres veces|(puedo|aceptan).*(reprob|aplace)|(reprob|aplace).*(puedo|aceptan))/,
    'C4',
  ],
  [/(cuando|fecha|plazo|en que ciclo|mitad de ciclo|cualquier momento|primer ano|cuanto tarda|cuantas veces)/, 'C6'],
  [/(materia|equivalencia|convalid|repetir|de cero|pierdo|me valen|lo que ya|reconocen)/, 'C5'],
  [/(donde|a quien|con quien|oficina|decanato|quien (autoriza|aprueba)|registro|facultad|carta)/, 'C2'],
  [/(requisito|que (necesito|me piden|piden|debo)|documentos|cupo|examen|entrevista|prueba|solvente|toman en cuenta|deciden)/, 'C3'],
]

const READMISSION_INTENTS: Array<[RegExp, string]> = [
  [/(cuanto (cuesta|sale|vale|pago|me cobran|dinero)|precio|arancel|costo|gratis|cobran|se paga|pagar|pago)/, 'R4'],
  [/(cuantos ciclos|que es\b|que significa|para quien|quien (tiene|debe)|necesito (hacer )?reingreso|tengo que hacer|debo hacer|interciclo|se considera|aplico|soy estudiante|un ciclo|dos ciclos|despues de cuanto|hace un ano)/, 'R6'],
  [/(negar|niegan|rechaz|no aceptan|no puede|\bcum\b|reprob|me sacaron|cupo|toman en cuenta|deciden|quien (aprueba|autoriza)|es seguro|me aceptan de)/, 'R5'],
  [/(cuando|hasta|fecha|plazo|periodo|ciclo 01|todavia|cuanto tarda|respuesta|me aceptaron|en que ciclo)/, 'R3'],
  [/(requisito|que (necesito|me piden|piden|debo|hay que)|documentos|solvente|deuda|debo|multa|correo|formulario|lleno)/, 'R2'],
]

// La pregunta general de cada trámite lleva su tarjeta.
const CARDS: Record<string, ChatCard> = {
  C1: { kind: 'info', data: careerChangeCard },
  R1: { kind: 'info', data: readmissionCard },
}

const answer = (id: string): Reply | null => {
  const reply = faqReply(`entry:${id}`)
  return reply && CARDS[id] ? { ...reply, card: CARDS[id] } : reply
}

export function admissionsReply(text: string): Reply | null {
  const change = ABOUT_CHANGE.test(text)
  if (!change && !ABOUT_READMISSION.test(text)) return null
  // Una pregunta oficial escrita tal cual conserva su respuesta oficial.
  const official = faqEntries.find((entry) => normalizeText(entry.question) === text)
  if (official) return answer(official.id)
  // Con beca o en posgrado hay respuestas propias en sus reglamentos.
  if (/(beca|maestria|doctorado|posgrado|postgrado)/.test(text)) return null
  const intents = change ? CHANGE_INTENTS : READMISSION_INTENTS
  return answer(intents.find(([pattern]) => pattern.test(text))?.[1] ?? (change ? 'C1' : 'R1'))
}

// Para el invitado: la información se le da en texto, sin el botón que pide cuenta UCA.
export const isAdmissionsCard = (card?: ChatCard) =>
  card?.kind === 'info' && (card.data === careerChangeCard || card.data === readmissionCard)
