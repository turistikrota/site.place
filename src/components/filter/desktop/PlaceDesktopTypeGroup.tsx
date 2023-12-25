import { DesktopInfoBox } from '@turistikrota/ui/accessibility/info'
import { deepMerge } from '@turistikrota/ui/utils'
import { useTranslation } from 'next-i18next'
import { usePlaceFilter } from '~/hooks/place.filter'
import PlaceFilterTypeGroup from '../shared/PlaceFilterTypeGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'

export default function PlaceDesktopTypeGroup() {
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const clearTypes = () => {
    push(deepMerge(query, { filter: { types: undefined } }))
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('components.types.text')}
          <DesktopInfoBox>{t('components.types.description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.types && <PlaceDesktopHead.Clear onClear={clearTypes} />}
      </PlaceDesktopHead>
      <PlaceFilterTypeGroup className='max-h-60 mt-2' />
    </PlaceDesktopFilterSection>
  )
}
