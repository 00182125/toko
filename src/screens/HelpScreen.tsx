import { helpCards } from '@/data/help'
import { AccordionItem, useMultiOpen } from '@/ui/Accordion'
import { ScreenLayout } from '@/ui/ScreenLayout'

// Qué puede hacer Toko: una tarjeta por tema que se despliega con su explicación.
export function HelpScreen() {
  const { isOpen, toggle } = useMultiOpen()

  return (
    <ScreenLayout variant="help">
      <div className="help-scroll">
        <header className="home-greeting help-greeting">
          <h1>Toko te puede ayudar en</h1>
          <p>Toca una tarjeta para ver qué puedo hacer por ti</p>
        </header>
        <div className="help-cards">
          {helpCards.map((card, index) => (
            <AccordionItem
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              tone={card.tone}
              open={isOpen(card.id)}
              delay={index * 50}
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
