import { useTranslation } from 'next-i18next'
import { DesktopInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import PlaceFilterTypeGroup from '../shared/PlaceFilterTypeGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceDesktopTypeGroup() {
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const clearTypes = () => {
    query.filter.types = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('components.types.text')}
          <DesktopInfoBox>{t('components.types.description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearTypes} />}
      </PlaceDesktopHead>
      <PlaceFilterTypeGroup />
    </PlaceDesktopFilterSection>
  )
}
