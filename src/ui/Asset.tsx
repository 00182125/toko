import { assetUrl } from '@/config/assets'

// Dibuja un archivo de public/assets/icons por su nombre: <Asset name="d2168.svg" />
export function Asset({
  name,
  className,
  alt = '',
}: {
  name: string
  className?: string
  alt?: string
}) {
  return <img className={className} src={assetUrl(name)} alt={alt} />
}
