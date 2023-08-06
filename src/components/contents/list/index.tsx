import { useInfiniteScroll } from '@turistikrota/ui/cjs/hooks/dom'
import debounce from '@turistikrota/ui/cjs/utils/debounce'
import Spinner from 'sspin/dist/cjs/Spinner'
import PlaceListCard from '~/components/card/PlaceListCard'
import { ContentProps } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'
import ListFilter from './ListFilter'
import ListHead from './ListHead'

type Props = {
  isNext: boolean
}

function ListItemSection({ data, loading }: ContentProps) {
  return (
    <section className='grow grid grid-cols-12 gap-4 md:min-h-[120vh] md:h-full'>
      {data && data.list.map((item, idx) => <PlaceListCard key={idx} item={item} />)}
      {loading && (
        <div className='col-span-12 flex items-center justify-center p-4'>
          <Spinner />
        </div>
      )}
      <div className='pb-20 md:pb-10'></div>
    </section>
  )
}

export default function ListContent({ data, loading, isNext }: ContentProps & Props) {
  const { query, push } = usePlaceFilter()

  const debouncedPush = debounce(() => {
    console.log('debounced push call')
    query.page = (query.page || 1) + 1
    push(query)
  }, 100)

  const handleScroll = () => {
    console.log('handle scroll check', isNext)
    if (!isNext) return
    console.log('handle scroll passed')
    debouncedPush()
  }

  useInfiniteScroll(handleScroll, loading, 10)
  return (
    <section className='max-w-7xl p-4 xl:p-0 mx-auto lg:h-full'>
      <ListHead />
      <section className='flex flex-col lg:flex-row gap-4'>
        <ListFilter data={data} loading={loading} />
        <ListItemSection data={data} loading={loading} />
      </section>
    </section>
  )
}
