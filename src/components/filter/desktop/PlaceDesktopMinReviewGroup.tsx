import { DesktopInfoBox } from '@turistikrota/ui/accessibility/info'
import { deepMerge } from '@turistikrota/ui/utils'
import { useTranslation } from 'next-i18next'
import { usePlaceFilter } from '~/hooks/place.filter'
import PlaceFilterReviewGroup from '../shared/PlaceFilterReviewGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'

export default function PlaceDesktopMinReviewGroup() {
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const clearReview = () => {
    push(deepMerge(query, { filter: { minReview: undefined } }))
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('components.review.text')}
          <DesktopInfoBox>{t('components.review.description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {(!!query.filter.minReview || !!query.filter.maxReview) && <PlaceDesktopHead.Clear onClear={clearReview} />}
      </PlaceDesktopHead>
      <PlaceFilterReviewGroup />
    </PlaceDesktopFilterSection>
  )
}
