// Banco de preguntas de ejemplo para el chat de Toko (300 en total).
// Sirven para dos cosas:
//  1. Saber qué tiene que entender el router (src/chat/) y con qué palabras lo dicen los alumnos.
//  2. Probar el chat: cada pregunta debería llevar a la intención en la que está guardada.
// Están escritas de muchas formas: formal, informal, sin tildes, con errores, salvadoreño ("ocupo", "pa'", "vos").
//
// Estructura: categoría -> intención -> preguntas.
// Las preguntas de seguimiento ("¿y cuánto cuesta?") dependen del tema anterior; por eso llevan "after".

export type QuestionExample = string | { text: string; after: string }

export const questionBank = {
  // 1. Primer contacto
  firstContact: {
    capabilities: [
      '¿qué puedes hacer?',
      'como funcionas',
      '¿para qué sirves?',
      'ayuda',
      'no sé qué preguntar',
      'qué cosas sabes?',
      'en qué me podés ayudar',
      'qué onda, qué hacés vos?',
      'menu',
      'opciones',
      'dame ejemplos de lo que te puedo preguntar',
      'para que es esta app',
      'me ayudas?',
      'q puedo preguntarte',
      'estoy perdido, por dónde empiezo',
    ],
    identity: [
      '¿quién eres?',
      '¿eres una IA?',
      '¿quién te creó?',
      '¿eres un robot?',
      'sos persona o bot?',
      'como te llamas',
      'eres chatgpt?',
      'hay alguien real contestando?',
      '¿de dónde salió Toko?',
      'eres de la UCA?',
    ],
  },

  // 2. Trámites
  procedures: {
    transcript: [
      'necesito mi récord de notas',
      'como saco el record academico',
      'quiero mis notas certificadas',
      'ocupo las notas de todas mis materias',
      'certificación de notas pa una beca',
      'donde pido el historial de notas',
      'necesito notas certificadas para una universidad de afuera',
      'cuanto cuesta el record de notas',
    ],
    studentProof: [
      'papel que diga que soy estudiante',
      "constancia pa' la beca",
      'necesito una constancia de estudio',
      'constancia de alumno activo',
      'carta que diga que estudio en la UCA',
      'constancia para el trabajo',
      'me piden constancia de inscripción',
      'cuánto se tarda la constancia',
    ],
    degree: [
      '¿cómo saco mi título?',
      'tramite de graduacion',
      'que necesito para graduarme',
      'cuando son las graduaciones',
      'requisitos para el titulo',
      'ya egresé, ¿qué sigue?',
    ],
    equivalences: [
      'equivalencias',
      'vengo de otra universidad, me reconocen materias?',
      'como pido equivalencia de materias',
      'traslado de otra U',
      'cuanto cuesta una equivalencia',
    ],
    careerChange: [
      'cambio de carrera',
      'me quiero cambiar de carrera',
      'puedo estudiar dos carreras',
      'cambiarme de ingeniería a derecho',
      'pierdo materias si cambio de carrera?',
    ],
    lostId: [
      'carnet perdido',
      'se me perdió el carnet',
      'como repongo mi carné',
      'me robaron el carnet',
      'donde sacan el carnet nuevo',
    ],
    solvency: [
      'solvencia',
      'necesito la solvencia',
      'como saco mi solvencia financiera',
      'solvencia de biblioteca',
      'pa que sirve la solvencia',
    ],
    general: ['que tramites puedo hacer', 'dónde hago trámites', 'cuánto tardan los trámites'],
  },

  // 3. Asignaturas
  subjects: {
    enroll: [
      '¿cómo me inscribo?',
      'como inscribo materias',
      'inscripción de asignaturas',
      'no me deja inscribir',
      'donde se inscribe uno',
      'como es la preinscripcion',
      'a que hora abre la inscripcion',
      'puedo inscribir mas de 5 materias',
    ],
    withdraw: [
      'quiero retirar una materia',
      'como me salgo de una clase',
      'retiro de asignatura',
      '¿hasta cuándo puedo retirar?',
      'si retiro una materia me devuelven el dinero?',
      'retirar todas mis materias',
      'me va mal en cálculo, la puedo dejar?',
    ],
    add: [
      'agregar una clase',
      'como adiciono una materia',
      'se me olvidó inscribir una materia',
      'adicion de asignaturas',
      'puedo meter otra materia ya empezado el ciclo',
    ],
    sectionChange: [
      'cambiar de sección',
      'me quiero cambiar de grupo',
      'cambio de horario de una materia',
      'otra sección de física',
      'choque de horarios',
    ],
    prerequisites: [
      'prerrequisitos',
      'que necesito aprobar para llevar cálculo 2',
      'no me deja inscribir por prerrequisito',
      'como veo mi plan de estudios',
      'cuales son los requisitos de la materia',
    ],
    seats: [
      'cupos',
      'ya no hay cupo en la sección',
      'como pido que abran cupo',
      'lista de espera para una materia',
      'se llenó la clase, ¿qué hago?',
    ],
  },

  // 4. Pagos
  payments: {
    howToPay: [
      '¿cómo pago mi cuota?',
      'donde pago la mensualidad',
      'puedo pagar en linea',
      'pagar con tarjeta',
      'en que bancos se paga',
      'como pago por la app del banco',
      'mi talonario de pago',
    ],
    deadline: [
      '¿hasta cuándo pago?',
      'fecha limite de pago',
      'cuando vence la cuota',
      'que pasa si pago tarde',
      'cuánto es la mora',
    ],
    parking: ['pagar parqueo', 'cuanto cuesta el parqueo', 'como saco el marchamo de parqueo', 'parqueo por día'],
    scholarships: [
      'becas',
      'como aplico a una beca',
      'que becas hay',
      'requisitos de la beca',
      'perdí la beca, qué hago',
      'beca socioeconómica',
      'descuento por hermanos',
    ],
    blocked: [
      'me bloquearon por mora',
      'no puedo ver mis notas porque debo',
      'estoy en mora',
      'me bloquearon el portal por pago',
      'puedo hacer arreglo de pago',
    ],
    costs: ['cuanto cuesta la carrera', 'cuánto es la matrícula'],
  },

  // 5. Fechas
  dates: {
    cycle: [
      '¿cuándo empieza el ciclo?',
      'inicio de clases',
      'cuando entramos',
      'cuando termina el ciclo',
      'fecha del ciclo 02',
    ],
    exams: [
      'finales',
      'cuando son los parciales',
      'semana de exámenes',
      'calendario de evaluaciones',
      'cuando es el diferido',
      'fecha de exámenes de reposición',
    ],
    vacation: [
      'vacaciones',
      'cuando salimos de vacaciones',
      'vacaciones de semana santa',
      'vacaciones agostinas',
      'hay vacaciones de fin de año',
    ],
    holidays: [
      'feriados',
      '¿hay clases mañana?',
      'el 15 de septiembre hay clases?',
      'asueto',
      'dia libre esta semana',
    ],
    grades: [
      '¿cuándo entregan notas?',
      'cuando suben las notas',
      'fecha de publicación de notas',
      'cuando salen las notas finales',
      'cuanto tardan en poner notas',
    ],
    calendar: [
      'calendario académico',
      'fechas importantes',
      'muestrame el calendario',
      'que fechas tengo que tener en cuenta',
    ],
  },

  // 6. Ubicación
  location: {
    buildings: [
      'donde queda el edificio ICAS',
      'como llego a la magna 2',
      'dónde está el aula C-21',
      'edificio de posgrados',
      'donde queda el auditorio',
      'edificio cedro',
      'donde estan los laboratorios de computo',
      'aula magna 1',
      'edificio de ingenieria',
      'modulo D donde queda',
      'estoy en la entrada, como llego al edificio A',
      'laboratorios de química',
    ],
    cafeteria: ['cafetería', 'donde puedo comer', 'hay comedor?', 'donde venden café'],
    restrooms: ['baños', 'donde hay un baño', 'baño mas cercano'],
    infirmary: ['enfermería', 'clínica de la U', 'me siento mal, a donde voy'],
    cashier: ['caja', 'dónde queda colecturía', 'donde pago en efectivo dentro de la U'],
    registry: [
      'registro académico',
      'donde queda registro',
      'oficina de registro',
      'administración académica donde está',
    ],
    parking: ['parqueo', 'donde me puedo estacionar', 'parqueo de motos'],
    printing: ['dónde imprimo', 'donde saco copias', 'fotocopiadora', 'hay donde imprimir cerca'],
    buses: [
      'salida de buses',
      'donde pasa la ruta',
      'parada de bus mas cercana',
      "por donde salgo pa' tomar el bus",
    ],
  },

  // 7. CRAI y servicios
  crai: {
    hours: [
      'horario de la biblioteca',
      'a que hora abre el CRAI',
      'biblioteca abre sábado?',
      'a que hora cierra la biblioteca',
      'el CRAI abre en vacaciones',
      'horario de atención de biblioteca',
    ],
    renewBook: [
      'renovar un libro',
      'como renuevo un préstamo',
      'se me venció el libro',
      'multa por libro atrasado',
      'puedo renovar en linea',
    ],
    deviceLoan: ['prestar tablet', 'préstamo de laptop', 'prestan computadoras?', 'como pido una tablet'],
    wifi: [
      'wifi',
      'contraseña del wifi',
      'no me conecta al internet de la U',
      'como me conecto a la red',
      'wifi para invitados',
    ],
    printing: ['impresiones', 'cuanto cuesta imprimir', 'imprimir a color'],
    cubicles: [
      'cubículos',
      'reservar cubículo para estudiar',
      'salas de estudio grupal',
      'cuanto tiempo puedo usar un cubiculo',
    ],
    books: ['buscar un libro', 'tienen tal libro en la biblioteca', 'acceso a bases de datos'],
  },

  // 8. Soporte
  support: {
    portal: [
      'no puedo entrar al portal',
      'el portal no carga',
      'me sale error al iniciar sesión',
      'usuario bloqueado',
      'no me llega el código',
      'portal caído',
      'no veo mis materias en el portal',
    ],
    password: [
      'olvidé mi contraseña',
      'como cambio mi clave',
      'recuperar contraseña del correo',
      'no me acuerdo de mi usuario',
      'resetear contraseña',
    ],
    whoToAsk: [
      'a quién le pregunto por becas',
      'con quien hablo de mi nota',
      'quiero hablar con una persona',
      'numero de telefono de la UCA',
      'a quien me quejo',
      'horario de atención al estudiante',
    ],
    email: [
      'correo de registro',
      'correo de la facultad',
      'mi correo institucional no funciona',
      'como activo mi correo UCA',
      'a que correo mando una solicitud',
      'email de colecturía',
      'correo del decanato',
    ],
  },

  // 9. Vida universitaria
  campusLife: {
    volunteering: ['voluntariado', 'como me uno a un voluntariado', 'hay proyectos sociales?'],
    socialService: [
      'servicio social',
      'cuantas horas de servicio social son',
      'donde hago mis horas sociales',
      'cuando debo empezar el servicio social',
    ],
    sports: ['deportes', 'equipo de fútbol', 'hay gimnasio?'],
    culture: ['cultura', 'talleres de arte', 'coro o teatro'],
    languages: ['idiomas', 'cursos de inglés', 'requisito de inglés para graduarme'],
    jobs: ['bolsa de empleo', 'pasantías', 'practicas profesionales', 'busco trabajo de medio tiempo'],
  },

  // 10. Conversación normal
  conversation: {
    frustration: ['no sirves', 'qué mal', 'no entiendes nada', 'eres inútil', 'ya me cansé', 'esto no funciona'],
    offTopic: [
      'como está el clima',
      'hazme la tarea',
      'quien ganó el partido',
      'contame un chisme',
      'resolveme esta integral',
    ],
    noise: ['😂😂😂', '👍', '   ', 'hello, can you help me?', 'where is the library?'],
    followUp: [
      { text: '¿y cuánto cuesta?', after: 'necesito mi récord de notas' },
      { text: '¿y dónde?', after: 'quiero pagar el parqueo' },
      { text: '¿y si no puedo?', after: '¿hasta cuándo pago?' },
      { text: '¿y hasta cuándo?', after: 'quiero retirar una materia' },
    ],
  },
} satisfies Record<string, Record<string, QuestionExample[]>>

export type QuestionCategory = keyof typeof questionBank

// Todas las preguntas en una sola lista, con su categoría e intención.
export const allQuestions = Object.entries(questionBank).flatMap(([category, intents]) =>
  Object.entries(intents as Record<string, QuestionExample[]>).flatMap(([intent, examples]) =>
    examples.map((example) => ({
      category: category as QuestionCategory,
      intent,
      text: typeof example === 'string' ? example : example.text,
      after: typeof example === 'string' ? undefined : example.after,
    })),
  ),
)
