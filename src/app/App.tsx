import { useCallback, useRef, useState, type ReactNode } from 'react'
import { BrowserRouter, Navigate as Redirect, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router'
import { NavBar } from '@/components/navigation/NavBar'
import { useChat } from '@/hooks/useChat'
import { AccessScreen } from '@/screens/AccessScreen'
import { AuthScreen } from '@/screens/AuthScreen'
import { CalendarScreen } from '@/screens/CalendarScreen'
import { ChatScreen } from '@/screens/ChatScreen'
import { ContentAnalysisScreen } from '@/screens/ContentAnalysisScreen'
import { DashboardScreen } from '@/screens/DashboardScreen'
import { HelpScreen } from '@/screens/HelpScreen'
import { NotificationsScreen } from '@/screens/NotificationsScreen'
import { RecoveryScreen } from '@/screens/RecoveryScreen'
import { SettingsScreen } from '@/screens/SettingsScreen'
import { SplashScreen } from '@/screens/SplashScreen'
import type { Navigate, Screen, Session, Tab } from '@/types/navigation'
import { pathOf, paths, tabFromPath } from './routes'
import { allowed, fallbackFor, useSession } from './session'
import { saveSuggestion } from './suggestions'

export default function App() {
  // La pantalla de carga sale cada vez que se entra o se recarga el sitio, en cualquier ruta.
  const [intro, setIntro] = useState(true)
  const endIntro = useCallback(() => setIntro(false), [])

  return (
    <>
      {/* basename: en GitHub Pages las rutas cuelgan de /toko/ (ver vite.config.ts) */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRoutes />
      </BrowserRouter>
      {intro ? <SplashScreen onDone={endIntro} /> : null}
    </>
  )
}

// Las pantallas no conocen el router: reciben "navigate('home')" y aquí se traduce a una URL.
function useScreenNavigate(): Navigate {
  const routerNavigate = useNavigate()
  return useCallback((screen) => routerNavigate(pathOf(screen)), [routerNavigate])
}

// Marco común: animación de entrada al cambiar de URL y barra inferior cuando corresponde.
//  hiddenTabs: pestañas que esta sesión no puede usar (el invitado no tiene Calendario)
function Frame({ hiddenTabs }: { hiddenTabs: Tab[] }) {
  const { pathname } = useLocation()
  const navigate = useScreenNavigate()
  const activeTab = tabFromPath(pathname)

  return (
    <>
      <div className="screen-enter" key={pathname}>
        <Outlet />
      </div>
      {activeTab ? <NavBar active={activeTab} onChange={navigate} hidden={hiddenTabs} /> : null}
    </>
  )
}

// Guardia de una pantalla: si esta sesión no puede verla, la manda al chat
// (o al acceso si nadie ha entrado). Así el invitado no llega al calendario escribiendo la URL.
function Guard({ screen, session, children }: { screen: Screen; session: Session | null; children: ReactNode }) {
  const who = allowed[screen]
  if (who && (!session || !who.includes(session))) {
    return <Redirect to={pathOf(fallbackFor(session))} replace />
  }
  return children
}

function AppRoutes() {
  const navigate = useScreenNavigate()
  const routerNavigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  // Pregunta que Toko no entendió y la persona quiere sugerir (llega desde el chat a Ayuda).
  const suggestion = (location.state as { suggest?: string } | null)?.suggest
  const suggestQuestion = (question: string) => routerNavigate(paths.help, { state: { suggest: question } })
  const { session, start, end } = useSession()
  const guest = session === 'guest'

  // El chat vive aquí (no en su pantalla) para que la conversación no se pierda al cambiar de ruta.
  const currentPath = useRef(pathname)
  currentPath.current = pathname
  const chat = useChat({
    guest,
    onAutoOpenCalendar: () => {
      if (!guest && currentPath.current === paths.home) navigate('calendar')
    },
  })

  // Entrar o salir: cada sesión empieza con la conversación limpia.
  const enter = (next: Session) => {
    if (next !== session) chat.resetChat()
    start(next)
  }
  const leave = () => {
    chat.resetChat()
    end()
    navigate('access')
  }

  const guard = (screen: Screen, element: ReactNode) => (
    <Guard screen={screen} session={session}>
      {element}
    </Guard>
  )

  return (
    <Routes>
      <Route element={<Frame hiddenTabs={guest ? ['calendar'] : []} />}>
        <Route index element={<Redirect to={pathOf(fallbackFor(session))} replace />} />
        <Route
          path={paths.access}
          element={
            <AccessScreen
              navigate={navigate}
              onGuest={() => {
                enter('guest')
                navigate('home')
              }}
            />
          }
        />
        <Route
          path={paths['login-student']}
          element={<AuthScreen key="student" mode="login" role="student" navigate={navigate} onAuthenticated={enter} />}
        />
        <Route
          path={paths['login-admin']}
          element={<AuthScreen key="admin" mode="login" role="admin" navigate={navigate} onAuthenticated={enter} />}
        />
        <Route
          path={paths.signup}
          element={<AuthScreen key="signup" mode="signup" navigate={navigate} onAuthenticated={enter} />}
        />
        <Route path={paths.recovery} element={<RecoveryScreen navigate={navigate} />} />
        <Route
          path={paths.home}
          element={guard(
            'home',
            <ChatScreen
              messages={chat.messages}
              typing={chat.typing}
              onSend={chat.sendMessage}
              onOpenCalendar={() => navigate('calendar')}
              guest={guest}
              onCreateAccount={() => navigate('signup')}
              onSuggestQuestion={suggestQuestion}
            />,
          )}
        />
        <Route path={paths.calendar} element={guard('calendar', <CalendarScreen onBack={() => navigate('home')} />)} />
        <Route
          path={paths.help}
          element={guard('help', <HelpScreen guest={guest} onSuggest={saveSuggestion} suggestion={suggestion} />)}
        />
        <Route
          path={paths.settings}
          element={guard(
            'settings',
            guest ? (
              <SettingsScreen
                guest
                onBack={() => navigate('home')}
                onHelp={() => navigate('help')}
                onCreateAccount={() => navigate('signup')}
                onLogin={() => navigate('login-student')}
                onExitGuest={leave}
              />
            ) : (
              <SettingsScreen
                onBack={() => navigate('home')}
                onNotifications={() => navigate('notifications')}
                onPassword={() => navigate('recovery')}
                onHelp={() => navigate('help')}
                onLogout={leave}
              />
            ),
          )}
        />
        <Route
          path={paths.notifications}
          element={guard('notifications', <NotificationsScreen onBack={() => navigate('settings')} />)}
        />
        <Route
          path={paths.dashboard}
          element={guard(
            'dashboard',
            <DashboardScreen onBack={leave} onContent={() => navigate('dashboard-content')} />,
          )}
        />
        <Route
          path={paths['dashboard-content']}
          element={guard('dashboard-content', <ContentAnalysisScreen onBack={() => navigate('dashboard')} />)}
        />
        {/* Cualquier dirección desconocida vuelve al acceso */}
        <Route path="*" element={<Redirect to={paths.access} replace />} />
      </Route>
    </Routes>
  )
}
