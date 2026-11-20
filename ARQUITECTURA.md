# Arquitectura de Toko

La app se construye por capas. Cada capa solo puede usar las de abajo.

```
src/
├─ types/       Tipos (qué forma tienen los datos)
├─ config/      Ajustes (ruta de los assets)
├─ data/        Contenido: trámites, edificios, reservas, fechas…
├─ ui/          COMPONENTES NUCLEARES: Button, Card, TextField, Switch,
│               Accordion, DonutChart, DataTable, ListRow, ScreenLayout…
├─ chat/        Cerebro de Toko (reglas y respuestas). Sin pantallas.
├─ components/  COMPONENTES COMUNES armados con los nucleares:
│               InfoCard, NavBar, MessageBubble, MonthCard, StatCard…
├─ hooks/       Lógica compartida (useChat)
├─ screens/     PANTALLAS: se arman solo con ui/ y components/
├─ app/         App.tsx: rutas (React Router). routes.ts: la URL de cada pantalla
└─ styles/      global.css
```

## Reglas
1. Una pantalla NO dibuja botones ni tarjetas a mano: usa `ui/` y `components/`.
2. Los componentes nucleares (`ui/`) no conocen la app: solo reciben propiedades (variant, tone, icon, onClick…).
3. Para cambiar un texto o dato, edita `data/` o `chat/`, no las pantallas.
4. `npm run check` revisa que ninguna capa se salte las reglas.

## Cómo agregar algo
- Nueva pantalla → `screens/` + su nombre en `types/navigation.ts` + su URL en `app/routes.ts` + un `<Route>` en `app/App.tsx`.
- Nuevo tipo de tarjeta del chat → `types/chat.ts` + `components/chat/ChatCardView.tsx`.
- Nuevas respuestas del chat → `chat/` (aquí entra la expansión del chatbot).
