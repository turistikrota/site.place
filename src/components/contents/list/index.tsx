import ContentLoader from '@turistikrota/ui/cjs/loader'
import PlaceListCard from '~/components/card/PlaceListCard'
import { ContentProps } from '~/features/place.types'
import ListFilter from './ListFilter'
import ListHead from './ListHead'

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

export default function ListContent({ data, loading }: ContentProps) {
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
