import { useInfiniteScroll } from '@turistikrota/ui/cjs/hooks/dom'
import ContentLoader from '@turistikrota/ui/cjs/loader'
import PlaceListCard from '~/components/card/PlaceListCard'
import { usePlaceFilter } from '~/features/place.filter'
import { ContentProps } from '~/features/place.types'
import ListFilter from './ListFilter'
import ListHead from './ListHead'

type Props = {
  isNext: boolean
}

function ListItemSection({ data, loading }: ContentProps) {
  if (loading) return <ContentLoader />
  if (!data) return <div>no data</div>
  return (
    <section className='grow grid grid-cols-12 gap-4 md:min-h-[120vh] md:h-full'>
      {data.list.map((item, idx) => (
        <PlaceListCard key={idx} item={item} />
      ))}
      <div className='pb-20 md:hidden'></div>
    </section>
  )
}

export default function ListContent({ data, loading, isNext }: ContentProps & Props) {
  const { query, push } = usePlaceFilter()

  const handleScroll = () => {
    if (!isNext) return
    query.page = (query.page || 1) + 1
    push(query)
  }

  useInfiniteScroll(handleScroll, loading)
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
