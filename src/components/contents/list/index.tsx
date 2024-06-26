import { useInfiniteScroll, useWindowWidth } from '@turistikrota/ui/hooks/dom'
import { deepMerge } from '@turistikrota/ui/utils'
import debounce from '@turistikrota/ui/utils/debounce'
import NoResultsFound from '~/components/card/NoResultsFound'
import PlaceListCard from '~/components/card/PlaceListCard'
import { ContentProps } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'
import ListFilter from './ListFilter'
import ListHead from './ListHead'

type Props = {
  isNext: boolean
}

type ListItemProps = {
  isFiltered: boolean
  onClear: () => void
}

function ListItemSection({ data, loading, onClear, isFiltered }: ContentProps & ListItemProps) {
  const isWidthExist = useWindowWidth()
  return (
    <section className={`grow grid grid-cols-12 gap-2 md:h-full ${!isWidthExist ? 'ml-0 md:ml-80' : ''}`}>
      {data && data.list.map((item, idx) => <PlaceListCard key={idx} item={item} />)}
      {data && data.list.length === 0 && (
        <div className='col-span-12'>
          <NoResultsFound onResetFilters={onClear} isFiltered={isFiltered} />
        </div>
      )}
      <div className='pb-20 md:pb-10'></div>
    </section>
  )
}

export default function ListContent({ data, loading, isNext }: ContentProps & Props) {
  const { query, push, clean, isFiltered } = usePlaceFilter()

  const debouncedPush = debounce(() => {
    const newPage = (query.page || 1) + 1
    push(deepMerge(query, { page: newPage }))
  }, 100)

  const handleScroll = () => {
    if (!isNext) return
    debouncedPush()
  }

  useInfiniteScroll(handleScroll, loading, 10)
  return (
    <section className='max-w-7xl p-2 xl:py-0 mx-auto lg:h-full'>
      <ListHead />
      <section className='flex flex-col lg:flex-row gap-2'>
        <ListFilter data={data} loading={loading} />
        <ListItemSection data={data} loading={loading} onClear={clean} isFiltered={isFiltered} />
      </section>
    </section>
  )
}
