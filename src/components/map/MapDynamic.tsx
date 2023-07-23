import { type LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer } from 'react-leaflet'

type Props = {
  position: LatLngTuple
  zoom?: number
  className?: string
}

export default function MapDynamic({ children, position, zoom = 13, className }: React.PropsWithChildren<Props>) {
  return (
    <MapContainer center={position} zoom={zoom} className={`h-full w-full min-h-full ${className}`}>
      {children}
    </MapContainer>
  )
}
