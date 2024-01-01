import { Coordinates } from '@turistikrota/ui/types'
import Leaflet, { Map, type LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useCallback, useEffect, useState } from 'react'
import { MapContainer } from 'react-leaflet'

type Props = {
  position: LatLngTuple
  zoom?: number
  className?: string
  onChange?: (coordinates: Coordinates, zoom: number) => void
}

export default function MapDynamic({
  children,
  position,
  zoom = 12,
  onChange,
  className,
}: React.PropsWithChildren<Props>) {
  const [map, setMap] = useState<Map | null>(null)

  const onMove = useCallback(() => {
    if (map) {
      const center = map.getCenter()
      const zoom = map.getZoom()
      if (onChange) {
        onChange([center.lat, center.lng], zoom)
      }
    }
  }, [map])

  useEffect(() => {
    if (!map) return
    map.on('move', onMove)
    return () => {
      if (!map) return
      map.off('move', onMove)
    }
  }, [map, onMove])

  useEffect(() => {
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker/other.png',
      iconUrl: '/images/marker/other.png',
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      shadowUrl: '',
    })
  }, [])

  return (
    <MapContainer
      minZoom={7}
      maxZoom={18}
      ref={setMap}
      center={position}
      zoom={zoom}
      className={`h-full w-full min-h-full ${className}`}
    >
      {children}
    </MapContainer>
  )
}
