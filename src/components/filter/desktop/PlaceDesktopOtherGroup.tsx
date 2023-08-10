import { deepMerge } from '@turistikrota/ui/cjs/utils'
import { useTranslation } from 'next-i18next'
import { usePlaceFilter } from '~/hooks/place.filter'
import PlaceFilterIsPayedGroup from '../shared/PlaceFilterIsPayedGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'

export default function PlaceDesktopOtherGroup() {
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const clearIsPayed = () => {
    push(deepMerge(query, { filter: { isPayed: undefined } }))
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title>{t('components.other.title')}</PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearIsPayed} />}
      </PlaceDesktopHead>
      <PlaceFilterIsPayedGroup />
    </PlaceDesktopFilterSection>
  )
}
