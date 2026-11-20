// Easter egg: el equipo detrás de Toko ("Toko_easter_egg_equipo.pdf").
// Si alguien escribe el nombre (completo, parcial o apodo) de una de las 4 personas,
// Toko responde con un texto corto y cómico sobre su rol. No aparece en Ayuda ni en atajos.
//
// Palabras (ya normalizadas: minúsculas y sin tildes):
//  distinctive: activan siempre y ganan sobre el resto del chat (apellidos poco comunes)
//  names: el nombre de pila; activa en cualquier mensaje ("cuéntame de rodrigo")
//  common: nombres comunes; solo activan en mensajes cortos sin otros temas de la app
//    ("javier", "romero", "alejandro", "rosa")
export type TeamMemberId = 'rodrigo' | 'rafael' | 'gaby_alvarado' | 'gaby_alfaro'

export type TeamMember = {
  id: TeamMemberId
  distinctive: string[]
  names: string[]
  common: string[]
  text: string
}

// Apodos: valen lo mismo que el nombre al que reemplazan.
export const NICKNAMES: Record<string, string> = {
  rodri: 'rodrigo',
  javi: 'javier',
  rafa: 'rafael',
  rafiel: 'rafael',
  gaby: 'gabriela',
  gabi: 'gabriela',
  gabys: 'gabriela',
  gabis: 'gabriela',
}

export const teamMembers: TeamMember[] = [
  {
    id: 'rodrigo',
    distinctive: ['minero', 'dubon'],
    names: ['rodrigo'],
    common: ['javier'],
    text: 'Ah, preguntas por Rodrigo Javier Minero Dubón, programador oficial de Toko y responsable de que cada botón haga lo que dice (casi siempre). Es el encargado del código, así que si algo funciona fue obra suya. Si algo falla... también. Eso sí, las malas lenguas dicen que lo hizo todo con Claude. Él lo niega. Yo no digo nada, solo observo que escribe código muy rápido para alguien que se queja tanto del código. Su frase favorita: "en mi computadora sí funcionaba".',
  },
  {
    id: 'rafael',
    distinctive: ['cabezas'],
    names: ['rafael'],
    common: ['alejandro', 'romero'],
    text: 'Rafael Alejandro Cabezas Romero, el fotógrafo del equipo. Cada foto de edificio que ves por aquí pasó antes por su cámara y por su ojo de águila. Además de fotógrafo, fue el jefe de producción visual y de logística de nuestra pequeña agencia, así que siempre tenía que saber dónde estar, a qué hora y con qué luz. Es capaz de esperar 40 minutos a que se vaya una nube del encuadre perfecto, y dos minutos para decidir dónde almorzar. Y tiene fama de ser la persona más fiel del mundo, tanto que en algunos lugares lo conocen como Rafiel.',
  },
  {
    id: 'gaby_alvarado',
    // "de la rosa" se trata como la palabra "rosa"
    distinctive: ['alvarado'],
    names: [],
    common: ['rosa'],
    text: 'Gabriela Alejandra Alvarado de la Rosa es la mente visual de Toko. Diseñó mi logo, me dibujó como búho y además diseñó toda la interfaz y la experiencia de usuario, desde cada pantalla hasta cada botón. Si tengo estos ojitos y esta carita simpática, y si todo está justo donde lo esperas, es gracias a ella. Cualquier cosa que se vea rara no fue ella, seguramente fue el programador. Dicen que ve tipografías torcidas hasta en los letreros de la calle, y que no puede evitarlo.',
  },
  {
    id: 'gaby_alfaro',
    distinctive: ['alfaro', 'marmol'],
    names: [],
    common: [],
    text: 'Gabriela Alejandra Alfaro Mármol es la contadora del equipo. Hizo el presupuesto de Toko, se encargó de los números y cuidó que el proyecto fuera rentable, porque alguien tenía que hacer las cuentas mientras los demás pedían más café. Y sí, el equipo tiene dos Gabrielas Alejandras, así que cuando alguien grita "Gaby", las dos voltean. Pero ojo con lo que se dice por ahí, porque dicen que es una famosa basquetbolista reconocida a nivel mundial. Un día juega una final internacional y al siguiente está cuadrando el presupuesto a las 2 de la mañana.',
  },
]

// Las dos se llaman Gabriela Alejandra: sin apellido, Toko pregunta a cuál se refiere.
export const GABY_WORDS = ['gabriela', 'alejandra']

export const GABY_QUESTION =
  '¿A cuál Gaby te refieres? En el equipo hay dos, Gabriela Alvarado, la del logo, el búho y la interfaz, y Gabriela Alfaro, la del presupuesto. Elige una, o dime "las dos".'

// Botones rápidos bajo la pregunta
export const GABY_OPTIONS = ['Gabriela Alvarado', 'Gabriela Alfaro', 'Las dos']

export const BOTH_GABYS_TEXT =
  'Las dos Gabys. Gabriela Alvarado me dibujó, me puso logo, me dio cara de búho y diseñó cada pantalla y cada botón, y Gabriela Alfaro hizo el presupuesto y cuidó que el proyecto saliera rentable. Entre las dos tienen cuatro nombres iguales y cero confusiones (eso dicen). Y mientras una dibuja búhos, la otra, según los rumores, cuadra cuentas entre partido y partido de su gira mundial de basquetbol.'

// Resumen del equipo (respuesta a "¿quién te hizo?", "¿quiénes son tus creadores?"...)
export const TEAM_SUMMARY =
  'Me hizo un equipo pequeño con mucha paciencia, con Rodrigo en el código (dicen que con ayuda de Claude, pero él lo niega), Rafael en fotografía y producción visual, Gabriela Alvarado en el logo, el búho y el diseño de la interfaz, y Gabriela Alfaro en el presupuesto. Pregúntame por cualquiera de ellos y te cuento más.'
