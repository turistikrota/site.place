import { useTranslation } from 'next-i18next'
import { DesktopInfoBox } from '@turistikrota/ui/accessibility/info'
import PlaceFilterQueryGroup from '../shared/PlaceFilterQueryGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceDesktopQueryGroup() {
  const { t } = useTranslation('filter.components.query')
  const { query, push } = usePlaceFilter()

  const clearQuery = () => {
    query.filter.query = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('text')}
          <DesktopInfoBox>{t('description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearQuery} />}
      </PlaceDesktopHead>
      <PlaceFilterQueryGroup />
    </PlaceDesktopFilterSection>
  )
}
