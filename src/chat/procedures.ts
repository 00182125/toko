import { procedureCards, type ProcedureCard } from '@/data/procedures'
import type { Reply } from '@/types/chat'
import { normalizeText } from './normalize'

export type ProcedureMatch =
  | { type: 'card'; card: ProcedureCard }
  | { type: 'clarify'; text: string }
  | { type: 'unavailable' }

export function findProcedureCard(request: string): ProcedureMatch {
  const text = normalizeText(request)
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
  // "parqueo", "parquear", "estacionamiento", "estacionar", "marchamo", "tickets de parqueo"...
  if (text.includes('parque') || text.includes('estaciona') || text.includes('marchamo')) {
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

// Lo que dice Toko antes de la tarjeta: los servicios no son "documentos".
const INTRO: Record<string, string> = {
  'parking-payment':
    'El parqueo se paga con tickets que compras en el portal de estudiantes. Ahí también consultas tu saldo disponible. Aquí tienes el enlace:',
  'online-payments': '¡Claro! Desde aquí pagas tus cuotas, aranceles y trámites en línea:',
  mercaduca: '¡Claro! Aquí registras tu emprendimiento para Mercaduca:',
  'internships-jobs': '¡Claro! Aquí encuentras pasantías y ofertas de empleo:',
  'student-id-issue': '¡Claro! Aquí tienes el enlace para tramitar tu carné:',
  'student-id-validation': '¡Claro! Aquí tienes el enlace para validar tu carné:',
}
const DOCUMENT_INTRO = '¡Claro! Acá tienes el enlace para solicitar tu documento.'
const SERVICE_INTRO = '¡Claro! Aquí tienes el enlace:'

// Convierte el resultado de la búsqueda en la respuesta de Toko.
export function procedureReply(match: ProcedureMatch): Reply | null {
  if (match.type === 'card') {
    const { card } = match
    const intro =
      INTRO[card.id] ??
      (card.title.startsWith('Servicios') || card.title.startsWith('Asignaturas') ? SERVICE_INTRO : DOCUMENT_INTRO)
    return { text: intro, card: { kind: 'procedure', card } }
  }
  if (match.type === 'clarify') return { text: match.text }
  return null
}
