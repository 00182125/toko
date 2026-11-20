// Carpeta donde viven las ilustraciones y los íconos (public/assets).
export const ASSETS_PATH = '/assets'

// Devuelve la ruta completa de un archivo: assetUrl('d2168.svg') -> '/assets/d2168.svg'
export const assetUrl = (name: string) => `${ASSETS_PATH}/${name}`
