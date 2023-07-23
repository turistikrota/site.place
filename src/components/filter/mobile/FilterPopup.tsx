import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Spinner } from 'sspin'
import Button from '@turistikrota/ui/button'
import Condition from '@turistikrota/ui/condition'
import Popup from '@turistikrota/ui/popup'
import FilterHead from './FilterPopupHead'
import FilterMenu from './FilterPopupMenu'
import { ListResponse } from '@turistikrota/ui/types'
import { PlaceFilterRequest, PlaceListItem } from '~/features/place.types'
import { usePlaceFilter } from '~/features/place.filter'
import { FilterComponents } from './types'

type ContentProps = {
  loading: boolean
  data: ListResponse<PlaceListItem> | null
}

type CloseableProps = {
  onClose: () => void
}

type Props = ContentProps &
  CloseableProps & {
    open: boolean
  }

const Spin = () => (
  <div className='w-full min-h-[5vh] flex items-center justify-center'>
    <Spinner />
  </div>
)

const Components: Record<FilterComponents, React.ComponentType<any>> = {
  'city-select': dynamic(() => import('../shared/PlaceFilterCityGroup'), {
    loading: Spin,
  }),
  distance: dynamic(() => import('../shared/PlaceFilterDistanceGroup'), {
    loading: Spin,
  }),
  features: dynamic(() => import('../shared/PlaceFilterFeatureGroup'), {
    loading: Spin,
  }),
  'time-spent': dynamic(() => import('../shared/PlaceFilterTimeSpentGroup'), {
    loading: Spin,
  }),
  query: dynamic(() => import('../shared/PlaceFilterQueryGroup'), {
    loading: Spin,
  }),
  'is-payed': dynamic(() => import('../shared/PlaceFilterIsPayedGroup'), {
    loading: Spin,
  }),
  types: dynamic(() => import('../shared/PlaceFilterTypeGroup'), {
    loading: Spin,
  }),
  review: dynamic(() => import('../shared/PlaceFilterReviewGroup'), {
    loading: Spin,
  }),
}

const FilterPopup: React.FC<Props> = ({ onClose, open, data, loading }) => {
  const [title, setTitle] = useState<string | null>(null)
  const [key, setKey] = useState<keyof PlaceFilterRequest | null>(null)
  const { isFiltered, clean } = usePlaceFilter()
  const [filterComponent, setFilterComponent] = useState<FilterComponents | null>(null)
  const { t } = useTranslation('filter')

  const onOpenFilter = (component: FilterComponents, key: keyof PlaceFilterRequest) => {
    setFilterComponent(component)
    setKey(key)
    setTitle(t(`components.${component}.title`))
  }

  const onCloseFilter = () => {
    setFilterComponent(null)
    setTitle(null)
    setKey(null)
  }

  const onClearFilter = () => {
    clean(onClose)
  }

  const ActiveComponent = filterComponent && Components[filterComponent]

  return (
    <Popup
      onClose={onClose}
      open={open}
      size='2xl'
      head={
        <FilterHead
          title={title ?? t('title').toString()}
          resultCount={!title ? data?.filteredTotal ?? 0 : 0}
          onClose={onCloseFilter}
          closeable={!!title}
          filterKey={key}
          onClearAll={onClearFilter}
          clearable={isFiltered}
        />
      }
    >
      <>
        {ActiveComponent && (
          <>
            <ActiveComponent onClose={onCloseFilter} />
            <Button className='mt-12' variant='secondary' onClick={onCloseFilter} disabled={loading}>
              {t('apply')}
            </Button>
          </>
        )}
        {!ActiveComponent && (
          <>
            <FilterMenu onOpen={onOpenFilter}></FilterMenu>
            <Condition value={isFiltered}>
              <Button className='mt-12' variant='primary' onClick={onClearFilter} disabled={loading}>
                {t('see-results', {
                  count: data?.filteredTotal ?? 0,
                })}
              </Button>
            </Condition>
          </>
        )}
      </>
    </Popup>
  )
}

export default FilterPopup
