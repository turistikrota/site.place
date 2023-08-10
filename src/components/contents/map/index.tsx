'use client'

import { Coordinates } from '@turistikrota/ui/cjs/types'
import { deepMerge } from '@turistikrota/ui/cjs/utils'
import debounce from '@turistikrota/ui/cjs/utils/debounce'
import { type LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import { Marker, Popup } from 'react-leaflet'
import PlaceMapCard from '~/components/card/PlaceMapCard'
import MapDefaultConfig from '~/components/map/MapDefaultConfig'
import { ContentProps } from '~/features/place.types'
import { useSizeWithoutHeader } from '~/hooks/dom'
import { usePlaceFilter } from '~/hooks/place.filter'

const DynamicMap = dynamic(() => import('~/components/map/MapDynamic'), {
  ssr: false,
})

const position: LatLngTuple = [41.0082, 28.9784]

type MapProps = {
  position: LatLngTuple
}

export default function MapContent({ data }: ContentProps & MapProps) {
  const size = useSizeWithoutHeader()
  const { query, push } = usePlaceFilter()

  const onChange = (coordinates: Coordinates, zoom: number) => {
    push(deepMerge(query, { filter: { coordinates, distance: zoom } }))
  }

  const debouncedChange = debounce(onChange, 300)

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
