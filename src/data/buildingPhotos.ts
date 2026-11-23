import { photoUrl } from '@/config/assets'

// Fotos de cada edificio en public/assets/edificios: nombre-1.webp, nombre-2.webp y nombre-3.webp.
// Son copias optimizadas para web de las originales de public/assets/Fotos.
const PHOTO_NAMES: Record<string, string> = {
  'Biblioteca (CRAI)': 'biblioteca',
  'Cafetería Central': 'cafeteria',
  'Edificio de Aulas A': 'aulas-a',
  'Edificio de Aulas B': 'aulas-b',
  'Edificio de Aulas C y Escuela de Idiomas': 'aulas-c',
  'Edificio de Aulas D': 'aulas-d',
  'Auditorio Elba y Celina Ramos': 'auditorio-elba',
  'Edificio Jon de Cortina, S.J.': 'jon-de-cortina',
  CEDITEC: 'ceditec',
  'Edificio Francisco Andrés Escobar': 'escobar',
  'Edificio P. Ignacio Martín-Baró, S.J.': 'martin-baro',
  'Magna I': 'magna-1',
  'Magna II': 'magna-2',
  'Magna III': 'magna-3',
  'Magna IV': 'magna-4',
  'Magna V': 'magna-5',
  'Magna VI': 'magna-6',
  'Auditorio Ignacio Ellacuría': 'auditorio-ellacuria',
  'Auditorio Segundo Montes, S.J.': 'auditorio-segundo-montes',
  'Edificio de Administración Central': 'administracion-central',
  'Vicerrectoría Financiera': 'vicerrectoria',
  'Laboratorios de Psicología': 'laboratorios-psicologia',
  'Librería y Papelería': 'libreria',
  'Laboratorios de Ingeniería': 'laboratorios-ingenieria',
  'Módulo A de Profesores, P. Francisco Javier Ibisate, S.J.': 'modulo-a',
  'Módulo B de Profesores, Dr. Ignacio Martín-Baró': 'modulo-b',
  Canchas: 'canchas',
  'Centro de Orientación Profesional': 'orientacion-profesional',
  'Centro de Asuntos Estudiantiles': 'cae',
  'Centro Cultural Universitario y Centro de Servicio Social': 'centro-cultural',
  'Parroquia Jesucristo Liberador': 'parroquia',
  'Centro Monseñor Romero': 'monsenor-romero',
  Mercaduca: 'mercaduca',
  'Edificio del ICAS': 'icas',
}

export const buildingPhotos = (buildingName: string) =>
  [1, 2, 3].map((number) => ({
    src: photoUrl(`${PHOTO_NAMES[buildingName]}-${number}.webp`),
    caption: `${buildingName}, foto ${number}`,
  }))
