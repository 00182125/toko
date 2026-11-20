import { Asset } from './Asset'

// Foto redonda de Toko.
//  size 'mini'   -> junto a cada mensaje del chat
//  size 'header' -> en el encabezado del chat
export function Avatar({ size = 'mini', src = '216a3.svg' }: { size?: 'mini' | 'header'; src?: string }) {
  if (size === 'header') {
    return (
      <div className="chat-avatar">
        <Asset name={src} />
      </div>
    )
  }
  return (
    <span className="mini-avatar" aria-hidden="true">
      <Asset name={src} />
    </span>
  )
}
