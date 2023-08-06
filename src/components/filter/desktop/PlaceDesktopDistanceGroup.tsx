import { DesktopInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import { useTranslation } from 'next-i18next'
import { usePlaceFilter } from '~/hooks/place.filter'
import PlaceFilterDistanceGroup from '../shared/PlaceFilterDistanceGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'

export default function PlaceDesktopDistanceGroup() {
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const clearDistance = () => {
    query.filter.distance = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('components.distance.text')}
          <DesktopInfoBox>{t('components.distance.description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearDistance} />}
      </PlaceDesktopHead>
      <PlaceFilterDistanceGroup className='max-h-40 mt-2' />
    </PlaceDesktopFilterSection>
  )
}
