import { useState } from 'react'
import { PageHeader } from '@/components/navigation/PageHeader'
import { notificationModules } from '@/data/notifications'
import { Divider } from '@/ui/Divider'
import { ListRow } from '@/ui/ListRow'
import { ScreenLayout } from '@/ui/ScreenLayout'
import { SectionTitle } from '@/ui/SectionTitle'
import { Switch } from '@/ui/Switch'

// Elegir de qué módulos se quieren recibir avisos.
export function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(notificationModules.map((item) => [item.id, item.initial])),
  )

  return (
    <ScreenLayout variant="page" withNav>
      <PageHeader title="Notificaciones" onBack={onBack} />
      <div className="page-body">
        <p className="page-intro">Elige de qué módulos quieres recibir avisos.</p>
        <SectionTitle className="notif-title">Módulos</SectionTitle>
        {notificationModules.map((item, index) => (
          <div key={item.id}>
            {index > 0 && <Divider variant="settings" />}
            <ListRow
              variant="notification"
              icon={item.icon}
              title={item.title}
              subtitle={item.description}
              trailing={
                <Switch
                  checked={enabled[item.id]}
                  label={item.title}
                  onChange={(value) => setEnabled((current) => ({ ...current, [item.id]: value }))}
                />
              }
            />
          </div>
        ))}
        <p className="page-note">
          Puedes cambiar esto cuando quieras. Los avisos urgentes de la UCA siempre se envían.
        </p>
      </div>
    </ScreenLayout>
  )
}
