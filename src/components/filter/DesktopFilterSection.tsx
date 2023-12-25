import StickySection from '@turistikrota/ui/section/sticky'
import { useTranslation } from 'next-i18next'
import { ContentProps } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'
import PlaceDesktopHead from './desktop/PlaceDesktopHead'
import PlaceFilterSection from './desktop/PlaceFilterSection'

export default function DesktopFilterSection({ data, loading }: ContentProps) {
  const { t } = useTranslation('filter')
  const { isFiltered, clean } = usePlaceFilter()

  return (
    <StickySection innerClassName='rounded-md border'>
      <div className='border-b p-2 flex justify-between items-center'>
        <span className='text-gray-400'>
          {t('results', {
            count: data?.filteredTotal || 0,
          })}
        </span>
        {isFiltered && <PlaceDesktopHead.Clear text={t('clear-filter')} onClear={() => clean()} />}
      </div>

      <div className='flex flex-col gap-2'>
        <PlaceFilterSection />
      </div>
    </StickySection>
  )
}
