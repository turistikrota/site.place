import { DesktopInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import { useTranslation } from 'next-i18next'
import { usePlaceFilter } from '~/hooks/place.filter'
import { deepMerge } from '~/utils/deepMerge'
import PLaceFilterFeatureGroup from '../shared/PlaceFilterFeatureGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'

export default function PlaceDesktopFeatureGroup() {
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const clearFeatures = () => {
    push(deepMerge(query, { filter: { featureUUIDs: undefined } }))
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
