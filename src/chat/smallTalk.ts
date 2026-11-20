import type { Reply } from '@/types/chat'
import { skillsFor } from './guest'

export const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

export const TOPIC_HINT =
  /tramite|constancia|certificad|nota|carnet|reserv|sala|cubiculo|tablet|prestamo|renov|fecha|cuando|calendario|periodo|reglamento|regla|edificio|magna|aula|modulo|auditorio|donde|ubicacion|telefono|llamar|contacto|atencion|directorio|solicitud|inscrip|retiro|multimedia|radio|ciclorama|taller|estudio/

// guest: en modo invitado, Toko solo ofrece lo que el invitado puede usar.
export function smallTalk(text: string, guest = false): Reply | null {
  if (!text || text.split(' ').length > 8) return null
  const skills = skillsFor(guest)
  const is = (pattern: RegExp) => pattern.test(text)

  const greet = is(
    /(^| )(hola+|holi+|hey+|ey|ola|buenas|buenos dias|buen dia|buenas tardes|buenas noches|que onda|saludos|hello|hi)( |$)/,
  )
  const how = is(
    /(como (estas|andas|te va|te encuentras|te sientes|amaneciste|va tu dia)|que tal( estas| andas| tu dia| todo)?)( |$)/,
  )
  const feelGood = is(
    /^(bien|muy bien|bastante bien|estoy bien|todo bien|excelente|super bien|de maravilla|todo excelente)( gracias| y tu| y usted)?$/,
  )
  const feelBad = is(
    /(estoy|ando|me siento|me encuentro) (mal|cansad[oa]|estresad[oa]|agobiad[oa]|triste|preocupad[oa]|abrumad[oa])/,
  )
  const thanks = is(/gracias|agradezco|muy amable|thank/)
  const please = is(/^(por favor|porfa|porfavor|pls|please)$/)
  const bye = is(
    /(^| )(adios|chao|chau|bye|hasta luego|hasta pronto|nos vemos|me voy|cuidate|hasta manana)( |$)/,
  )
  const who = is(
    /(quien eres|que eres|como te llamas|cual es tu nombre|tu nombre|eres (un )?(robot|bot|ia|humano|persona|real))/,
  )
  const can = is(
    /(que puedes hacer|en que me (ayudas|puedes ayudar)|en que puedes ayudar|para que sirves|que sabes|que haces|como me ayudas|necesito ayuda|ayudame|me ayudas|puedes ayudarme|como funcionas|no se que preguntar|por donde empiezo|^(ayuda|opciones|menu)$)/,
  )
  const upset = is(
    /(no sirves|no entiendes|eres (un )?inutil|que mal|esto no funciona|no funcionas|ya me canse|no me ayudas|no me sirve|pesimo|que malo)/,
  )
  const praise = is(
    /(eres (muy |super |re )?(genial|bueno|util|increible|lindo|amable|el mejor|crack|inteligente|rapido)|buen trabajo|me ayudaste|me encantas|me caes bien|te quiero|bien hecho|que bien)/,
  )
  const ack = is(
    /^(ok|okay|oki|vale|listo|entendido|de acuerdo|perfecto|genial|excelente|super|dale|sale|va|claro|ya|entiendo|ah ok)$/,
  )
  const sorry = is(/(perdon|disculpa|lo siento|perdona)/)
  const joke = is(/(chiste|hazme reir|algo gracioso)/)
  const today = is(/(que dia es|a que dia estamos|a cuanto estamos)/)
  // Solo "¿qué hora es?", no "a la hora del parcial"
  const clock = is(/(^| )que hora es|^(dime|me dices|me das|sabes) la hora/)

  const hi = text.includes('buenos dias')
    ? '¡Buenos días!'
    : text.includes('buenas tardes')
      ? '¡Buenas tardes!'
      : text.includes('buenas noches')
        ? '¡Buenas noches!'
        : '¡Hola!'

  if (today) {
    const date = new Date().toLocaleDateString('es-SV', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    return { text: `Hoy es ${date}.` }
  }
  if (clock) {
    const time = new Date().toLocaleTimeString('es-SV', { hour: 'numeric', minute: '2-digit' })
    return { text: `Ahora mismo son las ${time}.` }
  }
  if (joke) {
    return {
      text: pick([
        '¿Por qué el estudiante llevó una escalera a la biblioteca? Porque quería subir sus notas.',
        '¿Qué le dice un estudiante a su laptop en época de parciales? "No me falles ahora".',
        '¿Cuál es el colmo de un estudiante de diseño? Que le pidan "algo sencillo" y que sea para ayer.',
      ]),
    }
  }
  if (who) {
    return {
      text: `Soy Toko, tu asistente UCA. Te ayudo con ${skills}.`,
    }
  }
  if (can) {
    return {
      text: `Con gusto. Puedo ayudarte con ${skills}. Cuéntame qué necesitas o mira los ejemplos en la pestaña Ayuda.${guest ? ' Para trámites, reservas y el calendario académico necesitas una cuenta UCA.' : ''}`,
    }
  }
  if (upset) {
    return {
      text: 'Lo siento, no logré ayudarte como esperabas. Intenta escribir tu pregunta con otras palabras, por ejemplo "¿cuántas horas de servicio social son?". Si prefieres hablar con una persona, escribe "contacto" y te doy los datos de atención de la UCA.',
    }
  }
  if (feelBad) {
    return {
      text: 'Lamento oírlo. Ánimo, tú puedes con esto. Si algo de la universidad te está agobiando, cuéntame y vemos cómo resolverlo juntos.',
    }
  }
  if (feelGood) {
    return {
      text: pick([
        '¡Qué gusto! Me alegra saberlo. Cuando quieras, cuéntame en qué te puedo ayudar.',
        '¡Excelente! Así da gusto trabajar. ¿En qué te ayudo hoy?',
      ]),
    }
  }
  if (how) {
    const lead = greet ? `${hi} ` : ''
    return {
      text:
        lead +
        pick([
          '¡Muy bien, gracias por preguntar! Estoy aquí para ayudarte con lo que necesites de la UCA. ¿Y tú, cómo estás?',
          `Todo muy bien por acá, listo para ayudarte con ${skills}. ¿Y tú, cómo vas?`,
          '¡Muy bien, gracias! Con ganas de ayudarte en lo que necesites. ¿Y tú, cómo estás?',
        ]),
    }
  }
  if (thanks && bye) {
    return { text: '¡Con gusto! Hasta pronto, aquí estaré cuando me necesites.' }
  }
  if (thanks) {
    return {
      text: pick([
        '¡Con gusto! Si necesitas algo más, aquí estoy.',
        '¡De nada! Para eso estoy. Dime si te ayudo con algo más.',
        '¡Un placer ayudarte! Cualquier otra duda, me avisas.',
      ]),
    }
  }
  if (bye) {
    return {
      text: pick([
        '¡Hasta pronto! Cuando necesites algo de la UCA, aquí me tienes.',
        '¡Nos vemos! Que te vaya muy bien.',
      ]),
    }
  }
  if (please) {
    return { text: 'Claro, dime qué necesitas y con gusto te ayudo.' }
  }
  if (sorry) {
    return { text: 'No te preocupes, no pasa nada. ¿En qué te puedo ayudar?' }
  }
  if (praise) {
    return {
      text: pick([
        '¡Gracias, me alegra mucho! Aquí sigo por si necesitas algo más.',
        '¡Qué lindo! Gracias. Cuando quieras, seguimos.',
      ]),
    }
  }
  if (ack) {
    return {
      text: pick([
        '¡Perfecto! Cuando quieras, dime qué más necesitas.',
        '¡Listo! Aquí sigo para lo que necesites.',
      ]),
    }
  }
  if (greet) {
    return {
      text: pick([
        `${hi} Qué gusto saludarte. ¿En qué te puedo ayudar hoy?`,
        `${hi} Aquí estoy para ayudarte con ${skills}. ¿Qué necesitas?`,
        `${hi} ¿Cómo te puedo ayudar hoy?`,
      ]),
    }
  }
  return null
}
