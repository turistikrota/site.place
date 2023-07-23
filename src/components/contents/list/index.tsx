import Carousel from '@turistikrota/ui/cjs/carousel'
import ListFilter from './ListFilter'
import ListHead from './ListHead'
import { ContentProps } from '~/features/place.types'

function ListItemSection({ data, loading }: ContentProps) {
  if (loading) return <div>loading...</div>
  if (!data) return <div>no data</div>
  return (
    <section className='grow'>
      <div className=''>
        <Carousel
          images={[
            '/images/demo/villa-bliss-pa.jpg',
            '/images/demo/villa-bliss-02.jpg',
            '/images/demo/villa-bliss-03.jpg',
            '/images/demo/villa-bliss-04.jpg',
            '/images/demo/villa-bliss-05.jpg',
            '/images/demo/villa-bliss-06.jpg',
            '/images/demo/villa-bliss-07.jpg',
            '/images/demo/villa-bliss-08.jpg',
            '/images/demo/villa-bliss-09.jpg',
            '/images/demo/villa-bliss-10.jpg',
          ]}
          sizeClassName='h-96'
        />
      </div>
      {data.list.map((item, idx) => (
        <div key={idx}>{item.translations.tr.title}</div>
      ))}
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
      <div>aaa</div>
      <br />
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
