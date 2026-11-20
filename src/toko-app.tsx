'use client'

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'

const assets = '/assets'

type Screen =
  | 'loading-dark'
  | 'loading-light'
  | 'access'
  | 'login-student'
  | 'login-admin'
  | 'signup'
  | 'recovery'
  | 'home'
  | 'help'
  | 'settings'
  | 'notifications'
  | 'calendar'
  | 'dashboard'
  | 'dashboard-content'

type Role = 'student' | 'admin'
type ChatTopic = 'procedures' | 'dates' | 'reservation' | 'location' | 'support' | 'rules'

function Logo() {
  return (
    <div className="toko-logo" aria-label="Toko">
      <img className="logo-word w-[50px]" src={`${assets}/22d8f.svg`} alt="" />
      <img className="logo-cap" src={`${assets}/1a574.svg`} alt="" />
    </div> 
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="back-button" type="button" onClick={onClick} aria-label="Volver">
      <img src={`${assets}/71473.svg`} alt="" />
    </button>
  )
}

function Splash({ dark }: { dark: boolean }) {
  return (
    <main className={`splash ${dark ? 'splash-dark' : 'splash-light'}`}>
      <img className="splash-toko" src={`${assets}/${dark ? 'ea175.svg' : 'ac1e0.svg'}`} alt="" />
    </main>
  )
}

function AccessButton({
  children,
  className,
  icon,
  onClick,
}: {
  children: ReactNode
  className: string
  icon: string
  onClick: () => void
}) {
  return (
    <button className={`access-button ${className}`} type="button" onClick={onClick}>
      <img src={`${assets}/${icon}`} alt="" />
      <span>{children}</span>
    </button>
  )
}

