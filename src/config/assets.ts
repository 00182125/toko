// Carpeta única de los íconos e ilustraciones: public/assets/icons.
// Todo ícono nuevo va siempre ahí.
// BASE_URL es "/" en desarrollo y "/toko/" en GitHub Pages (ver vite.config.ts).
export const ASSETS_PATH = `${import.meta.env.BASE_URL}assets/icons`

// Devuelve la ruta completa de un archivo: assetUrl('d2168.svg') -> '/toko/assets/icons/d2168.svg'
export const assetUrl = (name: string) => `${ASSETS_PATH}/${name}`

// Fotos de los edificios, optimizadas para web (public/assets/edificios).
export const photoUrl = (name: string) => `${import.meta.env.BASE_URL}assets/edificios/${name}`
