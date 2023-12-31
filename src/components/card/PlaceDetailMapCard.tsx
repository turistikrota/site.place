'use client'

import { Coordinates } from '@turistikrota/ui/types'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import { Circle, Marker } from 'react-leaflet'
import { Type } from '~/features/place.types'
import MapDefaultConfig from '../map/MapDefaultConfig'

type Props = {
  coordinates: Coordinates
  type: Type
}

const DynamicMap = dynamic(() => import('~/components/map/MapDynamic'), {
  ssr: false,
})

const PlaceDetailMapCard: React.FC<Props> = ({ coordinates, type }) => {
  return (
    <div className='h-106'>
      <DynamicMap position={coordinates} zoom={13} className='rounded-md'>
        <MapDefaultConfig />
        <Marker
          position={coordinates}
          icon={
            new Icon.Default({
              iconUrl: `/images/marker/${type}.png`,
              iconSize: [48, 48],
              iconAnchor: [24, 48],
            })
          }
        />
        <Circle center={coordinates} radius={1000} color='#2e99fd' />
      </DynamicMap>
    </div>
  )
}

export default PlaceDetailMapCard
