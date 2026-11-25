import type { FaqEntry, FaqRegulation } from '@/types/faq'

// 18. Ingreso de personas externas al campus
// Fuente: "Banco Institucional de 200 Preguntas Frecuentes (FAQ) sobre el Ingreso de Personas
// Externas al Campus UCA". Cada pregunta del catálogo (E1…E200) responde con una de las seis
// respuestas institucionales base (R1…R6) de la sección 2 del documento.
// Idea clave: Registro Académico no da pases de ingreso; los permisos especiales se tramitan
// en el Edificio de Administración Central.

// R1: Control de ingreso general e identificación (preguntas 1-40)
const R1 =
  'Toda persona externa que quiera ingresar al campus de la UCA debe identificarse en la entrada principal o en los portones peatonales presentando su DUI, pasaporte o un documento oficial vigente. Registro Académico no gestiona pases de entrada. Los trámites de visitas, permisos o eventos especiales se coordinan en el Edificio de Administración Central.'

// R2: Biblioteca "Florentino Idoate" para visitantes (preguntas 41-80)
const R2 =
  'Las personas externas pueden usar la Biblioteca (CRAI) "Florentino Idoate" solicitando un Carné de Lector Ocasional o de Investigador Privado. Para sacarlo presentas tu documento de identidad (o una carta de tu institución de procedencia) y cancelas la cuota institucional en colecturía. El carné habilita la lectura en sala y el fotocopiado.'

// R3: Estudiante oyente (preguntas 81-120)
const R3 =
  'Para asistir a clases sin estar inscrito en una carrera debes presentar una solicitud de admisión como estudiante oyente ante el Decanato de la Facultad correspondiente, por medio de la Secretaría de Integración Universitaria (DIDE). La solicitud se evalúa según el cupo disponible y requiere el pago del arancel de materias de oyente.'

// R4: Sala de Lactancia para visitantes (preguntas 121-150)
const R4 =
  'Las madres lactantes externas que estén de visita o haciendo trámites en el campus pueden usar la Sala de Lactancia. Para entrar deben presentarse en la Clínica ISSS-UCA, donde el personal de salud registra su ingreso y les da acceso a las instalaciones equipadas.'

// R5: Acceso vehicular y estacionamiento (preguntas 151-175)
const R5 =
  'Los vehículos de personas externas entran por los portones habilitados para visitantes. En la entrada te dan un tiquete de parqueo, y antes de retirar el vehículo pagas la tarifa por hora o fracción en los puntos de pago de colecturía.'

// R6: Permisos y convivencia (preguntas 176-200)
const R6 =
  'Las solicitudes colectivas o de proyectos (grupos, eventos, grabaciones, uso de áreas) se tramitan en el Edificio de Administración Central, con una nota formal entregada al menos 5 días hábiles antes. Dentro del campus, toda persona visitante debe respetar el Reglamento de Faltas y Sanciones.'

const e = (id: number, question: string, answer: string, variants: string[]): FaqEntry => ({
  id: `E${id}`,
  question,
  answer,
  variants,
})

