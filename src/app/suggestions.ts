// Preguntas que la gente sugiere desde Ayuda → "Sugerir una pregunta".
// Por ahora no hay servidor: se guardan en este navegador (localStorage).
// Cuando exista un backend, solo hay que cambiar saveSuggestion para que las envíe allá.

export type Suggestion = { text: string; date: string }

const KEY = 'toko-suggestions'

export function readSuggestions(): Suggestion[] {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Suggestion[]) : []
  } catch {
    return []
  }
}

export function saveSuggestion(text: string) {
  try {
    const list = [{ text, date: new Date().toISOString() }, ...readSuggestions()].slice(0, 200)
    window.localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    // Sin almacenamiento (modo privado): la confirmación igual se muestra.
  }
}
