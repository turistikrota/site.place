import { useTranslation } from 'next-i18next'
import { DesktopInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import PLaceFilterFeatureGroup from '../shared/PlaceFilterFeatureGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceDesktopFeatureGroup() {
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const clearFeatures = () => {
    query.filter.featureUUIDs = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('components.features.text')}
          <DesktopInfoBox>{t('components.features.description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.featureUUIDs && <PlaceDesktopHead.Clear onClear={clearFeatures} />}
      </PlaceDesktopHead>
      <PLaceFilterFeatureGroup />
    </PlaceDesktopFilterSection>
  )
}
