// Carpeta donde viven las ilustraciones y los íconos (public/assets).
// BASE_URL es "/" en desarrollo y "/toko/" en GitHub Pages (ver vite.config.ts).
export const ASSETS_PATH = `${import.meta.env.BASE_URL}assets`

// Devuelve la ruta completa de un archivo: assetUrl('d2168.svg') -> '/toko/assets/d2168.svg'
export const assetUrl = (name: string) => `${ASSETS_PATH}/${name}`
