import { ActivityList } from '@/components/dashboard/ActivityList'
import { StatCard } from '@/components/dashboard/StatCard'
import { PageHeader } from '@/components/navigation/PageHeader'
import { recentActivity } from '@/data/dashboard'
import { Button } from '@/ui/Button'
import { Icon } from '@/ui/Icon'
import { ScreenLayout } from '@/ui/ScreenLayout'
import { SectionTitle } from '@/ui/SectionTitle'

// Dashboard general (administrativo).
export function DashboardScreen({ onBack, onContent }: { onBack: () => void; onContent: () => void }) {
  return (
    <ScreenLayout variant="page">
      <PageHeader title="Dashboard General" onBack={onBack} />
      <div className="page-body dashboard-body">
        <StatCard
          tone="dark"
          label="Total Consultas"
          value="2,804"
          caption={
            <>
              <Icon name="arrow-up" size={16} />
              vs. mes anterior
            </>
          }
        />
        <StatCard tone="blue" label="Edificio Más Consultado" value="867" caption="Biblioteca CRAI" />

        <SectionTitle className="activity-title">Actividad Reciente</SectionTitle>
        <ActivityList items={recentActivity} />

        <div className="settings-spacer" />
        <Button variant="primary" onClick={onContent}>
          Análisis de Contenido
        </Button>
      </div>
    </ScreenLayout>
  )
}
