import type { InfoCardData } from '@/types/chat'

// Tarjetas del Figma: «Card · Trámites · Cambio de carrera» y «Card · Trámites · Reingreso a grado».
// Las dos llevan al portal de Admisiones. Las fechas son las del ciclo 01/2027: actualizarlas cada ciclo.
const ADMISSIONS_URL = 'https://admisiones.uca.edu.sv'

export const careerChangeCard: InfoCardData = {
  title: 'Cambio de carrera',
  description: 'Solicita pasar a otra carrera de grado de la UCA. Si vas a reingresar, tramítalo en paralelo al reingreso.',
  rows: [
    { icon: 'a6aa0.svg', text: 'Ciclo 01/2027 · Desde 18 nov' },
    { icon: 'b329a.svg', text: 'admisiones.uca.edu.sv' },
  ],
  action: 'Solicitar',
  actionIcon: 'e8b1d.svg',
  href: ADMISSIONS_URL,
  tone: 'transcript',
}

export const readmissionCard: InfoCardData = {
  title: 'Reingreso a grado',
  description: 'Para quienes dejaron de estudiar en la UCA dos o más ciclos. Requisito: estar solvente y tener correo UCA activo.',
  rows: [
    { icon: 'a6aa0.svg', text: 'Ciclo 01/2027 · Hasta 25 enero' },
    { icon: 'b329a.svg', text: 'admisiones.uca.edu.sv' },
  ],
  action: 'Solicitar',
  actionIcon: 'e8b1d.svg',
  href: ADMISSIONS_URL,
  tone: 'transcript',
}
