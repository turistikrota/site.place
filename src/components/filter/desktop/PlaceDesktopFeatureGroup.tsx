import { useTranslation } from 'react-i18next'
import { DesktopInfoBox } from '@turistikrota/ui/accessibility/info'
import PLaceFilterFeatureGroup from '../shared/PlaceFilterFeatureGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceDesktopFeatureGroup() {
  const { t } = useTranslation('filter.components.features')
  const { query, push } = usePlaceFilter()

  const clearFeatures = () => {
    query.filter.featureUUIDs = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('text')}
          <DesktopInfoBox>{t('description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.featureUUIDs && <PlaceDesktopHead.Clear onClear={clearFeatures} />}
      </PlaceDesktopHead>
      <PLaceFilterFeatureGroup />
    </PlaceDesktopFilterSection>
  )
}
