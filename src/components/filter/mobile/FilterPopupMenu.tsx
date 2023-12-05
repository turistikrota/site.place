import { Locales, isCoordinates } from '@turistikrota/ui/cjs/types'
import { useTranslation } from 'next-i18next'
import { PlaceFeatureListItem, PlaceFilterRequest, isPlaceType, isTimeSpent } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'
import { usePlaceFeatures } from '~/hooks/usePlaceFeatures'
import { findCityByCoordinates } from '~/static/location/cities'
import FilterGroup from './FilterGroup'
import { FilterComponents } from './types'

type Props = {
  onOpen: (component: FilterComponents, key: keyof PlaceFilterRequest) => void
}

type Item = {
  component: FilterComponents
  queryKey: keyof PlaceFilterRequest
}

const items: Item[] = [
  {
    component: 'city-select',
    queryKey: 'coordinates',
  },
  {
    component: 'distance',
    queryKey: 'distance',
  },
  {
    component: 'features',
    queryKey: 'featureUUIDs',
  },
  {
    component: 'time-spent',
    queryKey: 'timeSpent',
  },
  {
    component: 'query',
    queryKey: 'query',
  },
  {
    component: 'is-payed',
    queryKey: 'isPayed',
  },
  {
    component: 'types',
    queryKey: 'types',
  },
  {
    component: 'review',
    queryKey: 'minReview',
  },
]

type ParserOptions = {
  features: PlaceFeatureListItem[]
  locale: Locales
  t: ReturnType<typeof useTranslation>['t']
}

const componentValueParsers: Record<FilterComponents, (value: any, options: ParserOptions) => any> = {
  'city-select': (value) => {
    if (isCoordinates(value)) {
      const city = findCityByCoordinates(value)
      if (city) return city.name
    }
    return ''
  },
  distance: (value) => {
    if (!value) return ''
    return value + ' km'
  },
  features: (value, options) => {
    if (!value || !Array.isArray(value)) return ''
    return options.features.reduce((acc, feature) => {
      if (value.includes(feature.uuid)) {
        if (acc.length > 0) {
          acc += ', '
        }
        acc += feature.translations[options.locale].title
      }
      return acc
    }, '')
  },
  'time-spent': (value, opts) => {
    if (!value || !isTimeSpent(value)) return ''
    if (value.min > 0) {
      if (value.max > 0) {
        return opts.t('filter:tools.range', {
          min: value.min,
          max: value.max,
        })
      }
      return opts.t('filter:tools.min', {
        time: value.min,
      })
    }
    if (value.max > 0) {
      return opts.t('filter:tools.max', {
        time: value.max,
      })
    }
    return ''
  },
  query: (value) => {
    if (!value) return ''
    return value
  },
  'is-payed': (value, opts) => {
    if (typeof value === 'undefined') return ''
    return value ? opts.t('filter:tools.paid') : ''
  },
  types: (value, opts) => {
    if (!value || !Array.isArray(value)) return ''
    return value.reduce((acc, type) => {
      if (!isPlaceType(type)) return acc
      if (acc.length > 0) {
        acc += ', '
      }
      acc += opts.t(`common:types.${type}`)
      return acc
    }, '')
  },
  review: (value, opts) => {
    const val = Number(value)
    if (isNaN(val)) return ''

    return opts.t(val === 5 ? 'filter:components.review.labels.last' : 'filter:components.review.labels.x', {
      star: val,
    })
  },
}

const FilterMenu: React.FC<Props> = ({ onOpen }) => {
  const { t, i18n } = useTranslation(['filter', 'common'])
  const { query } = usePlaceFilter()
  const { features } = usePlaceFeatures()

  return (
    <>
      {items.map((item) => (
        <FilterGroup
          key={item.component}
          title={t(`filter:components.${item.component}.text`)}
          onClick={() => onOpen(item.component, item.queryKey)}
          values={componentValueParsers[item.component](query.filter[item.queryKey], {
            features,
            locale: i18n.language as Locales,
            t,
          })}
        ></FilterGroup>
      ))}
    </>
  )
}

export default FilterMenu
