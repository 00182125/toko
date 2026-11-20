export type HelpCard = {
  id: string
  title: string
  description: string
  guide: string
  image: string
  tone: string
}

export const helpCards: HelpCard[] = [
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
