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
    text: 'Rafael Alejandro Cabezas Romero, el fotógrafo del equipo. Cada foto de edificio que ves por aquí pasó antes por su cámara y por su ojo de águila. Además de fotógrafo, fue el jefe de producción visual y de logística de nuestra pequeña agencia: tenía que saber dónde estar, a qué hora y con qué luz. Es capaz de esperar 40 minutos a que se vaya una nube del encuadre perfecto, y dos minutos para decidir dónde almorzar. Dicen que ve todo el mundo en formato horizontal y que a veces se le olvida soltar la cámara para comer.',
  },
  {
    id: 'gaby_alvarado',
    // "de la rosa" se trata como la palabra "rosa"
    distinctive: ['alvarado'],
    names: [],
    common: ['rosa'],
    text: 'Gabriela Alejandra Alvarado de la Rosa es la mente visual de Toko. Diseñó mi logo, me dibujó como búho y creó casi todo lo que ves bonito por aquí. También diseñó la interfaz, junto con la otra Gabriela. Si tengo estos ojitos y esta carita simpática, es gracias a ella. Cualquier cosa que se vea rara no fue ella: seguramente fue el programador. Dicen que ve tipografías torcidas hasta en los letreros de la calle, y que no puede evitarlo.',
  },
  {
    id: 'gaby_alfaro',
    distinctive: ['alfaro', 'marmol'],
    names: [],
    common: [],
    text: 'Gabriela Alejandra Alfaro Mármol diseñó la interfaz de Toko junto con Gabriela Alvarado: pantallas, tarjetas, botones y que todo quede en su lugar. Si las tarjetas se ven ordenadas y el botón está donde esperas, es trabajo suyo. Y sí, el equipo tiene dos Gabrielas Alejandras. Ya se acostumbraron: cuando alguien grita "Gaby", las dos voltean. Pero ojo con lo que se dice por ahí: que Gabriela Alfaro es una famosa basquetbolista reconocida a nivel mundial, y que le cuesta muchísimo llevar esas dos vidas. Un día juega una final internacional y al siguiente está alineando botones a las 2 de la mañana. Dicen que cada vez que un componente le queda perfecto, lo celebra con una triple.',
  },
]

// Las dos se llaman Gabriela Alejandra: sin apellido, Toko pregunta a cuál se refiere.
export const GABY_WORDS = ['gabriela', 'alejandra']

export const GABY_QUESTION =
  '¿A cuál Gaby te refieres? En el equipo hay dos: Gabriela Alvarado, la del logo, el búho y los visuales, y Gabriela Alfaro, la de la interfaz. Elige una, o dime "las dos".'

// Botones rápidos bajo la pregunta
export const GABY_OPTIONS = ['Gabriela Alvarado', 'Gabriela Alfaro', 'Las dos']

export const BOTH_GABYS_TEXT =
  'Las dos Gabys: Gabriela Alvarado me dibujó, me puso logo y me dio cara de búho, y Gabriela Alfaro acomodó cada pantalla, tarjeta y botón para que yo no me vea desordenado. Juntas forman el equipo de diseño de Toko. Entre las dos, tienen cuatro nombres iguales y cero confusiones (eso dicen). Y mientras una dibuja búhos, la otra, según los rumores, anda de gira mundial con una pelota de basquetbol.'

// Resumen del equipo (respuesta a "¿quién te hizo?", "¿quiénes son tus creadores?"...)
export const TEAM_SUMMARY =
  'Me hizo un equipo pequeño con mucha paciencia: Rodrigo en el código (dicen que con ayuda de Claude, pero él lo niega), Rafael en fotografía y producción visual, Gabriela Alvarado en logo, búho y visuales, y Gabriela Alfaro en el diseño de la interfaz. Pregúntame por cualquiera de ellos y te cuento más.'
