import type { FaqRegulation } from '@/types/faq'

// 13. Parciales diferidos y evaluaciones extraordinarias
// Fuente: "Banco Institucional de Preguntas Estudiantes sobre Parciales Diferidos y Evaluaciones
// Extraordinarias (UCA)" — Reglamento Administrativo Académico de Grado (Cap. XI, Sec. 3.ª,
// Arts. 110 y 147–159) y de Postgrado (Cap. XI, Sec. 3.ª, Arts. 94 y 126–139).
//
// El banco trae 315 preguntas hechas con plantillas: la misma frase con 9 materias de grado
// (categorías 1 a 6) o con 7 programas de posgrado (categoría 7). Aquí se guardan las plantillas
// y se generan las 315 preguntas exactas, más formas coloquiales sin materia.

// Materias que usa el banco en las categorías 1 a 6.
const SUBJECTS = [
  'Matemática I',
  'Contabilidad Agrícola',
  'Derecho Constitucional',
  'Física II',
  'Programación Estructurada',
  'Psicología General',
  'Filosofía de la Praxis',
  'Economía I',
  'Estadística Aplicada',
  'Química Orgánica',
]

// Programas de posgrado que usa el banco en la categoría 7.
const PROGRAMS = [
  'Maestría en Administración de Empresas',
  'Maestría en Finanzas',
  'Maestría en Política Pública',
  'Doctorado en Ciencias Sociales',
  'Maestría en Geotermia',
  'Maestría en Derecho de Empresa',
  'Maestría en Desarrollo Territorial',
]

// "la Maestría…" / "el Doctorado…"
const withArticle = (program: string) => `${program.startsWith('Doctorado') ? 'el' : 'la'} ${program}`

// Cada plantilla con cada materia (o programa), sin repetir.
const fill = (templates: Array<(name: string) => string>, names: string[]) => [
  ...new Set(templates.flatMap((template) => names.map(template))),
]

