import { useState } from 'react'
import { PageHeader } from '@/components/navigation/PageHeader'
import { donutSegments, unansweredQueries } from '@/data/dashboard'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { DataTable } from '@/ui/DataTable'
import { DonutChart, DonutLegend } from '@/ui/DonutChart'
import { ScreenLayout } from '@/ui/ScreenLayout'
import { SectionTitle } from '@/ui/SectionTitle'

// Análisis de contenido (administrativo): dona de consultas y tabla de preguntas sin respuesta.
export function ContentAnalysisScreen({ onBack }: { onBack: () => void }) {
  const [exported, setExported] = useState(false)

  const exportReport = () => {
    setExported(true)
    window.setTimeout(() => setExported(false), 2000)
  }

  return (
    <ScreenLayout variant="page">
      <PageHeader title="Análisis de Contenido" onBack={onBack} />
      <div className="page-body dashboard-body">
        <Card variant="donut">
          <h2>Distribución de Consultas</h2>
          <p>Total Consultas por Módulo</p>
          <DonutChart
            segments={donutSegments}
            centerValue="100%"
            centerLabel="consultas"
            ariaLabel="Consultas por módulo"
          />
          <DonutLegend segments={donutSegments} />
        </Card>

        <SectionTitle className="activity-title">Consultas sin Respuesta Recientes</SectionTitle>
        <DataTable
          ariaLabel="Consultas sin respuesta"
          columns={['Consulta Exacta', 'Módulo', 'Fecha']}
          rows={unansweredQueries.map((row) => [row.query, row.module, row.date])}
        />

        <div className="settings-spacer" />
        <Button variant="primary" className={exported ? 'is-done' : undefined} onClick={exportReport}>
          {exported ? 'Reporte exportado' : 'Exportar Reporte de Contenido'}
        </Button>
      </div>
    </ScreenLayout>
  )
}
