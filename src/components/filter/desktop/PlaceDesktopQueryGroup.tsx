import { DesktopInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import { useTranslation } from 'next-i18next'
import { usePlaceFilter } from '~/hooks/place.filter'
import PlaceFilterQueryGroup from '../shared/PlaceFilterQueryGroup'
import PlaceDesktopFilterSection from './PlaceDesktopFilterSection'
import PlaceDesktopHead from './PlaceDesktopHead'

export default function PlaceDesktopQueryGroup() {
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  const clearQuery = () => {
    query.filter.query = undefined
    push(query)
  }

  return (
    <PlaceDesktopFilterSection>
      <PlaceDesktopHead>
        <PlaceDesktopHead.Title className='flex'>
          {t('components.query.text')}
          <DesktopInfoBox>{t('components.query.description')}</DesktopInfoBox>
        </PlaceDesktopHead.Title>
        {!!query.filter.distance && <PlaceDesktopHead.Clear onClear={clearQuery} />}
      </PlaceDesktopHead>
      <PlaceFilterQueryGroup />
    </PlaceDesktopFilterSection>
  )
}
