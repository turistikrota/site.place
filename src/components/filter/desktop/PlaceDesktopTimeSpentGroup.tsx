import { useTranslation } from 'react-i18next'
import { DesktopInfoBox } from '@turistikrota/ui/accessibility/info'
import PlaceFilterTimeSpentGroup from '../shared/PlaceFilterTimeSpentGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceDesktopTimeSpentGroup() {
  const { t } = useTranslation('filter.components.time-spent')
  const { query, push } = usePlaceFilter()

  const clearTimeSpent = () => {
    query.filter.timeSpent = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('title')}
          <DesktopInfoBox>{t('description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearTimeSpent} />}
      </PlaceDesktopHead>
      <PlaceFilterTimeSpentGroup />
    </PlaceDesktopFilterSection>
  )
}
