import { useTranslation } from 'next-i18next'
import { DesktopInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import PlaceFilterDistanceGroup from '../shared/PlaceFilterDistanceGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceDesktopDistanceGroup() {
  const { t } = useTranslation('filter.components.distance')
  const { query, push } = usePlaceFilter()

  const clearDistance = () => {
    query.filter.distance = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('text')}
          <DesktopInfoBox>{t('description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearDistance} />}
      </PlaceDesktopHead>
      <PlaceFilterDistanceGroup />
    </PlaceDesktopFilterSection>
  )
}
