import { useTranslation } from 'react-i18next'
import { DesktopInfoBox } from '@turistikrota/ui/accessibility/info'
import PlaceFilterTypeGroup from '../shared/PlaceFilterTypeGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceDesktopTypeGroup() {
  const { t } = useTranslation('place.filter.components.types')
  const { query, push } = usePlaceFilter()

  const clearTypes = () => {
    query.filter.types = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('text')}
          <DesktopInfoBox>{t('description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearTypes} />}
      </PlaceDesktopHead>
      <PlaceFilterTypeGroup />
    </PlaceDesktopFilterSection>
  )
}
