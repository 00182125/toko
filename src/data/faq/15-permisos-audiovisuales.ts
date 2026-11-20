import type { FaqRegulation } from '@/types/faq'

// 15. Permisos de drones, sesiones fotográficas y grabaciones en el campus
// Fuente: "Guía institucional y banco de consultas: Uso de drones, sesiones fotográficas y
// grabaciones en el Campus UCA". Las respuestas son las "Respuestas institucionales" de la guía.
//
// Idea clave de la guía: estos permisos NO se piden en Registro Académico (que solo maneja
// matrículas, expedientes, notas y certificaciones, Reglamento Administrativo Académico de
// Grado, Art. 11), sino en el Edificio de Administración Central.
export const permisosAudiovisualesFaq: FaqRegulation = {
  id: 'permisos-audiovisuales',
  title: 'Guía de permisos de drones, fotos y grabaciones',
  entries: [
    // ── Categoría A: drones ────────────────────────────────────────────────
    {
      id: 'F1',
      question: 'Hola, ¿puedo volar un dron dentro de la UCA para hacer unas tomas de una tarea?',
      answer:
        'Para volar un dron en el campus se requiere autorización previa por motivos de seguridad, privacidad y convivencia comunitaria. Este trámite no se realiza en Registro Académico, ya que esa oficina solo administra expedientes y notas. La solicitud formal debe entregarse en las oficinas del Edificio de Administración Central.',
      variants: [
        'puedo volar un dron en la uca',
        'se puede volar dron en el campus',
        'puedo usar un dron para una tarea',
        'quiero hacer tomas con dron en la uca',
        'esta permitido volar drones en la universidad',
        'puedo sacar mi dron en la uca',
        'dejan volar drones en el campus',
        'necesito permiso para volar un dron',
        'puedo grabar con dron para un trabajo de la u',
        'se vale usar drone en la uca',
        'puedo hacer tomas aereas para una tarea',
        'quiero volar mi drone en la universidad para un proyecto',
      ],
    },
    {
      id: 'F2',
      question: '¿Existe algún reglamento que prohíba o regule el uso de drones en la universidad?',
      answer:
        "No existe un artículo que mencione literalmente la palabra 'dron', pero aplican las normas del Reglamento de Faltas Estudiantiles sobre protección a la seguridad y la tranquilidad del campus. Todo equipo tecnológico aéreo debe ser autorizado previamente en el Edificio de Administración Central.",
      variants: [
        'hay reglamento sobre drones',
        'que dice el reglamento de los drones',
        'esta prohibido volar drones en la uca',
        'hay alguna norma sobre drones en la universidad',
        'los drones estan regulados en la uca',
        'que articulo habla de drones',
        'el reglamento prohibe los drones',
        'hay reglas para usar drones en el campus',
        'me pueden sancionar por volar un dron',
        'es falta volar un dron en la uca',
        'que norma aplica a los drones',
        'existe una ley de la uca sobre drones',
      ],
    },
    {
      id: 'F3',
      question: '¿Con quién tengo que hablar o en qué oficina pido permiso para meter un dron a la UCA?',
      answer:
        'Debes dirigirte a las autoridades administrativas de la universidad. A diferencia de lo que se cree, Registro Académico no gestiona permisos de espacio ni de equipos. Debes acudir al Edificio de Administración Central para presentar tu proyecto y solicitar la autorización.',
      variants: [
        'donde pido permiso para volar un dron',
        'en que oficina pido permiso para el dron',
        'con quien hablo para meter un dron a la uca',
        'a quien le pido permiso para usar un dron',
        'donde se tramita el permiso de dron',
        'quien autoriza los drones en la uca',
        'que oficina da permiso para drones',
        'a donde voy para el permiso del dron',
        'permiso de dron se pide en registro academico',
        'donde solicito autorizacion para un drone',
        'quien me da permiso para volar dron en el campus',
        'a que oficina llevo la solicitud del dron',
      ],
    },
    {
      id: 'F4',
      question:
        'Estimados, requiero autorización institucional para realizar tomas aéreas con dron en las instalaciones, ¿cuál es el procedimiento?',
      answer:
        'Debes presentar una carta formal indicando el motivo, fecha, horarios y medidas de seguridad del vuelo. Este trámite se gestiona directamente en el Edificio de Administración Central. Registro Académico no posee competencia sobre el espacio físico del campus.',
      variants: [
        'cual es el procedimiento para volar un dron',
        'que requisitos piden para volar un dron',
        'como saco el permiso para el dron',
        'que necesito para que me autoricen el dron',
        'como solicito autorizacion para tomas aereas',
        'que documentos piden para volar un dron',
        'que lleva la carta para el permiso de dron',
        'como es el tramite del permiso de dron',
        'que tengo que presentar para usar un dron',
        'requisitos para tomas aereas en la uca',
        'como pido formalmente permiso para un dron',
        'que debo hacer para volar un dron legalmente en la uca',
      ],
    },

    // ── Categoría B: fotos y videos ────────────────────────────────────────
    {
      id: 'F5',
      question: '¿Puedo ir a tomarme fotos de graduación o de proyecto con cámara profesional al campus?',
      answer:
        'Las sesiones fotográficas o grabaciones con cámaras profesionales requieren autorización previa para resguardar la privacidad e imagen institucional. Este permiso se tramita en el Edificio de Administración Central (Registro Académico no otorga estas autorizaciones).',
      variants: [
        'puedo tomarme fotos de graduacion en la uca',
        'puedo hacer una sesion de fotos en el campus',
        'puedo ir con fotografo a la uca',
        'puedo llevar camara profesional a la uca',
        'quiero hacer fotos de graduacion en el campus',
        'se pueden hacer sesiones fotograficas en la uca',
        'puedo hacer un book de fotos en la universidad',
        'fotos profesionales en la uca necesitan permiso',
        'puedo tomarme fotos de egresado en la uca',
        'puedo llevar un fotografo para mis fotos de graduacion',
        'sesion fotografica en la uca',
        'puedo hacer fotos de mi proyecto con camara profesional',
      ],
    },
    {
      id: 'F6',
      question: 'Me dijeron que en Registro Académico se pide el permiso para tomar fotos en la UCA, ¿es cierto?',
      answer:
        'Es una confusión común. Las funciones de Registro Académico se limitan a matrículas, notas y expedientes. Cualquier permiso audiovisual o de uso de instalaciones debe tramitarse en el Edificio de Administración Central.',
      variants: [
        'el permiso para fotos se pide en registro academico',
        'registro academico da permiso para tomar fotos',
        'es cierto que registro da los permisos de fotos',
        'voy a registro academico para el permiso de fotos',
        'registro academico autoriza grabaciones',
        'me mandaron a registro por el permiso de fotos',
        'en registro me dan permiso para grabar',
        'registro academico se encarga de los permisos de fotos',
        'el permiso de fotos es en registro',
        'en registro piden permiso para grabar en la uca',
        'registro academico da permisos audiovisuales',
        'donde no se pide el permiso de fotos',
      ],
    },
    {
      id: 'F7',
      question: 'Tengo que grabar un cortometraje/video para una materia dentro de la UCA, ¿qué trámite debo hacer?',
      answer:
        'Debes gestionar un permiso indicando las locaciones y horarios de grabación. La solicitud se entrega en el Edificio de Administración Central. Recuerda que la difusión de imágenes debe respetar la dignidad de la comunidad y la imagen universitaria.',
      variants: [
        'tengo que grabar un cortometraje en la uca',
        'quiero grabar un video para una materia en el campus',
        'que tramite hago para grabar en la uca',
        'puedo grabar un corto en la universidad',
        'necesito permiso para grabar un video de clase',
        'como pido permiso para grabar en el campus',
        'quiero filmar en la uca para un proyecto',
        'puedo hacer una grabacion para mi materia en la uca',
        'permiso para grabar un video en la uca',
        'tengo un proyecto audiovisual en el campus que hago',
        'puedo grabar un video musical en la uca',
        'donde pido permiso para filmar en la universidad',
      ],
    },
    {
      id: 'F8',
      question: '¿Necesito permiso para tomar fotos adentro de la universidad?',
      answer:
        'Para fotos personales informales con celular no hay inconveniente, pero si usarás cámaras profesionales, trípodes o sesiones estructuradas, sí requieres autorización. Se solicita en el Edificio de Administración Central.',
      variants: [
        'necesito permiso para tomar fotos en la uca',
        'puedo tomar fotos en el campus',
        'se pueden tomar fotos en la universidad',
        'puedo tomar fotos con mi celular en la uca',
        'esta prohibido tomar fotos en la uca',
        'puedo usar tripode en la uca',
        'dejan tomar fotos dentro de la universidad',
        'hay que pedir permiso para fotos',
        'puedo tomarme una foto en la uca sin permiso',
        'fotos con celular en el campus estan permitidas',
        'puedo tomar fotos con camara en la universidad',
        'tomar fotos en la uca es libre',
      ],
    },

    // ── Categoría C: dron + producción audiovisual ─────────────────────────
    {
      id: 'F9',
      question: 'Necesito hacer un reportaje que incluye fotos en tierra y tomas aéreas con dron en la UCA, ¿a dónde me dirijo?',
      answer:
        'Al combinar vuelo de dron y producción fotográfica, debes tramitar una solicitud unificada indicando ambas actividades. La gestión se realiza exclusivamente en el Edificio de Administración Central. Registro Académico no aprueba proyectos audiovisuales ni el uso de instalaciones.',
      variants: [
        'tengo que hacer un reportaje con fotos y dron',
        'quiero hacer fotos y tomas con dron para un reportaje',
        'reportaje con dron en la uca a donde voy',
        'necesito permiso para fotos y dron al mismo tiempo',
        'un proyecto con camara y dron que permiso necesito',
        'tengo que pedir dos permisos para fotos y dron',
        'como pido permiso para grabar y volar dron juntos',
        'documental con dron en el campus',
        'voy a grabar con camara y dron en la uca',
        'reportaje en la uca con tomas aereas',
        'solicitud para fotos y dron',
        'proyecto audiovisual con dron y camaras en la universidad',
      ],
    },
    {
      id: 'F10',
      question: '¿En qué edificio de la UCA se pide el permiso para grabar video y volar un dron para un evento?',
      answer:
        'El permiso se gestiona en el Edificio de Administración Central. Evita acudir a Registro Académico, pues su competencia es estrictamente académica-administrativa.',
      variants: [
        'en que edificio se pide el permiso para grabar',
        'en que edificio pido permiso para el dron',
        'donde se pide permiso para grabar un evento',
        'que edificio da permisos de grabacion',
        'donde tramito el permiso para un evento con dron',
        'permiso para grabar un evento en la uca',
        'quiero grabar un evento en el campus con dron',
        'en que edificio se gestionan los permisos audiovisuales',
        'donde queda la oficina de permisos de grabacion',
        'a que edificio voy por el permiso de video',
        'permiso de dron para un evento',
        'donde pido permiso para grabar una actividad',
      ],
    },
  ],
}
