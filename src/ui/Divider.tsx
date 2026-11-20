// Línea fina que separa contenido. El nombre cambia el espaciado:
// 'info' (dentro de tarjetas), 'settings' (entre filas de ajustes), 'building' (tarjeta de edificio).
export function Divider({ variant }: { variant: 'info' | 'settings' | 'building' }) {
  return <div className={`${variant}-divider`} />
}
