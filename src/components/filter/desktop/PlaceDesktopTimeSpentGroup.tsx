import { DesktopInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import { useTranslation } from 'next-i18next'
import { usePlaceFilter } from '~/hooks/place.filter'
import PlaceFilterTimeSpentGroup from '../shared/PlaceFilterTimeSpentGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'

export default function PlaceDesktopTimeSpentGroup() {
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const clearTimeSpent = () => {
    query.filter.timeSpent = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('components.time-spent.title')}
          <DesktopInfoBox>{t('components.time-spent.description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearTimeSpent} />}
      </PlaceDesktopHead>
      <PlaceFilterTimeSpentGroup />
    </PlaceDesktopFilterSection>
  )
}