export const visitantesFaq: FaqRegulation = {
  id: 'visitantes',
  title: 'Ingreso de personas externas al campus',
  entries: [
    // ── Cat. 1: Ingreso general, identificación y trámites (R1) ─────────────
    e(1, '¿Cómo puede entrar un particular a la UCA si no tiene carné?', R1, [
      'como entro a la uca si no tengo carne', 'puedo entrar a la uca sin carne', 'como entra alguien que no estudia en la uca',
      'no soy estudiante como entro a la uca', 'como ingreso al campus siendo particular', 'como puedo entrar a la uca si no soy alumno',
      'que necesito para entrar a la uca si no estudio ahi', 'como entra un visitante a la uca', 'requisitos para entrar a la uca como visitante',
      'soy externo como entro a la universidad', 'mi novia no es de la uca puede entrar', 'mi novio no estudia en la uca puede entrar', 'un amigo que no es de la uca puede entrar', 'puede entrar alguien que no es de la uca', 'se puede entrar a la uca sin ser alumno', 'pueden entrar personas que no son de la uca', 'un amigo de otra universidad puede entrar', 'puedo llevar a un amigo a la uca', 'puedo invitar a alguien a la uca',
    ]),
    e(2, '¿Qué documento me piden en la entrada de la UCA para ingresar?', R1, [
      'que documento piden para entrar a la uca', 'que me piden en la entrada de la uca', 'que documentos necesito para entrar al campus',
      'con que documento entro a la uca', 'que identificacion piden en el porton', 'que tengo que mostrar para entrar a la uca',
    ]),
    e(3, '¿Puedo entrar a la universidad solo a hacer una pregunta en administración?', R1, [
      'puedo entrar solo a preguntar algo en administracion', 'puedo ir a la uca a hacer una consulta sin ser alumno',
      'me dejan entrar a preguntar algo a la uca', 'puedo pasar a administracion a preguntar',
    ]),
    e(4, '¿Es obligatorio presentar el DUI en la entrada del campus?', R1, [
      'es obligatorio el dui para entrar a la uca', 'piden dui para entrar a la uca', 'tengo que llevar dui para entrar al campus',
      'necesito el dui para entrar a la universidad', 'me piden el dui en la entrada',
    ]),
    e(5, '¿Un extranjero puede ingresar mostrando solo su pasaporte?', R1, [
      'un extranjero puede entrar con pasaporte', 'puedo entrar a la uca con pasaporte', 'soy extranjero puedo entrar a la uca',
      'sirve el pasaporte para entrar a la uca', 'no tengo dui pero tengo pasaporte puedo entrar',
    ]),
    e(6, '¿Registro Académico me da un carné provisional de visitante?', R1, [
      'registro academico da carne de visitante', 'donde saco un carne provisional de visitante', 'me dan carne de visitante en registro',
      'hay carne provisional para visitantes', 'registro academico da pases de entrada',
    ]),
    e(7, '¿Puedo entrar si olvidé mi DUI pero tengo licencia de conducir?', R1, [
      'olvide mi dui puedo entrar con la licencia', 'puedo entrar a la uca con licencia de conducir', 'sirve la licencia para entrar a la uca',
      'no ando dui puedo entrar con licencia', 'se me olvido el dui puedo entrar',
    ]),
    e(8, '¿Los visitantes deben registrarse con el personal de seguridad?', R1, [
      'los visitantes se registran con seguridad', 'tengo que registrarme con los vigilantes para entrar', 'hay que anotarse en la entrada de la uca',
      'los visitantes se identifican con los guardias',
    ]),
    e(9, '¿A qué edificio debo ir si tengo una cita administrativa como externo?', R1, [
      'a que edificio voy si tengo una cita administrativa', 'tengo una cita en la uca a donde voy', 'soy externo y tengo una cita a que edificio voy',
      'donde son las citas administrativas para externos',
    ]),
    e(10, '¿Se requiere permiso previo para ingresar caminando al campus?', R1, [
      'necesito permiso para entrar caminando a la uca', 'se necesita permiso previo para entrar a pie al campus', 'puedo entrar a pie a la uca sin permiso',
      'hay que pedir permiso para entrar caminando',
    ]),
    e(11, '¿A qué hora abren los portones para el ingreso de visitantes?', R1, [
      'a que hora abren los portones de la uca', 'a que hora pueden entrar los visitantes', 'horario de ingreso para visitantes',
      'a que hora abre la uca para visitantes', 'desde que hora puedo entrar a la uca como visitante',
    ]),
    e(12, '¿Puede entrar un familiar de un estudiante a dejarle algo?', R1, [
      'puede entrar un familiar a dejarle algo a un estudiante', 'mi mama puede entrar a dejarme algo a la uca', 'puedo entrar a dejarle algo a mi hijo en la uca',
      'un familiar puede entrar a la uca a dejar algo', 'puedo ir a dejarle comida a mi hermano a la uca',
    ]),
    e(13, '¿Se permite el paso a exalumnos que no llevan su carné?', R1, [
      'pueden entrar los exalumnos sin carne', 'soy exalumno puedo entrar a la uca', 'los egresados pueden entrar al campus',
      'ya me gradue puedo entrar a la uca', 'exalumnos pueden entrar a la universidad',
    ]),
    e(14, '¿Dónde solicito autorización si vengo a una entrevista de trabajo en la UCA?', R1, [
      'tengo entrevista de trabajo en la uca como entro', 'vengo a una entrevista de trabajo a la uca donde pido autorizacion',
      'como entro a la uca para una entrevista de trabajo', 'voy a una entrevista de trabajo en la uca que necesito',
    ]),
    e(15, '¿Los proveedores externos entran por el mismo portón peatonal?', R1, [
      'por donde entran los proveedores', 'los proveedores entran por el porton peatonal', 'soy proveedor por donde entro a la uca',
      'como entra un proveedor a la universidad',
    ]),
    e(16, '¿Registro Académico atiende a personas que no son estudiantes de la UCA?', R1, [
      'registro academico atiende a personas externas', 'registro atiende a gente que no es estudiante', 'puedo ir a registro academico si no estudio en la uca',
    ]),
    e(17, '¿Qué hago si la seguridad me niega el ingreso por falta de documento?', R1, [
      'no me dejaron entrar por no llevar documento', 'que hago si seguridad no me deja entrar', 'el vigilante no me dejo entrar a la uca que hago',
      'me negaron la entrada a la uca por no tener documento',
    ]),
    e(18, '¿Puedo ingresar al campus si voy a las colecturías a pagar un servicio?', R1, [
      'puedo entrar a la uca a pagar en colecturia', 'voy a pagar a colecturia puedo entrar', 'puedo entrar solo a pagar un servicio a la uca',
    ]),
    e(19, '¿Cómo se controla el acceso de particulares en los portones peatonales?', R1, [
      'como controlan la entrada de particulares', 'como es el control de acceso en los portones', 'que control hay en la entrada de la uca',
    ]),
    e(20, '¿Se puede entrar al campus los días sábados siendo externo?', R1, [
      'puedo entrar a la uca un sabado', 'se puede entrar al campus los sabados siendo visitante', 'abren la uca los sabados para externos',
      'los sabados se puede entrar a la uca',
    ]),
    e(21, '¿Debo decir a dónde voy antes de entrar al campus?', R1, [
      'tengo que decir a donde voy para entrar a la uca', 'me preguntan a donde voy en la entrada', 'debo decir a que voy a la uca',
    ]),
    e(22, '¿Puedo entrar con un niño si voy a hacer un trámite personal?', R1, [
      'puedo entrar con un nino a la uca', 'puedo llevar a mi hijo a la uca a un tramite', 'dejan entrar ninos a la uca',
      'puedo ir con mi bebe a hacer un tramite a la uca',
    ]),
    e(23, '¿La UCA es de libre acceso para todo público?', R1, [
      'la uca es de libre acceso', 'cualquiera puede entrar a la uca', 'la uca esta abierta al publico', 'puede entrar cualquier persona a la uca',
      'la universidad es publica para entrar',
    ]),
    e(24, '¿En qué edificio se gestionan los permisos para grupos de visitantes?', R1, [
      'donde se piden permisos para grupos de visitantes', 'a que edificio voy para el permiso de un grupo', 'quien da permiso para visitas en grupo',
    ]),
    e(25, '¿Puedo solicitar información presencial sobre carreras sin ser alumno?', R1, [
      'puedo ir a pedir informacion de carreras a la uca', 'puedo ir a preguntar por las carreras sin ser alumno', 'quiero informacion de las carreras puedo ir a la uca',
    ]),
    e(26, '¿Se puede ingresar en bicicleta siendo visitante?', R1, [
      'puedo entrar en bicicleta a la uca', 'se puede entrar en bici al campus', 'dejan entrar bicicletas a la uca',
    ]),
    e(27, '¿Puedo entrar a la cafetería de la UCA si no estudio ahí?', R1, [
      'puedo ir a la cafeteria de la uca si no estudio ahi', 'puedo comer en la uca si no soy estudiante', 'un externo puede ir a la cafeteria de la uca',
    ]),
    e(28, '¿Hay algún pago para ingresar caminando al campus?', R1, [
      'hay que pagar para entrar a la uca', 'se cobra la entrada a la uca', 'cuanto cuesta entrar a la uca caminando', 'cobran por entrar a la universidad',
    ]),
    e(29, '¿Registro Académico autoriza visitas guiadas para colegios?', R1, [
      'registro academico autoriza visitas de colegios', 'quien autoriza las visitas de colegios', 'como pido una visita para mi colegio',
    ]),
    e(30, '¿Qué documento debe presentar un menor de edad que visita la UCA?', R1, [
      'que documento presenta un menor de edad para entrar', 'un menor de edad puede entrar a la uca', 'con que documento entra un menor a la uca',
    ]),
    e(31, '¿Puedo entrar si mi DUI está vencido?', R1, [
      'puedo entrar con el dui vencido', 'mi dui esta vencido puedo entrar a la uca', 'sirve el dui vencido para entrar',
    ]),
    e(32, '¿Un mensajero de encomiendas puede ingresar a entregar un paquete?', R1, [
      'puede entrar un mensajero a entregar un paquete', 'puede entrar el delivery a la uca', 'como entra una encomienda a la uca',
      'puede entrar el motorista a dejar un paquete',
    ]),
    e(33, '¿Cómo justifico mi visita ante el guardia de seguridad?', R1, [
      'que le digo al guardia para entrar', 'como justifico mi visita en la entrada', 'que le explico al vigilante para que me deje entrar',
    ]),
    e(34, '¿Se puede ingresar los domingos o días festivos?', R1, [
      'puedo entrar a la uca un domingo', 'se puede entrar a la uca en dias festivos', 'abren la uca los domingos',
    ]),
    e(35, '¿Registro Académico emite pases de entrada a egresados?', R1, [
      'registro da pases de entrada a egresados', 'los egresados necesitan pase para entrar', 'como entra un egresado a la uca',
    ]),
    e(36, '¿Debo portar el gafete de visitante visible dentro del campus?', R1, [
      'tengo que llevar gafete de visitante', 'hay gafete para visitantes', 'debo andar el gafete de visitante a la vista',
    ]),
    e(37, '¿Qué hago si se me pierde el DUI dentro del campus?', R1, [
      'se me perdio el dui en la uca', 'perdi mi dui dentro de la uca que hago', 'que hago si pierdo el dui en el campus',
    ]),
    e(38, '¿Hay límite de tiempo para estar dentro de la UCA como visitante?', R1, [
      'cuanto tiempo puedo estar en la uca como visitante', 'hay limite de tiempo para visitantes', 'cuantas horas puede estar un visitante en la uca',
    ]),
    e(39, '¿Puedo entrar a usar los cajeros automáticos del campus?', R1, [
      'puedo entrar a usar el cajero de la uca', 'hay cajeros en la uca para externos', 'puedo entrar a sacar dinero al cajero de la uca',
    ]),
    e(40, '¿Dónde queda el Edificio de Administración Central para pedir informes?', R1, [
      'donde pido informes en la uca', 'donde piden informes los visitantes', 'a donde voy para pedir informacion como visitante',
    ]),

    // ── Cat. 2: Biblioteca "Florentino Idoate" (R2) ─────────────────────────
    e(41, '¿Un externo puede entrar a leer libros en la biblioteca de la UCA?', R2, [
      'un externo puede entrar a la biblioteca', 'puedo ir a la biblioteca de la uca si no estudio ahi', 'pueden entrar visitantes a la biblioteca',
      'puedo leer libros en la biblioteca de la uca sin ser alumno', 'la biblioteca de la uca es abierta al publico',
    ]),
    e(42, '¿Cómo saco el carné de lector ocasional en la biblioteca?', R2, [
      'como saco el carne de lector ocasional', 'carne de lector ocasional', 'donde saco el carne de lector', 'como obtengo el carne de lector ocasional',
      'que es el carne de lector ocasional',
    ]),
    e(43, '¿Cuánto cuesta el pase de biblioteca para personas no universitarias?', R2, [
      'cuanto cuesta el pase de biblioteca para externos', 'cuanto cobran por usar la biblioteca si no soy estudiante', 'precio del carne de lector',
    ]),
    e(44, '¿Un investigador privado puede usar las salas de lectura de la UCA?', R2, [
      'un investigador puede usar la biblioteca de la uca', 'carne de investigador privado', 'soy investigador puedo usar la biblioteca',
    ]),
    e(45, '¿Puedo sacar fotocopias de libros de la UCA sin ser estudiante?', R2, [
      'puedo sacar copias de libros de la uca sin ser estudiante', 'un externo puede fotocopiar libros de la biblioteca',
    ]),
    e(46, '¿Se puede prestar libros para llevar a casa si soy externo?', R2, [
      'un externo puede llevarse libros prestados', 'me prestan libros si no soy de la uca', 'puedo llevarme libros a mi casa si soy externo',
    ]),
    e(47, '¿Qué documentos me piden para tramitar el carné de lector ocasional?', R2, [
      'que documentos piden para el carne de lector', 'requisitos del carne de lector ocasional', 'que necesito para el carne de lector',
    ]),
    e(48, '¿Los graduados de la UCA tienen acceso a la biblioteca?', R2, [
      'los graduados pueden usar la biblioteca', 'ya me gradue puedo usar la biblioteca', 'los egresados tienen acceso a la biblioteca',
    ]),
    e(49, '¿Registro Académico tramita el carné para la biblioteca?', R2, [
      'registro academico da el carne de biblioteca', 'donde se tramita el carne de la biblioteca para externos',
    ]),
    e(50, '¿Puedo entrar a la biblioteca a usar la red Wi-Fi si soy externo?', R2, [
      'puedo usar el wifi de la biblioteca si soy externo', 'puedo ir a la biblioteca a usar internet sin ser alumno',
    ]),
    e(51, '¿Cuál es la vigencia del carné de investigador privado en la biblioteca?', R2, [
      'cuanto dura el carne de investigador privado', 'vigencia del carne de lector', 'cuanto tiempo vale el carne de lector ocasional',
    ]),
    e(52, '¿Un estudiante de otra universidad puede usar la biblioteca de la UCA?', R2, [
      'estudio en otra universidad puedo usar la biblioteca de la uca', 'alumnos de otras universidades pueden ir a la biblioteca de la uca',
      'soy de otra u puedo usar la biblioteca',
    ]),
    e(53, '¿Se necesita carta de presentación de mi universidad para entrar a la biblioteca?', R2, [
      'necesito carta de mi universidad para usar la biblioteca', 'piden carta de presentacion para la biblioteca',
    ]),
    e(54, '¿Puedo usar las computadoras de la biblioteca siendo visitante?', R2, [
      'un visitante puede usar las computadoras de la biblioteca', 'puedo usar las compus de la biblioteca si no estudio ahi',
    ]),
    e(55, '¿Qué arancel se paga por el carné de cortesía para investigadores extranjeros?', R2, [
      'carne de cortesia para investigadores extranjeros', 'soy investigador extranjero cuanto pago por la biblioteca',
    ]),
    e(56, '¿Se permite el ingreso de exalumnos a las salas de estudio de la biblioteca?', R2, [
      'los exalumnos pueden entrar a la biblioteca', 'soy exalumno puedo usar las salas de la biblioteca',
    ]),
    e(57, '¿Dónde cancelo la cuota para solicitar el carné de lector de biblioteca?', R2, [
      'donde pago el carne de lector', 'donde se paga la cuota del carne de biblioteca',
    ]),
    e(58, '¿Un bachiller que investiga para su tesis puede usar la biblioteca?', R2, [
      'un bachiller puede usar la biblioteca de la uca', 'estoy en bachillerato puedo ir a la biblioteca de la uca',
    ]),
    e(59, '¿Se puede ingresar a la biblioteca solo a estudiar con libros propios?', R2, [
      'puedo ir a la biblioteca a estudiar con mis libros si no soy alumno', 'un externo puede ir solo a estudiar a la biblioteca',
    ]),
    e(60, '¿Registro Académico decide quién entra a la biblioteca?', R2, [
      'quien decide quien entra a la biblioteca', 'registro academico controla la entrada a la biblioteca',
    ]),
    e(61, '¿Tienen algún descuento los egresados para el uso de biblioteca?', R2, [
      'hay descuento para egresados en la biblioteca', 'los egresados pagan menos por la biblioteca',
    ]),
    e(62, '¿Puedo solicitar un libro raro si soy lector ocasional?', R2, [
      'un lector ocasional puede pedir libros raros', 'puedo pedir libros especiales con el carne de lector',
    ]),
    e(63, '¿Cuál es el horario de atención para visitantes en la biblioteca?', R2, [
      'horario de la biblioteca para visitantes', 'a que hora pueden ir los visitantes a la biblioteca',
    ]),
    e(64, '¿Qué pasa si pierdo el carné de lector ocasional?', R2, [
      'perdi el carne de lector ocasional', 'se me perdio el carne de lector que hago',
    ]),
    e(65, '¿Puedo ingresar con mi laptop a las salas de lectura de la biblioteca?', R2, [
      'puedo entrar con laptop a la biblioteca siendo externo', 'un visitante puede llevar su computadora a la biblioteca',
    ]),
    e(66, '¿Los docentes de otras instituciones pueden consultar el catálogo físico?', R2, [
      'docentes de otras instituciones pueden usar la biblioteca', 'soy profesor de otra institucion puedo consultar libros en la uca',
    ]),
    e(67, '¿El carné de biblioteca me sirve para entrar al campus?', R2, [
      'el carne de lector sirve para entrar a la uca', 'con el carne de biblioteca puedo entrar al campus',
    ]),
    e(68, '¿Se puede renovar el permiso de lector ocasional por internet?', R2, [
      'como renuevo el carne de lector ocasional', 'se puede renovar el carne de lector en linea',
    ]),
    e(69, '¿Se requiere cita previa para ir a la biblioteca siendo externo?', R2, [
      'necesito cita para ir a la biblioteca si soy externo', 'hay que sacar cita para la biblioteca de la uca',
    ]),
    e(70, '¿Los niños pueden entrar a la biblioteca acompañando a un investigador?', R2, [
      'pueden entrar ninos a la biblioteca', 'puedo llevar a mi hijo a la biblioteca de la uca',
    ]),
    e(71, '¿Puedo ingresar al archivo histórico de la universidad?', R2, [
      'puedo entrar al archivo historico de la uca', 'como accedo al archivo historico',
    ]),
    e(72, '¿El permiso de biblioteca incluye acceso a bases de datos digitales?', R2, [
      'el carne de lector incluye bases de datos', 'un externo puede usar las bases de datos de la biblioteca',
    ]),
    e(73, '¿Qué norma rige el comportamiento de visitantes en la biblioteca?', R2, [
      'que normas siguen los visitantes en la biblioteca', 'reglas de la biblioteca para visitantes',
    ]),
    e(74, '¿Se puede comer dentro de las instalaciones de la biblioteca?', R2, [
      'un visitante puede comer en la biblioteca', 'se puede comer en la biblioteca siendo externo',
    ]),
    e(75, '¿Hay sanción si entrego tarde un libro en sala siendo externo?', R2, [
      'que pasa si entrego tarde un libro siendo externo', 'hay multa para externos en la biblioteca',
    ]),
    e(76, '¿Puedo pagar el pase de biblioteca con tarjeta de crédito?', R2, [
      'puedo pagar el carne de lector con tarjeta', 'el pase de biblioteca se paga con tarjeta',
    ]),
    e(77, '¿Registro Académico expide carnés de investigación?', R2, [
      'registro academico da carne de investigador', 'donde saco el carne de investigador',
    ]),
    e(78, '¿Es obligatorio guardar las mochilas en el estante al entrar a la biblioteca?', R2, [
      'tengo que dejar la mochila al entrar a la biblioteca siendo visitante', 'los visitantes dejan la mochila en la biblioteca',
    ]),
    e(79, '¿Se puede reservar una sala de trabajo grupal siendo externo?', R2, [
      'un externo puede reservar una sala de la biblioteca', 'puedo reservar sala en la biblioteca si no soy estudiante',
    ]),
    e(80, '¿Con quién me dirijo al llegar a la biblioteca como visitante?', R2, [
      'con quien hablo al llegar a la biblioteca como visitante', 'a quien me dirijo en la biblioteca si soy externo',
    ]),

    // ── Cat. 3: Estudiante oyente y movilidad académica (R3) ────────────────
    e(81, '¿Puedo recibir una materia en la UCA sin matricularme en una carrera?', R3, [
      'puedo llevar una materia sin estar en una carrera', 'puedo recibir clases en la uca sin inscribirme en una carrera',
      'puedo tomar una sola materia en la uca', 'quiero llevar una materia suelta en la uca',
    ]),
    e(82, '¿Cómo es el proceso para ser alumno oyente en la UCA?', R3, [
      'como soy alumno oyente', 'como ser estudiante oyente en la uca', 'proceso para ser oyente', 'que es un estudiante oyente',
      'estudiante oyente', 'quiero ser oyente en la uca', 'como me inscribo de oyente', 'soy oyente que hago', 'oyentes', 'informacion para oyentes', 'quiero ir de oyente a una clase',
    ]),
    e(83, '¿Dónde entrego la carta para solicitar clases como oyente?', R3, [
      'donde entrego la solicitud de oyente', 'a donde llevo la carta para ser oyente',
    ]),
    e(84, '¿Registro Académico me inscribe directamente si quiero ser oyente?', R3, [
      'registro academico inscribe oyentes', 'me inscribo como oyente en registro academico',
    ]),
    e(85, '¿Cuánto cuesta recibir una clase como oyente en la UCA?', R3, [
      'cuanto cuesta ser oyente', 'cuanto se paga por una materia de oyente', 'precio de clases como oyente',
    ]),
    e(86, '¿El Decanato me da permiso de entrar al aula como oyente?', R3, [
      'el decanato da permiso para ser oyente', 'quien me da permiso para entrar a clases como oyente',
    ]),
    e(87, '¿Me entregan notas o diploma si recibo una clase como oyente?', R3, [
      'los oyentes reciben notas', 'me dan diploma si soy oyente', 'los oyentes tienen calificaciones',
    ]),
    e(88, '¿Puedo hacer parciales si estoy autorizado como oyente?', R3, [
      'los oyentes hacen parciales', 'puedo hacer examenes como oyente',
    ]),
    e(89, '¿Se necesita aprobación del catedrático para ser oyente?', R3, [
      'el profesor tiene que aprobar que sea oyente', 'necesito permiso del catedratico para ser oyente',
    ]),
    e(90, '¿Qué carreras o materias permiten estudiantes oyentes?', R3, [
      'que materias aceptan oyentes', 'en que carreras puedo ser oyente',
    ]),
    e(91, '¿Un profesional puede llevar una materia de actualización como oyente?', R3, [
      'soy profesional puedo llevar una materia como oyente', 'puedo actualizarme llevando una materia de oyente',
    ]),
    e(92, '¿Cuál es el límite de materias que puedo cursar como oyente?', R3, [
      'cuantas materias puedo llevar como oyente', 'limite de materias para oyentes',
    ]),
    e(93, '¿Qué pasa si el aula de la materia elegida no tiene cupo disponible?', R3, [
      'que pasa si no hay cupo para oyente', 'no hay cupo en la materia que quiero de oyente',
    ]),
    e(94, '¿El trámite de oyente se hace antes de iniciar el ciclo académico?', R3, [
      'cuando se hace el tramite de oyente', 'la solicitud de oyente se hace antes del ciclo',
    ]),
    e(95, '¿Se paga mensualidad o un solo arancel por ser oyente?', R3, [
      'los oyentes pagan mensualidad', 'como pagan los oyentes',
    ]),
    e(96, '¿Puedo usar el carné de oyente para ingresar al campus todos los días?', R3, [
      'el carne de oyente sirve para entrar a la uca', 'con el carne de oyente entro todos los dias',
    ]),
    e(97, '¿Registro Académico guarda registro académico de las clases como oyente?', R3, [
      'queda registro de las clases de oyente', 'registro academico guarda las materias de oyente',
    ]),
    e(98, '¿Puedo convalidar una materia recibida como oyente más adelante?', R3, [
      'puedo convalidar una materia de oyente', 'me sirve la materia de oyente si despues me inscribo',
    ]),
    e(99, '¿Se exige título de bachiller para ser estudiante oyente?', R3, [
      'necesito ser bachiller para ser oyente', 'piden titulo de bachiller para oyente',
    ]),
    e(100, '¿Puedo asistir a un laboratorio práctico como alumno oyente?', R3, [
      'los oyentes pueden ir a laboratorios', 'como oyente puedo entrar a laboratorio',
    ]),
    e(101, '¿Un alumno de intercambio extranjero ingresa bajo el régimen de oyente?', R3, [
      'los estudiantes de intercambio son oyentes', 'como entra un alumno de intercambio a la uca',
    ]),
    e(102, '¿Dónde recojo la resolución sobre mi solicitud de oyente?', R3, [
      'donde recojo la respuesta de mi solicitud de oyente', 'donde me dan la resolucion de oyente',
    ]),
    e(103, '¿Se requiere entrevista previa con el Decano de la Facultad?', R3, [
      'para ser oyente necesito entrevista con el decano', 'hay entrevista con el decano para oyentes',
    ]),
    e(104, '¿Los egresados UCA tienen trámite preferencial para ser oyentes?', R3, [
      'los egresados tienen preferencia para ser oyentes', 'soy egresado de la uca puedo ser oyente',
    ]),
    e(105, '¿Me dan correo institucional si me aprueban como estudiante oyente?', R3, [
      'los oyentes tienen correo institucional', 'me dan correo de la uca si soy oyente',
    ]),
    e(106, '¿Puedo entrar a la plataforma de Canvas o campus virtual como oyente?', R3, [
      'los oyentes tienen acceso a canvas', 'como oyente puedo usar el campus virtual',
    ]),
    e(107, '¿Qué documento presento en el portón mientras tramito mi calidad de oyente?', R3, [
      'con que documento entro mientras tramito lo de oyente', 'que muestro en el porton si estoy tramitando ser oyente',
    ]),
    e(108, '¿Puedo cambiar de materia si la que pedí como oyente ya se llenó?', R3, [
      'puedo cambiar de materia de oyente si se lleno', 'se lleno la materia que pedi como oyente',
    ]),
    e(109, '¿Un estudiante suspendido puede solicitar ser oyente?', R3, [
      'si estoy suspendido puedo ser oyente', 'un alumno suspendido puede ser oyente',
    ]),
    e(110, '¿El carné de oyente vence al finalizar el ciclo lectivo?', R3, [
      'cuando vence el carne de oyente', 'el carne de oyente dura todo el ciclo',
    ]),
    e(111, '¿Se puede solicitar ser oyente en maestrías o postgrados?', R3, [
      'puedo ser oyente en una maestria', 'hay oyentes en postgrado',
    ]),
    e(112, '¿Registro Académico entrega la papeleta de pago para la cuota de oyente?', R3, [
      'donde me dan la papeleta de pago de oyente', 'quien da el recibo para pagar como oyente',
    ]),
    e(113, '¿Tengo derecho a parqueo estudiando como oyente?', R3, [
      'los oyentes tienen parqueo', 'como oyente puedo usar el parqueo',
    ]),
    e(114, '¿Se pueden recibir clases en línea en modalidad de oyente?', R3, [
      'puedo ser oyente en linea', 'hay oyentes en clases virtuales',
    ]),
    e(115, '¿Qué pasa si dejo de ir a clases habiendo pagado el arancel de oyente?', R3, [
      'que pasa si dejo de ir a clases de oyente', 'si ya pague como oyente y ya no voy',
    ]),
    e(116, '¿El profesor me puede sacar del aula si no llevo mi carné de oyente?', R3, [
      'me pueden sacar de clase si no llevo el carne de oyente', 'el profe me puede sacar si no ando el carne de oyente',
    ]),
    e(117, '¿Hay becas o descuentos para estudiantes oyentes?', R3, [
      'hay becas para oyentes', 'los oyentes tienen descuento',
    ]),
    e(118, '¿Un adulto mayor puede solicitar ingreso como oyente?', R3, [
      'un adulto mayor puede ser oyente', 'soy adulto mayor puedo recibir clases en la uca',
    ]),
    e(119, '¿Cuál es la función de la Secretaría de Integración en el proceso de oyente?', R3, [
      'que hace la secretaria de integracion universitaria', 'que es la dide', 'para que sirve la secretaria de integracion',
    ]),
    e(120, '¿Se requiere carta de motivos para fundamentar la solicitud de oyente?', R3, [
      'necesito carta de motivos para ser oyente', 'piden carta de motivacion para oyente',
    ]),

    // ── Cat. 4: Sala de Lactancia para personas externas (R4) ───────────────
    e(121, '¿Una madre visitante puede usar la sala de lactancia de la UCA?', R4, [
      'una mama visitante puede usar la sala de lactancia', 'puedo usar la sala de lactancia si no estudio en la uca',
      'las visitantes pueden usar la sala de lactancia', 'sala de lactancia para externas',
    ]),
    e(122, '¿Dónde me inscribo si necesito amamantar a mi bebé dentro del campus?', R4, [
      'donde puedo amamantar a mi bebe en la uca', 'necesito dar pecho en la uca a donde voy', 'donde me registro para usar la sala de lactancia',
    ]),
    e(123, '¿La clínica universitaria me da acceso a la sala de lactancia?', R4, [
      'la clinica me da acceso a la sala de lactancia', 'quien abre la sala de lactancia',
    ]),
    e(124, '¿Tiene algún costo usar la sala de lactancia siendo externa?', R4, [
      'cuanto cuesta usar la sala de lactancia', 'se paga por usar la sala de lactancia siendo externa',
    ]),
    e(125, '¿Registro Académico gestiona los permisos de la sala de lactancia?', R4, [
      'registro academico da permiso para la sala de lactancia', 'quien da permiso para la sala de lactancia',
    ]),
    e(126, '¿Qué equipamiento tiene la sala de lactancia para las usuarias?', R4, [
      'que tiene la sala de lactancia', 'que equipo hay en la sala de lactancia',
    ]),
    e(127, '¿Se puede guardar leche materna en la nevera de la clínica?', R4, [
      'puedo guardar leche materna en la uca', 'hay refri para la leche materna',
    ]),
    e(128, '¿Cuál es el horario para acceder a la sala de lactancia del campus?', R4, [
      'horario de la sala de lactancia', 'a que hora abre la sala de lactancia',
    ]),
    e(129, '¿Se exige carné para entrar a la sala de lactancia?', R4, [
      'piden carne para la sala de lactancia', 'necesito carne para usar la sala de lactancia',
    ]),
    e(130, '¿Puede acompañarme un familiar a la sala de lactancia?', R4, [
      'puede entrar un familiar conmigo a la sala de lactancia', 'puedo ir acompanada a la sala de lactancia',
    ]),
    e(131, '¿Qué requisitos de higiene piden para usar el área de lactancia?', R4, [
      'requisitos de higiene de la sala de lactancia', 'que higiene piden en la sala de lactancia',
    ]),
    e(132, '¿Una conferencista o docente visitante puede usar el espacio de lactancia?', R4, [
      'una docente visitante puede usar la sala de lactancia', 'soy conferencista puedo usar la sala de lactancia',
    ]),
    e(133, '¿Dónde está ubicada la Clínica ISSS-UCA para solicitar el ingreso?', R4, [
      'donde esta la clinica para la sala de lactancia', 'donde me registro en la clinica para lactar',
    ]),
    e(134, '¿Puedo usar la sala de lactancia si vengo a un trámite rápido?', R4, [
      'vengo a un tramite puedo usar la sala de lactancia', 'puedo usar la sala de lactancia solo un rato',
    ]),
    e(135, '¿Se debe hacer reserva previa para usar la sala de lactancia?', R4, [
      'hay que reservar la sala de lactancia', 'se reserva la sala de lactancia',
    ]),
    e(136, '¿Cuánto tiempo puedo permanecer en la sala de lactancia?', R4, [
      'cuanto tiempo puedo estar en la sala de lactancia siendo visitante', 'cuanto dura el uso de la sala de lactancia',
    ]),
    e(137, '¿La sala de lactancia está abierta los días sábados?', R4, [
      'la sala de lactancia abre los sabados', 'puedo usar la sala de lactancia un sabado',
    ]),
    e(138, '¿Registro Académico tiene llaves o acceso a la sala de lactancia?', R4, [
      'quien tiene las llaves de la sala de lactancia', 'registro tiene la llave de la sala de lactancia',
    ]),
    e(139, '¿Qué reglamento rige el uso de la sala de lactancia en la UCA?', R4, [
      'que reglamento aplica a la sala de lactancia para visitantes', 'reglas de la sala de lactancia para externas',
    ]),
    e(140, '¿Un hombre acompañante puede ingresar a la sala de lactancia?', R4, [
      'un hombre puede entrar a la sala de lactancia', 'mi esposo puede entrar a la sala de lactancia',
    ]),
    e(141, '¿Qué hago si la clínica está cerrada cuando necesito lactar?', R4, [
      'la clinica esta cerrada y necesito lactar', 'que hago si no hay nadie en la clinica para la sala de lactancia',
    ]),
    e(142, '¿Se permite la extracción de leche con sacaleches eléctrico en la sala?', R4, [
      'puedo usar sacaleches en la sala de lactancia', 'se permite extraer leche en la sala de lactancia',
    ]),
    e(143, '¿La sala cuenta con sillones cómodos y lavamanos?', R4, [
      'la sala de lactancia tiene sillones', 'hay lavamanos en la sala de lactancia',
    ]),
    e(144, '¿Pueden usar la sala las madres que asisten a seminarios en la UCA?', R4, [
      'vengo a un seminario puedo usar la sala de lactancia', 'las mamas que vienen a eventos pueden usar la sala de lactancia',
    ]),
    e(145, '¿Se requiere presentar el DUI en la clínica para el registro?', R4, [
      'piden dui para la sala de lactancia', 'necesito dui en la clinica para lactar',
    ]),
    e(146, '¿Hay límite de usos por día de la sala de lactancia para una visitante?', R4, [
      'cuantas veces al dia puedo usar la sala de lactancia', 'hay limite de usos de la sala de lactancia',
    ]),
    e(147, '¿Qué pasa si olvido un recipiente de leche en la refrigeradora de la sala?', R4, [
      'olvide mi leche en la refri de la sala de lactancia', 'deje un recipiente de leche en la sala de lactancia',
    ]),
    e(148, '¿Puedo pedir asistencia médica en la clínica mientras amamanto?', R4, [
      'puedo pedir ayuda medica mientras amamanto en la uca', 'me atienden en la clinica si estoy lactando',
    ]),
    e(149, '¿La sala de lactancia es exclusiva para estudiantes y empleadas?', R4, [
      'la sala de lactancia es solo para estudiantes', 'solo las empleadas pueden usar la sala de lactancia',
    ]),
    e(150, '¿Con quién me reporto al llegar a la clínica universitaria?', R4, [
      'con quien me reporto en la clinica para la sala de lactancia', 'a quien le aviso en la clinica que vengo a lactar',
    ]),

    // ── Cat. 5: Acceso vehicular, estacionamientos y seguridad (R5) ─────────
    e(151, '¿Dónde parqueo mi carro si voy de visita a la UCA?', R5, [
      'donde parqueo si voy de visita a la uca', 'donde dejo el carro si soy visitante', 'parqueo para visitantes',
      'hay parqueo para visitantes en la uca', 'donde estaciono si no soy estudiante',
    ]),
    e(152, '¿Cuánto cobran de parqueo a los visitantes en la universidad?', R5, [
      'cuanto cobran de parqueo a visitantes', 'cuanto cuesta el parqueo para visitantes', 'cuanto pago de parqueo si soy visitante',
      'tarifa de parqueo para externos',
    ]),
    e(153, '¿Por cuál portón entran los vehículos de personas particulares?', R5, [
      'por que porton entran los carros de visitantes', 'por donde entro en carro a la uca si soy visitante', 'porton para vehiculos de visitantes',
    ]),
    e(154, '¿Tengo que pagar parqueo si solo voy a dejar a un estudiante?', R5, [
      'tengo que pagar parqueo si solo voy a dejar a mi hijo', 'pago parqueo si solo dejo a alguien en la uca',
    ]),
    e(155, '¿Se puede pagar el ticket de estacionamiento con tarjeta?', R5, [
      'puedo pagar el ticket de parqueo con tarjeta siendo visitante', 'el tiquete de parqueo de visitante se paga con tarjeta',
    ]),
    e(156, '¿Qué pasa si se me pierde el comprobante del parqueo?', R5, [
      'perdi el tiquete del parqueo', 'se me perdio el ticket del parqueo de visitante',
    ]),
    e(157, '¿Registro Académico vende pases o stickers de parqueo para externos?', R5, [
      'registro vende stickers de parqueo para externos', 'donde compro pase de parqueo si soy externo',
    ]),
    e(158, '¿Los vehículos de visitantes están sujetos a revisión de seguridad?', R5, [
      'revisan los carros de los visitantes', 'hay revision de seguridad a los vehiculos de visitantes',
    ]),
    e(159, '¿Puedo dejar mi carro parqueado toda la noche en la UCA?', R5, [
      'puedo dejar el carro toda la noche en la uca', 'se puede dejar el carro de un dia para otro en la uca',
    ]),
    e(160, '¿Hay parqueo asignado para personas con discapacidad o visitantes de la tercera edad?', R5, [
      'hay parqueo para personas con discapacidad', 'parqueo para adultos mayores en la uca',
    ]),
    e(161, '¿Se puede ingresar en motocicleta siendo visitante?', R5, [
      'puedo entrar en moto a la uca siendo visitante', 'dejan entrar motos de visitantes',
    ]),
    e(162, '¿A qué hora cierran los portones vehiculares del campus?', R5, [
      'a que hora cierran los portones de carros', 'hasta que hora puedo sacar el carro de la uca',
    ]),
    e(163, '¿Dónde se paga el ticket de parqueo antes de salir?', R5, [
      'donde pago el tiquete de parqueo de visitante', 'donde se paga el parqueo antes de salir',
    ]),
    e(164, '¿Puedo solicitar factura a nombre de mi empresa por el parqueo?', R5, [
      'me dan factura del parqueo', 'puedo pedir factura por el parqueo',
    ]),
    e(165, '¿Hay estacionamiento para autobuses de visitas escolares o delegaciones?', R5, [
      'donde se parquea un bus de colegio', 'hay parqueo para buses de visitas',
    ]),
    e(166, '¿La universidad se hace responsable por daños o robos en el parqueo?', R5, [
      'la uca responde si me roban en el parqueo', 'quien responde si le pasa algo a mi carro en el parqueo',
    ]),
    e(167, '¿Puedo entrar en taxi o transporte de aplicación al campus?', R5, [
      'puede entrar un uber a la uca', 'puedo entrar en taxi a la uca', 'el uber me puede dejar adentro de la uca',
    ]),
    e(168, '¿Qué velocidad máxima se permite para conducir dentro de la UCA?', R5, [
      'velocidad maxima dentro de la uca', 'a cuanto se puede manejar dentro del campus',
    ]),
    e(169, '¿Se puede reservar un espacio de parqueo para una reunión importante?', R5, [
      'puedo reservar parqueo para una reunion', 'se puede apartar un espacio de parqueo',
    ]),
    e(170, '¿Hay cargadores para vehículos eléctricos disponibles para visitantes?', R5, [
      'hay cargadores para carros electricos en la uca', 'puedo cargar mi carro electrico en la uca',
    ]),
    e(171, '¿Los vigilantes me indican dónde estacionarme?', R5, [
      'los vigilantes me dicen donde parquear', 'quien me dice donde estacionarme en la uca',
    ]),
    e(172, '¿Puedo ingresar en camión de carga si voy a entregar mercadería?', R5, [
      'puede entrar un camion a entregar mercaderia', 'por donde entra un camion de carga a la uca',
    ]),
    e(173, '¿Registro Académico autoriza pases de parqueo especial?', R5, [
      'quien autoriza pases de parqueo especial', 'registro da permisos especiales de parqueo',
    ]),
    e(174, '¿Se aplica multa si me parqueo en lugar prohibido dentro del campus?', R5, [
      'me multan si me parqueo mal en la uca', 'hay multa por parquearse en lugar prohibido',
    ]),
    e(175, '¿Es necesario mostrar el DUI al ingresar en vehículo por el portón?', R5, [
      'piden dui si entro en carro a la uca', 'tengo que mostrar el dui si entro en carro',
    ]),

    // ── Cat. 6: Eventos, audiovisuales y convivencia (R6) ───────────────────
    e(176, '¿Cómo pido permiso para entrar a tomar fotos o grabar para un proyecto privado?', R6, [
      'soy externo y quiero grabar en la uca', 'como pido permiso para grabar en la uca si no soy estudiante',
      'quiero tomar fotos en la uca para un proyecto privado',
    ]),
    e(177, '¿Puedo asistir a un foro o conferencia abierta al público sin ser alumno?', R6, [
      'puedo ir a una conferencia en la uca sin ser alumno', 'los foros de la uca son abiertos al publico', 'puedo asistir a eventos de la uca si no estudio ahi',
    ]),
    e(178, '¿Dónde gestiono el permiso para que ingrese un grupo de estudiantes de colegio?', R6, [
      'como llevo a mi grupo del colegio a la uca', 'permiso para que entre un grupo de colegio', 'quiero llevar a mis alumnos de colegio a la uca',
    ]),
    e(179, '¿Se permite el ingreso de mascotas al campus con personas externas?', R6, [
      'puedo entrar con mi perro a la uca', 'se permiten mascotas en la uca', 'puedo llevar a mi mascota a la uca',
      'dejan entrar perros a la universidad', 'puedo meter a mi perro a la uca', 'puedo entrar con mi gato', 'se puede llevar mascota al campus',
    ]),
    e(180, '¿Registro Académico aprueba las solicitudes para eventos académicos de externos?', R6, [
      'quien aprueba eventos de externos en la uca', 'donde pido permiso para un evento en la uca',
    ]),
    e(181, '¿Qué normas de comportamiento debe seguir un visitante dentro del campus?', R6, [
      'que normas sigue un visitante en la uca', 'reglas para visitantes en la uca', 'como debe comportarse un visitante',
    ]),
    e(182, '¿Se puede fumar o vapear en las zonas al aire libre de la UCA?', R6, [
      'un visitante puede fumar en la uca', 'se puede vapear en la uca siendo visitante',
    ]),
    e(183, '¿Puedo vender productos o artesanías dentro de la UCA siendo externo?', R6, [
      'puedo vender cosas en la uca si soy externo', 'puedo vender artesanias en la uca', 'un externo puede vender en el campus',
    ]),
    e(184, '¿Qué sanciones aplican si un visitante altera el orden en el recinto?', R6, [
      'que pasa si un visitante hace desorden', 'sanciones para visitantes en la uca',
    ]),
    e(185, '¿Puedo usar las canchas deportivas si no soy estudiante de la UCA?', R6, [
      'puedo usar las canchas si no soy estudiante', 'un externo puede jugar en las canchas de la uca', 'puedo ir a jugar futbol a la uca sin ser alumno',
    ]),
    e(186, '¿A dónde acudo si tengo una emergencia médica durante mi visita?', R6, [
      'que hago si tengo una emergencia medica de visita en la uca', 'a donde voy si me siento mal visitando la uca',
    ]),
    e(187, '¿Se permite la entrada de alimentos y bebidas traídos de fuera?', R6, [
      'puedo entrar con comida a la uca', 'se puede meter comida de afuera a la uca',
    ]),
    e(188, '¿Qué pasa si un visitante comete una falta grave dentro del campus?', R6, [
      'que pasa si un visitante comete una falta grave', 'un visitante puede ser sancionado',
    ]),
    e(189, '¿Se pueden realizar volanteos o entregar publicidad en los pasillos?', R6, [
      'puedo repartir volantes en la uca', 'se puede hacer publicidad en la uca',
    ]),
    e(190, '¿Puedo acompañar a un amigo a hacer su trámite de graduación?', R6, [
      'puedo acompanar a un amigo a un tramite en la uca', 'puedo ir con mi amigo a su tramite de graduacion',
    ]),
    e(191, '¿Hay visitas guiadas del campus para futuros aspirantes a la universidad?', R6, [
      'hay visitas guiadas en la uca', 'puedo hacer un tour por la uca', 'tours para aspirantes en la uca',
    ]),
    e(192, '¿El personal de seguridad puede pedirme que me retire del campus?', R6, [
      'seguridad me puede sacar de la uca', 'los vigilantes me pueden pedir que me vaya',
    ]),
    e(193, '¿Puedo entrar a la capilla o templo universitario libremente?', R6, [
      'puedo entrar a la capilla de la uca', 'puedo ir a misa a la uca',
    ]),
    e(194, '¿Dónde reporto la pérdida de un objeto personal durante mi visita?', R6, [
      'perdi algo en mi visita a la uca donde lo reporto', 'donde reporto algo que perdi en la uca',
    ]),
    e(195, '¿En qué oficina del Edificio de Administración Central se solicitan permisos colectivos?', R6, [
      'donde se piden permisos colectivos', 'en que oficina se piden los permisos para grupos',
    ]),
    e(196, '¿Un visitante puede ingresar ebrio o bajo el efecto de sustancias?', R6, [
      'puede entrar un visitante borracho', 'un visitante puede entrar bajo efectos de drogas',
    ]),
    e(197, '¿Se puede usar la piscina o gimnasio universitario pagando una cuota?', R6, [
      'puedo usar el gimnasio de la uca', 'hay piscina en la uca', 'puedo pagar para usar el gimnasio de la uca',
    ]),
    e(198, '¿Puedo llevar una pancarta para una manifestación dentro del campus?', R6, [
      'puedo hacer una manifestacion en la uca', 'puedo llevar pancartas a la uca',
    ]),
    e(199, '¿La UCA se reserva el derecho de admisión de personas particulares?', R6, [
      'la uca se reserva el derecho de admision', 'me pueden negar la entrada a la uca',
    ]),
    e(200, '¿Con cuánta anticipación debo pedir permiso para una grabación en el campus?', R6, [
      'con cuanto tiempo pido permiso para grabar en la uca', 'cuantos dias antes pido permiso para una grabacion',
      'con cuanta anticipacion se pide un permiso en administracion central',
    ]),

    // ── Guía para presentar solicitudes en Administración Central (sección 4) ──
    {
      id: 'E201',
      question: '¿Cómo presento una solicitud especial de ingreso en Administración Central?',
      answer:
        'Para una gestión especial de ingreso (visitas de colegios, delegaciones, uso de áreas públicas o proyectos audiovisuales):\n1. Redacta una nota formal dirigida a Administración Central con los nombres completos y el número de DUI o pasaporte de los visitantes, la fecha, el horario propuesto y el motivo de la visita.\n2. Entrégala en las oficinas administrativas principales del Edificio de Administración Central con al menos 5 días hábiles de anticipación.\n3. Cuando la solicitud se autoriza, Administración Central envía la orden de pase a los portones de acceso para agilizar el ingreso.',
      variants: [
        'como hago la solicitud de ingreso en administracion central', 'como pido permiso para una visita a la uca',
        'pasos para pedir permiso de ingreso a la uca', 'que pongo en la nota para administracion central',
        'como pido un pase de ingreso para visitantes', 'como solicito una visita de colegio',
        'como hago para que dejen entrar a mis invitados', 'como pido permiso para una delegacion',
      ],
    },
  ],
}
