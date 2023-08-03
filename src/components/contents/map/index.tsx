'use client'

import { Locales } from '@turistikrota/ui/cjs/types'
import Leaflet, { type LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import PlaceMapCard from '~/components/card/PlaceMapCard'
import MapDefaultConfig from '~/components/map/MapDefaultConfig'
import { ContentProps } from '~/features/place.types'
import { useSizeWithoutHeader } from '~/hooks/dom'

const DynamicMap = dynamic(() => import('~/components/map/MapDynamic'), {
  ssr: false,
})

const position: LatLngTuple = [41.0082, 28.9784]

type MapProps = {
  position: LatLngTuple
}

export default function MapContent({ data }: ContentProps & MapProps) {
  const { i18n } = useTranslation()
  const size = useSizeWithoutHeader()
  useEffect(() => {
    Leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/marker-icon.png',
      iconUrl: '/images/marker-icon.png',
      shadowUrl: '',
    })
  }, [])

  return (
    <div
      style={{
        height: size,
      }}
    >
      <DynamicMap position={position}>
        <MapDefaultConfig />
        {data?.list.map((item, idx) => (
          <Marker key={idx} position={item.coordinates}>
            <Popup className='map-popup'>
              <PlaceMapCard
                slug={item.translations[i18n.language as Locales].slug}
                images={item.images.sort((a, b) => a.order - b.order).map((image) => image.url)}
              />
            </Popup>
          </Marker>
        ))}
      </DynamicMap>
    </div>
  )
}
