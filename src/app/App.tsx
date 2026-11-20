import { useCallback, useEffect, useRef, useState } from 'react'
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
import type { Navigate } from '@/types/navigation'
import { pathOf, paths, tabFromPath } from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

// Las pantallas no conocen el router: reciben "navigate('home')" y aquí se traduce a una URL.
function useScreenNavigate(): Navigate {
  const routerNavigate = useNavigate()
  return useCallback((screen) => routerNavigate(pathOf(screen)), [routerNavigate])
}

// Marco común: animación de entrada al cambiar de URL y barra inferior cuando corresponde.
function Frame() {
  const { pathname } = useLocation()
  const navigate = useScreenNavigate()
  const activeTab = tabFromPath(pathname)

  return (
    <>
      <div className="screen-enter" key={pathname}>
        <Outlet />
      </div>
      {activeTab ? <NavBar active={activeTab} onChange={navigate} /> : null}
    </>
  )
}

// Pantalla de carga en "/": oscura, luego clara, luego la de acceso.
function SplashRoute() {
  const routerNavigate = useNavigate()
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (dark) setDark(false)
      else routerNavigate(paths.access, { replace: true })
    }, 1200)
    return () => window.clearTimeout(timer)
  }, [dark, routerNavigate])

  return <SplashScreen dark={dark} />
}

function AppRoutes() {
  const navigate = useScreenNavigate()
  const { pathname } = useLocation()

  // El chat vive aquí (no en su pantalla) para que la conversación no se pierda al cambiar de ruta.
  const currentPath = useRef(pathname)
  currentPath.current = pathname
  const chat = useChat({
    onAutoOpenCalendar: () => {
      if (currentPath.current === paths.home) navigate('calendar')
    },
  })

  return (
    <Routes>
      <Route element={<Frame />}>
        <Route index element={<SplashRoute />} />
        <Route path={paths.access} element={<AccessScreen navigate={navigate} />} />
        <Route
          path={paths['login-student']}
          element={<AuthScreen key="student" mode="login" role="student" navigate={navigate} />}
        />
        <Route
          path={paths['login-admin']}
          element={<AuthScreen key="admin" mode="login" role="admin" navigate={navigate} />}
        />
        <Route path={paths.signup} element={<AuthScreen key="signup" mode="signup" navigate={navigate} />} />
        <Route path={paths.recovery} element={<RecoveryScreen navigate={navigate} />} />
        <Route
          path={paths.home}
          element={
            <ChatScreen
              messages={chat.messages}
              typing={chat.typing}
              onSend={chat.sendMessage}
              onOpenCalendar={() => navigate('calendar')}
            />
          }
        />
        <Route path={paths.calendar} element={<CalendarScreen onBack={() => navigate('home')} />} />
        <Route path={paths.help} element={<HelpScreen />} />
        <Route
          path={paths.settings}
          element={
            <SettingsScreen
              onBack={() => navigate('home')}
              onNotifications={() => navigate('notifications')}
              onPassword={() => navigate('recovery')}
              onHelp={() => navigate('help')}
              onLogout={() => {
                chat.resetChat()
                navigate('access')
              }}
            />
          }
        />
        <Route path={paths.notifications} element={<NotificationsScreen onBack={() => navigate('settings')} />} />
        <Route
          path={paths.dashboard}
          element={
            <DashboardScreen onBack={() => navigate('access')} onContent={() => navigate('dashboard-content')} />
          }
        />
        <Route
          path={paths['dashboard-content']}
          element={<ContentAnalysisScreen onBack={() => navigate('dashboard')} />}
        />
        {/* Cualquier dirección desconocida vuelve al acceso */}
        <Route path="*" element={<Redirect to={paths.access} replace />} />
      </Route>
    </Routes>
  )
}
