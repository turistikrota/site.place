import { deepMerge } from '@turistikrota/ui/cjs/utils'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { usePlaceFilter } from '~/hooks/place.filter'
import { City, findCityByCoordinates, findNearestCity } from '~/static/location/cities'
import PlaceFilterCityGroup from '../shared/PlaceFilterCityGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'

export default function PlaceDesktopCityGroup() {
  const [city, setCity] = useState<City | null>(null)
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  useEffect(() => {
    if (query.filter.coordinates) {
      let city = findCityByCoordinates(query.filter.coordinates)
      if (!city) {
        city = findNearestCity(query.filter.coordinates)
        if (city) {
          push(deepMerge(query, { filter: { coordinates: city.coordinates } }))
        }
      }
      setCity(city)
    } else {
      setCity(null)
    }
  }, [query])

  const clearCity = () => {
    setCity(null)
    push(deepMerge(query, { filter: { coordinates: undefined } }))
  }
  return (
    <PlaceDesktopFilterSection className='pt-4'>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title>
          {t('components.city-select.text')}
          {!!city && <span className='text-sm text-gray-500 ml-1'>({city.name})</span>}
        </PlaceDesktopHead.Title>
        {!!city && <PlaceDesktopHead.Clear onClear={clearCity} />}
      </PlaceDesktopHead>
      <PlaceFilterCityGroup className='max-h-60 mt-2' />
    </PlaceDesktopFilterSection>
  )
}
