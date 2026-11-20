import { useState } from 'react'
import { PageHeader } from '@/components/navigation/PageHeader'
import { Button } from '@/ui/Button'
import { Divider } from '@/ui/Divider'
import { Icon } from '@/ui/Icon'
import { ListRow } from '@/ui/ListRow'
import { ScreenLayout } from '@/ui/ScreenLayout'
import { SectionTitle } from '@/ui/SectionTitle'
import { Switch } from '@/ui/Switch'

type SettingsProps = {
  onBack: () => void
  onHelp: () => void
} & (
  | {
      // Con cuenta: perfil, contraseña, notificaciones y cerrar sesión.
      guest?: false
      onNotifications: () => void
      onPassword: () => void
      onLogout: () => void
    }
  | {
      // Invitado: sin datos de cuenta; puede crear una, iniciar sesión o salir.
      guest: true
      onCreateAccount: () => void
      onLogin: () => void
      onExitGuest: () => void
    }
)

// Ajustes: cuenta, preferencias y soporte.
export function SettingsScreen(props: SettingsProps) {
  const [darkMode, setDarkMode] = useState(false)

  const preferences = (
    <>
      <ListRow
        icon="moon"
        title="Modo Oscuro"
        trailing={<Switch checked={darkMode} label="Modo oscuro" onChange={setDarkMode} />}
      />
      <Divider variant="settings" />
      <ListRow icon="globe" title="Idioma" />
    </>
  )

  return (
    <ScreenLayout variant="page" withNav>
      <PageHeader title="Configuración" onBack={props.onBack} />
      <div className="page-body settings-body">
        {props.guest ? (
          <>
            <div className="guest-banner">
              <span className="guest-banner-icon">
                <Icon name="lock" />
              </span>
              <h2>Estás como invitado</h2>
              <p>
                Crea tu cuenta o inicia sesión con tu correo UCA para usar trámites, reservas, el calendario académico y
                las notificaciones.
              </p>
              <Button variant="primary" onClick={props.onCreateAccount}>
                Crear cuenta
              </Button>
            </div>

            <SectionTitle>Cuenta</SectionTitle>
            <ListRow icon="login" title="Iniciar sesión" trailing="chevron" onClick={props.onLogin} />
            <Divider variant="settings" />
            <ListRow icon="logout" title="Salir del modo invitado" onClick={props.onExitGuest} />

            <SectionTitle>Preferencias</SectionTitle>
            {preferences}
          </>
        ) : (
          <>
            <div className="profile">
              <div className="profile-avatar" />
              <h2>Username</h2>
              <p>00123425@uca.edu.sv</p>
            </div>

            <SectionTitle>Cuenta</SectionTitle>
            <ListRow icon="key" title="Cambiar Contraseña" trailing="chevron" onClick={props.onPassword} />
            <Divider variant="settings" />
            <ListRow icon="logout" title="Cerrar Sesión" onClick={props.onLogout} />

            <SectionTitle>Preferencias</SectionTitle>
            <ListRow
              icon="bell"
              title="Notificaciones"
              subtitle="Fechas, Trámites y Reservas"
              trailing="chevron"
              onClick={props.onNotifications}
            />
            <Divider variant="settings" />
            {preferences}
          </>
        )}

        <SectionTitle>Soporte Técnico</SectionTitle>
        <ListRow icon="help" title="Centro de Ayuda" onClick={props.onHelp} />
      </div>
    </ScreenLayout>
  )
}
