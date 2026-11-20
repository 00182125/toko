import { Asset } from '@/ui/Asset'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { Divider } from '@/ui/Divider'

// Tarjeta "No entendí tu pregunta" (Figma: Card · Sin respuesta · Sugerir pregunta).
// Toko la muestra cuando, tras varios intentos, no logra responder. El botón lleva a Ayuda,
// a la tarjeta "Sugerir una pregunta", con la pregunta ya escrita.
//  onSuggest: se llama al tocar "Sugerir pregunta"
export function SuggestQuestionCard({ onSuggest }: { onSuggest?: () => void }) {
  return (
    <Card variant="info" className="suggest-question-card">
      <h2>No entendí tu pregunta</h2>
      <p className="info-description">Cuéntanos qué querías saber y ayuda a que Toko aprenda a responderla.</p>
      <Divider variant="info" />
      <Button variant="card-action" tone="transcript" onClick={onSuggest} icon={<Asset name="e8b1d.svg" />}>
        Sugerir pregunta
      </Button>
    </Card>
  )
}
