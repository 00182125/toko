// Directorio institucional UCA (Figma → Componentes → "cards Atención al cliente").
// Cada entrada es una tarjeta del chat. Para agregar una oficina o persona, copia una entrada.
//  title: título de la tarjeta · description: texto gris debajo
//  phone: tal como se muestra ("2210-6644 ext. 243"); el botón "Llamar" marca el primer número
//  email / web: si faltan, esa fila no aparece
//  aliases: formas en que la gente nombra la oficina (minúsculas y sin tildes).
//    strong: bastan solas ("admisiones", "rectoria").
//    weak: solo cuentan si además se pide un contacto ("telefono de ciencias sociales"),
//      porque también son temas del reglamento ("maestria", "ciencias sociales").

export type DirectoryEntry = {
  id: string
  kind: 'office' | 'person'
  title: string
  description: string
  phone?: string
  email?: string
  web?: string
  aliases: { strong: string[]; weak?: string[] }
}

export const directory: DirectoryEntry[] = [
  {
    id: 'admisiones',
    kind: 'office',
    title: 'Directorio · Admisiones',
    description: 'Conoce los pasos de inscripción, la oferta académica, las becas y los requisitos de nuevo ingreso.',
    phone: '2210-6644',
    email: 'admisiones@uca.edu.sv',
    // El Figma no trae el enlace de Admisiones (dice "https://"): se oculta la fila hasta tenerlo.
    aliases: { strong: ['admisiones', 'admision'], weak: ['nuevo ingreso', 'primer ingreso'] },
  },
  {
    id: 'cae',
    kind: 'office',
    title: 'Directorio · CAE',
    // En el Figma: "Consejo de Asusntos estudiantiles". Se corrige según el correo y la página del CAE.
    description: 'Centro de Asuntos Estudiantiles. Formación, expresión y apoyo para organizaciones estudiantiles.',
    phone: '2210-6653',
    email: 'centro.asuntosestudiantiles@uca.edu.sv',
    web: 'https://uca.edu.sv/vida-estudiantil/asociaciones-movimientos/centro-de-asuntos-estudiantiles/',
    aliases: { strong: ['=cae', 'asuntos estudiantiles'] },
  },
  {
    id: 'cuotas',
    kind: 'office',
    title: 'Directorio · Cuotas diferenciadas',
    description: 'Consultas y gestión sobre cuotas y ajustes en el costo de tu matrícula.',
    phone: '2210-6644 ext. 243',
    email: 'cuotas.diferenciadas@uca.edu.sv',
    web: 'https://www.uca.edu.sv/personal/',
    aliases: { strong: ['cuotas diferenciadas', 'cuota diferenciada'], weak: ['cuotas', 'cuota'] },
  },
  {
    id: 'dcee',
    kind: 'office',
    title: 'Directorio · DCEE',
    description:
      'Decanato de Ciencias Económicas y Empresariales. Atención académica para estudiantes de las carreras de economía y negocios.',
    phone: '2210-6632 ext. 632 y 634',
    email: 'decanato.cceconomicasyempresariales@uca.edu.sv',
    web: 'https://www.uca.edu.sv/personal/',
    aliases: {
      strong: ['=dcee', 'ciencias economicas', 'decanato de economia'],
      weak: ['economia', 'empresariales', 'negocios'],
    },
  },
  {
    id: 'dcsh',
    kind: 'office',
    title: 'Directorio · DCSH',
    description:
      'Decanato de Ciencias Sociales y Humanidades. Atención académica para estudiantes de las carreras de ciencias sociales y humanidades.',
    phone: '2210-6644 ext. 202 y 252',
    email: 'decanato.ccsocialesyhumanidades@uca.edu.sv',
    web: 'https://www.uca.edu.sv/personal/',
    aliases: { strong: ['=dcsh', 'decanato de ciencias sociales'], weak: ['ciencias sociales', 'humanidades'] },
  },
  {
    id: 'dia',
    kind: 'office',
    title: 'Directorio · DIA',
    description:
      'Decanato de Ingeniería y Arquitectura. Atención académica para estudiantes de las carreras de ingeniería y arquitectura.',
    phone: '2210-6644 ext. 250',
    email: 'decanato.ingenieriayarquitectura@uca.edu.sv',
    web: 'https://www.uca.edu.sv/personal/',
    // "dia" sola no: se confunde con "día".
    aliases: { strong: ['decanato de ingenieria', 'ingenieria y arquitectura'], weak: ['ingenieria', 'arquitectura'] },
  },
  {
    id: 'postgrados',
    kind: 'office',
    title: 'Directorio · Decanato de Postgrados',
    description: 'Información y trámites de maestrías y programas de postgrado.',
    phone: '2210-6644 ext. 473',
    email: 'decanato.postgrados@uca.edu.sv',
    web: 'https://www.uca.edu.sv/personal/',
    aliases: {
      strong: ['decanato de postgrado', 'decanato de posgrado'],
      weak: ['postgrado', 'posgrado', 'maestria', 'doctorado'],
    },
  },
  {
    id: 'cfc',
    kind: 'office',
    title: 'Directorio · CFC',
    // En el Figma: "Centro de información Continua". Se corrige según el correo (formación continua).
    description: 'Centro de Formación Continua. Cursos, diplomados y capacitaciones para ampliar tu formación profesional.',
    phone: '2254-9700',
    email: 'centro.formacioncontinua@uca.edu.sv',
    web: 'https://www.uca.edu.sv/personal/',
    aliases: { strong: ['=cfc', 'formacion continua', 'diplomado'], weak: ['cursos', 'capacitaciones'] },
  },
  {
    id: 'vigilancia',
    kind: 'office',
    title: 'Directorio · Unidad de Vigilancia',
    description: 'Seguridad del campus. Contacto para reportar incidentes y emergencias.',
    phone: '2210-6644 ext. 1181',
    email: 'seguridad@uca.edu.sv',
    web: 'https://www.uca.edu.sv/personal/',
    aliases: { strong: ['vigilancia', 'seguridad del campus', 'guardias', 'vigilantes'], weak: ['seguridad'] },
  },
  {
    id: 'uim',
    kind: 'office',
    title: 'Directorio · UIM',
    description: 'Unidad de Infraestructura y Mantenimiento. Reportes de mantenimiento y atención a instalaciones del campus.',
    phone: '2210-6676 ext. 430',
    web: 'https://www.uca.edu.sv/personal/',
    aliases: { strong: ['=uim', 'mantenimiento', 'infraestructura'] },
  },
  {
    id: 'ucft',
    kind: 'office',
    title: 'Directorio · UCFT',
    description: 'Unidad de Control Financiero y Tesorería. Consultas sobre pagos, cobros y estados de cuenta.',
    phone: '2210-6600 ext. 225, 238, 483 y 461',
    web: 'https://www.uca.edu.sv/personal/',
    aliases: {
      strong: ['=ucft', 'tesoreria', 'control financiero', 'estado de cuenta'],
      weak: ['pagos', 'cobros', 'colecturia'],
    },
  },
  {
    id: 'rectoria',
    kind: 'office',
    title: 'Directorio · Rectoría',
    description: 'Oficina de la máxima autoridad de la universidad para asuntos institucionales.',
    phone: '2210-6620 ext. 620',
    email: 'rectoria@uca.edu.sv',
    web: 'https://www.uca.edu.sv/personal/',
    aliases: { strong: ['rectoria', 'rector'] },
  },
  {
    id: 'comunicaciones',
    kind: 'office',
    title: 'Directorio · Dirección de Comunicaciones',
    description: 'Comunicación institucional, noticias y difusión de actividades de la universidad.',
    phone: '2210-6648 ext. 256 y 257',
    email: 'direccion.comunicaciones@uca.edu.sv',
    web: 'https://www.uca.edu.sv/personal/',
    aliases: { strong: ['direccion de comunicaciones', 'comunicacion institucional'], weak: ['noticias', 'prensa'] },
  },
  {
    id: 'clinica',
    kind: 'office',
    title: 'Directorio · Clínica ISSS UCA',
    description: 'Atención médica para estudiantes y personal con cobertura del ISSS.',
    phone: '2210-6600 ext. 260',
    aliases: { strong: ['=isss', 'clinica', 'medico', 'enfermeria'] },
  },
  {
    id: 'erick-alcides',
    kind: 'person',
    title: 'Erick Alcides',
    description: 'Licenciatura en Diseño',
    email: 'eamartinezc@uca.edu.sv',
    aliases: { strong: ['erick alcides', 'erick'] },
  },
  {
    id: 'celina-andino',
    kind: 'person',
    title: 'Celina Andino',
    description: 'Licenciatura en Diseño',
    email: 'candino@uca.edu.sv',
    aliases: { strong: ['celina andino', 'celina'] },
  },
  {
    id: 'pedro-sorto',
    kind: 'person',
    title: 'Pedro Sorto',
    description: 'Licenciatura en Diseño',
    email: 'psorto@uca.edu.sv',
    aliases: { strong: ['pedro sorto', 'sorto'] },
  },
]

// Número para el botón "Llamar": el primero de la tarjeta, con el código de El Salvador.
export const telHref = (phone: string) => `tel:+503${phone.replace(/\D/g, '').slice(0, 8)}`
