import ListFilter from './ListFilter'
import ListHead from './ListHead'
import { ContentProps } from '~/features/place.types'
import PlaceListCard from '~/components/card/PlaceListCard'

function ListItemSection({ data, loading }: ContentProps) {
  if (loading) return <div>loading...</div>
  if (!data) return <div>no data</div>
  return (
    <section className='grow grid grid-cols-12 gap-4'>
      {[...data.list, ...data.list, ...data.list].map((item, idx) => (
        <PlaceListCard key={idx} />
      ))}
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
