import type { CSSProperties } from 'react'
import { Logo } from '@/components/brand/Logo'
import { navTabs } from '@/data/navigation'
import type { Tab } from '@/types/navigation'
import { Icon } from '@/ui/Icon'

// Barra inferior con la píldora que se desliza hasta la pestaña activa.
// En computadora es el menú lateral: logo arriba, pestañas en columna y la píldora baja
// hasta la pestaña activa (el logo y el pie solo se ven ahí).
//  hidden: pestañas que no se muestran (el invitado no tiene Calendario)
export function NavBar({
  active,
  onChange,
  hidden = [],
}: {
  active: Tab
  onChange: (tab: Tab) => void
  hidden?: Tab[]
}) {
  const tabs = navTabs.filter((tab) => !hidden.includes(tab.id))
  const index = tabs.findIndex((tab) => tab.id === active)
  return (
    <nav className="nav-wrap" aria-label="Navegación principal">
      <div className="nav-brand">
        <Logo />
      </div>
      <div className="nav-bar" style={{ '--i': index, '--n': tabs.length } as CSSProperties}>
        <span className="nav-pill" aria-hidden="true" />
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={`nav-tab ${tab.id === active ? 'nav-tab-active' : ''}`}
            aria-current={tab.id === active ? 'page' : undefined}
            onClick={() => onChange(tab.id)}
          >
            <Icon name={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <p className="nav-foot">Toko · Asistente UCA</p>
    </nav>
  )
}
