import Carousel from '@turistikrota/ui/cjs/carousel'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { PlaceListItem, TranslationItem, getTranslations } from '~/features/place.types'
import { mapAndSortImages } from '~/utils/image'
import { IsPayedCard, PlaceTypeCard, ReviewCard } from './Shared'
import TimeSpentCard from './TimeSpentCard'

type Props = {
  item: PlaceListItem
}

const PlaceListCard: React.FC<Props> = ({ item }) => {
  const { t, i18n } = useTranslation('place')
  const translations = getTranslations<TranslationItem>(item.translations, i18n.language, {
    title: '',
    slug: '',
    description: '',
  })

  const checkOutsideClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // @ts-ignore
    if (['i', 'button'].includes(e.target?.tagName.toLowerCase())) return e.preventDefault()
  }

  return (
    <Link href={translations.slug} className='col-span-4' target='_blank' onClick={checkOutsideClick}>
      <div className='flex flex-col bg-second rounded-md'>
        <Carousel images={mapAndSortImages(item.images)} sizeClassName='h-72' />
        <div className='flex flex-col gap-2 p-4'>
          <div className='text-2xl font-bold'>{translations.title}</div>
          <div className='text-sm'>Kalkan, Antalya</div>
          <div className='flex justify-between items-center'>
            <ReviewCard star={item.review.averagePoint} total={item.review.total} />
            <TimeSpentCard data={item.averageTimeSpent} />
          </div>
          <div className='flex justify-between items-center'>
            <IsPayedCard isPayed={item.isPayed} />
            <PlaceTypeCard type={item.type} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaceListCard
