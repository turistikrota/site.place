import StickySection from '@turistikrota/ui/cjs/section/sticky'
import { useTranslation } from 'next-i18next'
import { usePlaceFilter } from '~/features/place.filter'
import { ContentProps } from '~/features/place.types'
import PlaceDesktopHead from './desktop/PlaceDesktopHead'
import PlaceFilterSection from './desktop/PlaceFilterSection'

export default function DesktopFilterSection({ data, loading }: ContentProps) {
  const { t } = useTranslation('filter')
  const { isFiltered, clean } = usePlaceFilter()

  return (
    <StickySection innerClassName='rounded-md border bg-second'>
      <div className='border-b p-4 flex justify-between items-center'>
        <span className='text-gray-400'>
          {t('results', {
            count: data?.filteredTotal || 0,
          })}
        </span>
        {isFiltered && <PlaceDesktopHead.Clear text={t('clear-filter')} onClear={() => clean()} />}
      </div>

      <div className='flex flex-col gap-4'>
        <PlaceFilterSection />
      </div>
    </StickySection>
  )
}