export const diferidosFaq: FaqRegulation = {
  id: 'diferidos',
  title: 'Parciales diferidos y evaluaciones extraordinarias',
  entries: [
    {
      id: 'D1',
      question: '¿Puedo pedir un parcial diferido si me enfermé o tuve un accidente el día del examen?',
      answer:
        'Sí es posible solicitar un parcial diferido si no pudiste asistir debido a una enfermedad o accidente grave que te incapacitó. Debes presentar la solicitud por escrito en el Decanato correspondiente dentro del plazo estricto de tres días hábiles posteriores a la fecha de la prueba original, adjuntando la constancia médica oficial y cancelando el arancel correspondiente.\n' +
        'No aplica si la presentas fuera de los 3 días hábiles, si la constancia médica no cubre la fecha de la prueba o si no pagas el arancel.\n' +
        '(Reglamento de Grado, Arts. 110.1, 150 y 151; Postgrado, Arts. 94.1 y 131)',
      variants: [
        ...fill(
          [
            (m) => `Me enfermé el día del examen de ${m}, ¿puedo solicitar examen diferido?`,
            (m) => `Tuve un accidente médico y no asistí al parcial de ${m}, ¿cuál es el trámite?`,
            (m) => `Tengo una incapacidad médica de 3 días que coincide con el parcial de ${m}, ¿me lo difieren?`,
            (m) => `Fui a la clínica universitaria por dolor agudo y perdí la prueba de ${m}, ¿puedo hacer diferido?`,
            (m) => `¿Sirve una receta o constancia de médico privado para justificar la falta al examen de ${m}?`,
          ],
          SUBJECTS,
        ),
        'estaba enfermo el día del examen',
        'diferido por enfermedad',
        'tuve un accidente y perdí el examen',
        'tengo incapacidad medica el dia del parcial',
        'me hospitalizaron y no pude ir al examen',
        'falte al parcial por estar enfermo',
        'sirve la constancia del medico para el diferido',
        'me dio covid el dia del examen',
        'tuve fiebre y no llegue al parcial',
      ],
    },
    {
      id: 'D2',
      question: '¿Puedo pedir un parcial diferido por trabajo o por un viaje fuera del país?',
      answer:
        'Los compromisos laborales ineludibles y la salida del país por razones graves constituyen causas de fuerza mayor reconocidas. Debes presentar la carta patronal u orden de misión oficial ante el Decanato dentro de los tres días hábiles siguientes a la evaluación original y cancelar el arancel estipulado.\n' +
        'No aplica para horarios de trabajo habituales sin respaldo, ni cuando el motivo laboral no es un compromiso ineludible debidamente verificado.\n' +
        '(Reglamento de Grado, Arts. 110.2-3, 150 y 151; Postgrado, Arts. 94.2-3 y 131)',
      variants: [
        ...fill(
          [
            (m) => `Por trabajo me enviaron fuera del departamento el día del examen de ${m}, ¿puedo diferirlo?`,
            (m) => `Tuve una reunión de emergencia en mi empresa a la hora del parcial de ${m}, ¿se puede reponer?`,
            (m) => `¿Qué requisitos debe llevar la carta de mi trabajo para que el decanato me apruebe diferido de ${m}?`,
            (m) => `Me tocó viajar fuera del país por razones laborales durante la semana de parciales de ${m}, ¿qué hago?`,
            (m) => `Tengo un turno laboral inamovible a la hora del examen diferido de ${m}, ¿puedo meter solicitud?`,
          ],
          SUBJECTS,
        ),
        'diferido por trabajo',
        'mi jefe no me dio permiso para ir al parcial',
        'me mandaron de viaje por trabajo el dia del examen',
        'carta patronal para el diferido',
        'tengo que viajar fuera del pais en semana de parciales',
        'orden de mision y examen diferido',
        'trabajo a la hora del parcial, que hago',
        'puedo diferir un examen por motivos laborales',
      ],
    },
    {
      id: 'D3',
      question: '¿Puedo pedir un parcial diferido porque no estudié, me quedé dormido o se me olvidó?',
      answer:
        'No es posible autorizar un parcial diferido por falta de tiempo para estudiar, sobrecarga de exámenes o falta de preparación. Los reglamentos de la UCA establecen explícitamente que la falta de preparación del estudiante no se considera en ningún caso razón de fuerza mayor.\n' +
        'Si faltas sin una causa justificada de fuerza mayor, la evaluación se califica automáticamente con 0.0.\n' +
        '(Reglamento de Grado, Arts. 148 y 151.2; Postgrado, Arts. 128 y 131.2)',
      variants: [
        ...fill(
          [
            (m) => `No estudié lo suficiente para el parcial de ${m}, ¿puedo pedir diferido para prepararme mejor?`,
            (m) => `Tenía tres exámenes el mismo día y no pude repasar ${m}, ¿puedo diferir uno de ellos?`,
            (m) => `Se me olvidó la fecha del examen de ${m} y no llegué, ¿puedo tramitar evaluación extraordinaria?`,
            (m) => `Había un tráfico horrible y llegué cuando el parcial de ${m} ya había terminado, ¿me dan diferido por eso?`,
            (m) => `Estaba muy cansado y me quedé dormido, perdiendo el parcial de ${m}, ¿puedo reponerlo?`,
          ],
          SUBJECTS,
        ),
        'no estudie, puedo pedir diferido',
        'me quede dormido y perdi el parcial',
        'se me olvido el examen',
        'tengo muchos examenes, puedo diferir uno',
        'no me dio tiempo de estudiar',
        'llegue tarde por el trafico y ya habia terminado el examen',
        'diferido por no estar preparado',
        'que nota me ponen si no voy al parcial sin justificacion',
      ],
    },
    {
      id: 'D4',
      question: '¿Cuál es el trámite para pedir un parcial diferido, dónde se entrega y cuánto tiempo tengo?',
      answer:
        'El procedimiento oficial consta de tres pasos obligatorios:\n' +
        '1. Presentar la solicitud formal por escrito al Decanato de tu Facultad (o de Postgrados) en los 3 días hábiles posteriores al examen.\n' +
        '2. Anexar los comprobantes que justifican la fuerza mayor.\n' +
        '3. Cancelar el arancel de evaluación extraordinaria.\n' +
        'El diferido no se gestiona directamente con el docente: debe autorizarlo el Decanato.\n' +
        '(Reglamento de Grado, Arts. 151 y 152; Postgrado, Arts. 131 y 132)',
      variants: [
        ...fill(
          [
            (m) => `¿Dónde entrego la solicitud de examen diferido para la materia ${m}?`,
            (m) => `¿Cuántos días tengo para diferir un parcial de ${m} después de la fecha en que se hizo?`,
            (m) => `¿Le tengo que pedir el examen diferido de ${m} directamente al licenciado o al Decanato?`,
            (m) => `¿Hay que pagar algún arancel en colecturía para solicitar la evaluación extraordinaria de ${m}?`,
            (m) => `¿Cuáles son los pasos completos en la UCA para que me aprueben diferir una prueba de ${m}?`,
          ],
          SUBJECTS,
        ),
        'como pido un parcial diferido',
        'tramite de examen diferido',
        'donde se pide el diferido',
        'cuantos dias tengo para pedir el diferido',
        'cuanto cuesta el diferido',
        'se paga el examen diferido',
        'el profe me puede dar el diferido directo',
        'pasos para diferir un examen',
        'plazo para solicitar evaluacion extraordinaria',
        'donde entrego la solicitud de diferido',
      ],
    },
    {
      id: 'D5',
      question: '¿Cómo es el examen diferido: es acumulativo, es el mismo examen y cuándo lo hacen?',
      answer:
        'El examen diferido debe ser elaborado por el docente como una evaluación diferente pero equivalente a la original. En ningún caso el material de la prueba extraordinaria será acumulativo. La reprogramación se ubicará dentro de las dos semanas posteriores al periodo ordinario.\n' +
        '(Reglamento de Grado, Arts. 153 y 155; Postgrado, Arts. 133 y 135)',
      variants: [
        ...fill(
          [
            (m) => `¿El examen diferido de ${m} viene acumulativo con todos los temas del ciclo?`,
            (m) => `¿El diferido de ${m} es el mismo examen que hicieron mis compañeros o el profesor hace uno nuevo?`,
            (m) => `¿En cuánto tiempo después de la fecha ordinaria tienen que hacerme la prueba diferida de ${m}?`,
            (m) => `¿Es verdad que los exámenes diferidos de ${m} son más difíciles que los normales?`,
          ],
          SUBJECTS,
        ),
        'el diferido es acumulativo',
        'el diferido es mas dificil',
        'cuando es el examen diferido',
        'el diferido es el mismo examen',
        'que temas vienen en el diferido',
        'cuanto tiempo despues hacen el diferido',
        'como es el examen diferido',
        'el examen de reposicion es igual al original',
      ],
    },
    {
      id: 'D6',
      question: '¿Qué pasa si abandono el examen, llego tarde o no me presento al diferido?',
      answer:
        'Si asististe a la evaluación ordinaria y te retiraste sin completarla, la normativa prohíbe expresamente solicitar examen extraordinario. Asimismo, si se te autoriza el diferido y no te presentas en la nueva fecha fijada por el Decanato, perderás definitivamente la oportunidad de reponerla.\n' +
        'La excepción es una emergencia médica aguda ocurrida en el aula y certificada de inmediato por la clínica universitaria.\n' +
        '(Reglamento de Grado, Arts. 147 y 151.3; Postgrado, Arts. 112 y 131.3)',
      variants: [
        ...fill(
          [
            (m) => `Entré al parcial de ${m} pero me sentí mal y me salí sin terminarlo, ¿puedo pedir examen diferido?`,
            (m) => `Llegué 20 minutos tarde al examen de ${m} y el docente no me dejó entrar, ¿puedo diferirlo?`,
            (m) => `Me aprobaron el diferido de ${m} pero no pude ir en la nueva fecha fijada por el decanato, ¿puedo pedir otro?`,
            (m) => `Si no me entrego a hacer el diferido autorizado de ${m}, ¿qué nota me queda en el sistema?`,
          ],
          SUBJECTS,
        ),
        'me sali del examen sin terminarlo',
        'abandone el parcial, puedo pedir diferido',
        'no fui al diferido que me aprobaron',
        'puedo pedir otro diferido',
        'llegue tarde y no me dejaron entrar al examen',
        'que pasa si no me presento al diferido',
        'pierdo el diferido si no voy',
        'me retire del examen a la mitad',
      ],
    },
    {
      id: 'D7',
      question: '¿Qué reglas especiales tienen los diferidos en maestrías y doctorados?',
      answer:
        'En programas de Maestría y Doctorado existen dos reglas especiales adicionales:\n' +
        '1. Solo se pueden reprogramar como máximo dos evaluaciones por asignatura durante el ciclo.\n' +
        '2. No aplica la reposición extraordinaria para actividades presenciales de interacción grupal, como discusiones de clase o debates.\n' +
        'El plazo es el mismo: 3 días hábiles ante el Decanato de Postgrados. Estas reglas no aplican a carreras de grado (técnicos, licenciaturas, ingenierías y arquitectura).\n' +
        '(Reglamento de Postgrados, Arts. 129, 130 y 131)',
      variants: [
        ...fill(
          [
            (p) => `Soy estudiante de ${withArticle(p)}, ¿cuántas evaluaciones puedo diferir por materia como máximo?`,
            (p) => `Falté a un debate evaluado en clase en ${withArticle(p)}, ¿puedo solicitar evaluación extraordinaria?`,
            (p) =>
              `¿En ${withArticle(p)} aplica el mismo plazo de 3 días hábiles para pedir el diferido ante el Decanato de Postgrados?`,
            (p) =>
              `¿Puedo diferir todas las evaluaciones de una materia de ${withArticle(p)} si tengo un problema laboral prolongado?`,
          ],
          PROGRAMS,
        ),
        '¿Las discusiones grupales presenciales de postgrado se pueden reponer mediante examen extraordinario?',
        'diferidos en maestria',
        'cuantos diferidos puedo pedir en posgrado',
        'falte a un debate en la maestria',
        'diferido en doctorado',
        'limite de diferidos por materia en maestria',
        'reglas de diferidos de postgrado',
      ],
    },
  ],
}

// Nota: el banco original escribe "la Doctorado en Ciencias Sociales"; aquí se corrige a "el Doctorado".
