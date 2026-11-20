// Guías paso a paso: lo que Toko responde cuando le piden "dime los pasos",
// "explícame cómo lo hago" o "¿cómo hago ese trámite?".
//
// Cada paso sale de las respuestas oficiales (reglamentos, guía de vida estudiantil)
// o de las tarjetas de trámites; no se agregan oficinas ni requisitos que no estén ahí.
//  refs: respuestas a las que aplica la guía ("entry:P2", "topic:withdrawals",
//        "procedure:subject-withdrawal"...). Si la persona acaba de recibir una de esas
//        respuestas y pide los pasos, se le da esta guía.
//  card: tarjeta de trámite que se muestra junto a los pasos (id de src/data/procedures.ts)
//  note: aviso final (opcional)
export type StepGuide = {
  id: string
  title: string
  refs: string[]
  steps: string[]
  note?: string
  card?: string
}

export const stepGuides: StepGuide[] = [
  // ── Materias y ciclo ───────────────────────────────────────────────────
  {
    id: 'subject-withdrawal',
    title: 'retirar una materia',
    refs: ['entry:P2', 'entry:P173', 'topic:withdrawals', 'procedure:subject-withdrawal'],
    steps: [
      'Revisa en el Calendario Académico las fechas de retiro de asignaturas: solo se puede hacer dentro de ese periodo.',
      'Confirma que puedes retirarla: cada materia se retira solo una vez (una segunda vez únicamente por fuerza mayor justificada).',
      'Abre el portal de aplicaciones con el botón de la tarjeta e inicia sesión con tu cuenta UCA.',
      'Selecciona la materia que quieres retirar y envía la solicitud.',
      'Cancela el arancel correspondiente al retiro.',
    ],
    note: 'Si tienes beca, no abandones la materia sin retirarla formalmente: el abandono injustificado es causa de cancelación de la beca.',
    card: 'subject-withdrawal',
  },
  {
    id: 'cycle-withdrawal',
    title: 'retirarte de todo el ciclo',
    refs: ['entry:P3', 'entry:P33'],
    steps: [
      'Revisa en el Calendario Académico las fechas establecidas para el retiro de ciclo.',
      'Presenta la solicitud formal de retiro del ciclo completo dentro de esas fechas.',
      'Cancela el arancel respectivo.',
      'Tramita la suspensión de tus cuotas de colegiatura ante la administración financiera, para que no te sigan cobrando.',
      'Si tienes beca, avisa a tiempo a la Dirección de Desarrollo Estudiantil para congelarla y pide su reactivación cuando regreses.',
    ],
  },
  {
    id: 'subject-registration',
    title: 'inscribir materias',
    refs: ['entry:P1', 'entry:P17', 'procedure:subject-registration', 'procedure:subject-preregistration'],
    steps: [
      'Revisa en el Calendario Académico las fechas de preinscripción e inscripción.',
      'Arma tu carga: tu CUM define cuántas UV puedes inscribir, y nunca más de 25 UV en un ciclo ordinario.',
      'Verifica los prerrequisitos: el sistema bloquea las materias cuyo prerrequisito no hayas aprobado.',
      'Abre el portal de aplicaciones con el botón de la tarjeta e inicia sesión con tu cuenta UCA.',
      'Elige tus materias y confirma la inscripción.',
    ],
    note: 'Si tienes multas de biblioteca o pagos pendientes, quedas insolvente y no podrás inscribir hasta ponerte al día.',
    card: 'subject-registration',
  },
  {
    id: 'subject-addition',
    title: 'adicionar una materia',
    refs: ['procedure:subject-addition'],
    steps: [
      'Revisa en el Calendario Académico las fechas de adición de asignaturas.',
      'Verifica que no pases el límite de UV que te permite tu CUM y que tengas aprobados los prerrequisitos.',
      'Abre el portal de aplicaciones con el botón de la tarjeta e inicia sesión con tu cuenta UCA.',
      'Agrega la materia a tu carga académica y confirma.',
    ],
    card: 'subject-addition',
  },
  {
    id: 'readmission',
    title: 'regresar a la UCA después de dejar de estudiar',
    refs: ['entry:P19', 'entry:P174'],
    steps: [
      'Solicita el trámite de reingreso ante la Administración Académica (en posgrado, ante tu programa).',
      'Ellos verifican si tu plan de estudios sigue vigente o qué equivalencias necesitas.',
      'Ponte al día con tus pagos pendientes para estar solvente.',
      'Cuando te aprueben el reingreso, inscribe tus materias en las fechas del Calendario Académico.',
    ],
  },
  {
    id: 'career-change',
    title: 'cambiarte de carrera',
    refs: ['entry:P13', 'entry:P39'],
    steps: [
      'Asegúrate de estar solvente con todos tus pagos académicos: es requisito.',
      'Presenta la solicitud de cambio de carrera cumpliendo los requisitos administrativos.',
      'Espera la evaluación del plan de estudios de la carrera a la que quieres pasar (qué materias te valen).',
      'Si tienes beca, el Comité de Becas debe reevaluarla para pasarla a tu nueva carrera.',
    ],
  },

  // ── Exámenes y notas ───────────────────────────────────────────────────
  {
    id: 'deferred',
    title: 'pedir un parcial diferido',
    refs: ['topic:deferred', 'topic:health', 'entry:P10', 'entry:D1', 'entry:D2', 'entry:D4', 'entry:D5', 'entry:D6', 'entry:D7'],
    steps: [
      'Confirma que tu motivo es de fuerza mayor: enfermedad o accidente, trabajo ineludible o un viaje grave. No estudiar, quedarte dormido u olvidar la fecha no cuentan.',
      'Reúne tus comprobantes, como la constancia médica o la carta de tu trabajo.',
      'Escribe la solicitud dirigida al Decanato de tu Facultad (o al Decanato de Postgrados si estás en maestría o doctorado).',
      'Entrégala dentro de los 3 días hábiles siguientes a la fecha del examen, con tus comprobantes.',
      'Paga el arancel del diferido.',
      'Espera la autorización. No lo gestiones directamente con el docente.',
      'Preséntate al diferido: se hace en las 2 semanas posteriores al periodo ordinario. Si no te presentas, pierdes la oportunidad.',
    ],
    note: 'En maestrías y doctorados puedes tener como máximo 2 evaluaciones diferidas por asignatura.',
  },
  {
    id: 'grade-review',
    title: 'pedir revisión de una nota',
    refs: ['entry:P9', 'entry:P179', 'entry:V26', 'topic:exams'],
    steps: [
      'Espera a que publiquen o te entreguen la nota.',
      'Dentro de los 3 días hábiles siguientes, solicita la revisión al docente (en posgrado, por escrito ante el docente y el director del programa).',
      'Lleva tu evaluación y señala con claridad los puntos que quieres que revisen.',
      'Si no se resuelve, acude a la coordinación de tu carrera o al Decanato de tu Facultad.',
    ],
    note: 'Ojo con el plazo: pasados los 3 días hábiles ya no puedes pedir la revisión.',
  },

  // ── Egreso y graduación ────────────────────────────────────────────────
  {
    id: 'graduation',
    title: 'egresar y graduarte',
    refs: ['topic:graduation', 'entry:P6', 'entry:P8', 'entry:P16', 'entry:P20', 'procedure:graduation-process', 'procedure:alumnus'],
    steps: [
      'Aprueba todas las materias de tu plan de estudios y alcanza el CUM mínimo de tu carrera.',
      'Completa tu Servicio Social y obtén la Certificación Oficial del Centro de Servicio Social.',
      'Ponte solvente con todos tus pagos (incluida la biblioteca).',
      'Con eso eres egresado: la Administración Académica emite tu Constancia de Egreso.',
      'Inscribe e inicia tu proceso de graduación dentro de los 2 años académicos (4 ciclos) siguientes a tu egreso.',
    ],
    note: 'Si se te vence el plazo de 2 años, puedes pedir una prórroga excepcional ante el Consejo de Facultad, justificando motivos de fuerza mayor.',
  },
  {
    id: 'graduation-extension',
    title: 'pedir prórroga para graduarte',
    refs: ['entry:P172', 'entry:P169'],
    steps: [
      'Revisa cuándo vence tu plazo: son 2 años académicos desde tu egreso.',
      'Reúne los documentos que justifiquen tus motivos de fuerza mayor.',
      'En grado, presenta la solicitud de prórroga ante el Consejo de Facultad.',
      'En posgrado, inscribe y paga los aranceles de prórroga o de mantenimiento de la calidad de egresado.',
    ],
  },

  // ── Becas ──────────────────────────────────────────────────────────────
  {
    id: 'scholarship',
    title: 'solicitar una beca',
    refs: ['topic:scholarships', 'entry:P28', 'entry:P35', 'entry:P36', 'entry:P21', 'entry:P32'],
    steps: [
      'Acércate a la Dirección de Desarrollo Estudiantil para iniciar la solicitud.',
      'Completa el estudio socioeconómico.',
      'Reúne los comprobantes de tu hogar: constancias de sueldo de quienes aportan, recibos de servicios básicos, comprobante de alquiler o vivienda y la declaración de gastos familiares.',
      'Entrega todo. El equipo de Trabajo Social prepara un informe y el Comité de Becas P. José María Gondra decide.',
      'Si te la dan, mantén el CUM que te piden: la beca se renueva cada año.',
    ],
    note: 'Si te la rechazan, puedes pedir una reconsideración por escrito ante la Dirección de Desarrollo Estudiantil con nuevas pruebas.',
  },
  {
    id: 'scholarship-appeal',
    title: 'apelar si te rechazan la beca',
    refs: ['entry:P38'],
    steps: [
      'Reúne nuevas pruebas de tu situación socioeconómica.',
      'Redacta la reconsideración por escrito.',
      'Preséntala ante la Dirección de Desarrollo Estudiantil.',
    ],
  },

  // ── Servicio social ────────────────────────────────────────────────────
  {
    id: 'social-service',
    title: 'hacer tu servicio social',
    refs: ['topic:social-service', 'entry:P41', 'entry:P42', 'entry:P47', 'entry:P48', 'entry:P51', 'entry:P54', 'entry:P55', 'entry:P60'],
    steps: [
      'Verifica que ya aprobaste el porcentaje de materias o UV que pide tu plan para empezar.',
      'Busca un proyecto avalado por el Centro de Servicio Social (CSS), o propón el tuyo con compañeros para que lo evalúen.',
      'Recuerda las reglas: al menos la mitad de las horas en proyectos externos, nada con familiares hasta tercer grado y nada político partidario o solo religioso.',
      'Inscribe el proyecto en el CSS pagando el arancel correspondiente.',
      'Haz tus horas bajo la supervisión del responsable de la institución.',
      'Al terminar, entrega la memoria final del proyecto, la ficha de evaluación de desempeño y tu registro de horas firmado.',
      'El CSS emite tu Certificación Oficial de Servicio Social, que necesitas para egresar.',
    ],
    note: 'Son 600 horas en licenciaturas, ingenierías y arquitectura, y 150 en técnicos y profesorados.',
  },
  {
    id: 'social-service-project',
    title: 'proponer tu propio proyecto de servicio social',
    refs: ['entry:P52', 'entry:P56'],
    steps: [
      'Arma la propuesta con tus compañeros: qué harán, con quién y qué impacto social tendrá.',
      'Preséntala al Centro de Servicio Social (CSS).',
      'Espera a que evalúen su impacto social y pertinencia técnica.',
      'No empieces las horas hasta que esté aprobada (si es en el extranjero, debe estar preaprobada antes de salir).',
    ],
  },

  // ── Biblioteca ─────────────────────────────────────────────────────────
  {
    id: 'library-renewal',
    title: 'renovar un libro prestado',
    refs: ['entry:P68', 'reservation:crai-renewal'],
    steps: [
      'Verifica que no tengas multas pendientes en la biblioteca.',
      'Abre el sistema de bibliotecas con el botón de la tarjeta e inicia sesión.',
      'Busca tus préstamos y renueva el libro.',
    ],
    note: 'No se puede renovar si otro usuario ya reservó ese libro.',
  },
  {
    id: 'library-loan',
    title: 'sacar un libro prestado',
    refs: ['entry:P61', 'entry:P67', 'topic:library'],
    steps: [
      'Lleva tu carné estudiantil vigente: es obligatorio y nadie más puede usarlo.',
      'Busca el libro en la Biblioteca (CRAI).',
      'Regístralo en el sistema antes de salir: si sales sin hacerlo y suena la alarma, es falta grave.',
      'Devuélvelo a tiempo para evitar la multa por mora y el bloqueo de préstamos.',
    ],
  },
  {
    id: 'library-remote',
    title: 'usar la biblioteca virtual desde tu casa',
    refs: ['entry:P77'],
    steps: [
      'Entra a la biblioteca virtual de la UCA.',
      'Inicia sesión con el usuario y la clave de tu correo institucional UCA.',
      'Consulta los libros digitales y las revistas electrónicas.',
    ],
  },
  {
    id: 'library-suggest-book',
    title: 'pedir que la biblioteca compre un libro',
    refs: ['entry:P76'],
    steps: [
      'Entra al portal de la biblioteca.',
      'Abre el formulario oficial de sugerencias de adquisición.',
      'Escribe los datos del libro y envíalo.',
    ],
  },
  {
    id: 'library-debt',
    title: 'resolver una multa de la biblioteca',
    refs: ['entry:P62', 'entry:P64', 'entry:P74'],
    steps: [
      'Devuelve el libro cuanto antes para que la multa por mora deje de crecer.',
      'Si lo perdiste o se dañó, repón el mismo título en su edición más reciente o paga su costo comercial más los cargos administrativos.',
      'Cancela la multa: mientras la debas quedas insolvente y no podrás inscribir materias, sacar certificaciones ni graduarte.',
    ],
  },

  // ── Instructorías ──────────────────────────────────────────────────────
  {
    id: 'tutoring',
    title: 'ser instructor',
    refs: ['topic:tutoring', 'entry:P81', 'entry:P87', 'entry:P94', 'entry:P100'],
    steps: [
      'Verifica los requisitos: ser estudiante activo, tener aprobado al menos el 60% de tu plan, un CUM de 7.0 o más y una nota de 8.0 o más en la materia.',
      'Antes de que empiece el ciclo, busca las plazas en las carteleras y portales del Departamento Académico.',
      'Postula a la plaza.',
      'Presenta las pruebas que pida el departamento, como un examen o una clase simulada, y la entrevista.',
      'La Jefatura del Departamento decide.',
    ],
    note: 'Puede ser remunerada o acreditarte hasta 200 horas de servicio social por ciclo.',
  },

  // ── Incorporación de títulos ───────────────────────────────────────────
  {
    id: 'incorporation',
    title: 'incorporar un título del extranjero',
    refs: ['topic:foreigners', 'entry:P141', 'entry:P143', 'entry:P144', 'entry:P145', 'entry:P147', 'entry:P150'],
    steps: [
      'Verifica que tu universidad de origen esté reconocida y acreditada en su país.',
      'Reúne el título original, la certificación de notas con su escala y el plan de estudios o programas de materias, apostillados o legalizados.',
      'Si están en otro idioma, consigue su traducción oficial hecha por un perito autorizado.',
      'Presenta la solicitud firmada con todo el expediente en el Decanato de la Facultad que imparte la carrera afín.',
      'Paga el arancel de incorporación.',
      'Una Comisión Especialista estudia tus materias; puede pedirte pruebas o materias complementarias.',
      'Al aprobarse, recibes el Acuerdo Oficial de Incorporación de Título.',
    ],
  },

  // ── CEUCA ──────────────────────────────────────────────────────────────
  {
    id: 'ceuca-candidacy',
    title: 'ser candidato al CEUCA',
    refs: ['entry:P184', 'entry:P185', 'entry:P188', 'entry:P196', 'topic:ceuca'],
    steps: [
      'Verifica los requisitos: ser estudiante activo de grado, tener al menos 8 materias aprobadas, CUM de 7.0 o más y ninguna sanción disciplinaria.',
      'Junta las firmas de respaldo de al menos 100 estudiantes activos de tu misma Facultad.',
      'Inscribe tu candidatura cuando el Comité Electoral publique la convocatoria.',
      'Participa en las elecciones en las fechas de la convocatoria.',
    ],
  },

  // ── Proceso disciplinario ──────────────────────────────────────────────
  {
    id: 'disciplinary-defense',
    title: 'defenderte o apelar en un proceso disciplinario',
    refs: ['topic:due-process', 'entry:P127', 'entry:P128', 'entry:P137', 'entry:P140'],
    steps: [
      'Reúne tus pruebas: documentos, mensajes o testigos.',
      'Asiste a la audiencia; puedes ir acompañado de un asesor o representante.',
      'Presenta tus pruebas y alegatos: tienes derecho a la presunción de inocencia.',
      'Si la resolución te parece injusta, apela por escrito ante el Vicerrectorado Académico o el Consejo de Rectoría dentro del plazo establecido.',
    ],
  },

  // ── Sala de Lactancia ──────────────────────────────────────────────────
  {
    id: 'lactation',
    title: 'usar la Sala de Lactancia',
    refs: ['topic:lactation', 'entry:P101', 'entry:P102', 'entry:P103', 'entry:P104', 'entry:P105', 'entry:P107', 'entry:P116'],
    steps: [
      'Ve al Edificio Administrativo Anexo: de lunes a viernes de 7:00 a.m. a 6:30 p.m. y los sábados de 8:00 a.m. a 11:30 a.m.',
      'Registra tu ingreso con el personal de la Clínica o en la recepción de la sala.',
      'Lleva tus propios biberones, recipientes y extractor esterilizados.',
      'Usa tu turno: hasta 30 minutos en la mañana y 30 en la tarde.',
      'Si guardas leche, rotula cada frasco con tu nombre, la fecha y la hora, y retírala antes de 2 días.',
    ],
    note: 'El servicio es gratuito.',
  },

  // ── Pagos ──────────────────────────────────────────────────────────────
  {
    id: 'monthly-payment',
    title: 'pagar tu mensualidad',
    refs: ['topic:payments', 'entry:V1', 'entry:V2', 'entry:V4', 'procedure:online-payments'],
    steps: [
      'Revisa tu estado de cuenta o talonario: ahí ves el monto y la fecha de vencimiento.',
      'Abre Pagos en línea con el botón de la tarjeta.',
      'Selecciona la cuota que vas a pagar.',
      'Completa el pago antes de la fecha de vencimiento.',
      'Guarda tu comprobante.',
    ],
    note: 'Si pagas después del vencimiento, se suman $5 de recargo por mora. Si no encuentras tu talonario, consulta en la Vicerrectoría Financiera.',
    card: 'online-payments',
  },
  {
    id: 'arrears',
    title: 'ponerte al día si estás en mora',
    refs: ['entry:V5', 'entry:V9'],
    steps: [
      'Revisa tu estado de cuenta para saber cuánto debes.',
      'Contacta cuanto antes a la Vicerrectoría Financiera para revisar tu saldo.',
      'Pregunta si puedes hacer un arreglo de pago.',
      'Si tu situación económica cambió, pide en Cuotas diferenciadas una revisión de tu cuota, o infórmate sobre las becas.',
    ],
    note: 'Mientras tengas deuda, no estarás solvente para trámites como el cambio de carrera o la graduación.',
  },
  {
    id: 'quota-review',
    title: 'pedir que revisen tu cuota',
    refs: ['entry:V6', 'entry:V7', 'entry:V27'],
    steps: [
      'Reúne documentos que respalden tu situación económica actual.',
      'Contacta a Cuotas diferenciadas (escribe "cuotas diferenciadas" y te paso su teléfono y correo).',
      'Solicita la revisión de tu cuota y entrega tus documentos.',
    ],
  },

  // ── Vida estudiantil ───────────────────────────────────────────────────
  {
    id: 'admissions',
    title: 'entrar a estudiar a la UCA',
    refs: ['entry:V14'],
    steps: [
      'Contacta a Admisiones (escribe "admisiones" y te paso su teléfono y correo).',
      'Infórmate sobre la oferta de carreras, los requisitos de nuevo ingreso y las becas.',
      'Sigue los pasos de inscripción que te indique Admisiones.',
    ],
  },
  {
    id: 'student-groups',
    title: 'unirte a un grupo estudiantil',
    refs: ['entry:V17', 'entry:V18'],
    steps: [
      'Ve al Centro de Asuntos Estudiantiles (CAE) o contáctalo (escribe "CAE").',
      'Pregunta por los grupos, asociaciones, equipos o actividades que te interesan.',
      'Inscríbete en el que más te guste.',
    ],
  },
]
