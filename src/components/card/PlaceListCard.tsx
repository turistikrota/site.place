import Carousel from '@turistikrota/ui/cjs/carousel'

const ImageSlider: React.FC = () => {
  return <div>ImageSlider</div>
}

const PlaceListCard: React.FC = () => {
  return (
    <div className='flex flex-col col-span-4 bg-second rounded-md'>
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
        sizeClassName='h-72'
      />
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <div className='text-2xl font-bold'>Villa Bliss</div>
            <div className='text-sm'>Kalkan, Antalya</div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-sm'>Sleeps up to 8</div>
            <div className='text-sm'>4 bedrooms</div>
            <div className='text-sm'>4 bathrooms</div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <div className='text-sm'>Private pool</div>
            <div className='text-sm'>Air conditioning</div>
            <div className='text-sm'>WiFi</div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-sm'>Sea views</div>
            <div className='text-sm'>Close to town</div>
            <div className='text-sm'>Close to beach</div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <div className='text-sm'>Private pool</div>
            <div className='text-sm'>Air conditioning</div>
            <div className='text-sm'>WiFi</div>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='text-sm'>Sea views</div>
            <div className='text-sm'>Close to town</div>
            <div className='text-sm'>Close to beach</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceListCard
