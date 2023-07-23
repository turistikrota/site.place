import { useTranslation } from 'next-i18next'
import { DesktopInfoBox } from '@turistikrota/ui/accessibility/info'
import PlaceFilterReviewGroup from '../shared/PlaceFilterReviewGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceDesktopMinReviewGroup() {
  const { t } = useTranslation('filter.components.review')
  const { query, push } = usePlaceFilter()

  const clearReview = () => {
    query.filter.minReview = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('text')}
          <DesktopInfoBox>{t('description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearReview} />}
      </PlaceDesktopHead>
      <PlaceFilterReviewGroup />
    </PlaceDesktopFilterSection>
  )
}
