import { DesktopInfoBox } from '@turistikrota/ui/accessibility/info'
import { deepMerge } from '@turistikrota/ui/utils'
import { useTranslation } from 'next-i18next'
import { usePlaceFilter } from '~/hooks/place.filter'
import PlaceFilterQueryGroup from '../shared/PlaceFilterQueryGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'

export default function PlaceDesktopQueryGroup() {
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const clearQuery = () => {
    push(deepMerge(query, { filter: { query: undefined } }))
  }

  return (
    <PlaceDesktopFilterSection className='pt-4'>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('components.query.text')}
          <DesktopInfoBox>{t('components.query.description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.query && <PlaceDesktopHead.Clear onClear={clearQuery} />}
      </PlaceDesktopHead>
      <PlaceFilterQueryGroup />
    </PlaceDesktopFilterSection>
  )
}
