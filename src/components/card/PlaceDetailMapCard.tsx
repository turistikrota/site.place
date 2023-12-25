'use client'

import { Coordinates } from '@turistikrota/ui/types'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import { Circle, Marker } from 'react-leaflet'
import MapDefaultConfig from '../map/MapDefaultConfig'

type Props = {
  coordinates: Coordinates
}

const DynamicMap = dynamic(() => import('~/components/map/MapDynamic'), {
  ssr: false,
})

const PlaceDetailMapCard: React.FC<Props> = ({ coordinates }) => {
  return (
    <div className='h-106'>
      <DynamicMap position={coordinates} zoom={13} className='rounded-md'>
        <MapDefaultConfig />
        <Marker position={coordinates} />
        <Circle center={coordinates} radius={1000} color='#2e99fd' />
      </DynamicMap>
    </div>
  )
}

export default PlaceDetailMapCard
