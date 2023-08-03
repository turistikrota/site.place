import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { usePlaceFilter } from '~/features/place.filter'
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
          query.filter.coordinates = [city.coordinates[0], city.coordinates[1]]
          push(query)
        }
      }
      setCity(city)
    }
  }, [query])

  const clearCity = () => {
    query.filter.coordinates = undefined
    push(query)
  }
  return (
    <PlaceDesktopFilterSection className='pt-4'>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title>{t('components.city-select.text')}</PlaceDesktopHead.Title>
        {!!city && <PlaceDesktopHead.Clear onClear={clearCity} />}
      </PlaceDesktopHead>
      <PlaceFilterCityGroup className='max-h-60 mt-2' />
    </PlaceDesktopFilterSection>
  )
}
