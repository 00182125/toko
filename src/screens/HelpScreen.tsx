import { SuggestionCard } from '@/components/help/SuggestionCard'
import { helpCards } from '@/data/help'
import { AccordionItem, useMultiOpen } from '@/ui/Accordion'
import { ScreenLayout } from '@/ui/ScreenLayout'

// Lo que un invitado sí puede pedirle a Toko (el resto necesita cuenta UCA).
const GUEST_HELP = ['rules', 'location', 'support']

// Qué puede hacer Toko: una tarjeta por tema que se despliega con su explicación.
//  guest: modo invitado → solo muestra lo que puede usar
//  onSuggest: recibe la pregunta que la persona sugiere en "Sugerir una pregunta"
//  suggestion: pregunta que Toko no entendió; abre "Sugerir una pregunta" con ese texto
export function HelpScreen({
  guest = false,
  onSuggest,
  suggestion,
}: {
  guest?: boolean
  onSuggest: (text: string) => void
  suggestion?: string
}) {
  const { isOpen, toggle } = useMultiOpen()
  const cards = guest ? helpCards.filter((card) => GUEST_HELP.includes(card.id)) : helpCards

  return (
    <ScreenLayout variant="help">
      <div className="help-scroll">
        <header className="home-greeting help-greeting">
          <h1>Toko te puede ayudar en</h1>
          <p>
            {guest
              ? 'Como invitado puedes usar estas funciones. Para trámites, reservas y el calendario, crea tu cuenta UCA.'
              : 'Toca una tarjeta para ver qué puedo hacer por ti'}
          </p>
        </header>
        <div className="help-cards">
          <SuggestionCard key={suggestion ?? ''} onSend={onSuggest} initialText={suggestion} />
          {cards.map((card, index) => (
            <AccordionItem
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              tone={card.tone}
              open={isOpen(card.id)}
              delay={(index + 1) * 50}
              onToggle={() => toggle(card.id)}
            >
              <p>{card.guide}</p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </ScreenLayout>
  )
}
