import type { CSSProperties } from 'react'

// Colores tomados del componente Calendario (página Componentes) del Figma (noviembre 2026 – diciembre 2027).
export const VIGILIA = 'Vigilia por los mártires de El Salvador'

export const eventFill: Record<string, string> = {
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
export const eventRing: Record<string, string> = {
  'Asuetos El Salvador': '#305c72',
  [VIGILIA]: '#e5ab44',
  'Misa por los mártires de la UCA': '#8b70b6',
}

export type CalendarMonth = {
  year: number
  month: number
  name: string
  runs: Array<[number, number, string]>
}

export const calendarMonths: CalendarMonth[] = [
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

// ---------- Ayudas para dibujar el calendario ----------

// Eventos de un día (puede tener más de uno, por ejemplo clases + asueto nacional).
export function calendarEventsFor(item: CalendarMonth, day: number): string[] {
  const run = item.runs.find(([from, to]) => day >= from && day <= to)
  return run ? run[2].split(' · ') : []
}

// Dos días del Figma tienen un color distinto al de su leyenda; se dejan tal cual están en el diseño.
export function dayFill(item: CalendarMonth, part: string): string {
  if (part === 'Segundas evaluaciones (Grado)' && item.year === 2027 && item.month === 9) return '#c6e2f1'
  if (part === 'Asuetos UCA' && item.year === 2026 && item.month === 10) return '#c9c9c9'
  return eventFill[part]
}

export function calendarDayStyle(item: CalendarMonth, parts: string[]): CSSProperties | undefined {
  if (parts.length === 0) return undefined
  const rings = parts.filter((part) => eventRing[part] && (part !== VIGILIA || parts.length > 1))
  const fills = parts.filter((part) => !rings.includes(part))
  const style: CSSProperties = {}
  if (fills[0]) style.background = dayFill(item, fills[0])
  if (rings[0]) style.boxShadow = `inset 0 0 0 2px ${eventRing[rings[0]]}`
  return style
}
