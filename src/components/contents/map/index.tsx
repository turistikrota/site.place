'use client'

import { Coordinates } from '@turistikrota/ui/types'
import debounce from '@turistikrota/ui/utils/debounce'
import { type LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { Marker, Popup } from 'react-leaflet'
import PlaceMapCard from '~/components/card/PlaceMapCard'
import MapDefaultConfig from '~/components/map/MapDefaultConfig'
import { ContentProps } from '~/features/place.types'
import { useSizeWithoutHeader } from '~/hooks/dom'

const DynamicMap = dynamic(() => import('~/components/map/MapDynamic'), {
  ssr: false,
})

const defaultPosition: LatLngTuple = [41.0082, 28.9784]

type MapProps = {
  position: LatLngTuple
  onChange: (coordinates: Coordinates, zoom: number) => void
  filterCoordinates?: Coordinates
}

export default function MapContent({ data, onChange, filterCoordinates }: ContentProps & MapProps) {
  const size = useSizeWithoutHeader()
  const position: LatLngTuple = useMemo(
    () => (filterCoordinates ? filterCoordinates : defaultPosition),
    [filterCoordinates],
  )

  const debouncedChange = debounce(onChange, 100)

  return (
    <div
      style={{
        height: size,
      }}
    >
      <DynamicMap position={position} onChange={debouncedChange}>
        <MapDefaultConfig />
        {data?.list.map((item, idx) => (
          <Marker key={idx} position={item.coordinates}>
            <Popup className='map-popup'>
              <PlaceMapCard item={item} />
            </Popup>
          </Marker>
        ))}
      </DynamicMap>
    </div>
  )
}
