import type { IconName } from '@/types/icons'
import { Icon } from '@/ui/Icon'

// Lista de actividad reciente: ícono, texto y cuántas veces se consultó.
export function ActivityList({ items }: { items: Array<{ icon: IconName; text: string; count: number }> }) {
  return (
    <ul className="activity-list">
      {items.map((item) => (
        <li key={item.text}>
          <span className="activity-icon">
            <Icon name={item.icon} size={20} />
          </span>
          <span className="activity-text">{item.text}</span>
          <span className="activity-count">Frecuencia: {item.count}</span>
        </li>
      ))}
    </ul>
  )
}
