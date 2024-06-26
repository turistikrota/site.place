import Input from '@turistikrota/ui/form/input'
import Radio from '@turistikrota/ui/form/radio'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import ScrollableSection from '~/components/ScrollableSection'
import { useCities } from '~/hooks/location'
import { usePlaceFilter } from '~/hooks/place.filter'
import { City } from '~/static/location/cities'
import { deepMerge } from '~/utils/deepMerge'

type Props = {
  className?: string
}

const PlaceFilterCityGroup: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation('common')
  const [searchVal, setSearchVal] = useState<string | null>(null)
  const cities = useCities(searchVal)
  const { query, push } = usePlaceFilter()
  const isDesktop = useIsDesktop()

  const onSelectCity = (city: City, direction: boolean) => {
    if (
      query.filter.coordinates &&
      query.filter.coordinates[0] === city.coordinates[0] &&
      query.filter.coordinates[1] === city.coordinates[1]
    ) {
      push(deepMerge(query, { filter: { coordinates: undefined, distance: undefined } }))
      return
    }
    const newCoordinates = direction ? city.coordinates : undefined
    push(deepMerge(query, { filter: { coordinates: newCoordinates, distance: 13 } }))
  }
  return (
    <>
      <Input
        label={t('ux.input.search')}
        name='search'
        size={isDesktop ? 'md' : undefined}
        suffix={<i className='bx bx-xs bx-search-alt-2'></i>}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <ScrollableSection className={className}>
        {cities.map((city, idx) => (
          <Radio
            key={city.name}
            name='city'
            id={city.name}
            value={
              (query.filter.coordinates &&
                query.filter.coordinates[0] === city.coordinates[0] &&
                query.filter.coordinates[1] === city.coordinates[1]) ||
              false
            }
            reverse={!isDesktop}
            effect={isDesktop ? 'hover' : undefined}
            onChange={(e) => onSelectCity(city, e)}
            onClick={(e) => {
              if (!e) onSelectCity(city, e)
            }}
          >
            {city.name}
          </Radio>
        ))}
      </ScrollableSection>
    </>
  )
}

export default PlaceFilterCityGroup
