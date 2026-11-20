// Una pregunta frecuente de los reglamentos UCA.
//  id: número de la pregunta en la guía (P1…P240)
//  question: la pregunta tal como está en la guía
//  answer: la respuesta oficial de la guía
//  variants: otras formas en que un alumno podría escribir la misma pregunta
export type FaqEntry = {
  id: string
  question: string
  answer: string
  variants: string[]
}

// Un tema general que atraviesa varios reglamentos ("¿hay algo sobre acoso?").
//  answer: resumen que da Toko, armado solo con lo que dicen las respuestas oficiales
//  variants: formas en que un alumno pregunta por el tema
//  related: preguntas oficiales (P1…P240) en las que se basa, para profundizar
//  keywords: si el mensaje tiene una de estas palabras, se responde este tema
//    sin importar cómo esté redactado. Se escriben en minúsculas y sin tildes;
//    una palabra suelta vale como inicio ("acos" → acoso, acosan, acosador),
//    con "=" delante debe ser la palabra exacta ("=cum" no reconoce "cumplir")
//    y una frase con espacios debe aparecer completa ("servicio social").
export type FaqTopic = {
  id: string
  title: string
  answer: string
  variants: string[]
  related: string[]
  keywords?: string[]
}

// Un reglamento con sus preguntas frecuentes.
export type FaqRegulation = {
  id: string
  title: string
  entries: FaqEntry[]
}
