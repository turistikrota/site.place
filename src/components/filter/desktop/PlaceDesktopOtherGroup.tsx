import { useTranslation } from 'react-i18next'
import PlaceFilterIsPayedGroup from '../shared/PlaceFilterIsPayedGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceDesktopOtherGroup() {
  const { t } = useTranslation('filter.components.other')
  const { query, push } = usePlaceFilter()

  const clearIsPayed = () => {
    query.filter.isPayed = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title>{t('title')}</PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearIsPayed} />}
      </PlaceDesktopHead>
      <PlaceFilterIsPayedGroup />
    </PlaceDesktopFilterSection>
  )
}
