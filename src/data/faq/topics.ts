import type { FaqTopic } from '@/types/faq'

// Preguntas abiertas o por tema sobre los reglamentos UCA.
// Cada respuesta resume solo lo que dicen las respuestas oficiales de la guía FAQ
// (ver "related"); no agrega datos nuevos.
export const faqTopics: FaqTopic[] = [
  {
    id: 'deferred',
    title: 'Parciales diferidos',
    answer: `Sobre los parciales diferidos (evaluaciones extraordinarias):
• Solo se autorizan por fuerza mayor: enfermedad o accidente, trabajo ineludible o un viaje grave. No estudiar, quedarse dormido, olvidar la fecha o tener muchos exámenes no cuenta, y la falta se califica con 0.0.
• Se piden por escrito al Decanato de tu Facultad (o al de Postgrados) en los 3 días hábiles después del examen, con los comprobantes y pagando el arancel. No se gestionan directo con el docente.
• El diferido es diferente pero equivalente al original, nunca acumulativo, y se hace en las 2 semanas posteriores al periodo ordinario.
• Si abandonas el examen ordinario o no te presentas al diferido autorizado, pierdes la oportunidad de reponerlo.
• En maestrías y doctorados: máximo 2 evaluaciones diferidas por asignatura, y los debates o discusiones grupales no se reponen.
Cuéntame tu caso y te digo qué aplica.`,
    variants: [
      'que es un parcial diferido',
      'como funcionan los diferidos',
      'informacion sobre examenes diferidos',
      'que dice el reglamento de los diferidos',
      'reglas de evaluaciones extraordinarias',
      'todo sobre diferidos',
      'cuando puedo pedir un diferido',
      'requisitos para un examen diferido',
      'reposicion de examenes',
      'perdi un parcial que hago',
    ],
    related: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'P10'],
    keywords: [
      'diferid',
      'diferir',
      'difieren',
      'extraordinari',
      'reposicion',
      'reponer el examen',
      'reponer el parcial',
      'reponerlo',
      'perdi el parcial',
      'perdi el examen',
      'falte al parcial',
      'falte al examen',
      'no hice el parcial',
      'no llegue al parcial',
      'no llegue al examen',
    ],
  },
  {
    id: 'overview',
    title: 'Reglamentos UCA en general',
    answer: `La UCA tiene 12 reglamentos oficiales vigentes:
• Carreras de Grado (inscripción, retiros, matrículas, CUM y graduación)
• Becas P. José María Gondra
• Servicio Social Estudiantil
• Biblioteca (CRAI)
• Instructorías Estudiantiles
• Sala de Lactancia Materna
• Faltas y Sanciones Estudiantiles
• Incorporación de títulos obtenidos en el extranjero
• Carreras de Postgrado
• Consejo Estudiantil UCA (CEUCA)
• Carrera Académica (escalafón docente)
• Reglamento Interno de Trabajo
¿Sobre cuál quieres saber? También puedes preguntarme por un tema, como becas, plagio o acoso.`,
    variants: [
      '¿qué me puedes decir del reglamento UCA?',
      'que reglamentos tiene la uca',
      'cuentame del reglamento',
      'que dice el reglamento de la uca',
      'quiero saber sobre los reglamentos',
      'reglamento uca',
      'que reglas hay en la universidad',
      'cuales son las normas de la uca',
      'dame un resumen del reglamento',
      'que tengo que saber del reglamento',
    ],
    related: [],
  },
  {
    id: 'harassment',
    title: 'Acoso',
    answer: `Varios reglamentos hablan del acoso y todos lo sancionan:
• Entre estudiantes, incluso en redes sociales: el acoso, la intimidación o las amenazas que atenten contra la dignidad de alguien de la comunidad son faltas sancionables (Reglamento de Faltas y Sanciones).
• De un profesor hacia un estudiante: se abre expediente en la Comisión Disciplinaria Docente y puede terminar en destitución e inhabilitación inmediata (Escalafón Docente).
• En el trabajo: el acoso sexual, la violencia verbal y el maltrato laboral están prohibidos y se sancionan con despido inmediato (Reglamento Interno de Trabajo).
• Durante el servicio social: si la institución te maltrata o violenta tus derechos, denúncialo de inmediato ante el Centro de Servicio Social para que intervenga y te reubique.
Si estás pasando por algo así, no estás solo: puedo darte los contactos de atención de la UCA.`,
    variants: [
      '¿hay algo que hable de los acosos?',
      'que dice el reglamento sobre acoso',
      'me estan acosando, que hago',
      'acoso en la uca',
      'donde denuncio acoso',
      'hay sanciones por acoso?',
      'un profe me acosa',
      'acoso sexual reglamento',
      'bullying en la universidad',
      'me molestan y me siento inseguro',
    ],
    related: ['P138', 'P215', 'P238', 'P57'],
    keywords: ['acos', 'ciberacos', 'bullying', 'buling', 'hostig', 'intimid', 'mobbing', 'abuso sexual', 'me molestan', 'me amenaz', 'tocamiento'],
  },
  {
    id: 'cheating',
    title: 'Copia, fraude y plagio',
    answer: `El reglamento trata la copia y el plagio como fraude académico:
• Si te atrapan copiando en un examen, la prueba se anula (nota 0.0) y recibes una amonestación escrita en tu expediente.
• El plagio, como copiar y pegar de internet sin citar, se equipara al fraude: la tarea se anula, la nota es cero y se inicia el proceso sancionatorio.
• Si lo vuelves a hacer, es falta muy grave: suspensión temporal de matrícula o expulsión definitiva.
• En posgrado, el plagio en la tesis significa reprobación automática, anulación del trabajo y expulsión del programa.`,
    variants: [
      'que dice el reglamento de copiar',
      'que pasa si hago trampa',
      'reglas sobre plagio',
      'sanciones por fraude academico',
      'copiar en examenes reglamento',
      'hay castigo por plagio?',
      'que tan grave es copiar',
      'reglamento sobre trampas',
      'que pasa si copio una tarea',
      'plagio y fraude uca',
    ],
    related: ['P122', 'P123', 'P131', 'P180'],
    keywords: ['plagi', 'fraude', 'trampa', 'acordeon', 'copiar', 'copiando', 'copie', 'copio', 'copiado', 'cachar', 'cacharon', 'cacharan'],
  },
  {
    id: 'substances',
    title: 'Alcohol, drogas y tabaco',
    answer: `Sobre alcohol, drogas y tabaco en el campus:
• Ingresar, consumir o estar bajo los efectos de alcohol o drogas en el campus es falta muy grave y se sanciona con suspensión o expulsión. Incluye el parqueo.
• Está prohibido fumar o usar vapeadores dentro de edificios, aulas y zonas no autorizadas del campus.`,
    variants: [
      'que dice el reglamento del alcohol',
      'se puede tomar en la uca',
      'reglas sobre drogas',
      'se puede fumar en el campus',
      'reglamento sobre vapear',
      'alcohol y drogas uca',
      'hay sanciones por tomar en la u?',
      'que pasa si llego bolo',
      'normas de tabaco',
      'reglamento de sustancias',
    ],
    related: ['P124', 'P130'],
    keywords: ['alcohol', 'droga', 'fumar', 'fumando', 'fume', 'vape', 'vapea', 'cigarr', 'tabaco', 'cerveza', 'guaro', 'borrach', 'marihuana', '=bolo'],
  },
  {
    id: 'conduct',
    title: 'Conducta, violencia y daños',
    answer: `El Reglamento de Faltas y Sanciones clasifica las faltas en tres niveles: menos graves, graves y muy graves. Algunos ejemplos:
• Insultar o faltar al respeto a un profesor o empleado: falta grave o muy grave, con amonestaciones severas hasta suspensión.
• Peleas, agresiones físicas o desórdenes graves en cualquier instalación de la UCA: falta muy grave.
• Dañar equipos o mobiliario a propósito: además de la sanción, debes reparar o reponer lo dañado.
• Negarte a identificarte ante seguridad del campus: falta menos grave o grave.
• Falsificar firmas o documentos: falta extremadamente grave, con expulsión y hasta denuncias legales.`,
    variants: [
      'que faltas existen en la uca',
      'reglamento de conducta',
      'que pasa si me peleo',
      'reglas de comportamiento',
      'sanciones por mala conducta',
      'que se considera falta grave',
      'reglamento disciplinario',
      'que me puede pasar si me porto mal',
      'normas de convivencia uca',
      'que cosas estan prohibidas',
    ],
    related: ['P121', 'P125', 'P126', 'P132', 'P133', 'P139'],
    keywords: ['pelea', 'pelee', 'riña', 'agresi', 'golpe', 'vandal', 'insult', 'falsific', 'expuls', 'sancion', 'castigo', 'falta grave', 'faltas disciplinarias', 'mala conducta'],
  },
  {
    id: 'due-process',
    title: 'Derechos en un proceso disciplinario',
    answer: `Si te acusan de una falta, tienes derechos:
• Debido proceso y presunción de inocencia: puedes presentar pruebas y alegatos de defensa en una audiencia.
• Puedes ir acompañado de un asesor o representante.
• Si la resolución no te parece justa, puedes apelar por escrito ante el Vicerrectorado Académico o el Consejo de Rectoría, dentro de los plazos establecidos.
• Las sanciones graves y muy graves quedan en tu expediente, pero puedes pedir que se cancelen los antecedentes cuando se cumplan los plazos y condiciones de la norma.`,
    variants: [
      'que derechos tengo si me acusan',
      'me abrieron un proceso disciplinario',
      'como me defiendo de una sancion',
      'derechos del estudiante en una audiencia',
      'puedo apelar una sancion?',
      'me quieren sancionar injustamente',
      'que garantias tengo en un proceso disciplinario',
      'me estan investigando, que hago',
      'derecho a defensa reglamento',
      'como funciona un proceso disciplinario',
    ],
    related: ['P127', 'P137', 'P128', 'P134', 'P140'],
    keywords: ['apelar', 'apelacion', 'audiencia', 'debido proceso', 'me acusan', 'me acusaron', 'acusacion', 'defenderme', 'proceso disciplinario'],
  },
  {
    id: 'failing',
    title: 'Reprobar materias y matrículas',
    answer: `En grado, una materia se aprueba con 6.0 (escala de 0.0 a 10.0). Si repruebas:
• En tercera matrícula, si tu CUM es menor a 6.0, no puedes continuar en tu carrera ni en otra que lleve esa materia.
• La cuarta matrícula es excepcional: solo se permite con un CUM entre 6.0 y 7.0, y si repruebas otra vez quedas fuera de la carrera.
• Si pierdes el derecho por inasistencia, repruebas la materia sin derecho a más evaluaciones.
En posgrado la nota mínima es 7.0, no existe la tercera matrícula, y reprobar dos asignaturas causa la baja del programa.`,
    variants: [
      'que pasa si repruebo materias',
      'reglamento sobre reprobar',
      'cuantas veces puedo reprobar',
      'reglas de matriculas',
      'me estoy aplazando, que dice el reglamento',
      'segunda tercera y cuarta matricula',
      'me pueden sacar por reprobar?',
      'que pasa si me va mal en las materias',
      'limite de reprobadas',
      'reprobar y quedar fuera de la carrera',
    ],
    related: ['P18', 'P4', 'P5', 'P14', 'P163', 'P167', 'P168'],
    keywords: ['reprob', 'aplaz', 'segunda matricula', 'tercera matricula', 'cuarta matricula', 'me sacan de la carrera'],
  },
  {
    id: 'withdrawals',
    title: 'Retiros de materias y de ciclo',
    answer: `Sobre retiros:
• Puedes retirar una materia en las fechas del calendario académico, pagando el arancel. Cada materia se retira una sola vez; una segunda vez solo con fuerza mayor justificada ante el Decanato.
• Para retirarte de todo el ciclo, lo solicitas en las fechas establecidas, pagas el arancel y tramitas la suspensión de cuotas ante la administración financiera.
• Si tienes beca, avisa a la Dirección de Desarrollo Estudiantil para congelarla. Abandonar materias sin retirarlas formalmente es causal de cancelación de la beca.
Las fechas oficiales están en el Calendario Académico.`,
    variants: [
      'que dice el reglamento de retiros',
      'como funcionan los retiros',
      'reglas para retirar materias',
      'puedo retirarme del ciclo',
      'informacion sobre retiros',
      'retirar materia o ciclo',
      'cuantas veces puedo retirar',
      'me quiero salir de materias, que dice el reglamento',
      'retiros y beca',
      'reglamento retiro de asignaturas',
    ],
    related: ['P2', 'P3', 'P11', 'P33', 'P30'],
    keywords: ['retir', 'dar de baja una materia', 'salirme de una materia'],
  },
  {
    id: 'cum',
    title: 'El CUM',
    answer: `El CUM (Coeficiente de Unidades de Mérito) es el promedio ponderado de tus notas. Afecta varias cosas:
• Cuántas UV puedes inscribir; nunca más de 25 UV por ciclo ordinario.
• Mantener la beca: 6.0 en primer y segundo año y 7.0 desde tercero (licenciaturas e ingenierías).
• Ser instructor: CUM de 7.0 o más.
• Ser candidato al CEUCA: CUM de 7.0 o más.
• Graduarte, porque cada carrera exige un CUM mínimo.
• Tercera y cuarta matrícula.`,
    variants: [
      'para que me sirve el cum segun el reglamento',
      'todo sobre el cum',
      'en que afecta el cum',
      'cum y reglamento',
      'por que importa mi promedio',
      'que cosas dependen del cum',
      'cum minimo para todo',
      'explicame el cum',
      'mi cum es bajo, que me afecta',
      'cum uca reglas',
    ],
    related: ['P12', 'P1', 'P23', 'P81', 'P184', 'P4', 'P5'],
    keywords: ['=cum', 'coeficiente de unidades'],
  },
  {
    id: 'scholarships',
    title: 'Becas',
    answer: `El Programa de Becas P. José María Gondra funciona así:
• Hay tres becas parciales: A (75%), B (50%) y C (25%) de la cuota mensual. No cubren matrícula, trámites ni libros.
• Se solicitan en la Dirección de Desarrollo Estudiantil con un estudio socioeconómico y comprobantes de ingresos. Decide el Comité de Becas.
• Se renuevan cada año según tu CUM y tu situación económica.
• Se pueden perder por bajar del CUM requerido, por una falta grave o muy grave, o por abandonar materias.
• Si te la niegan, puedes pedir reconsideración por escrito con nuevas pruebas.`,
    variants: [
      'que dice el reglamento de becas',
      'como funcionan las becas',
      'cuentame de las becas uca',
      'informacion de becas',
      'reglas de la beca gondra',
      'todo sobre becas',
      'resumen del reglamento de becas',
      'hay becas en la uca?',
      'que necesito saber de las becas',
      'becas socioeconomicas uca',
    ],
    related: ['P21', 'P22', 'P23', 'P28', 'P32', 'P25', 'P26', 'P38'],
    keywords: ['beca', 'gondra'],
  },
  {
    id: 'social-service',
    title: 'Servicio Social',
    answer: `Sobre el servicio social:
• Son 600 horas en licenciaturas, ingenierías y arquitectura, y 150 en técnicos y profesorados.
• Al menos la mitad (300 horas en grado) debe hacerse en proyectos externos con la comunidad.
• No es remunerado. No cuenta si es en la empresa de un familiar, en campañas políticas ni en actividades exclusivamente religiosas.
• Lo coordina y certifica el Centro de Servicio Social (CSS). Las instructorías no pagadas cuentan hasta 200 horas por ciclo.
• Al terminar, el CSS te entrega la Certificación Oficial de Servicio Social, que necesitas para egresar.`,
    variants: [
      'que dice el reglamento de servicio social',
      'cuentame del servicio social',
      'como funciona el servicio social',
      'reglas de las horas sociales',
      'todo sobre horas sociales',
      'informacion servicio social uca',
      'resumen servicio social',
      'que debo saber de las horas sociales',
      'requisitos del servicio social',
      'servicio social reglamento',
    ],
    related: ['P41', 'P42', 'P43', 'P44', 'P45', 'P46', 'P50', 'P60'],
    keywords: ['servicio social', 'horas sociales', 'hora social', 'horas de servicio', 'centro de servicio social'],
  },
  {
    id: 'graduation',
    title: 'Egreso y graduación',
    answer: `Para egresar y graduarte:
• Eres egresado cuando apruebas todo tu plan de estudios, alcanzas el CUM mínimo de tu carrera, completas el servicio social y estás solvente con los pagos.
• La Constancia de Egreso la emite la Administración Académica.
• Desde que egresas tienes 2 años académicos (4 ciclos) para iniciar tu proceso de graduación. Excepcionalmente puedes pedir prórroga ante el Consejo de Facultad.
• Si vienes de otra universidad, debes aprobar al menos 32 UV en la UCA.
• Una deuda con la biblioteca te impide graduarte.`,
    variants: [
      'que dice el reglamento de graduacion',
      'como me gradúo',
      'requisitos para graduarse',
      'todo sobre egresar',
      'reglas de graduacion uca',
      'que necesito para terminar la carrera',
      'proceso de graduacion',
      'informacion de egreso',
      'cuando me puedo graduar',
      'graduacion y egreso reglamento',
    ],
    related: ['P8', 'P16', 'P6', 'P20', 'P7', 'P74'],
    keywords: ['graduar', 'graduacion', 'graduarme', 'egres'],
  },
  {
    id: 'library',
    title: 'Biblioteca',
    answer: `Normas principales de la Biblioteca (CRAI):
• Necesitas tu carné estudiantil vigente para entrar y pedir préstamos. Es personal: prestarlo implica el decomiso y 30 días de suspensión.
• Si devuelves tarde, pagas una multa por día y no puedes pedir más préstamos hasta pagar. Una multa sin pagar te impide inscribir, tramitar certificaciones o graduarte.
• Si pierdes o dañas un libro, debes reponerlo o pagarlo.
• No se permite comida ni bebidas, ni apartar puestos dejando tus cosas.
• Puedes renovar en línea si no tienes multas y el libro no está reservado. La biblioteca virtual se usa con tu correo institucional.`,
    variants: [
      'que dice el reglamento de la biblioteca',
      'reglas de la biblioteca',
      'normas del CRAI',
      'cuentame de la biblioteca',
      'todo sobre prestamos de libros',
      'que esta prohibido en la biblioteca',
      'reglamento biblioteca florentino idoate',
      'informacion de la biblioteca uca',
      'resumen reglas biblioteca',
      'que debo saber de la biblioteca',
    ],
    related: ['P61', 'P62', 'P63', 'P64', 'P65', 'P68', 'P74', 'P77'],
    keywords: ['bibliotec', 'biblio', '=crai', '=cry', 'libro', 'florentino idoate'],
  },
  {
    id: 'tutoring',
    title: 'Instructorías',
    answer: `Para ser instructor necesitas ser estudiante activo, haber aprobado al menos el 60% de tu plan, tener un CUM de 7.0 o más y un 8.0 o más en la materia.
• Hay dos modalidades: remunerada o acreditable como servicio social interno (hasta 200 horas por ciclo).
• Te selecciona la Jefatura del Departamento, con entrevista y a veces una prueba.
• No puedes asignar ni modificar notas finales ni sustituir al profesor titular.
• Al terminar recibes una constancia oficial que suma a tu currículum.`,
    variants: [
      'que dice el reglamento de instructorias',
      'cuentame de las instructorias',
      'como funciona ser instructor',
      'todo sobre instructorias',
      'reglas para instructores',
      'informacion de instructorias uca',
      'quiero saber de instructorias',
      'resumen instructorias',
      'como me vuelvo instructor',
      'instructorias reglamento',
    ],
    related: ['P81', 'P82', 'P83', 'P84', 'P85', 'P87', 'P90'],
    keywords: ['instructor', 'instructori'],
  },
  {
    id: 'lactation',
    title: 'Lactancia y maternidad',
    answer: `La UCA protege a las madres lactantes:
• La Sala de Lactancia está en el Edificio Administrativo Anexo. Atiende de lunes a viernes de 7:00 a.m. a 6:30 p.m. y los sábados de 8:00 a 11:30 a.m. Es gratuita.
• Pueden usarla estudiantes, docentes, empleadas y visitantes: hasta 30 minutos en la mañana y 30 en la tarde.
• Las estudiantes tienen derecho a pausas en la jornada académica para extraerse leche o amamantar.
• Puedes guardar leche en el refrigerador hasta 2 días, rotulada con tu nombre, fecha y hora.
• Las empleadas tienen 16 semanas de licencia de maternidad remunerada, y la hora de lactancia no se descuenta del salario.`,
    variants: [
      'que dice el reglamento de lactancia',
      'hay algo para mamas estudiantes',
      'derechos de madres en la uca',
      'sala de lactancia informacion',
      'soy mama, que apoyo hay',
      'reglamento de maternidad',
      'apoyo a estudiantes con bebes',
      'cuentame de la sala de lactancia',
      'lactancia y estudio',
      'beneficios para madres uca',
    ],
    related: ['P101', 'P102', 'P103', 'P105', 'P108', 'P112', 'P236'],
    keywords: ['lactan', 'lactar', 'lactario', 'amamant', 'dar pecho', 'leche materna', 'extraer leche', 'extraerme leche', 'maternidad', 'embaraz'],
  },
  {
    id: 'ceuca',
    title: 'Consejo Estudiantil (CEUCA)',
    answer: `El CEUCA es el órgano máximo de representación estudiantil: defiende tus derechos, canaliza inquietudes y organiza actividades.
• Lo forman 12 estudiantes de pregrado (4 por facultad) durante 2 años académicos.
• Para ser candidato necesitas ser estudiante activo de grado, haber aprobado 8 materias, tener un CUM de 7.0 o más, no tener sanciones y reunir 100 firmas de tu facultad.
• El cargo no es remunerado y es políticamente neutral.
• Si tienes un problema, por ejemplo con un profesor, puedes ir a su oficina o contactar al representante de tu facultad.`,
    variants: [
      'que dice el reglamento del ceuca',
      'cuentame del consejo estudiantil',
      'como funciona el ceuca',
      'todo sobre el ceuca',
      'como se organizan los estudiantes en la uca',
      'informacion del ceuca',
      'como participo en el gobierno estudiantil',
      'resumen ceuca',
      'quien defiende a los estudiantes',
      'ceuca reglamento',
    ],
    related: ['P181', 'P182', 'P183', 'P184', 'P185', 'P189', 'P197'],
    keywords: ['ceuca', 'consejo estudiantil', 'representante estudiantil', 'gobierno estudiantil', 'elecciones estudiantiles'],
  },
  {
    id: 'postgraduate',
    title: 'Posgrado',
    answer: `Reglas principales de posgrado:
• Para una maestría necesitas un título de grado reconocido en El Salvador. Para un doctorado, grado o maestría afín, más selección y entrevista.
• Las materias se aprueban con 7.0. Para graduarte necesitas un CUM de 7.0 en maestría y de 8.0 en doctorado.
• La tesis de maestría se aprueba con 7.5.
• No hay tercera matrícula, y reprobar dos asignaturas causa la baja del programa.
• Tienes 2 años desde el egreso para graduarte. No se exige servicio social.`,
    variants: [
      'que dice el reglamento de posgrado',
      'reglas de la maestria',
      'cuentame del posgrado',
      'como funciona una maestria en la uca',
      'todo sobre posgrados',
      'informacion de maestrias',
      'reglamento de doctorado',
      'resumen reglas posgrado',
      'quiero hacer maestria, que debo saber',
      'normas de posgrado uca',
    ],
    related: ['P161', 'P162', 'P163', 'P164', 'P165', 'P166', 'P167', 'P168', 'P172', 'P177'],
    keywords: ['maestri', 'doctorad', 'posgrado', 'postgrado'],
  },
  {
    id: 'complaints',
    title: 'Quejas y denuncias',
    answer: `Depende de qué quieras reclamar:
• Una nota: pide revisión al docente dentro de los 3 días hábiles después de publicada.
• Un trato injusto con un profesor: acude al CEUCA o al representante de tu facultad.
• Acoso o una falta ética de un profesor: se abre expediente en la Comisión Disciplinaria Docente.
• La biblioteca: queja por escrito a la Dirección de la Biblioteca.
• Tu servicio social: denuncia ante el Centro de Servicio Social.
• Siendo instructor, si te piden funciones fuera del reglamento: acude al Jefe de Departamento.
• Siendo empleado: la Dirección de Recursos Humanos.`,
    variants: [
      'donde pongo una queja',
      'a quien denuncio algo en la uca',
      'quiero reclamar algo',
      'como hago una denuncia',
      'donde me quejo de un profesor',
      'tengo un problema, a quien acudo',
      'quejas uca',
      'me trataron mal, a donde voy',
      'quiero reportar algo',
      'canales de denuncia',
    ],
    related: ['P9', 'P197', 'P215', 'P80', 'P57', 'P97', 'P239'],
    keywords: ['queja', 'quejarme', 'quejo', 'denunci', 'reclam', 'reportar a'],
  },
  {
    id: 'foreigners',
    title: 'Estudiantes y títulos extranjeros',
    answer: `Si eres extranjero o estudiaste fuera:
• El servicio social es obligatorio para todos los que aspiran a un título de grado en El Salvador, también los extranjeros.
• La Beca Gondra exige los criterios socioeconómicos y de residencia del programa.
• Para validar un título extranjero (grado o posgrado), se homologa o convalida ante el Decanato de la facultad afín. Necesitas el título, las notas y el plan de estudios apostillados o autenticados, con traducción oficial si no están en español.
• Si eres extranjero residente, presenta también tu estatus migratorio o carné de residente.`,
    variants: [
      'soy extranjero, que dice el reglamento',
      'reglas para estudiantes extranjeros',
      'estudie afuera, que tengo que hacer',
      'informacion para extranjeros',
      'que necesito si no soy salvadoreño',
      'extranjeros en la uca',
      'validar estudios de afuera',
      'reglamento para extranjeros',
      'vengo de otro pais a estudiar',
      'titulos extranjeros informacion',
    ],
    related: ['P59', 'P40', 'P141', 'P143', 'P144', 'P154'],
    keywords: ['extranjer', 'apostill', 'homolog', 'otro pais', 'incorporar mi titulo', 'incorporacion de titulo'],
  },
  {
    id: 'exams',
    title: 'Exámenes y notas',
    answer: `Sobre exámenes y notas:
• En grado apruebas con 6.0; en posgrado, con 7.0.
• Si no estás de acuerdo con una nota, pide revisión al docente dentro de los 3 días hábiles después de publicada.
• Si faltas a un examen por enfermedad o emergencia, presenta la solicitud con la justificación al Decanato de tu Facultad dentro de 3 días hábiles y paga el arancel para que te autoricen el diferido.
• Copiar anula el examen (0.0) y genera una amonestación.
• Solo el profesor titular asigna las notas finales; los instructores no pueden hacerlo.`,
    variants: [
      'que dice el reglamento de examenes',
      'reglas de evaluaciones',
      'todo sobre notas',
      'como funcionan los examenes',
      'reglamento de calificaciones',
      'informacion de parciales',
      'que debo saber de los examenes',
      'derechos sobre mis notas',
      'reglas de notas uca',
      'evaluaciones reglamento',
    ],
    related: ['P18', 'P163', 'P9', 'P10', 'P122', 'P84'],
    keywords: ['revision de nota', 'revision de examen', 'nota minima', 'con cuanto se pasa', 'con cuanto paso'],
  },
  {
    id: 'teachers',
    title: 'Profesores',
    answer: `Sobre los profesores:
• Los evalúa la Comisión Académica del Departamento con encuestas estudiantiles, observaciones e informes. Tus encuestas cuentan para renovaciones y ascensos.
• Si no llegan a clase o no entregan notas a tiempo, pueden recibir amonestaciones, suspensiones o deméritos.
• Una falta ética o un acoso contra un estudiante abre expediente en la Comisión Disciplinaria Docente y puede terminar en destitución.
• Para ser docente de planta se exige maestría o doctorado.`,
    variants: [
      'que dice el reglamento de los profesores',
      'reglas para los profes',
      'mi profe no cumple, que dice el reglamento',
      'como se evalua a los docentes',
      'derechos frente a un profesor',
      'reglamento docente',
      'que pasa con los profes malos',
      'cuentame del escalafon docente',
      'obligaciones de los profesores',
      'profesores uca reglas',
    ],
    related: ['P204', 'P208', 'P209', 'P215', 'P202'],
    keywords: ['profesor', '=profe', '=profes', 'docente', 'catedratic', 'escalafon'],
  },
  {
    id: 'staff',
    title: 'Empleados de la UCA',
    answer: `Puntos clave del Reglamento Interno de Trabajo, que aplica a empleados y docentes:
• La jornada es de 44 horas semanales.
• Hay 15 días de vacaciones colectivas en diciembre, pagadas con un recargo del 30%.
• El aguinaldo es de 25 días de salario si llevas entre 1 y 3 años, y de 30 días con 3 años o más.
• Las horas extra se pagan con un 100% de recargo.
• Faltar 2 días seguidos sin justificar es causa de despido. El acoso laboral o sexual se sanciona con despido inmediato.
• Los reclamos se presentan ante la Dirección de Recursos Humanos.`,
    variants: [
      'trabajo en la uca, que dice el reglamento',
      'reglamento interno de trabajo resumen',
      'derechos de los empleados uca',
      'reglas para trabajadores',
      'informacion laboral uca',
      'soy empleado de la uca',
      'prestaciones de la uca',
      'cuentame del reglamento de trabajo',
      'que beneficios tienen los trabajadores',
      'normas laborales uca',
    ],
    related: ['P221', 'P222', 'P223', 'P224', 'P225', 'P226', 'P227', 'P234', 'P238', 'P239'],
    keywords: ['emplead', 'trabajador', 'aguinald', 'salari', 'sueldo', 'reglamento interno de trabajo', 'horas extra'],
  },
  {
    id: 'health',
    title: 'Salud y emergencias',
    answer: `Si tienes un problema de salud o una emergencia:
• Si faltas a un examen, presenta la solicitud con la constancia médica al Decanato de tu Facultad dentro de 3 días hábiles y paga el arancel para hacer el examen diferido.
• Si es un motivo personal, puedes pedir el retiro del ciclo completo en las fechas establecidas.
• Si un trabajador se accidenta en el campus, se le atiende en la Clínica Médica y se notifica al ISSS.`,
    variants: [
      'que dice el reglamento si me enfermo',
      'tengo una emergencia medica',
      'reglas si estoy enfermo',
      'me enfermé, que hago con las clases',
      'enfermedad y estudios',
      'emergencia y examenes',
      'que pasa si me hospitalizan',
      'salud y reglamento uca',
      'estoy enfermo y tengo examen',
      'problema de salud durante el ciclo',
    ],
    related: ['P10', 'P3', 'P237', 'D1'],
    keywords: ['enferm', 'emergencia', 'hospital', 'accidente', 'incapacidad medica', 'constancia medica'],
  },
  {
    id: 'payments',
    title: 'Pagos y mensualidades',
    answer: `Sobre los pagos en la UCA:
• La cuota mensual es diferenciada: se asigna según la situación socioeconómica de cada estudiante, por eso no todos pagan lo mismo.
• Cada cuota tiene fecha de vencimiento (en tu estado de cuenta y en el Calendario Académico). Si pagas tarde, se suman $5 de recargo por mora.
• La matrícula y la mensualidad van subiendo conforme avanzas en tu carrera, y depende de cada carrera.
• El interciclo sale entre un 20% y un 35% más caro por UV que un ciclo normal.
• Si tu cuota vino más alta, revisa si es por mora, por el arancel de un trámite (retiro, diferido…) o por un cambio en tu beca.
• Si no puedes pagar, consulta en la Vicerrectoría Financiera un arreglo de pago, o pide en Cuotas diferenciadas que revisen tu cuota.
• Estar solvente se pide para trámites como el cambio de carrera y la graduación.
¿Qué quieres saber: cómo pagar, la mora o por qué te cobraron más?`,
    variants: [
      'pagos en la uca',
      'informacion sobre pagos',
      'dudas sobre la mensualidad',
      'tengo una duda con mi cuota',
      'quiero saber de las cuotas',
      'como funcionan los pagos en la uca',
      'mensualidades',
      'todo sobre pagos',
      'cuentame de los pagos',
      'pagos y cuotas',
    ],
    related: ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7', 'V8', 'V9', 'V27', 'V28'],
    keywords: [
      'mensualidad',
      'colegiatura',
      '=mora',
      'recargo',
      'talonario',
      'estado de cuenta',
      '=cuota',
      '=cuotas',
      'pago tarde',
      'pagar tarde',
      'pague tarde',
      'cobraron',
      'arreglo de pago',
      'solvente',
      '=pisto',
    ],
  },
  {
    id: 'bookstore',
    title: 'Librería y Papelería UCA',
    answer: `La Librería y Papelería UCA está dentro del campus, arriba de la Plaza de los Estudiantes por la Paz. Ahí encuentras:
• Libros, como publicaciones de UCA Editores y material de lectura para tus materias.
• Útiles y artículos de papelería para el día a día.
• Puedes consultar si tienen artículos con la identidad de la UCA.
Lo disponible cambia, así que si buscas algo puntual, pregunta ahí mismo. ¿Quieres que te la muestre en el mapa? Escribe "¿dónde queda la librería?".`,
    variants: [
      'libreria uca',
      'la libreria',
      'informacion de la libreria',
      'cuentame de la libreria',
      'papeleria de la uca',
      'libreria y papeleria',
      'que onda con la libreria',
      'hay libreria en la uca',
      'la uca tiene libreria',
      'tienda de la uca',
    ],
    related: ['V10', 'V11', 'V12'],
    keywords: ['libreria', 'papeleria', 'uca editores', '=utiles', 'souvenir', 'logo de la uca', 'cuaderno', 'sudadera', 'ropa de la uca'],
  },
  {
    id: 'new-students',
    title: 'Nuevo ingreso',
    answer: `¡Bienvenido a la UCA! Lo básico para tus primeros ciclos:
• Calendario Académico: inscripciones, pagos, exámenes y vacaciones. Pregúntame cualquier fecha.
• UV y CUM: cada materia vale cierto número de UV, y tu CUM es tu promedio ponderado. De él depende cuántas UV puedes inscribir.
• Pagos: tu cuota es diferenciada; págala antes del vencimiento para evitar la mora.
• Campus: pregúntame "¿dónde queda…?" para la Biblioteca (CRAI), la Cafetería Central, tu Facultad o cualquier edificio.
• Vida estudiantil: el CAE te conecta con grupos y actividades, y la Escuela de Idiomas tiene cursos.
• Reglas clave: conoce lo básico del reglamento, como el plagio, los retiros y los diferidos. Pregúntame cuando quieras.`,
    variants: [
      'soy de primer ingreso',
      'nuevo ingreso',
      'informacion para nuevo ingreso',
      'que necesito saber como nuevo',
      'ayuda para estudiantes nuevos',
      'primer ano en la uca',
      'estudiante nuevo',
      'recien entro a la uca',
      'guia de nuevo ingreso',
      'cosas que debe saber un estudiante nuevo',
    ],
    related: ['V13', 'V14', 'V15', 'V17', 'V19', 'V24'],
    keywords: ['nuevo ingreso', 'primer ingreso', 'soy nuevo', 'soy nueva', 'primer ciclo', 'recien entr', 'acabo de entrar', 'estudiante nuevo', '=uv', '=uvs', 'unidades valorativas'],
  },
  {
    id: 'languages',
    title: 'Cursos de idiomas',
    answer:
      'Sí, la UCA tiene una Escuela de Idiomas, en el edificio de Aulas C. Ahí puedes informarte sobre cursos y niveles. Si tu carrera exige un idioma para graduarte, pregúntame "requisito de inglés para graduarme".',
    variants: ['escuela de idiomas uca', 'idiomas en la uca', 'cursos de idiomas', 'aprender ingles', 'clases de idiomas'],
    related: ['V22'],
    keywords: ['curso de ingles', 'cursos de ingles', 'clases de ingles', 'cursos de idiomas', 'clases de idiomas', 'aprender idiomas', 'aprender ingles', 'aprender otro idioma'],
  },
]