function AccessSelector({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <main className="access-screen">
      <div className="access-content">
        <Logo />
        <img className="selector-toko" src={`${assets}/d2168.svg`} alt="" />
        <div className="access-actions">
          <AccessButton
            className="student-access"
            icon="e51b5.svg"
            onClick={() => navigate('login-student')}
          >
            Soy estudiante UCA
          </AccessButton>
          <AccessButton
            className="admin-access"
            icon="7c465.svg"
            onClick={() => navigate('login-admin')}
          >
            Soy administrativo UCA
          </AccessButton>
          <AccessButton className="guest-access" icon="cc17c.svg" onClick={() => navigate('home')}>
            Soy invitado
          </AccessButton>
          <p className="account-link">
            <span>¿No tienes cuenta?</span>
            <button type="button" onClick={() => navigate('signup')}>
              Créala
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}

function Field({
  icon,
  placeholder,
  type = 'text',
  value,
  invalid = false,
  onChange,
  onFocus,
  onBlur,
}: {
  icon: string
  placeholder: string
  type?: 'text' | 'email' | 'password'
  value?: string
  invalid?: boolean
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}) {
  return (
    <label className={`field ${invalid ? 'field-invalid' : ''}`}>
      <img src={`${assets}/${icon}`} alt="" />
      <input
        aria-label={placeholder}
        aria-invalid={invalid}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {type === 'password' && <img src={`${assets}/42c56.svg`} alt="" />}
    </label>
  )
}

function AuthScreen({
  mode,
  role = 'student',
  navigate,
}: {
  mode: 'login' | 'signup'
  role?: Role
  navigate: (screen: Screen) => void
}) {
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [triedToSend, setTriedToSend] = useState(false)
  const isSignup = mode === 'signup'
  const isStudent = role === 'student'
  const normalMascot = 'd2168.svg'
  const focusedMascot = isSignup ? 'dc9c6.svg' : isStudent ? '46b13.svg' : '7544b.svg'

  const missingName = isSignup && !name.trim()
  const missingEmail = !email.trim()
  const missingPassword = !password.trim()
  const hasMissing = missingName || missingEmail || missingPassword

  const submit = (event: FormEvent) => {
    event.preventDefault()
    // Si falta algún dato, avisamos en lugar de entrar.
    if (hasMissing) {
      setTriedToSend(true)
      return
    }
    navigate(!isSignup && !isStudent ? 'dashboard' : 'home')
  }

  return (
    <main className="auth-screen">
      <BackButton onClick={() => navigate('access')} />
      <form className="auth-content" onSubmit={submit}>
        <Logo />
        <img
          className={`auth-toko w-[50px]! ${passwordFocused ? 'auth-toko-focused' : ''}`}
          src={`${assets}/${passwordFocused ? focusedMascot : normalMascot}`}
          alt=""
        />
        <div className="auth-fields">
          {isSignup && (
            <Field
              icon="e098e.svg"
              placeholder="Nombre completo"
              value={name}
              onChange={setName}
              invalid={triedToSend && missingName}
            />
          )}
          <Field
            icon="9e8ca.svg"
            placeholder={isStudent ? '00123456@uca.edu.sv' : 'nombre@uca.edu.sv'}
            type="email"
            value={email}
            onChange={setEmail}
            invalid={triedToSend && missingEmail}
          />
          <Field
            icon="47417.svg"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={setPassword}
            invalid={triedToSend && missingPassword}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          {triedToSend && hasMissing ? (
            <p className="auth-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6.5" stroke="#b3261e" strokeWidth="1.4" />
                <path d="M8 4.6V8.4" stroke="#b3261e" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="8" cy="11" r="0.9" fill="#b3261e" />
              </svg>
              {isSignup ? 'Por favor, completa todos los campos.' : 'Por favor, ingresa tus datos.'}
            </p>
          ) : null}
        </div>
        <div className="auth-actions">
          <button className="primary-action" type="submit">
            {isSignup ? 'Crear cuenta' : 'Iniciar sesión'}
          </button>
          {!isSignup && (
            <button
              className="text-action recovery-action"
              type="button"
              onClick={() => navigate('recovery')}
            >
              ¿Olvidaste tu contraseña?
            </button>
          )}
          {(isSignup || isStudent) && (
            <p className="account-link">
              <span>{isSignup ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}</span>
              <button type="button" onClick={() => navigate(isSignup ? 'login-student' : 'signup')}>
                {isSignup ? 'Inicia sesión' : 'Créala'}
              </button>
            </p>
          )}
        </div>
      </form>
    </main>
  )
}

function RecoveryScreen({ navigate }: { navigate: (screen: Screen) => void }) {
  const submit = (event: FormEvent) => {
    event.preventDefault()
    navigate('login-student')
  }

  return (
    <main className="auth-screen">
      <BackButton onClick={() => navigate('login-student')} />
      <form className="auth-content recovery-content" onSubmit={submit}>
        <Logo />
        <img className="auth-toko w-1/2!" src={`${assets}/d2168.svg`} alt="" />
        <div className="recovery-copy">
          <h1>Recuperar contraseña</h1>
          <p>Ingresa tu correo institucional para recuperar tu contraseña.</p>
        </div>
        <div className="auth-fields">
          <Field icon="9e8ca.svg" placeholder="Correo institucional" type="email" />
        </div>
        <div className="auth-actions">
          <button className="primary-action" type="submit">
            Enviar enlace
          </button>
        </div>
      </form>
    </main>
  )
}

const helpCards: Array<{
  id: string
  title: string
  description: string
  guide: string
  image: string
  tone: string
}> = [
    {
      id: 'procedures',
      title: 'Trámites',
      description: 'Encuentra tu trámite en un solo lugar.',
      guide:
        'Dime qué trámite necesitas y te muestro una tarjeta con lo esencial: requisitos, costo, tiempo de entrega y el botón para solicitarlo.',
      image: '06761.svg',
      tone: 'tone-transcript',
    },
    {
      id: 'rules',
      title: 'Reglamento',
      description: 'Te explico las normas de la UCA',
      guide:
        'Pregúntame por una norma y te muestro lo que dice el reglamento de la UCA, en palabras sencillas.',
      image: 'f9055.svg',
      tone: 'tone-rules',
    },
    {
      id: 'dates',
      title: 'Fechas importantes',
      description: 'Te recuerdo las fechas que no debes perder.',
      guide:
        'Aquí no hace falta escribir: te muestro el calendario con las fechas clave y te aviso con una notificación cuando se acerque algo importante.',
      image: '9eece.svg',
      tone: 'tone-dates',
    },
    {
      id: 'reservation',
      title: 'Reservar espacios',
      description: 'Te ayudo a reservar salas y talleres.',
      guide:
        'Dime qué espacio necesitas y te muestro las opciones con su botón para reservarlo, junto con las reglas que aplican.',
      image: '1766d.svg',
      tone: 'tone-reservation',
    },
    {
      id: 'location',
      title: 'Dónde queda',
      description: 'Te llevo al edificio que buscas.',
      guide:
        'Dime el edificio, aula o laboratorio que buscas y te muestro cómo llegar, con fotos y el mapa del campus.',
      image: '66627.svg',
      tone: 'tone-location',
    },
    {
      id: 'support',
      title: 'Directorio UCA',
      description: 'Te conecto con quien puede ayudarte.',
      guide: 'Dime a quién buscas y te muestro su contacto: correo, teléfono y dónde encontrarlo.',
      image: '2a49f.svg',
      tone: 'tone-support',
    },
  ]

function HelpScreen() {
  const [open, setOpen] = useState<string[]>([])
  const toggle = (id: string) =>
    setOpen((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))

  return (
    <main className="help-screen">
      <div className="help-scroll">
        <header className="home-greeting help-greeting">
          <h1>Toko te puede ayudar en</h1>
          <p>Toca una tarjeta para ver qué puedo hacer por ti</p>
        </header>
        <div className="help-cards">
          {helpCards.map((card, index) => {
            const isOpen = open.includes(card.id)
            return (
              <article
                className={`help-card ${card.tone} ${isOpen ? 'help-card-open' : ''}`}
                key={card.id}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  type="button"
                  className="help-head"
                  aria-expanded={isOpen}
                  aria-controls={`guide-${card.id}`}
                  onClick={() => toggle(card.id)}
                >
                  <span className="help-copy">
                    <span className="help-title">
                      <strong>{card.title}</strong>
                      <svg
                        className="help-chevron"
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </span>
                    <span className="help-desc">{card.description}</span>
                  </span>
                  <span className="help-art">
                    <img src={`${assets}/${card.image}`} alt="" />
                  </span>
                </button>
                <div className="help-guide" id={`guide-${card.id}`} role="region">
                  <div className="help-guide-inner">
                    <div className="help-guide-pad">
                      <div className="help-line" />
                      <p>{card.guide}</p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}

// ---------- BARRA DE NAVEGACIÓN ----------

type Tab = 'home' | 'calendar' | 'help' | 'settings'

const navTabs: Array<{ id: Tab; label: string; icon: IconName }> = [
  { id: 'home', label: 'Chat', icon: 'message-circle' },
  { id: 'calendar', label: 'Calendario', icon: 'calendar' },
  { id: 'help', label: 'Ayuda', icon: 'help' },
  { id: 'settings', label: 'Ajustes', icon: 'gear' },
]

function NavBar({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  const index = navTabs.findIndex((tab) => tab.id === active)
  return (
    <nav className="nav-wrap" aria-label="Navegación principal">
      <div className="nav-bar" style={{ '--i': index } as CSSProperties}>
        <span className="nav-pill" aria-hidden="true" />
        {navTabs.map((tab) => (
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
    </nav>
  )
}

function ChatHeader({ onBack }: { onBack?: () => void }) {
  return (
    <header className="chat-header">
      {onBack ? (
        <button type="button" className="chat-back" onClick={onBack} aria-label="Regresar al chat">
          <img src={`${assets}/71473.svg`} alt="" />
        </button>
      ) : null}
      <div className="chat-avatar">
        <img src={`${assets}/216a3.svg`} alt="" />
      </div>
      <div className="chat-heading">
        <h1>Toko</h1>
        <p>Asistente UCA</p>
      </div>
    </header>
  )
}

// Búho saludando (ilustración del Figma, en SVG dentro del código para poder animarlo).
function WavingToko() {
  return (
    <svg
      className="waving-toko"
      viewBox="-2 0 317 307"
      fill="none"
      role="img"
      aria-label="Toko saludando"
    >
      <g className="owl-body">
        <path
          d="M216.84 122.28C216.84 122.28 141.95 53.67 109.07 131.58C65.75 234.27 267.12 274.19 280.92 180.53C294.72 86.87 216.84 122.27 216.84 122.27V122.28Z"
          fill="#ffffff"
        />
        <path
          d="M188.26 28.6L186.48 38.42C185.83 42 188.82 45.22 192.43 44.8C202.24 43.65 220.97 43.52 242.96 53.75C246.16 55.24 249.92 53.39 250.63 49.93L252.23 42.1C252.58 40.41 253.7 38.99 255.26 38.26L262.05 35.09C265.86 33.31 266.3 28.05 262.82 25.67L226.78 0.950008C225.45 0.0400077 223.79 -0.239992 222.24 0.200008L185.64 10.38C181.84 11.44 180.39 16.05 182.9 19.09L187.09 24.16C188.11 25.4 188.54 27.02 188.25 28.6H188.26Z"
          fill="#103357"
        />
        <path
          d="M182.6 12.48C179.49 17.86 172.51 30.18 170.29 36.15C170.12 36.61 169.83 37 169.42 37.28L163.92 41.07C162.44 42.09 162.63 44.33 164.25 45.09L174.7 49.96C176.26 50.69 178.05 49.52 178 47.79L177.79 40.04C177.79 39.73 177.83 39.42 177.95 39.13C178.99 36.5 184.56 22.63 188.58 17.11C189.25 16.19 189.16 14.92 188.35 14.11L186.26 12C185.18 10.92 183.37 11.15 182.6 12.47V12.48Z"
          fill="#103357"
        />
        <path
          d="M272.87 76.23C200.57 42.77 136.82 59.5 136.82 59.5C104.29 42.47 95.08 49.04 83.58 76.83C72.08 104.61 67.15 159.88 67.15 159.88C58.06 155.62 54.57 147.22 49.62 144.29C44.3 141.14 36.66 144.83 36.6 151.01C36.41 171.11 51.82 188.46 66.61 205.24C165.61 317.57 271.25 250.54 271.25 250.54C267.74 271.1 284.29 279.04 290.46 270.82C321.05 230.03 313.1 151.78 313.62 102.52C314.28 40.68 272.87 76.23 272.87 76.23ZM280.92 180.54C267.12 274.2 65.75 234.28 109.07 131.59C141.94 53.67 216.84 122.29 216.84 122.29C216.84 122.29 294.73 86.89 280.92 180.55V180.54Z"
          fill="#103357"
        />
        <g className="owl-eyes">
          <path
            d="M153.136 132.944L153.126 132.943C147.601 132.264 142.571 136.194 141.893 141.719L137.796 175.089C137.117 180.614 141.046 185.643 146.572 186.322L146.582 186.323C152.107 187.002 157.137 183.072 157.815 177.547L161.912 144.177C162.591 138.652 158.662 133.622 153.136 132.944Z"
            fill="#103357"
          />
          <path
            d="M263.14 186.97L250.19 151.4C250.16 151.31 250.12 151.22 250.08 151.14L249.62 150.09C248.36 147.24 244.55 146.7 242.55 149.09L242.09 149.64L217.67 178.75C216.18 180.53 216.41 183.18 218.19 184.68L220.87 186.93C222.65 188.42 225.3 188.19 226.8 186.41L243.17 166.9L251.96 191.05C252.75 193.23 255.17 194.36 257.35 193.57L260.63 192.37C262.81 191.58 263.94 189.16 263.15 186.98L263.14 186.97Z"
            fill="#103357"
          />
        </g>
        <path
          d="M189.92 183.74L184.78 173.63C183.05 170.22 185.76 166.24 189.57 166.61L203.56 167.96C207.65 168.35 209.42 173.34 206.51 176.23L197.66 184.99C195.33 187.3 191.42 186.67 189.93 183.74H189.92Z"
          fill="#103357"
        />
        <path
          d="M61.95 230.7C69.08 222.96 78.78 227.66 91.4 239.68C102.64 250.39 103 258.65 101.23 263.78C99.71 268.2 95.38 270.94 90.71 270.71C86.03 270.48 79.19 268.49 71.24 261.09C56.17 247.08 58.36 234.6 61.95 230.7Z"
          fill="#103357"
        />
        <path
          d="M190.91 294.84C189.02 284.49 198.61 279.57 215.8 276.72C231.12 274.18 237.93 278.88 240.96 283.37C243.57 287.25 243.16 292.35 240.17 295.94C237.18 299.53 231.46 303.8 220.77 305.7C200.51 309.31 191.86 300.05 190.91 294.83V294.84Z"
          fill="#103357"
        />
      </g>
      <g className="wave-mark wave-mark-1">
        <path
          d="M43.4855 105.704C42.9291 108.566 44.7985 111.338 47.661 111.894C50.5235 112.451 53.2951 110.581 53.8515 107.719L56.435 94.4274C56.9914 91.565 55.122 88.7934 52.2595 88.237C49.397 87.6806 46.6254 89.55 46.069 92.4125L43.4855 105.704Z"
          fill="#103357"
        />
      </g>
      <g className="wave-mark wave-mark-2">
        <path
          d="M26.5131 92.4316C24.9678 89.9587 21.7104 89.2066 19.2374 90.7519C16.7644 92.2972 16.0124 95.5546 17.5577 98.0276L24.7328 109.51C26.2781 111.983 29.5355 112.735 32.0085 111.19C34.4814 109.645 35.2335 106.387 33.6882 103.914L26.5131 92.4316Z"
          fill="#103357"
        />
      </g>
      <g className="wave-mark wave-mark-3">
        <path
          d="M8.07224 110.352C5.59927 108.807 2.34185 109.559 0.79657 112.032C-0.748708 114.505 0.00332695 117.762 2.47629 119.308L13.9589 126.483C16.4318 128.028 19.6892 127.276 21.2345 124.803C22.7798 122.33 22.0278 119.073 19.5548 117.527L8.07224 110.352Z"
          fill="#103357"
        />
      </g>
    </svg>
  )
}

function MiniAvatar() {
  return (
    <span className="mini-avatar" aria-hidden="true">
      <img src={`${assets}/216a3.svg`} alt="" />
    </span>
  )
}

function Message({
  children,
  preserve = false,
  user = false,
  avatar = true,
  animate = true,
  delay,
}: {
  children: ReactNode
  preserve?: boolean
  user?: boolean
  avatar?: boolean
  animate?: boolean
  delay?: number
}) {
  return (
    <div
      className={`message-row ${user ? 'message-row-user' : ''} ${animate ? 'msg-in' : ''}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {!user && avatar ? <MiniAvatar /> : null}
      <div
        className={`message-bubble ${user ? 'message-user' : 'message-toko'} ${preserve ? 'message-preserve' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}

type InfoRow = {
  icon: string
  text: string
  emphasized?: boolean
  trailingIcon?: string
}

function ChatInfoCard({
  title,
  description,
  rows,
  action,
  actionIcon,
  href,
  tone,
}: {
  title: string
  description: string
  rows: InfoRow[]
  action: string
  actionIcon: string
  href?: string
  tone: 'transcript' | 'reservation' | 'support' | 'dates' | 'rules'
}) {
  const actionContent = (
    <>
      <img src={`${assets}/${actionIcon}`} alt="" />
      <span>{action}</span>
    </>
  )

  return (
    <article className="chat-info-card">
      <h2>{title}</h2>
      <p className="info-description">{description}</p>
      <div className="info-divider" />
      <div className="info-rows">
        {rows.map((row) => (
          <div className="info-row" key={row.text}>
            <span className={`info-icon info-icon-${tone}`}>
              <img src={`${assets}/${row.icon}`} alt="" />
            </span>
            <p className={row.emphasized ? 'info-emphasized' : ''}>{row.text}</p>
            {row.trailingIcon ? (
              <img className="info-trailing-icon" src={`${assets}/${row.trailingIcon}`} alt="" />
            ) : null}
          </div>
        ))}
      </div>
      {href ? (
        <a
          className={`chat-card-action chat-card-action-${tone}`}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {actionContent}
        </a>
      ) : (
        <button className={`chat-card-action chat-card-action-${tone}`} type="button">
          {actionContent}
        </button>
      )}
    </article>
  )
}

function CampusMap() {
  const layers = ['1a24e.svg', 'c98a9.svg', 'a0b93.svg', 'a182d.svg', '014c0.svg', 'e6429.svg']

  return (
    <div className="campus-map campus-map-card">
      {layers.map((layer, index) => (
        <div className={`campus-map-layer campus-map-layer-${index + 1}`} key={layer}>
          <img src={`${assets}/${layer}`} alt="" />
        </div>
      ))}
    </div>
  )
}

type ProcedureCard = {
  id: string
  title: string
  description?: string
  price?: string
  delivery: string
  deliveryIcon?: string
  action?: string
  href?: string
}

// Enlaces de cada trámite, tomados de las tarjetas del Figma (página Componentes)
const procedureLinks: Record<string, string> = {
  'certified-grades': 'https://pagosenlinea.uca.edu.sv/app.php/servicio_req/requisito_servicio/40',
  'grades': 'https://pagosenlinea.uca.edu.sv/app.php/servicio_req/requisito_servicio/39',
  'seventy-percent': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/11',
  'approved-subjects': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/11',
  'postgraduate': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/11',
  'iss-afp': 'https://pagosenlinea.uca.edu.sv/app.php/servicio_req/requisito_servicio/23',
  'inpep': 'https://pagosenlinea.uca.edu.sv/app.php/servicio_req/requisito_servicio/22',
  'graduate': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/11',
  'enrolled': 'https://pagosenlinea.uca.edu.sv/app.php/servicio_req/requisito_servicio/17',
  'alumnus': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/11',
  'career-percentage': 'https://pagosenlinea.uca.edu.sv/app.php/servicio_req/requisito_servicio/24',
  'completed-curriculum': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/11',
  'studied-at-university': 'https://pagosenlinea.uca.edu.sv/app.php/servicio_req/requisito_servicio/20',
  'graduation-process': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/11',
  'induction-course': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/11',
  'class-schedule': 'https://pagosenlinea.uca.edu.sv/app.php/servicio_req/requisito_servicio/21',
  'graduate-ranking': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/11',
  'class-ranking': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/11',
  'subject-preregistration': 'https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp',
  'subject-registration': 'https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp',
  'subject-addition': 'https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp',
  'subject-withdrawal': 'https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp',
  'online-payments': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/3',
  'mercaduca': 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=hrQc_xLZ40mUNBIunEWJXpKfd3jyuWhBh5v5HldWSo9UMTE3MTBYM00yMDYzQ0hPSUJOWjMzTlU4Qy4u',
  'parking-payment': 'https://portal-estudiantes.uca.edu.sv/portal/parqueo',
  'student-id-issue': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/3',
  'student-id-validation': 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/3',
  'internships-jobs': 'https://centro-empleo.uca.edu.sv/app.php/publicacion/publicacionOportunidad',
}

const procedureCards: ProcedureCard[] = [
  {
    id: 'certified-grades',
    title: 'Certificados · Notas autenticado',
    price: '$25.00',
    delivery: 'Entrega en 5 días hábiles',
  },
  {
    id: 'grades',
    title: 'Certificados · Notas sin autenticado',
    price: '$25.00',
    delivery: 'Entrega en 5 días hábiles',
  },
  {
    id: 'seventy-percent',
    title: 'Constancias · Aprobación del 70% CCJJ',
    price: '$10.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'approved-subjects',
    title: 'Constancias · Atestado aprobación de materias CCJJ',
    price: '$10.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'postgraduate',
    title: 'Constancias · Apto para postgrado',
    price: '$10.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'iss-afp',
    title: 'Constancias · Para ISS o AFP',
    price: '$5.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'inpep',
    title: 'Constancias · INPEP/Materias',
    price: '$5.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'graduate',
    title: 'Constancias · Graduado',
    price: '$5.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'enrolled',
    title: 'Constancias · Estudiante inscrito',
    price: '$5.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'alumnus',
    title: 'Constancias · Egresado',
    price: '$5.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'career-percentage',
    title: 'Constancias · Porcentaje de carrera',
    price: '$5.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'completed-curriculum',
    title: 'Constancias · Plan de estudio cursado',
    price: '$10.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'studied-at-university',
    title: 'Constancias · Haber estudiado en la universidad',
    price: '$5.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'graduation-process',
    title: 'Constancias · Inscrito en proceso de graduación',
    price: '$5.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'induction-course',
    title: 'Constancias · Estar inscrito en curso de inducción',
    price: '$5.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'class-schedule',
    title: 'Constancias · Horario clases',
    price: '$10.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'graduate-ranking',
    title: 'Constancias · Ranking de graduado',
    price: '$10.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'class-ranking',
    title: 'Constancias · Ranking del estudiante a su clase',
    price: '$10.00',
    delivery: 'Entrega en 3 días hábiles',
  },
  {
    id: 'subject-preregistration',
    title: 'Asignaturas · Preinscripción',
    description: 'Elige con anticipación las materias que quieres cursar el próximo ciclo.',
    delivery: 'Entrega en 5 días hábiles',
    action: 'Preinscribir materias',
    href: 'https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp',
  },
  {
    id: 'subject-registration',
    title: 'Asignaturas · Inscripción',
    description: 'Inscribe formalmente las materias que vas a cursar en el ciclo.',
    delivery: 'Entrega en 5 días hábiles',
    action: 'Preinscribir materias',
    href: 'https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp',
  },
  {
    id: 'online-payments',
    title: 'Servicios · Pagos en linea',
    description: 'Cancela tus cuotas académicas, aranceles y trámites universitarios de forma rápida y segura.',
    delivery: 'Entrega en 5 días hábiles',
    action: 'Ir a Pagos',
    href: 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/3',
  },
  {
    id: 'mercaduca',
    title: 'Servicios · Mercaduca',
    description: 'Envía los datos de tu emprendimiento y sé parte del mercadito estudiantil.',
    delivery: 'Entrega en 5 días hábiles',
    action: 'Registrar emprendimiento',
    href: 'https://pagosenlinea.uca.edu.sv/app.php/subcategoria/subcategoria_servicio/3',
  },
  {
    id: 'parking-payment',
    title: 'Servicios · Pago de parqueo',
    description: 'Compra tus tickets de parqueo y consulta tu saldo disponible.',
    delivery: 'Entrega en 5 días hábiles',
    deliveryIcon: '141a5.svg',
    action: 'Comprar tickets',
    href: 'https://portal-estudiantes.uca.edu.sv/portal/parqueo',
  },
  {
    id: 'student-id-issue',
    title: 'Servicios · Emisión Carnet',
    description: 'Aplica para estudiantes de nuevo ingreso que aún no tienen su carné estudiantil.',
    delivery: 'Entrega en 5 días hábiles',
    action: 'Comprar tickets',
    href: 'https://portal-estudiantes.uca.edu.sv/portal/parqueo',
  },
  {
    id: 'student-id-validation',
    title: 'Servicios · Validación Carnet',
    description: 'Es necesario que el carné a validar se encuentre en buenas condiciones; en caso contrario, se recomendará tramitar la reposición.',
    delivery: 'Entrega en 5 días hábiles',
    action: 'Comprar tickets',
    href: 'https://portal-estudiantes.uca.edu.sv/portal/parqueo',
  },
  {
    id: 'internships-jobs',
    title: 'Servicios · Pasantías y empleos',
    description: 'Explora oportunidades de pasantías, prácticas profesionales y vacantes laborales.',
    delivery: 'Entrega en 5 días hábiles',
    action: 'Ver Oportunidades',
    href: 'https://portal-estudiantes.uca.edu.sv/portal/parqueo',
  },
  {
    id: 'subject-addition',
    title: 'Asignaturas · Adición',
    description: 'Agrega materias a tu carga académica después de haberte inscrito.',
    delivery: 'Entrega en 5 días hábiles',
    action: 'Adicionar materias',
    href: 'https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp',
  },
  {
    id: 'subject-withdrawal',
    title: 'Asignaturas · Retiro',
    description: 'Retira una materia que ya inscribiste, dentro del plazo del calendario.',
    delivery: 'Entrega en 5 días hábiles',
    action: 'Retirar materias',
    href: 'https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp',
  },
]

function normalizeProcedureRequest(value: string) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[¿?¡!.,;:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

type ProcedureMatch =
  | { type: 'card'; card: ProcedureCard }
  | { type: 'clarify'; text: string }
  | { type: 'unavailable' }

function findProcedureCard(request: string): ProcedureMatch {
  const text = normalizeProcedureRequest(request)
  const card = (id: string) => procedureCards.find((item) => item.id === id)!

  if (text.includes('nota')) {
    if (text.includes('sin autent') || text.includes('no autent')) {
      return { type: 'card', card: card('grades') }
    }
    if (text.includes('autent') || text.includes('certificad')) {
      return { type: 'card', card: card('certified-grades') }
    }
    if (text.includes('simple') || text.includes('normal') || text.includes('sin ')) {
      return { type: 'card', card: card('grades') }
    }
    return {
      type: 'clarify',
      text: 'Hay dos tipos de certificado de notas: uno autenticado, con validez oficial para presentarlo fuera de la UCA, y uno sin autenticar, para uso personal. ¿Cuál necesitas?',
    }
  }

  if (text.includes('70') || text.includes('setenta por ciento')) {
    return { type: 'card', card: card('seventy-percent') }
  }
  if (text.includes('atestado') || text.includes('aprobacion de materias')) {
    return { type: 'card', card: card('approved-subjects') }
  }
  if (text.includes('ccjj')) {
    return {
      type: 'clarify',
      text: '¿Necesitas Constancias · Aprobación del 70% CCJJ o Constancias · Atestado aprobación de materias CCJJ?',
    }
  }
  if (text.includes('postgrado') || text.includes('posgrado')) {
    return { type: 'card', card: card('postgraduate') }
  }
  if (text.includes('preinscrip')) {
    return { type: 'card', card: card('subject-preregistration') }
  }
  if (
    text.includes('adicion') ||
    ((text.includes('agregar') || text.includes('anadir')) &&
      (text.includes('materia') || text.includes('asignatura')))
  ) {
    return { type: 'card', card: card('subject-addition') }
  }
  if (
    text.includes('retiro') ||
    (text.includes('retirar') && (text.includes('materia') || text.includes('asignatura')))
  ) {
    return { type: 'card', card: card('subject-withdrawal') }
  }
  if (
    (text.includes('inscrip') || text.includes('inscribir')) &&
    (text.includes('materia') || text.includes('asignatura'))
  ) {
    return { type: 'card', card: card('subject-registration') }
  }
  if (text.includes('porcentaje') && text.includes('carrera')) {
    return { type: 'card', card: card('career-percentage') }
  }
  if (text.includes('plan de estudio')) {
    return { type: 'card', card: card('completed-curriculum') }
  }
  if (
    text.includes('haber estudiado') ||
    text.includes('estudie en la universidad') ||
    text.includes('estudie en la uca')
  ) {
    return { type: 'card', card: card('studied-at-university') }
  }
  if (text.includes('proceso de graduacion')) {
    return { type: 'card', card: card('graduation-process') }
  }
  if (text.includes('curso de induccion')) {
    return { type: 'card', card: card('induction-course') }
  }
  if (text.includes('horario') && (text.includes('clase') || text.includes('materia'))) {
    return { type: 'card', card: card('class-schedule') }
  }
  if (text.includes('ranking')) {
    if (text.includes('graduado')) {
      return { type: 'card', card: card('graduate-ranking') }
    }
    if (text.includes('estudiante') || text.includes('clase')) {
      return { type: 'card', card: card('class-ranking') }
    }
    return {
      type: 'clarify',
      text: '¿Necesitas Constancias · Ranking de graduado o Constancias · Ranking del estudiante a su clase?',
    }
  }
  if (text.includes('mercaduca')) {
    return { type: 'card', card: card('mercaduca') }
  }
  if (
    text.includes('pago en linea') ||
    text.includes('pagos en linea') ||
    text.includes('pagosenlinea')
  ) {
    return { type: 'card', card: card('online-payments') }
  }
  if (text.includes('parqueo') || text.includes('estacionamiento')) {
    return { type: 'card', card: card('parking-payment') }
  }
  if (text.includes('carnet') || text.includes('carne estudiantil')) {
    if (text.includes('valid') || text.includes('activar')) {
      return { type: 'card', card: card('student-id-validation') }
    }
    if (text.includes('emision') || text.includes('emitir') || text.includes('nuevo')) {
      return { type: 'card', card: card('student-id-issue') }
    }
    return {
      type: 'clarify',
      text: '¿Necesitas Servicios · Emisión Carnet o Servicios · Validación Carnet?',
    }
  }
  if (
    text.includes('pasantia') ||
    text.includes('empleo') ||
    text.includes('oportunidad laboral')
  ) {
    return { type: 'card', card: card('internships-jobs') }
  }
  if (text.includes('iss') || text.includes('afp')) {
    return { type: 'card', card: card('iss-afp') }
  }
  if (text.includes('inpep')) {
    return { type: 'card', card: card('inpep') }
  }
  if (text.includes('graduado')) {
    return { type: 'card', card: card('graduate') }
  }
  if (
    text.includes('inscrit') ||
    text.includes('matriculad') ||
    ((text.includes('constancia') || text.includes('certificado')) &&
      (text.includes('inscripcion') ||
        text.includes('ciclo') ||
        text.includes('estudiante') ||
        text.includes('estoy estudiando') ||
        text.includes('alumno')))
  ) {
    return { type: 'card', card: card('enrolled') }
  }
  if (text.includes('egresado')) {
    return { type: 'card', card: card('alumnus') }
  }
  if (text.includes('constancia') || text.includes('certificado') || text.includes('documento')) {
    return {
      type: 'clarify',
      text: '¿Qué constancia o certificado necesitas? Por ejemplo: estudiante inscrito, horario de clases, notas, graduado o egresado.',
    }
  }

  return { type: 'unavailable' }
}

function ProcedureResponseCard({ card }: { card: ProcedureCard }) {
  const rows: InfoRow[] = []

  if (card.price) {
    rows.push({ icon: '07931.svg', text: card.price })
  }

  rows.push(
    { icon: card.deliveryIcon ?? '52519.svg', text: card.delivery },
    { icon: 'b1111.svg', text: 'registro.academico@uca.edu.sv' },
  )

  return (
    <ChatInfoCard
      title={card.title}
      description={
        card.description ??
        'Requisito: estar solvente. Entrega física en Unidad de Registro y envío digital a tu correo.'
      }
      rows={rows}
      action={card.action ?? 'Solicitar'}
      actionIcon="8df50.svg"
      href={procedureLinks[card.id] ?? card.href ?? 'https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp'}
      tone="transcript"
    />
  )
}


function ProcedureComposer({
  onChange,
  onSubmit,
  value,
}: {
  onChange: (value: string) => void
  onSubmit: (event: FormEvent) => void
  value: string
}) {
  return (
    <form className="chat-composer procedure-composer" onSubmit={onSubmit}>
      <div className="composer-field">
        <input
          aria-label="Escribe tu mensaje"
          onChange={(event) => onChange(event.target.value)}
          placeholder="Escribe tu mensaje…"
          value={value}
        />
        <button aria-label="Enviar mensaje" disabled={!value.trim()} type="submit">
          <img src={`${assets}/97a27.svg`} alt="" />
        </button>
      </div>
    </form>
  )
}

type ReservationCard = {
  id: string
  title: string
  description: string
  rows: InfoRow[]
  action: string
  actionIcon: string
  href: string
}

const reservationCards: ReservationCard[] = [
  {
    id: 'crai-first-floor',
    title: 'Salas de reuniones · CRAI',
    description:
      'Llena el formulario y lleva tu carné. Si llegas 15 minutos tarde, pierdes la reserva.',
    rows: [
      { icon: '521fa.svg', text: 'Biblioteca, primer nivel' },
      { icon: '4e317.svg', text: 'De 4 a 10 personas' },
    ],
    action: 'Ir a reservar',
    actionIcon: '8df50.svg',
    href: 'https://uca-sv.libguides.com/c.php?g=1150710&p=8399442',
  },
  {
    id: 'crai-second-floor',
    title: 'Salas de reuniones · CRAI',
    description:
      'Llena el formulario y lleva tu carné. Si llegas 15 minutos tarde, pierdes la reserva.',
    rows: [
      { icon: '521fa.svg', text: 'Biblioteca, segundo nivel' },
      { icon: '4e317.svg', text: 'Cubículos y salas de reuniones' },
    ],
    action: 'Ir a reservar',
    actionIcon: '8df50.svg',
    href: 'https://uca-sv.libguides.com/c.php?g=1150710&p=8400606',
  },
  {
    id: 'crai-third-floor',
    title: 'Salas de reuniones · CRAI',
    description:
      'Llena el formulario y lleva tu carné. Si llegas 15 minutos tarde, pierdes la reserva.',
    rows: [
      { icon: '521fa.svg', text: 'Biblioteca, tercer nivel' },
      { icon: '4e317.svg', text: 'Capacidad según cada sala' },
    ],
    action: 'Ir a reservar',
    actionIcon: '8df50.svg',
    href: 'https://uca-sv.libguides.com/c.php?g=1150710&p=8591675',
  },
  {
    id: 'crai-equipment',
    title: 'Mobiliario y equipo · CRAI',
    description: 'Reserva tablets y Smart TV de la biblioteca. Cada préstamo es de hasta 3 horas.',
    rows: [
      { icon: '6c84c.svg', text: 'Tablets: en todo el campus' },
      { icon: '99636.svg', text: 'Smart TV: solo en la biblioteca' },
    ],
    action: 'Ir a reservar',
    actionIcon: '8df50.svg',
    href: 'https://uca-sv.libguides.com/reservademobiliarioyequipo',
  },
  {
    id: 'crai-book',
    title: 'Reserva de libros · CRAI',
    description:
      'Pide un libro que está prestado. Tu reserva vale 2 días hábiles desde que lo devuelven.',
    rows: [
      { icon: '521fa.svg', text: 'Mostrador de préstamo, CRAI' },
      { icon: '213aa.svg', text: 'Un ejemplar por título' },
    ],
    action: 'Escribir al CRAI',
    actionIcon: 'bc91b.svg',
    href: 'mailto:bib.circulacion@uca.edu.sv',
  },
  {
    id: 'crai-renewal',
    title: 'Renovar préstamo · CRAI',
    description:
      'Renueva tu libro desde 2 días antes de que venza. No se renueva si alguien lo reservó.',
    rows: [
      { icon: 'c954f.svg', text: 'En línea, por chat o por correo' },
      { icon: 'd4641.svg', text: 'Hasta 2 renovaciones en línea' },
    ],
    action: 'Ir a renovar',
    actionIcon: 'b6cca.svg',
    href: 'https://sistemabibliotecas.uca.edu.sv/cgi-bin/koha/opac-user.pl',
  },
  {
    id: 'multimedia-labs',
    title: 'Laboratorios multimedia',
    description:
      'Llena el formulario cada vez que uses el Laboratorio 1 o 2. Los técnicos te confirman por correo.',
    rows: [
      { icon: '521fa.svg', text: 'Comunicaciones y Cultura' },
      { icon: '85d68.svg', text: 'Laboratorio 1 y Laboratorio 2' },
    ],
    action: 'Llenar formulario',
    actionIcon: '8df50.svg',
    href: 'https://forms.office.com/pages/responsepage.aspx?id=hrQc_xLZ40mUNBIunEWJXrwcqI2EWF9Im5acItCuM7ZUQ1hLSU9GMlE0NkFWWFhHWVZDSjJTVkMwVC4u&origin=lprLink&route=shorturl',
  },
  {
    id: 'radio-studios',
    title: 'Estudios de radio · Labs',
    description:
      'Revisa en el calendario si Radio 1 o Radio 2 está libre, llena el formulario y espera la confirmación.',
    rows: [
      { icon: '521fa.svg', text: 'Comunicaciones y Cultura' },
      { icon: 'c2d15.svg', text: 'Calendario en la página' },
    ],
    action: 'Ver calendario y reservar',
    actionIcon: '8df50.svg',
    href: 'https://www.uca.edu.sv/comunicaciones-cultura/pagina-radios/',
  },
  {
    id: 'photo-studio',
    title: 'Estudio de fotografía · Labs',
    description:
      'Revisa en el calendario si el estudio está libre, llena el formulario y espera la confirmación.',
    rows: [
      { icon: '521fa.svg', text: 'Comunicaciones y Cultura' },
      { icon: 'c2d15.svg', text: 'Calendario en la página' },
    ],
    action: 'Ver calendario y reservar',
    actionIcon: '8df50.svg',
    href: 'https://www.uca.edu.sv/comunicaciones-cultura/estudio-de-fotografia/',
  },
  {
    id: 'cyclorama',
    title: 'Ciclorama · Labs',
    description:
      'Revisa en el calendario si el ciclorama está libre, llena el formulario y espera la confirmación.',
    rows: [
      { icon: '521fa.svg', text: 'Comunicaciones y Cultura' },
      { icon: 'c2d15.svg', text: 'Calendario en la página' },
    ],
    action: 'Ver calendario y reservar',
    actionIcon: '8df50.svg',
    href: 'https://www.uca.edu.sv/comunicaciones-cultura/ciclorama/',
  },
]

type ReservationMatch =
  | { type: 'card'; card: ReservationCard }
  | { type: 'clarify'; text: string }
  | { type: 'unavailable' }

function findReservationCard(request: string): ReservationMatch {
  const text = normalizeProcedureRequest(request)
  const card = (id: string) => reservationCards.find((item) => item.id === id)!

  if (text.includes('primer nivel') || text.includes('nivel 1')) {
    return { type: 'card', card: card('crai-first-floor') }
  }
  if (text.includes('segundo nivel') || text.includes('nivel 2')) {
    return { type: 'card', card: card('crai-second-floor') }
  }
  if (text.includes('tercer nivel') || text.includes('nivel 3')) {
    return { type: 'card', card: card('crai-third-floor') }
  }
  if (
    text.includes('sala de reunion') ||
    text.includes('sala en la biblioteca') ||
    text.includes('sala del crai') ||
    text.includes('cubiculo')
  ) {
    return {
      type: 'clarify',
      text: 'Claro, ¿en qué nivel lo necesitas? Primer nivel, segundo nivel o tercer nivel.',
    }
  }
  if (
    text.includes('tablet') ||
    text.includes('smart tv') ||
    text.includes('mobiliario') ||
    text.includes('equipo')
  ) {
    return { type: 'card', card: card('crai-equipment') }
  }
  if (text.includes('renov') && (text.includes('libro') || text.includes('prestamo'))) {
    return { type: 'card', card: card('crai-renewal') }
  }
  if (
    (text.includes('reserv') || text.includes('pedir')) &&
    (text.includes('libro') || text.includes('material bibliografico'))
  ) {
    return { type: 'card', card: card('crai-book') }
  }
  if (text.includes('libro') || text.includes('prestamo')) {
    return {
      type: 'clarify',
      text: '¿Quieres reservar un libro prestado o renovar un préstamo?',
    }
  }
  if (text.includes('radio')) {
    return { type: 'card', card: card('radio-studios') }
  }
  if (text.includes('fotografia') || text.includes('fotografico')) {
    return { type: 'card', card: card('photo-studio') }
  }
  if (text.includes('ciclorama')) {
    return { type: 'card', card: card('cyclorama') }
  }
  if (
    text.includes('multimedia') ||
    text.includes('laboratorio 1') ||
    text.includes('laboratorio 2')
  ) {
    return { type: 'card', card: card('multimedia-labs') }
  }
  if (text.includes('laboratorio') || text.includes('labs') || text.includes('comunicaciones')) {
    return {
      type: 'clarify',
      text: '¿Necesitas laboratorios multimedia, estudios de radio, estudio de fotografía o ciclorama?',
    }
  }
  if (
    /^(necesito |quiero |busco )?(reservar |una reserva de )?(un |una )?(sala|espacio|reserva)s?$/.test(
      text,
    )
  ) {
    return {
      type: 'clarify',
      text: '¿Qué espacio o recurso necesitas reservar?',
    }
  }

  // Pedidos de reserva más generales: Toko pregunta qué necesita en vez de rendirse.
  if (
    /(reserv|apartar|agendar)/.test(text) &&
    (text.includes('crai') || text.includes('biblioteca'))
  ) {
    return {
      type: 'clarify',
      text: 'Claro, ¿qué necesitas reservar en el CRAI? Una sala de reuniones, equipo (tablets, Smart TV o mobiliario) o un libro.',
    }
  }
  if (/(reserv|apartar|agendar)/.test(text) && /(sala|espacio|lugar|cancha|auditorio|aula)/.test(text)) {
    return {
      type: 'clarify',
      text: '¿Qué espacio o recurso necesitas reservar? Por ejemplo: sala de reuniones del CRAI, equipo, un libro, laboratorios multimedia, estudios de radio, estudio de fotografía o ciclorama.',
    }
  }
  if (/^(necesito |quiero |busco |puedes |podrias )?(hacer |darme |que me des )?(una |la )?reserva(r|cion)?( por favor| porfa)?$/.test(text)) {
    return {
      type: 'clarify',
      text: '¿Qué espacio o recurso necesitas reservar? Por ejemplo: sala de reuniones del CRAI, equipo, un libro, laboratorios multimedia, estudios de radio, estudio de fotografía o ciclorama.',
    }
  }

  return { type: 'unavailable' }
}

function ReservationResponseCard({ card }: { card: ReservationCard }) {
  return (
    <ChatInfoCard
      title={card.title}
      description={card.description}
      rows={card.rows}
      action={card.action}
      actionIcon={card.actionIcon}
      href={card.href}
      tone="reservation"
    />
  )
}


// ============================================================
// CHATS NUEVOS: Fechas, Dónde queda y Atención al cliente
// ============================================================

// ---------- Chat genérico que responde a lo que se escribe ----------

type Reply = { text: string; card?: ReactNode }


const SOON = 'Esa información estará disponible pronto'

// ---------- FECHAS IMPORTANTES ----------

type DateInfo = {
  title: string
  description: string
  start: string
  end: string
}

// Fechas de ejemplo (las mismas que ya usa Trámites en el archivo).
// Para cambiarlas, edita solo estos textos.
const DATE_WINDOW = {
  start: 'Desde el jueves 25 de febrero, 8:00 a.m.',
  end: 'Hasta el lunes 1 de marzo, 6:00 p.m.',
}

const dateInfos: Record<string, DateInfo> = {
  preregistration: {
    title: 'Preinscripción de materias',
    description: 'Este es el periodo para preinscribir tus materias. No lo dejes para el último día.',
    ...DATE_WINDOW,
  },
  registration: {
    title: 'Inscripción de materias',
    description: 'Este es el periodo para inscribir tus materias. No lo dejes para el último día.',
    ...DATE_WINDOW,
  },
  addition: {
    title: 'Adición de materias',
    description: 'Este es el periodo para agregar materias a tu horario.',
    ...DATE_WINDOW,
  },
  withdrawal: {
    title: 'Retiro de materias',
    description: 'Este es el periodo para retirar una materia.',
    ...DATE_WINDOW,
  },
}

function findDate(request: string, openCalendar: () => void): Reply {
  const text = normalizeProcedureRequest(request)
  let key: string | null = null

  if (text.includes('calendario')) {
    return {
      text: '¡Claro! Aquí tienes el calendario del ciclo.',
      card: <CalendarLinkCard onOpen={openCalendar} />,
    }
  }

  if (text.includes('preinscrip')) key = 'preregistration'
  else if (text.includes('adicion') || text.includes('agregar') || text.includes('anadir'))
    key = 'addition'
  else if (text.includes('retiro') || text.includes('retirar')) key = 'withdrawal'
  else if (text.includes('inscrip') || text.includes('inscribir')) key = 'registration'

  if (key) {
    const info = dateInfos[key]
    return {
      text: '¡Claro! Esta es la fecha que no debes perder.',
      card: (
        <ChatInfoCard
          title={info.title}
          description={info.description}
          rows={[
            { icon: 'c2d15.svg', text: info.start },
            { icon: '52519.svg', text: info.end },
          ]}
          action="Ir al portal"
          actionIcon="8df50.svg"
          href="https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp"
          tone="dates"
        />
      ),
    }
  }

  if (text.includes('fecha') || text.includes('cuando') || text.includes('materia')) {
    return {
      text: '¿Qué fecha necesitas? Preinscripción, inscripción, adición o retiro de materias.',
    }
  }

  return { text: SOON }
}

// ---------- DÓNDE QUEDA ----------

function MapOverlay({ building, onClose }: { building: Building; onClose: () => void }) {
  const scale = 330 / 859.6
  // El dibujo base trae Magna III resaltado; se pinta de gris para que solo se vea el edificio pedido.
  const magnaIII = buildingList.find((b) => b.magna === 3)

  return (
    <div className="full-map-overlay" role="dialog" aria-label="Mapa del campus" onClick={onClose}>
      <div className="full-map-window">
        <div
          style={{
            position: 'relative',
            width: 859.6,
            height: 902.239,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <CampusMap />
          <svg
            aria-hidden="true"
            width="859.6"
            height="902.239"
            viewBox="0 0 330 346.369"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {magnaIII ? (
              <path d={magnaIII.d} transform={`translate(${magnaIII.x} ${magnaIII.y})`} fill="#cdd1d2" />
            ) : null}
            <path d={building.d} transform={`translate(${building.x} ${building.y})`} fill="#d9694b" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function BuildingCard({ building }: { building: Building }) {
  const { name, directions } = building
  const [index, setIndex] = useState(0)
  const [mapOpen, setMapOpen] = useState(false)
  const dragStart = useRef<number | null>(null)
  const photos = [1, 2, 3]

  const finishDrag = (clientX: number) => {
    if (dragStart.current === null) return
    const distance = clientX - dragStart.current
    if (Math.abs(distance) > 30) {
      setIndex((current) =>
        distance < 0 ? Math.min(current + 1, photos.length - 1) : Math.max(current - 1, 0),
      )
    }
    dragStart.current = null
  }

  return (
    <>
      <article
        className="building-card"
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest('button')) return
          dragStart.current = event.clientX
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerUp={(event) => finishDrag(event.clientX)}
        onPointerCancel={() => {
          dragStart.current = null
        }}
      >
        <div className="building-carousel">
          <div
            className="building-slides"
            style={{ width: 294 * photos.length, transform: `translateX(${-index * 294}px)` }}
          >
            {photos.map((photo) => (
              <div className="building-photo" key={photo}>
                <img src={`${assets}/c824c.svg`} alt="" />
                <p>Foto {photo} del edificio</p>
              </div>
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              top: 140,
              left: 121,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '5px 7px',
              borderRadius: 999,
              background: '#07181f',
            }}
          >
            {photos.map((photo, photoIndex) => (
              <span
                key={photo}
                style={{
                  width: photoIndex === index ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: '#ffffff',
                  transition: 'width 300ms ease-out',
                }}
              />
            ))}
          </div>
        </div>
        <div className="building-info">
          <h2>{name}</h2>
          <p>{directions}</p>
          <div className="building-divider" />
          <button
            type="button"
            className="chat-card-action chat-card-action-transcript"
            onClick={() => setMapOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <g stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.333 4.333 L6 3 L10 4.333 L13.667 3 L13.667 11.667 L10 13 L6 11.667 L2.333 13 Z" />
                <path d="M6 3 V11.667 M10 4.333 V13" />
              </g>
            </svg>
            <span>Ver mapa</span>
          </button>
        </div>
      </article>
      {mapOpen ? <MapOverlay building={building} onClose={() => setMapOpen(false)} /> : null}
    </>
  )
}

// Los 32 edificios de la sección «cards DONDE QUEDA» del Figma.
// x, y y d son la forma que se resalta en rojo en cada «Mapa completo» (sobre un mapa de 330 × 346).
type Building = { name: string; directions: string; aliases: string[]; magna?: number; x: number; y: number; d: string }

const buildingList: Building[] = [
  { name: "Biblioteca (CRAI)", directions: "Desde la Plaza de los Mártires, ve hacia la Cafetería Central y sigue al sur: la biblioteca queda justo debajo, junto al estacionamiento.", aliases: ["biblioteca", "crai"], x: 143.9, y: 196.7, d: "M 14.5 2.1 L 13.2 20.6 L 10.4 20.4 L 10.4 21.8 L 2.6 21 L 2.6 19.9 L 0 19.8 L 1.1 1.1 L 3.8 1.3 L 3.8 0 L 11.6 0.6 L 11.6 1.9 L 14.5 2.1 Z" },
  { name: "Cafetería Central", directions: "Desde la Plaza de los Mártires, camina unos pasos hacia el este: la Cafetería Central queda justo al lado, antes de las Direcciones de Sistemas.", aliases: ["cafeteria", "comedor"], x: 144.7, y: 180.5, d: "M 16.6 0.5 L 16.6 10.1 L 8.4 9.9 L 8.3 8.5 L 0 8.5 L 0.4 0.5 L 8.5 0.9 L 8.5 0 L 16.6 0.5 Z" },
  { name: "Edificio de Aulas A", directions: "Desde la Plaza de los Estudiantes por la Paz, ve hacia el oeste pasando los Laboratorios de Psicología: Aulas A queda al final de ese tramo, arriba del Edificio Escobar.", aliases: ["aulas a", "aula a", "edificio a"], x: 71, y: 216.9, d: "M 5.3 2.6 C 5.3 4.1 4.1 5.3 2.6 5.3 C 1.2 5.3 0 4.1 0 2.6 C 0 1.2 1.2 0 2.6 0 C 4.1 0 5.3 1.2 5.3 2.6 Z" },
  { name: "Edificio de Aulas B", directions: "Desde la Librería y Papelería, camina hacia el oeste: Aulas B queda justo arriba de los Laboratorios de Psicología.", aliases: ["aulas b", "aula b", "edificio b"], x: 84.8, y: 199.5, d: "M 6.5 3.3 C 6.5 5.1 5.1 6.5 3.3 6.5 C 1.5 6.5 0 5.1 0 3.3 C 0 1.5 1.5 0 3.3 0 C 5.1 0 6.5 1.5 6.5 3.3 Z" },
  { name: "Edificio de Aulas C y Escuela de Idiomas", directions: "Desde la Plaza de los Mártires, ve hacia el oeste: Aulas C es el edificio largo y delgado que aparece enseguida.", aliases: ["aulas c", "aula c", "edificio c", "escuela de idiomas", "idiomas"], x: 105.7, y: 183.6, d: "M 20.4 5.6 L 0 4.5 L 0 0 L 20.4 0.8 L 20.4 5.6 Z" },
  { name: "Edificio de Aulas D", directions: "Desde la Plaza de los Estudiantes por la Paz, baja hacia el sureste: Aulas D queda entre la plaza y el Edificio Jon de Cortina, que está justo debajo.", aliases: ["aulas d", "aula d", "edificio d"], x: 115.9, y: 218.5, d: "M 10.4 0 L 29.2 1 L 29.7 2.6 L 33 2.8 L 33 4.5 L 34.8 4.6 L 34.8 4 L 39.2 4.2 L 38.9 12.2 L 25.5 11.5 L 25.6 8.6 L 13.4 8 L 5.2 15.3 L 0 9.5 L 10.4 0 Z" },
  { name: "Auditorio Elba y Celina Ramos", directions: "Queda dentro del mismo edificio que Aulas D. Desde la Plaza de los Estudiantes por la Paz, baja hacia el sureste: está arriba del Jon de Cortina.", aliases: ["elba", "celina"], x: 115.9, y: 218.5, d: "M 10.4 0 L 29.2 1 L 29.7 2.6 L 33 2.8 L 33 4.5 L 34.8 4.6 L 34.8 4 L 39.2 4.2 L 38.9 12.2 L 25.5 11.5 L 25.6 8.6 L 13.4 8 L 5.2 15.3 L 0 9.5 L 10.4 0 Z" },
  { name: "Edificio Jon de Cortina, S.J.", directions: "Desde la Plaza de los Estudiantes por la Paz, baja hacia el sur pasando Aulas D: el Jon de Cortina es el edificio largo y horizontal que sigue.", aliases: ["cortina"], x: 110.5, y: 237.1, d: "M 43.1 3.6 L 42.7 13.8 L 0 11.7 L 0 9.2 L 1.6 9.2 C 1.6 9.2 0.7 7.8 0.6 7.3 C 0.5 5.9 0.9 4.9 1.4 3.8 L 0.5 3.6 L 0.5 1.4 L 32.1 3.4 L 32.4 0 L 35.4 0 L 35.4 3.4 L 43.1 3.6 L 43.1 3.6 Z" },
  { name: "CEDITEC", directions: "Desde el Edificio Escobar, camina hacia el oeste hasta el borde del campus: CEDITEC queda en el extremo oeste, debajo del Martín-Baró.", aliases: ["ceditec"], x: 22.9, y: 230.9, d: "M 7.8 0 L 15.6 7 L 7.8 16.2 L 5.6 13.4 L 5.6 12.8 L 1.9 9.6 L 1 9.9 L 0 8.8 L 7.8 0 Z" },
  { name: "Edificio Francisco Andrés Escobar", directions: "Desde los Módulos de Profesores, camina hacia el oeste: el Escobar es el edificio grande y cuadrado, debajo de Aulas A.", aliases: ["escobar", "francisco andres"], x: 66.1, y: 242.2, d: "M 1 0 L 0.8 12.1 L 0 12.1 L 0 17.8 L 5.5 18.1 L 5.5 16.1 L 9.6 16.3 L 9.6 18.4 L 20 18.8 L 20.1 13.4 L 19.2 11.7 L 19.3 4 C 19.3 4 20 3.9 20 3.4 C 20 3 19.8 2.8 19.5 2.7 L 19.2 0.6 L 0.9 0 L 1 0 Z" },
  { name: "Edificio P. Ignacio Martín-Baró, S.J.", directions: "Desde Aulas A, camina hacia el oeste hasta el borde del campus: el Martín-Baró queda sobre el CEDITEC.", aliases: ["martin baro", "martin-baro"], x: 34.3, y: 209.2, d: "M 6.9 21.3 L 0 14.7 L 12.1 0.9 L 13.3 1.9 L 16.6 0 L 17.9 2.4 C 17.9 2.4 5.8 14.8 6.9 21.3 L 6.9 21.3 Z" },
  { name: "Magna I", directions: "Desde la Cafetería Central, sube hacia el norte: Magna I queda arriba, a la derecha del Auditorio Ellacuría.", aliases: [], magna: 1, x: 159.8, y: 161.6, d: "M 12.5 3.7 L 12.5 7.5 L 2.7 9.9 L 2.7 7.6 C 1.2 7.6 0 6.4 0 4.9 C 0 3.5 1.2 2.3 2.7 2.3 L 2.7 0 L 12.5 3.7 L 12.5 3.7 Z" },
  { name: "Magna II", directions: "Sigue hacia el norte desde Magna I: Magna II queda arriba, en la esquina noreste de la fila.", aliases: [], magna: 2, x: 162.2, y: 145.5, d: "M 12.5 3.7 L 12.5 7.5 L 2.7 9.9 L 2.7 7.6 C 1.2 7.6 0 6.4 0 4.9 C 0 3.5 1.2 2.3 2.7 2.3 L 2.7 0 L 12.5 3.7 L 12.5 3.7 Z" },
  { name: "Magna III", directions: "Desde el Auditorio Ellacuría, sigue hacia el norte y gira a la derecha: Magna III queda justo arriba.", aliases: [], magna: 3, x: 140.9, y: 147, d: "M 9.3 0.8 L 9 9.5 L 7.8 7.8 L 1.8 9.5 L 0 4.7 L 1.8 0 L 8.1 2.3 L 9.3 0.8 Z" },
  { name: "Magna IV", directions: "Desde el Auditorio Ellacuría, sigue hacia el norte y gira a la izquierda: Magna IV queda justo arriba, junto a Magna III.", aliases: [], magna: 4, x: 123.7, y: 146, d: "M 9.3 0.8 L 9 9.5 L 7.8 7.8 L 1.8 9.5 L 0 4.7 L 1.8 0 L 8.1 2.3 L 9.3 0.8 Z" },
  { name: "Magna V", directions: "Desde la Plaza de los Mártires, sube hacia el noroeste pasando Aulas C: Magna V queda a la izquierda del Auditorio Ellacuría.", aliases: [], magna: 5, x: 111.2, y: 155.5, d: "M 9.3 0.8 L 9 9.5 L 7.8 7.8 L 1.8 9.5 L 0 4.7 L 1.8 0 L 8.1 2.3 L 9.3 0.8 Z" },
  { name: "Magna VI", directions: "Desde Aulas C, sigue hacia el noroeste: Magna VI es la última de la fila, en el extremo oeste.", aliases: [], magna: 6, x: 97.6, y: 169.5, d: "M 9.3 0.8 L 9 9.5 L 7.8 7.8 L 1.8 9.5 L 0 4.7 L 1.8 0 L 8.1 2.3 L 9.3 0.8 Z" },
  { name: "Auditorio Ignacio Ellacuría", directions: "Desde la Plaza de los Mártires, sube hacia el norte: el Auditorio Ellacuría queda justo arriba de la plaza.", aliases: ["ellacuria"], x: 127.1, y: 156.8, d: "M 4.9 0 L 2.2 10.3 L 3.2 14.7 L 1.9 14.7 C 1.9 14.7 1.1 17.8 0 18.4 L 0 22.4 L 11.5 22.7 L 14.7 17 L 14.7 15 L 13.2 13.7 L 14.7 10.8 L 12.5 0 L 4.9 0 L 4.9 0 Z" },
  { name: "Auditorio Segundo Montes, S.J.", directions: "Sal del circuito principal por el norte, pasando Magna VI: el auditorio queda al noroeste del campus, junto al Edificio del ICAS.", aliases: ["segundo montes", "montes"], x: 67.4, y: 108.5, d: "M 28.8 20.4 L 5.6 19.7 L 5.6 16 L 3.9 16 L 3.9 13.7 L 0 13.5 L 0 7.4 L 1 7.4 L 1 0 L 29.2 1.1 L 29.1 3.3 L 40.6 3.6 L 40.4 14.8 L 28.8 14.2 L 28.8 20.4 Z" },
  { name: "Edificio de Administración Central", directions: "Desde la Cafetería Central, ve hacia el este y sube al norte: Administración Central es el edificio grande de la esquina noreste.", aliases: ["administracion central", "administracion"], x: 175.3, y: 148.1, d: "M 35.4 9.4 L 35.5 4.5 L 28.1 4.1 L 28 6.9 L 15.4 6.4 L 15.5 3.4 L 7.5 3.2 L 7.5 2.8 C 7.5 2.2 7.2 1.5 6.7 1.1 L 6.3 0.7 C 5.9 0.2 5.3 0 4.6 0 L 2.9 0 L 2 20.8 L 0 20.8 L 0 23.3 L 1.8 23.3 L 1.9 24.9 L 9.6 25.3 L 10 19.3 L 6.9 19.2 L 6.9 17 L 15 17.3 L 15 15.8 L 27.6 16.5 L 27.8 18.1 L 34.9 18.3 L 35.1 13.4 L 30.3 13.2 L 30.4 9.2 L 35.4 9.5 L 35.4 9.4 Z M 10.6 11.4 L 12.2 12.3 L 7.2 12.3 L 7.3 8 L 12.7 8.6 L 10.6 9.3 L 10.6 11.4 Z" },
  { name: "Vicerrectoría Financiera", directions: "Sigue el camino hacia Administración Central y baja por su lado este: la Vicerrectoría queda pegada al borde este del campus.", aliases: ["vicerrectoria", "financiera"], x: 204.4, y: 176.7, d: "M 3.3 3.1 L 0.3 2.9 L 0 0 L 3.1 0.1 L 3.3 3.1 Z" },
  { name: "Laboratorios de Psicología", directions: "Desde la Plaza de los Estudiantes por la Paz, ve hacia el oeste: los laboratorios quedan pegados a la plaza, antes de Aulas A.", aliases: ["psicologia"], x: 93.9, y: 211.9, d: "M 19.2 1 L 19.2 7.3 L 4.5 6.5 L 4.4 8.3 L 2.8 8.2 L 2.8 9.4 L 0 9.4 L 0 0 L 4.6 0.2 L 4.6 1.5 L 9.1 1.5 L 9.1 0.8 L 19.2 1 Z" },
  { name: "Librería y Papelería", directions: "Desde la Plaza de los Mártires, baja hacia el suroeste: la Librería y Papelería queda arriba de la Plaza de los Estudiantes por la Paz.", aliases: ["libreria", "papeleria"], x: 108.2, y: 196.5, d: "M 19 2.2 L 19 6.9 L 4 6.1 L 3.8 7.7 L 0 7.7 L 0 0 L 4.6 0 L 4.5 1.6 L 19 2.2 Z" },
  { name: "Laboratorios de Ingeniería", directions: "Desde la Biblioteca, baja hacia el sur: los laboratorios quedan a la derecha del Jon de Cortina, cerca del acceso de la Avenida Albert Einstein.", aliases: ["ingenieria"], x: 156.3, y: 235.1, d: "M 0.6 0 L 0.6 2.9 L 3.1 2.9 L 3.1 3.7 L 0.8 3.7 L 0.8 5.2 L 3.1 5.2 L 3.1 5.8 L 0.3 5.8 L 0.3 8.5 L 3.1 8.5 L 3.1 9.2 L 0.6 9.2 L 0.6 10.6 L 3.1 10.6 L 3.1 11.2 L 0 11.2 L 0 14.3 L 11.8 14.8 C 11.8 14.8 11.7 14 12.4 13.9 C 13.2 13.9 12.9 15.3 12.9 15.7 C 12.9 16 12.9 17.4 12.9 17.4 L 15.2 17.6 L 15.6 10.8 L 16.3 10.5 L 16.3 1.9 L 12.5 1.7 L 12.5 0.6 C 12.5 0.6 0.6 0 0.6 0 L 0.6 0 Z" },
  { name: "Módulo A de Profesores, P. Francisco Javier Ibisate, S.J.", directions: "Desde el Jon de Cortina, baja hacia el sur: el Módulo A queda justo debajo, a la derecha del Módulo B.", aliases: ["modulo a", "ibisate"], x: 120.3, y: 253.2, d: "M 0.3 6.5 L 0 10.5 L 4.7 10.9 C 5.6 11 6.5 11.4 7.2 12 L 6.7 12.6 L 8.1 14.7 L 12.2 11.6 C 12.3 11.6 12.3 11.6 12.4 11.6 C 12.6 11.6 12.8 11.8 12.7 12 L 12.7 12.1 C 12.7 12.1 12.6 12.2 12.6 12.2 L 11.9 12.8 L 15.4 16.7 L 18.6 14.1 L 14.8 9.8 L 22.7 2.8 L 21.2 0.7 L 19.3 2.4 L 17 0 L 13.9 2.8 L 15.9 5.5 L 14.6 6.5 L 10.1 1.6 L 7.2 3.9 C 7.2 3.9 8 5.4 6.9 6.8 L 0.3 6.5 Z" },
  { name: "Módulo B de Profesores, Dr. Ignacio Martín-Baró", directions: "Desde el Jon de Cortina, baja hacia el sur: el Módulo B queda justo debajo, a la izquierda del Módulo A.", aliases: ["modulo b"], x: 95.8, y: 250, d: "M 2.7 2.7 L 6.4 7.1 L 7.1 6.7 C 7.2 6.7 7.3 6.7 7.4 6.7 C 7.5 6.8 7.5 7 7.4 7.1 L 6 8.7 L 2.1 8.7 L 1.8 9.9 L 0.3 9.9 L 0 16.8 L 4.3 17 L 4.5 11.5 L 10.7 11.8 L 10.7 13.4 L 9.5 13.4 L 9.3 18.1 L 12.7 18.2 L 12.7 13.7 L 12.1 13.7 L 12.1 12.8 C 12.1 12.8 23.1 13.3 23.1 13.3 L 23.1 10.9 L 23.8 10.9 C 23.8 10.9 23.8 7.4 23.8 7.4 L 15.7 7.1 L 15.7 3.4 C 15.7 3.4 12.9 3.4 12.9 3.4 L 12.9 3.9 C 12.9 3.9 11 3.9 11 3.9 L 9.1 5.9 L 8.3 5.2 L 9.2 4.3 L 5.3 0 L 2.7 2.7 Z" },
  { name: "Canchas", directions: "Sal del circuito del campus por el noreste: la pista y las canchas quedan afuera, a la derecha del Bulevar Los Próceres.", aliases: ["cancha", "pista"], x: 264, y: 40.1, d: "M 22.6 15.9 L 0 15 L 0.4 0 L 23.3 0.9 L 22.6 15.9 Z" },
  { name: "Centro de Orientación Profesional", directions: "Entra por el Acceso Peatonal y camina hacia el este por la calle del Cantábrico: el Centro de Orientación queda después de Pastoral Universitaria.", aliases: ["orientacion profesional", "orientacion"], x: 64.5, y: 277, d: "M 11.8 1.9 L 10.9 9.7 L 6.1 8.4 L 6.3 6.1 L 0 5.1 L 0.4 0 L 4.8 0 C 4.8 0 6.9 1.6 11.8 1.9 Z" },
  { name: "Centro de Asuntos Estudiantiles", directions: "Entra por el Acceso Peatonal y sigue al este por la calle del Cantábrico: queda después del Centro de Atención para la Comunicación y el Lenguaje.", aliases: ["asuntos estudiantiles"], x: 82.6, y: 288.6, d: "M 9.1 3.9 L 9.2 2.2 C 9.3 1.6 9.2 1.1 9 0.5 L 8.9 0.5 C 8.8 0.1 8.4 0 8.1 0.2 L 7.4 0.7 L 6.1 0.5 C 5.8 0.5 5.4 0.4 5.1 0.3 L 4 0 C 3.7 -0.1 3.5 0.1 3.5 0.4 L 3.5 1.7 L 0 10.4 L 5.5 12.5 L 9.1 3.9 L 9.1 3.9 Z" },
  { name: "Centro Cultural Universitario y Centro de Servicio Social", directions: "Entra por el Acceso Peatonal y sigue al este por la calle del Cantábrico: es el edificio amplio que sigue después del Centro de Asuntos Estudiantiles.", aliases: ["centro cultural", "servicio social"], x: 92.9, y: 283.2, d: "M 18.5 7.2 L 17.9 15.2 L 7.6 12.4 L 7.8 10.5 L 15.5 12.2 L 15.5 10.6 L 5.9 10.2 L 5.5 11.8 L 0.2 10.1 L 0.2 4.7 L 0 4.7 L 0 0 L 16.3 1.1 L 16.3 5.7 L 1.3 4.8 L 1.3 6.4 L 6.7 6.6 L 6.7 7.1 L 10.3 7.1 L 10.3 6.6 L 18.5 7.2 Z" },
  { name: "Parroquia Jesucristo Liberador", directions: "Entra por el Acceso Peatonal y sigue al este por la calle del Cantábrico: la Parroquia queda a mitad de la calle, después del Centro Cultural.", aliases: ["parroquia", "liberador"], x: 114.5, y: 284.1, d: "M 14.7 3 L 7.4 0 L 0 2.5 L 2.2 15.6 L 11.8 16.1 L 14.7 3 Z" },
  { name: "Centro Monseñor Romero", directions: "Entra por el Acceso Peatonal y sigue al este por la calle del Cantábrico, pasando la Parroquia: el Centro Romero es el edificio grande del final.", aliases: ["romero", "monsenor"], x: 132.9, y: 278.4, d: "M 0.3 0 L 0 6.1 L 14.1 6.9 L 14.1 8.9 L 12.7 8.9 L 12.5 14.3 L 17.3 14.6 L 17.3 14 L 19.7 14.1 C 19.7 14.1 19.5 12.9 21 12.9 L 21 15.2 L 22.3 15.2 L 22.3 13.3 L 25.9 13.6 L 26 9.7 L 38.4 10.4 L 38.5 4.5 L 29.2 4 L 29.1 1.6 L 22.6 1.4 L 22.5 2.4 L 20.5 2.2 L 20.5 0.8 L 14.3 0.4 L 14.3 1.1 L 0.4 0 L 0.3 0 Z" },
]

const romanNumbers: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6 }
const wordNumbers: Record<string, number> = {
  uno: 1,
  dos: 2,
  tres: 3,
  cuatro: 4,
  cinco: 5,
  seis: 6,
}

// Saca el número de Magna de un texto: "magna 3", "magna iii", "3", "tres"...
function readMagnaNumber(text: string): number | null {
  const token = text.match(/\b(\d|vi|iv|iii|ii|v|i|uno|dos|tres|cuatro|cinco|seis)\b/)?.[1]
  if (!token) return null
  if (/^\d$/.test(token)) return Number(token)
  return romanNumbers[token] ?? wordNumbers[token] ?? null
}

// ---------- ATENCIÓN AL CLIENTE ----------

// ============================================================
// PANTALLAS NUEVAS: Reglamento, Configuración, Notificaciones,
// Calendario y Dashboards (administrativo)
// ============================================================

// ---------- Iconos (SVG propios, no necesitan archivos) ----------

type IconName =
  | 'chevron-left'
  | 'chevron-right'
  | 'gear'
  | 'key'
  | 'bell'
  | 'moon'
  | 'globe'
  | 'help'
  | 'calendar'
  | 'door'
  | 'clipboard'
  | 'chat-dots'
  | 'book'
  | 'pin'
  | 'arrow-up'
  | 'message-circle'
  | 'logout'

const iconPaths: Record<IconName, ReactNode> = {
  'chevron-left': <path d="M15 18l-6-6 6-6" />,
  'chevron-right': <path d="M9 18l6-6-6-6" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    </>
  ),
  key: (
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  ),
  moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  door: (
    <>
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 20h20" />
      <path d="M14 12v.01" />
    </>
  ),
  clipboard: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h6" />
    </>
  ),
  'chat-dots': (
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </>
  ),
  book: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />,
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  'arrow-up': (
    <>
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </>
  ),
  'message-circle': <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </>
  ),
}

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      className="ui-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  )
}

function Switch({
  checked,
  label,
  onChange,
}: {
  checked: boolean
  label: string
  onChange: (value: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`switch ${checked ? 'switch-on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  )
}

function PageHeader({
  title,
  onBack,
  withGear = false,
}: {
  title: string
  onBack: () => void
  withGear?: boolean
}) {
  return (
    <header className="page-header">
      <button type="button" className="chat-back" onClick={onBack} aria-label="Volver">
        <img src={`${assets}/71473.svg`} alt="" />
      </button>
      <h1>{title}</h1>
      {withGear ? (
        <span className="page-icon" aria-hidden="true">
          <Icon name="gear" />
        </span>
      ) : (
        <span className="page-icon" aria-hidden="true" />
      )}
    </header>
  )
}

// ---------- CONFIGURACIÓN ----------

function SettingsScreen({
  onBack,
  onNotifications,
  onPassword,
  onHelp,
  onLogout,
}: {
  onBack: () => void
  onNotifications: () => void
  onPassword: () => void
  onHelp: () => void
  onLogout: () => void
}) {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <main className="page-screen with-nav">
      <PageHeader title="Configuración" onBack={onBack} />
      <div className="page-body settings-body">
        <div className="profile">
          <div className="profile-avatar" />
          <h2>Rodrigo Dubón</h2>
          <p>00123425@uca.edu.sv</p>
        </div>

        <h3 className="settings-title">Cuenta</h3>
        <button type="button" className="settings-row" onClick={onPassword}>
          <Icon name="key" />
          <span className="row-text">
            <strong>Cambiar Contraseña</strong>
          </span>
          <Icon name="chevron-right" size={20} />
        </button>
        <div className="settings-divider" />
        <button type="button" className="settings-row" onClick={onLogout}>
          <Icon name="logout" />
          <span className="row-text">
            <strong>Cerrar Sesión</strong>
          </span>
        </button>

        <h3 className="settings-title">Preferencias</h3>
        <button type="button" className="settings-row" onClick={onNotifications}>
          <Icon name="bell" />
          <span className="row-text">
            <strong>Notificaciones</strong>
            <small>Fechas, Trámites y Reservas</small>
          </span>
          <Icon name="chevron-right" size={20} />
        </button>
        <div className="settings-divider" />
        <div className="settings-row">
          <Icon name="moon" />
          <span className="row-text">
            <strong>Modo Oscuro</strong>
          </span>
          <Switch checked={darkMode} label="Modo oscuro" onChange={setDarkMode} />
        </div>
        <div className="settings-divider" />
        <div className="settings-row">
          <Icon name="globe" />
          <span className="row-text">
            <strong>Idioma</strong>
          </span>
        </div>

        <h3 className="settings-title">Soporte Técnico</h3>
        <button type="button" className="settings-row" onClick={onHelp}>
          <Icon name="help" />
          <span className="row-text">
            <strong>Centro de Ayuda</strong>
          </span>
        </button>
      </div>
    </main>
  )
}

// ---------- NOTIFICACIONES ----------

const notificationModules: Array<{
  id: string
  title: string
  description: string
  icon: IconName
  initial: boolean
}> = [
    {
      id: 'dates',
      title: 'Fechas importantes',
      description: 'Avisos de entregas, exámenes y plazos',
      icon: 'calendar',
      initial: true,
    },
    {
      id: 'reservations',
      title: 'Reservar espacios',
      description: 'Confirmación y recordatorio de tu reserva',
      icon: 'door',
      initial: false,
    },
    {
      id: 'procedures',
      title: 'Trámites',
      description: 'Cambios de estado de tus solicitudes',
      icon: 'clipboard',
      initial: false,
    },
    {
      id: 'support',
      title: 'Atención al cliente',
      description: 'Respuestas a tus consultas',
      icon: 'chat-dots',
      initial: false,
    },
    {
      id: 'rules',
      title: 'Reglamento',
      description: 'Novedades y cambios normativos',
      icon: 'book',
      initial: false,
    },
  ]

function NotificationsScreen({ onBack }: { onBack: () => void }) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(notificationModules.map((item) => [item.id, item.initial])),
  )

  return (
    <main className="page-screen with-nav">
      <PageHeader title="Notificaciones" onBack={onBack} />
      <div className="page-body">
        <p className="page-intro">Elige de qué módulos quieres recibir avisos.</p>
        <h3 className="settings-title notif-title">Módulos</h3>
        {notificationModules.map((item, index) => (
          <div key={item.id}>
            {index > 0 && <div className="settings-divider" />}
            <div className="notif-row">
              <span className="notif-icon">
                <Icon name={item.icon} />
              </span>
              <span className="row-text">
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
              <Switch
                checked={enabled[item.id]}
                label={item.title}
                onChange={(value) => setEnabled((current) => ({ ...current, [item.id]: value }))}
              />
            </div>
          </div>
        ))}
        <p className="page-note">
          Puedes cambiar esto cuando quieras. Los avisos urgentes de la UCA siempre se envían.
        </p>
      </div>
    </main>
  )
}

// ---------- CALENDARIO ----------

// Colores tomados del componente Calendario (página Componentes) del Figma (noviembre 2026 – diciembre 2027).
const VIGILIA = 'Vigilia por los mártires de El Salvador'

const eventFill: Record<string, string> = {
  'Asuetos UCA': '#d4dae1',
  'Clases (Grado)': '#d9e8ef',
  'Primeras evaluaciones (Grado)': '#deecd8',
  'Segundas evaluaciones (Grado)': '#deecd8',
  'Evaluaciones finales (Grado)': '#fbe4dd',
  'Preinscripción de asignaturas': '#dbe1f4',
  Vacaciones: '#e7e4e1',
  'Inicio/Fin de Ciclo': '#fbefd6',
  'Día de San Ignacio de Loyola': '#f8d6b3',
  [VIGILIA]: '#e9e4f5',
}

// Estos eventos se dibujan como un aro de color sobre el día.
const eventRing: Record<string, string> = {
  'Asuetos El Salvador': '#305c72',
  [VIGILIA]: '#e5ab44',
  'Misa por los mártires de la UCA': '#8b70b6',
}

type CalendarMonth = {
  year: number
  month: number
  name: string
  runs: Array<[number, number, string]>
}

const calendarMonths: CalendarMonth[] = [
  {
    year: 2026,
    month: 10,
    name: 'Noviembre 2026',
    runs: [
      [2, 2, 'Asuetos UCA'],
      [3, 7, 'Clases (Grado)'],
      [9, 13, 'Clases (Grado)'],
      [14, 14, 'Vigilia por los mártires de El Salvador'],
      [16, 21, 'Clases (Grado)'],
      [23, 23, 'Inicio/Fin de Ciclo'],
      [24, 28, 'Evaluaciones finales (Grado)'],
      [30, 30, 'Evaluaciones finales (Grado)'],
    ],
  },
  {
    year: 2026,
    month: 11,
    name: 'Diciembre 2026',
    runs: [
      [1, 2, 'Evaluaciones finales (Grado)'],
      [11, 11, 'Preinscripción de asignaturas'],
      [16, 24, 'Vacaciones'],
      [25, 25, 'Vacaciones · Asuetos El Salvador'],
      [26, 31, 'Vacaciones'],
    ],
  },
  {
    year: 2027,
    month: 0,
    name: 'Enero 2027',
    runs: [
      [1, 1, 'Vacaciones · Asuetos El Salvador'],
      [2, 3, 'Vacaciones'],
      [6, 6, 'Inicio/Fin de Ciclo'],
      [7, 9, 'Clases (Grado)'],
      [11, 16, 'Clases (Grado)'],
      [18, 23, 'Clases (Grado)'],
      [25, 30, 'Clases (Grado)'],
    ],
  },
  {
    year: 2027,
    month: 1,
    name: 'Febrero 2027',
    runs: [
      [1, 6, 'Clases (Grado)'],
      [8, 13, 'Clases (Grado)'],
      [15, 15, 'Inicio/Fin de Ciclo'],
      [16, 16, 'Evaluaciones finales (Grado)'],
      [25, 26, 'Preinscripción de asignaturas'],
    ],
  },
  {
    year: 2027,
    month: 2,
    name: 'Marzo 2027',
    runs: [
      [1, 1, 'Preinscripción de asignaturas'],
      [9, 9, 'Inicio/Fin de Ciclo'],
      [10, 13, 'Clases (Grado)'],
      [15, 20, 'Clases (Grado)'],
      [22, 24, 'Asuetos UCA'],
      [25, 27, 'Asuetos UCA · Asuetos El Salvador'],
      [28, 29, 'Asuetos UCA'],
      [30, 31, 'Clases (Grado)'],
    ],
  },
  {
    year: 2027,
    month: 3,
    name: 'Abril 2027',
    runs: [
      [1, 3, 'Clases (Grado)'],
      [5, 10, 'Clases (Grado)'],
      [12, 13, 'Clases (Grado)'],
      [14, 17, 'Primeras evaluaciones (Grado)'],
      [19, 24, 'Primeras evaluaciones (Grado)'],
      [26, 26, 'Primeras evaluaciones (Grado)'],
      [27, 30, 'Clases (Grado)'],
    ],
  },
  {
    year: 2027,
    month: 4,
    name: 'Mayo 2027',
    runs: [
      [1, 1, 'Asuetos UCA · Asuetos El Salvador'],
      [3, 8, 'Clases (Grado)'],
      [10, 10, 'Clases (Grado) · Asuetos El Salvador'],
      [11, 15, 'Clases (Grado)'],
      [17, 20, 'Clases (Grado)'],
      [21, 22, 'Segundas evaluaciones (Grado)'],
      [24, 29, 'Segundas evaluaciones (Grado)'],
      [31, 31, 'Segundas evaluaciones (Grado)'],
    ],
  },
  {
    year: 2027,
    month: 5,
    name: 'Junio 2027',
    runs: [
      [1, 2, 'Segundas evaluaciones (Grado)'],
      [3, 5, 'Clases (Grado)'],
      [7, 12, 'Clases (Grado)'],
      [14, 16, 'Clases (Grado)'],
      [17, 17, 'Clases (Grado) · Asuetos El Salvador'],
      [18, 19, 'Clases (Grado)'],
      [21, 21, 'Asuetos UCA'],
      [22, 26, 'Clases (Grado)'],
      [28, 29, 'Clases (Grado)'],
      [30, 30, 'Inicio/Fin de Ciclo'],
    ],
  },
  {
    year: 2027,
    month: 6,
    name: 'Julio 2027',
    runs: [
      [1, 3, 'Evaluaciones finales (Grado)'],
      [5, 10, 'Evaluaciones finales (Grado)'],
      [21, 23, 'Preinscripción de asignaturas'],
      [31, 31, 'Día de San Ignacio de Loyola'],
    ],
  },
  {
    year: 2027,
    month: 7,
    name: 'Agosto 2027',
    runs: [
      [1, 2, 'Asuetos UCA'],
      [3, 3, 'Asuetos UCA · Asuetos El Salvador'],
      [4, 4, 'Asuetos UCA'],
      [5, 6, 'Asuetos UCA · Asuetos El Salvador'],
      [7, 8, 'Asuetos UCA'],
      [11, 11, 'Inicio/Fin de Ciclo'],
      [12, 14, 'Clases (Grado)'],
      [16, 21, 'Clases (Grado)'],
      [23, 28, 'Clases (Grado)'],
      [30, 31, 'Clases (Grado)'],
    ],
  },
  {
    year: 2027,
    month: 8,
    name: 'Septiembre 2027',
    runs: [
      [1, 4, 'Clases (Grado)'],
      [6, 11, 'Primeras evaluaciones (Grado)'],
      [13, 14, 'Primeras evaluaciones (Grado)'],
      [15, 15, 'Primeras evaluaciones (Grado) · Asuetos El Salvador'],
      [16, 18, 'Primeras evaluaciones (Grado)'],
      [20, 20, 'Primeras evaluaciones (Grado)'],
      [21, 25, 'Clases (Grado)'],
      [27, 30, 'Clases (Grado)'],
    ],
  },
  {
    year: 2027,
    month: 9,
    name: 'Octubre 2027',
    runs: [
      [1, 2, 'Clases (Grado)'],
      [4, 9, 'Clases (Grado)'],
      [11, 14, 'Clases (Grado)'],
      [15, 16, 'Segundas evaluaciones (Grado)'],
      [18, 23, 'Segundas evaluaciones (Grado)'],
      [25, 27, 'Segundas evaluaciones (Grado)'],
      [28, 30, 'Clases (Grado)'],
    ],
  },
  {
    year: 2027,
    month: 10,
    name: 'Noviembre 2027',
    runs: [
      [1, 1, 'Clases (Grado)'],
      [2, 2, 'Asuetos UCA · Asuetos El Salvador'],
      [3, 6, 'Clases (Grado)'],
      [8, 12, 'Clases (Grado)'],
      [13, 13, 'Clases (Grado) · Vigilia por los mártires de El Salvador'],
      [15, 15, 'Clases (Grado)'],
      [16, 16, 'Clases (Grado) · Misa por los mártires de la UCA'],
      [17, 20, 'Clases (Grado)'],
      [22, 22, 'Clases (Grado)'],
      [23, 23, 'Inicio/Fin de Ciclo'],
      [24, 27, 'Evaluaciones finales (Grado)'],
      [29, 30, 'Evaluaciones finales (Grado)'],
    ],
  },
  {
    year: 2027,
    month: 11,
    name: 'Diciembre 2027',
    runs: [
      [1, 2, 'Evaluaciones finales (Grado)'],
      [13, 13, 'Preinscripción de asignaturas'],
      [16, 24, 'Vacaciones'],
      [25, 25, 'Vacaciones · Asuetos El Salvador'],
      [26, 31, 'Vacaciones'],
    ],
  },
]

// Eventos de un día (puede tener más de uno, por ejemplo clases + asueto nacional).
function calendarEventsFor(item: CalendarMonth, day: number): string[] {
  const run = item.runs.find(([from, to]) => day >= from && day <= to)
  return run ? run[2].split(' · ') : []
}

// Dos días del Figma tienen un color distinto al de su leyenda; se dejan tal cual están en el diseño.
function dayFill(item: CalendarMonth, part: string): string {
  if (part === 'Segundas evaluaciones (Grado)' && item.year === 2027 && item.month === 9) return '#c6e2f1'
  if (part === 'Asuetos UCA' && item.year === 2026 && item.month === 10) return '#c9c9c9'
  return eventFill[part]
}

function calendarDayStyle(item: CalendarMonth, parts: string[]): CSSProperties | undefined {
  if (parts.length === 0) return undefined
  const rings = parts.filter((part) => eventRing[part] && (part !== VIGILIA || parts.length > 1))
  const fills = parts.filter((part) => !rings.includes(part))
  const style: CSSProperties = {}
  if (fills[0]) style.background = dayFill(item, fills[0])
  if (rings[0]) style.boxShadow = `inset 0 0 0 2px ${eventRing[rings[0]]}`
  return style
}

function CalendarScreen({ onBack }: { onBack: () => void }) {
  const monthRefs = useRef<Array<HTMLElement | null>>([])
  const today = new Date()

  const goToday = () => {
    const index = calendarMonths.findIndex(
      (item) => item.year === today.getFullYear() && item.month === today.getMonth(),
    )
    monthRefs.current[index >= 0 ? index : 0]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="chat-screen">
      <ChatHeader onBack={onBack} />
      <section className="calendar-scroll" style={{ paddingBottom: 112 }}>
        {calendarMonths.map((item, monthIndex) => {
          const firstWeekday = new Date(item.year, item.month, 1).getDay()
          const daysInMonth = new Date(item.year, item.month + 1, 0).getDate()
          const cells: Array<number | null> = [
            ...Array.from({ length: firstWeekday }, () => null),
            ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
          ]

          // Leyenda: eventos del mes en el orden en que aparecen.
          const legend: string[] = []
          let vigiliaWithRing = false
          for (let day = 1; day <= daysInMonth; day++) {
            const parts = calendarEventsFor(item, day)
            if (parts.includes(VIGILIA) && parts.length > 1) vigiliaWithRing = true
            for (const part of parts) if (!legend.includes(part)) legend.push(part)
          }

          return (
            <section
              className="month-card"
              key={item.name}
              ref={(element) => {
                monthRefs.current[monthIndex] = element
              }}
            >
              <div className="month-head">
                <h2>{item.name}</h2>
                <button type="button" className="today-pill" onClick={goToday}>
                  Hoy
                </button>
              </div>
              <div className="month-grid">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((letter, index) => (
                  <span className="weekday" key={`${letter}-${index}`}>
                    {letter}
                  </span>
                ))}
                {cells.map((day, index) => {
                  if (day === null) return <span key={`blank-${index}`} />
                  const isToday =
                    item.year === today.getFullYear() &&
                    item.month === today.getMonth() &&
                    day === today.getDate()
                  return (
                    <span className="day-cell" key={day}>
                      <span
                        className={`day-dot ${isToday ? 'day-today' : ''}`}
                        style={isToday ? undefined : calendarDayStyle(item, calendarEventsFor(item, day))}
                      >
                        {day}
                      </span>
                    </span>
                  )
                })}
              </div>
              <ul className="month-legend">
                {legend.map((part) => (
                  <li key={part}>
                    <span
                      style={{
                        background: eventFill[part],
                        boxShadow:
                          eventRing[part] && (part !== VIGILIA || vigiliaWithRing)
                            ? `inset 0 0 0 2px ${eventRing[part]}`
                            : undefined,
                      }}
                    />
                    {part}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </section>
    </main>
  )
}

function CalendarLinkCard({ onOpen }: { onOpen: () => void }) {
  return (
    <article className="chat-info-card">
      <h2>Calendario académico</h2>
      <p className="info-description">
        Revisa clases, evaluaciones, vacaciones y asuetos del ciclo.
      </p>
      <button
        className="chat-card-action chat-card-action-dates"
        type="button"
        onClick={onOpen}
      >
        <span>Ver calendario</span>
      </button>
    </article>
  )
}

// ---------- REGLAMENTO (chat) ----------

function findRule(request: string): Reply {
  const text = normalizeProcedureRequest(request)

  if (text.includes('retiro') || text.includes('retirar')) {
    return {
      text: '¡Claro!',
      card: (
        <ChatInfoCard
          title="Reglamento · Retiro de materias"
          description="Asegúrate de ingresar al Sistema de Registro de Notas y seguir las instrucciones para completar la solicitud."
          rows={[
            { icon: 'b4d5a.svg', text: '2210-6600 ext. 237' },
            { icon: 'af182.svg', text: 'registro.academico@uca.edu.sv' },
            { icon: '0da32.svg', text: 'Unidad de Registro Académico', emphasized: true },
          ]}
          action="Solicitar"
          actionIcon="8df50.svg"
          href="https://sim.uca.edu.sv/wseg/portal_aplicaciones.jsp"
          tone="rules"
        />
      ),
    }
  }

  return { text: SOON }
}

// ---------- DASHBOARD GENERAL (administrativo) ----------

function DashboardScreen({
  onBack,
  onContent,
}: {
  onBack: () => void
  onContent: () => void
}) {
  const activity: Array<{ icon: IconName; text: string; count: number }> = [
    { icon: 'pin', text: 'Biblioteca CRAI', count: 45 },
    { icon: 'book', text: 'Guía de Trámites - Becas', count: 32 },
    { icon: 'help', text: '¿dónde está el decanato?', count: 18 },
  ]

  return (
    <main className="page-screen">
      <PageHeader title="Dashboard General" onBack={onBack} />
      <div className="page-body dashboard-body">
        <article className="metric-card metric-dark">
          <p className="metric-label">Total Consultas</p>
          <p className="metric-value">2,804</p>
          <p className="metric-sub">
            <Icon name="arrow-up" size={16} />
            vs. mes anterior
          </p>
        </article>
        <article className="metric-card metric-blue">
          <p className="metric-label">Edificio Más Consultado</p>
          <p className="metric-value">867</p>
          <p className="metric-sub">Biblioteca CRAI</p>
        </article>

        <h3 className="settings-title activity-title">Actividad Reciente</h3>
        <ul className="activity-list">
          {activity.map((item) => (
            <li key={item.text}>
              <span className="activity-icon">
                <Icon name={item.icon} size={20} />
              </span>
              <span className="activity-text">{item.text}</span>
              <span className="activity-count">Frecuencia: {item.count}</span>
            </li>
          ))}
        </ul>

        <div className="settings-spacer" />
        <button type="button" className="primary-action" onClick={onContent}>
          Análisis de Contenido
        </button>
      </div>
    </main>
  )
}

// ---------- ANÁLISIS DE CONTENIDO (administrativo) ----------

const donutSegments = [
  { label: 'Reglamento', value: 25, color: '#103357' },
  { label: 'Trámites', value: 20, color: '#2e7da6' },
  { label: 'Reservar espacios', value: 15, color: '#2ea693' },
  { label: 'Dónde queda', value: 15, color: '#8a3220' },
  { label: 'Fechas clave', value: 15, color: '#e0a030' },
  { label: 'Atención al cliente', value: 10, color: '#7b5fc4' },
]

const unansweredQueries = [
  { query: '¿qué pasa si pierdo mi carné?', module: 'Reglamento', date: '14 nov.' },
  { query: '¿dónde pago la matricula?', module: 'Trámites', date: '13 nov.' },
  { query: '¿cuándo es el examen de admisión?', module: 'Fechas clave', date: '12 nov.' },
]

function ContentAnalysisScreen({ onBack }: { onBack: () => void }) {
  const [exported, setExported] = useState(false)
  const radius = 58
  const circumference = 2 * Math.PI * radius
  let offset = 0

  const exportReport = () => {
    setExported(true)
    window.setTimeout(() => setExported(false), 2000)
  }

  return (
    <main className="page-screen">
      <PageHeader title="Análisis de Contenido" onBack={onBack} />
      <div className="page-body dashboard-body">
        <article className="donut-card">
          <h2>Distribución de Consultas</h2>
          <p>Total Consultas por Módulo</p>
          <div className="donut-wrap">
            <svg width="144" height="144" viewBox="0 0 144 144" role="img" aria-label="Consultas por módulo">
              {donutSegments.map((segment) => {
                const length = (segment.value / 100) * circumference
                const circle = (
                  <circle
                    key={segment.label}
                    cx="72"
                    cy="72"
                    r={radius}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="24"
                    strokeDasharray={`${length - 4} ${circumference - length + 4}`}
                    strokeDashoffset={-offset}
                    transform="rotate(-90 72 72)"
                  />
                )
                offset += length
                return circle
              })}
            </svg>
            <div className="donut-center">
              <strong>100%</strong>
              <span>consultas</span>
            </div>
          </div>
          <ul className="donut-legend">
            {donutSegments.map((segment) => (
              <li key={segment.label}>
                <span className="legend-dot" style={{ background: segment.color }} />
                <span className="legend-name">{segment.label}</span>
                <b>{segment.value}%</b>
              </li>
            ))}
          </ul>
        </article>

        <h3 className="settings-title activity-title">Consultas sin Respuesta Recientes</h3>
        <div className="query-table" role="table" aria-label="Consultas sin respuesta">
          <div className="query-head" role="row">
            <span>Consulta Exacta</span>
            <span>Módulo</span>
            <span>Fecha</span>
          </div>
          {unansweredQueries.map((row) => (
            <div className="query-row" role="row" key={row.query}>
              <span>{row.query}</span>
              <span>{row.module}</span>
              <span>{row.date}</span>
            </div>
          ))}
        </div>

        <div className="settings-spacer" />
        <button type="button" className="primary-action" onClick={exportReport}>
          {exported ? 'Reporte exportado' : 'Exportar Reporte de Contenido'}
        </button>
      </div>
    </main>
  )
}

// ============================================================

// ============================================================
// CHAT ÚNICO CON MEMORIA
// Todas las tarjetas del inicio abren la MISMA conversación.
// Toko entiende trámites, reservas, fechas, ubicación, reglamento
// y contacto sin importar desde qué tarjeta se entró.
// ============================================================

type ChatMessage = {
  id: number
  role: 'assistant' | 'user'
  text: string
  card?: ReactNode
}

type Pending = { domain: ChatTopic; text: string } | null

type Routed = Reply & { domain: ChatTopic | null; pending: Pending; autoOpen?: boolean }

const WELCOME_MESSAGE = '¡Hola! Cuéntame, ¿en qué te puedo ayudar hoy?'

const reservationLevels: Record<string, string> = {
  'crai-first-floor': 'primer',
  'crai-second-floor': 'segundo',
  'crai-third-floor': 'tercer',
}

function procedureReply(match: ProcedureMatch): Reply | null {
  if (match.type === 'card') {
    return {
      text: '¡Claro! Acá tienes el enlace para solicitar tu documento.',
      card: <ProcedureResponseCard card={match.card} />,
    }
  }
  if (match.type === 'clarify') return { text: match.text }
  return null
}

function reservationReply(match: ReservationMatch): Reply | null {
  if (match.type === 'card') {
    const level = reservationLevels[match.card.id]
    return {
      text: level
        ? `Aquí está el enlace para reservar en el ${level} nivel:`
        : '¡Claro! Aquí tienes la opción que mejor coincide.',
      card: <ReservationResponseCard card={match.card} />,
    }
  }
  if (match.type === 'clarify') return { text: match.text }
  return null
}

function supportReply(): Reply {
  return {
    text: 'Claro, esta es la central de la UCA:',
    card: (
      <ChatInfoCard
        title="Central telefónica UCA"
        description="Llama y pide que te comuniquen con el área que necesitas."
        rows={[
          { icon: 'b4d5a.svg', text: '2210-6600' },
          { icon: 'af182.svg', text: 'atencion.cliente@uca.edu.sv', trailingIcon: 'c3cba.svg' },
          { icon: '0da32.svg', text: 'Bulevar Los Próceres, San Salvador' },
        ]}
        action="Llamar"
        actionIcon="58e0a.svg"
        href="tel:+50322106600"
        tone="support"
      />
    ),
  }
}

// Grupos que necesitan una aclaración ("Aulas" -> A, B, C o D).
const locationGroups: Array<{ words: string[]; ask: string }> = [
  { words: ['magna'], ask: 'Hay varios Magna, del I al VI. ¿Cuál?' },
  { words: ['aula'], ask: 'Hay Aulas A, B, C y D. ¿Cuál buscas?' },
  { words: ['modulo'], ask: 'Hay Módulo A y Módulo B de Profesores. ¿Cuál buscas?' },
  {
    words: ['auditorio'],
    ask: 'Hay tres auditorios: Elba y Celina Ramos, Ignacio Ellacuría y Segundo Montes. ¿Cuál buscas?',
  },
  {
    words: ['laboratorio'],
    ask: 'Hay Laboratorios de Psicología y de Ingeniería. ¿Cuáles buscas?',
  },
  {
    words: ['centro'],
    ask: 'Hay varios centros: Orientación Profesional, Asuntos Estudiantiles, Cultural Universitario y Monseñor Romero. ¿Cuál buscas?',
  },
]

const NOT_FOUND_BUILDING =
  'No encontré ese edificio. ¿Me dices su nombre? Por ejemplo: Biblioteca, Cafetería Central o Magna III.'

function findBuilding(text: string): Building | 'ask-magna' | null {
  // Magna: "magna 3", "magna iii", "tres"...
  if (text.includes('magna')) {
    const number = readMagnaNumber(text.slice(text.indexOf('magna')))
    if (number && number >= 1 && number <= 6) return buildingList.find((b) => b.magna === number) ?? null
    return 'ask-magna'
  }
  // Aulas A-D: "aulas b", "edificio d"
  const letter = text.match(/\b(?:aulas?|edificio)\s+([abcd])\b/)?.[1]
  if (letter) {
    const found = buildingList.find((b) => b.aliases.includes(`aulas ${letter}`))
    if (found) return found
  }
  // El alias más largo que aparezca en el texto gana.
  let best: Building | null = null
  let bestLength = 0
  for (const b of buildingList) {
    for (const alias of b.aliases) {
      if (text.includes(alias) && alias.length > bestLength) {
        best = b
        bestLength = alias.length
      }
    }
  }
  return best
}

// Devuelve null si el mensaje no habla de un edificio.
// `before` es lo que la persona dijo antes cuando Toko le preguntó "¿cuál?".
function locationReply(
  text: string,
  before = '',
): { reply: Reply; waiting: boolean } | null {
  const combined = before ? `${before} ${text}` : text
  const found = findBuilding(combined)
  if (found && found !== 'ask-magna') {
    return {
      reply: {
        text: `Aquí está ${found.name}:`,
        card: <BuildingCard building={found} />,
      },
      waiting: false,
    }
  }
  if (found === 'ask-magna') {
    return { reply: { text: 'Hay varios Magna, del I al VI. ¿Cuál?' }, waiting: true }
  }
  const group = locationGroups.find((g) => g.words.some((w) => combined.includes(w)))
  if (group) return { reply: { text: group.ask }, waiting: true }
  return null
}

// ---------- CONVERSACIÓN AMIGABLE (saludos, gracias, "¿cómo estás?"...) ----------

const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

const TOPIC_HINT =
  /tramite|constancia|certificad|nota|carnet|reserv|sala|cubiculo|tablet|prestamo|renov|fecha|cuando|calendario|periodo|reglamento|regla|edificio|magna|aula|modulo|auditorio|donde|ubicacion|telefono|llamar|contacto|atencion|directorio|solicitud|inscrip|retiro|multimedia|radio|ciclorama|taller|estudio/

function smallTalk(text: string): Reply | null {
  if (!text || text.split(' ').length > 8) return null
  const is = (pattern: RegExp) => pattern.test(text)

  const greet = is(
    /(^| )(hola+|holi+|hey+|ey|ola|buenas|buenos dias|buen dia|buenas tardes|buenas noches|que onda|saludos|hello|hi)( |$)/,
  )
  const how = is(
    /(como (estas|andas|te va|te encuentras|te sientes|amaneciste|va tu dia)|que tal( estas| andas| tu dia| todo)?)( |$)/,
  )
  const feelGood = is(
    /^(bien|muy bien|bastante bien|estoy bien|todo bien|excelente|super bien|de maravilla|todo excelente)( gracias| y tu| y usted)?$/,
  )
  const feelBad = is(
    /(estoy|ando|me siento|me encuentro) (mal|cansad[oa]|estresad[oa]|agobiad[oa]|triste|preocupad[oa]|abrumad[oa])/,
  )
  const thanks = is(/gracias|agradezco|muy amable|thank/)
  const please = is(/^(por favor|porfa|porfavor|pls|please)$/)
  const bye = is(
    /(^| )(adios|chao|chau|bye|hasta luego|hasta pronto|nos vemos|me voy|cuidate|hasta manana)( |$)/,
  )
  const who = is(
    /(quien eres|que eres|como te llamas|cual es tu nombre|tu nombre|eres (un )?(robot|bot|ia|humano|persona|real))/,
  )
  const can = is(
    /(que puedes hacer|en que me (ayudas|puedes ayudar)|en que puedes ayudar|para que sirves|que sabes|que haces|como me ayudas|necesito ayuda|ayudame|me ayudas|puedes ayudarme)/,
  )
  const praise = is(
    /(eres (muy |super |re )?(genial|bueno|util|increible|lindo|amable|el mejor|crack|inteligente|rapido)|buen trabajo|me ayudaste|me encantas|me caes bien|te quiero|bien hecho|que bien)/,
  )
  const ack = is(
    /^(ok|okay|oki|vale|listo|entendido|de acuerdo|perfecto|genial|excelente|super|dale|sale|va|claro|ya|entiendo|ah ok)$/,
  )
  const sorry = is(/(perdon|disculpa|lo siento|perdona)/)
  const joke = is(/(chiste|hazme reir|algo gracioso)/)
  const today = is(/(que dia es|a que dia estamos|a cuanto estamos)/)
  const clock = is(/(que hora es|la hora)/)

  const hi = text.includes('buenos dias')
    ? '¡Buenos días!'
    : text.includes('buenas tardes')
      ? '¡Buenas tardes!'
      : text.includes('buenas noches')
        ? '¡Buenas noches!'
        : '¡Hola!'

  if (today) {
    const date = new Date().toLocaleDateString('es-SV', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    return { text: `Hoy es ${date}.` }
  }
  if (clock) {
    const time = new Date().toLocaleTimeString('es-SV', { hour: 'numeric', minute: '2-digit' })
    return { text: `Ahora mismo son las ${time}.` }
  }
  if (joke) {
    return {
      text: pick([
        '¿Por qué el estudiante llevó una escalera a la biblioteca? Porque quería subir sus notas.',
        '¿Qué le dice un estudiante a su laptop en época de parciales? "No me falles ahora".',
        '¿Cuál es el colmo de un estudiante de diseño? Que le pidan "algo sencillo" y que sea para ayer.',
      ]),
    }
  }
  if (who) {
    return {
      text: 'Soy Toko, tu asistente UCA. Te ayudo con trámites, reglamento, fechas importantes, reservas de espacios y a encontrar edificios del campus.',
    }
  }
  if (can) {
    return {
      text: 'Con gusto. Puedo ayudarte con trámites, reglamento, fechas importantes, reservar espacios, ubicar edificios y darte contactos de la UCA. Cuéntame qué necesitas o mira los ejemplos en la pestaña Ayuda.',
    }
  }
  if (feelBad) {
    return {
      text: 'Lamento oírlo. Ánimo, tú puedes con esto. Si algo de la universidad te está agobiando, cuéntame y vemos cómo resolverlo juntos.',
    }
  }
  if (feelGood) {
    return {
      text: pick([
        '¡Qué gusto! Me alegra saberlo. Cuando quieras, cuéntame en qué te puedo ayudar.',
        '¡Excelente! Así da gusto trabajar. ¿En qué te ayudo hoy?',
      ]),
    }
  }
  if (how) {
    const lead = greet ? `${hi} ` : ''
    return {
      text:
        lead +
        pick([
          '¡Muy bien, gracias por preguntar! Estoy aquí para ayudarte con lo que necesites de la UCA. ¿Y tú, cómo estás?',
          'Todo muy bien por acá, listo para ayudarte con trámites, reglamento, fechas, reservas y ubicaciones. ¿Y tú, cómo vas?',
          '¡Muy bien, gracias! Con ganas de ayudarte en lo que necesites. ¿Y tú, cómo estás?',
        ]),
    }
  }
  if (thanks && bye) {
    return { text: '¡Con gusto! Hasta pronto, aquí estaré cuando me necesites.' }
  }
  if (thanks) {
    return {
      text: pick([
        '¡Con gusto! Si necesitas algo más, aquí estoy.',
        '¡De nada! Para eso estoy. Dime si te ayudo con algo más.',
        '¡Un placer ayudarte! Cualquier otra duda, me avisas.',
      ]),
    }
  }
  if (bye) {
    return {
      text: pick([
        '¡Hasta pronto! Cuando necesites algo de la UCA, aquí me tienes.',
        '¡Nos vemos! Que te vaya muy bien.',
      ]),
    }
  }
  if (please) {
    return { text: 'Claro, dime qué necesitas y con gusto te ayudo.' }
  }
  if (sorry) {
    return { text: 'No te preocupes, no pasa nada. ¿En qué te puedo ayudar?' }
  }
  if (praise) {
    return {
      text: pick([
        '¡Gracias, me alegra mucho! Aquí sigo por si necesitas algo más.',
        '¡Qué lindo! Gracias. Cuando quieras, seguimos.',
      ]),
    }
  }
  if (ack) {
    return {
      text: pick([
        '¡Perfecto! Cuando quieras, dime qué más necesitas.',
        '¡Listo! Aquí sigo para lo que necesites.',
      ]),
    }
  }
  if (greet) {
    return {
      text: pick([
        `${hi} Qué gusto saludarte. ¿En qué te puedo ayudar hoy?`,
        `${hi} Aquí estoy para ayudarte con trámites, reglamento, fechas, reservas y ubicaciones. ¿Qué necesitas?`,
        `${hi} ¿Cómo te puedo ayudar hoy?`,
      ]),
    }
  }
  return null
}

function routeMessage(
  request: string,
  pending: Pending,
  lastDomain: ChatTopic | null,
  openCalendar: () => void,
): Routed {
  const text = normalizeProcedureRequest(request)
  const has = (...words: string[]) => words.some((word) => text.includes(word))
  const done = (domain: ChatTopic, reply: Reply, next: Pending = null): Routed => ({
    ...reply,
    domain,
    pending: next,
  })

  // 1. Respuesta a una pregunta que Toko acaba de hacer
  if (pending) {
    const combined = `${pending.text} ${text}`
    if (pending.domain === 'location') {
      const found = locationReply(text, pending.text)
      if (found) {
        return done('location', found.reply, found.waiting ? { domain: 'location', text: combined } : null)
      }
    }
    if (pending.domain === 'procedures') {
      const match = findProcedureCard(combined)
      if (match.type === 'card') return done('procedures', procedureReply(match)!)
      if (combined.includes('nota') && has('ambos', 'ambas', 'los dos', 'las dos', 'todos')) {
        const both = ['certified-grades', 'grades'].map((id) => procedureCards.find((c) => c.id === id)!)
        return done('procedures', {
          text: '¡Claro! Acá tienes los dos enlaces para solicitar tu documento.',
          card: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {both.map((card) => (
                <ProcedureResponseCard key={card.id} card={card} />
              ))}
            </div>
          ),
        })
      }
    }
    if (pending.domain === 'reservation') {
      const match = findReservationCard(combined)
      if (match.type === 'card') return done('reservation', reservationReply(match)!)
    }
  }

  // Conversación amigable: saludos, gracias, "¿cómo estás?"...
  const talk = smallTalk(text)
  if (talk && (!TOPIC_HINT.test(text) || /gracias por/.test(text))) {
    return { ...talk, domain: null, pending }
  }

  // 2. Contacto
  if (
    has('atencion', 'telefono', 'llamar', 'llamada', 'contactar', 'contacto', 'comunicarme') ||
    has('hablar con', 'directorio')
  ) {
    return done('support', supportReply())
  }

  // 3. Dónde queda
  const asksPlace = has('magna', 'edificio', 'donde queda', 'donde esta', 'donde encuentro', 'ubicacion', 'como llego')
  const otherTopic = has('reserv', 'sala', 'renov', 'prestamo', 'prestar', 'tablet', 'cubiculo', 'tramite', 'constancia', 'certificado', 'fecha', 'cuando', 'calendario', 'reglamento', 'periodo', 'multimedia', 'radio', 'estudio', 'ciclorama', 'taller')
  if (asksPlace || (!otherTopic && (findBuilding(text) || has('aula', 'modulo', 'auditorio')))) {
    const found = locationReply(text)
    if (found) return done('location', found.reply, found.waiting ? { domain: 'location', text } : null)
    return done('location', { text: NOT_FOUND_BUILDING }, { domain: 'location', text: '' })
  }

  // 4. Reglamento y fechas (solo cuando se piden de forma clara)
  const wantsRule = has('reglamento', 'reglas') || (lastDomain === 'rules' && has('retiro', 'retirar'))
  if (wantsRule) {
    const reply = findRule(request)
    if (reply.text !== SOON) return done('rules', reply)
  }
  const wantsDate =
    has('fecha', 'cuando', 'calendario', 'periodo') ||
    (lastDomain === 'dates' && has('preinscrip', 'inscrip', 'adicion', 'retiro', 'retirar', 'agregar', 'anadir'))
  if (wantsDate) {
    // Como en el Figma: Toko dice "¡Claro!" y se abre el calendario.
    return {
      ...done('dates', { text: '¡Claro!', card: <CalendarLinkCard onOpen={openCalendar} /> }),
      autoOpen: true,
    }
  }

  // 5. Reservas
  const reservation = findReservationCard(text)
  if (reservation.type !== 'unavailable') {
    return done(
      'reservation',
      reservationReply(reservation)!,
      reservation.type === 'clarify' ? { domain: 'reservation', text } : null,
    )
  }

  // 6. Trámites
  const procedure = findProcedureCard(text)
  if (procedure.type !== 'unavailable') {
    return done(
      'procedures',
      procedureReply(procedure)!,
      procedure.type === 'clarify' ? { domain: 'procedures', text } : null,
    )
  }

  // Si Toko estaba esperando una respuesta, la sigue esperando.
  if (pending) {
    return {
      text: 'No logré entenderte. Puedes responder con una de las opciones que te mencioné o preguntarme otra cosa.',
      domain: null,
      pending,
    }
  }

  return { text: SOON, domain: null, pending: null }
}

function AssistantChat({
  messages,
  typing,
  onSend,
}: {
  messages: ChatMessage[]
  typing: boolean
  onSend: (text: string) => void
}) {
  const [input, setInput] = useState('')
  const endRef = useRef<HTMLDivElement | null>(null)
  // Los mensajes que ya existían al entrar no vuelven a animarse.
  const seen = useRef(messages.length)

  useEffect(() => {
    if (messages.length === 0 && !typing) return
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, typing])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const text = input.trim()
    if (!text) return
    onSend(text)
    setInput('')
  }

  return (
    <main className="chat-screen with-nav">
      <ChatHeader />
      <section className="chat-messages">
        <div className="chat-intro">
          <WavingToko />
          <div className="intro-copy">
            <h2>¡Bienvenido a Toko!</h2>
            <p>Tu asistente UCA</p>
          </div>
        </div>
        <Message delay={380}>{WELCOME_MESSAGE}</Message>
        {messages.map((message, index) => {
          const animate = index >= seen.current
          if (message.card) {
            return (
              <div className={`message-row ${animate ? 'msg-in' : ''}`} key={message.id}>
                <MiniAvatar />
                <div className="toko-response">
                  <Message avatar={false} animate={false}>
                    {message.text}
                  </Message>
                  {message.card}
                </div>
              </div>
            )
          }
          return (
            <Message key={message.id} user={message.role === 'user'} animate={animate}>
              {message.text}
            </Message>
          )
        })}
        {typing ? (
          <div className="message-row msg-in">
            <MiniAvatar />
            <div className="message-bubble message-toko typing" aria-label="Toko está escribiendo">
              <i />
              <i />
              <i />
            </div>
          </div>
        ) : null}
        <div ref={endRef} />
      </section>
      <ProcedureComposer onChange={setInput} onSubmit={submit} value={input} />
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('loading-dark')
  // Memoria del chat: vive aquí para que no se pierda al cambiar de pestaña.
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [typing, setTyping] = useState(false)
  const nextMessageId = useRef(0)
  const pendingQuestion = useRef<Pending>(null)
  const lastDomain = useRef<ChatTopic | null>(null)
  const waitingReplies = useRef(0)
  const timers = useRef<number[]>([])

  const later = (action: () => void, ms: number) => {
    timers.current.push(window.setTimeout(action, ms))
  }

  const sendMessage = (text: string) => {
    const routed = routeMessage(text, pendingQuestion.current, lastDomain.current, () =>
      setScreen('calendar'),
    )
    pendingQuestion.current = routed.pending
    if (routed.domain) lastDomain.current = routed.domain
    const userId = nextMessageId.current++
    const assistantId = nextMessageId.current++
    setMessages((current) => [...current, { id: userId, role: 'user', text }])
    waitingReplies.current += 1
    setTyping(true)
    // Toko "escribe" un momento antes de responder.
    later(() => {
      waitingReplies.current -= 1
      setTyping(waitingReplies.current > 0)
      setMessages((current) => [
        ...current,
        { id: assistantId, role: 'assistant', text: routed.text, card: routed.card },
      ])
      if (routed.autoOpen) {
        later(() => setScreen((current) => (current === 'home' ? 'calendar' : current)), 1300)
      }
    }, 800)
  }

  const resetChat = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    waitingReplies.current = 0
    setTyping(false)
    setMessages([])
    nextMessageId.current = 0
    pendingQuestion.current = null
    lastDomain.current = null
  }

  useEffect(() => {
    if (screen !== 'loading-dark' && screen !== 'loading-light') return

    const timer = window.setTimeout(
      () => setScreen(screen === 'loading-dark' ? 'loading-light' : 'access'),
      1200,
    )
    return () => window.clearTimeout(timer)
  }, [screen])

  const activeTab: Tab | null =
    screen === 'home' || screen === 'calendar' || screen === 'help'
      ? screen
      : screen === 'settings' || screen === 'notifications'
        ? 'settings'
        : null

  const renderScreen = (): ReactNode => {
    if (screen === 'loading-dark') return <Splash dark />
    if (screen === 'loading-light') return <Splash dark={false} />
    if (screen === 'access') return <AccessSelector navigate={setScreen} />
    if (screen === 'login-student') {
      return <AuthScreen mode="login" role="student" navigate={setScreen} />
    }
    if (screen === 'login-admin') {
      return <AuthScreen mode="login" role="admin" navigate={setScreen} />
    }
    if (screen === 'signup') return <AuthScreen mode="signup" navigate={setScreen} />
    if (screen === 'recovery') return <RecoveryScreen navigate={setScreen} />
    if (screen === 'home') {
      return <AssistantChat messages={messages} typing={typing} onSend={sendMessage} />
    }
    if (screen === 'help') return <HelpScreen />
    if (screen === 'settings') {
      return (
        <SettingsScreen
          onBack={() => setScreen('home')}
          onNotifications={() => setScreen('notifications')}
          onPassword={() => setScreen('recovery')}
          onHelp={() => setScreen('help')}
          onLogout={() => {
            resetChat()
            setScreen('access')
          }}
        />
      )
    }
    if (screen === 'notifications') {
      return <NotificationsScreen onBack={() => setScreen('settings')} />
    }
    if (screen === 'calendar') return <CalendarScreen onBack={() => setScreen('home')} />
    if (screen === 'dashboard') {
      return (
        <DashboardScreen
          onBack={() => setScreen('access')}
          onContent={() => setScreen('dashboard-content')}
        />
      )
    }
    if (screen === 'dashboard-content') {
      return <ContentAnalysisScreen onBack={() => setScreen('dashboard')} />
    }
    return <main className="empty-screen" data-screen={screen} />
  }

  return (
    <>
      <div className="screen-enter" key={screen}>
        {renderScreen()}
      </div>
      {activeTab ? <NavBar active={activeTab} onChange={setScreen} /> : null}
    </>
  )
}
