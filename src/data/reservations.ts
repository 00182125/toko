import type { InfoRow } from '@/types/chat'

export type ReservationCard = {
  id: string
  title: string
  description: string
  rows: InfoRow[]
  action: string
  actionIcon: string
  href: string
}

export const reservationCards: ReservationCard[] = [
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

// Nivel de la biblioteca que se nombra en la respuesta de Toko.
export const reservationLevels: Record<string, string> = {
  'crai-first-floor': 'primer',
  'crai-second-floor': 'segundo',
  'crai-third-floor': 'tercer',
}
