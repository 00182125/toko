import { procedureLinks, type ProcedureCard } from '@/data/procedures'
import type { ChatCard, InfoRow } from '@/types/chat'
import { DirectoryCard } from '@/components/cards/DirectoryCard'
import { InfoCard } from '@/components/cards/InfoCard'
import { SuggestQuestionCard } from '@/components/cards/SuggestQuestionCard'
import { BuildingCard } from '@/components/map/BuildingCard'

// Convierte un trámite en las filas de su tarjeta: costo (si tiene), entrega y correo.
function procedureRows(card: ProcedureCard): InfoRow[] {
  const rows: InfoRow[] = []
  if (card.price) rows.push({ icon: '07931.svg', text: card.price })
  rows.push(
    { icon: card.deliveryIcon ?? '52519.svg', text: card.delivery },
    { icon: 'b1111.svg', text: 'registro.academico@uca.edu.sv' },
  )
  return rows
}

function ProcedureView({ card }: { card: ProcedureCard }) {
  return (
    <InfoCard
      title={card.title}
      description={
        card.description ??
        'Requisito: estar solvente. Entrega física en Unidad de Registro y envío digital a tu correo.'
      }
      rows={procedureRows(card)}
      action={card.action ?? 'Solicitar'}
      actionIcon="8df50.svg"
      href={procedureLinks[card.id] ?? card.href ?? 'https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp'}
      tone="transcript"
    />
  )
}

// Qué gana el invitado al crear su cuenta, según lo que intentó usar.
const lockedTitle = {
  dates: 'Calendario académico',
  reservation: 'Reserva de espacios',
  procedures: 'Trámites UCA',
} as const

// Dibuja la tarjeta que el motor del chat eligió.
//  onOpenCalendar: lo usa la tarjeta "Ver calendario"
//  onCreateAccount: lo usa la tarjeta de función bloqueada (modo invitado)
//  onSuggestQuestion: lo usa la tarjeta "No entendí tu pregunta" (lleva a Ayuda con la pregunta)
export function ChatCardView({
  card,
  onOpenCalendar,
  onCreateAccount,
  onSuggestQuestion,
}: {
  card: ChatCard
  onOpenCalendar: () => void
  onCreateAccount?: () => void
  onSuggestQuestion?: (question: string) => void
}) {
  switch (card.kind) {
    case 'suggest-question':
      return <SuggestQuestionCard onSuggest={() => onSuggestQuestion?.(card.question)} />
    case 'directory':
      return <DirectoryCard entry={card.entry} />
    case 'guest-locked':
      return (
        <InfoCard
          title={`${lockedTitle[card.feature]} · Solo con cuenta UCA`}
          description="Crea tu cuenta o inicia sesión con tu correo institucional para usar esta función."
          action="Crear cuenta"
          tone="transcript"
          onAction={onCreateAccount}
        />
      )
    case 'procedure':
      return <ProcedureView card={card.card} />
    case 'procedure-group':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'calc(8 * var(--u))' }}>
          {card.cards.map((item) => (
            <ProcedureView key={item.id} card={item} />
          ))}
        </div>
      )
    case 'reservation':
      return (
        <InfoCard
          title={card.card.title}
          description={card.card.description}
          rows={card.card.rows}
          action={card.card.action}
          actionIcon={card.card.actionIcon}
          href={card.card.href}
          tone="reservation"
        />
      )
    case 'info':
      return <InfoCard {...card.data} />
    case 'building':
      return <BuildingCard building={card.building} />
    case 'calendar-link':
      return (
        <InfoCard
          title="Calendario académico"
          description="Revisa clases, evaluaciones, vacaciones y asuetos del ciclo."
          action="Ver calendario"
          tone="dates"
          onAction={onOpenCalendar}
        />
      )
  }
}
