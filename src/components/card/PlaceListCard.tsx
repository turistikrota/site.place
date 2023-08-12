import Carousel from '@turistikrota/ui/cjs/carousel'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { PlaceListItem, TranslationItem, getTranslations } from '~/features/place.types'
import { mapAndSortImages } from '~/utils/image'
import { IsPayedCard, PlaceTypeCard, ReviewCard } from './Shared'
import TimeSpentCard from './TimeSpentCard'
import { findBestNearestCities } from '~/static/location/cities'

type Props = {
  item: PlaceListItem
}

const PlaceListCard: React.FC<Props> = ({ item }) => {
  const { t, i18n } = useTranslation('place')
  const cities = findBestNearestCities(item.coordinates, 2)
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
    <div className='flex flex-col col-span-12 md:col-span-4'>
      <Link className='bg-second rounded-md' href={translations.slug} target='_blank' onClick={checkOutsideClick}>
        <div>
          <Carousel imageAltPrefix={translations.title} images={mapAndSortImages(item.images)} sizeClassName='h-72' />
          <div className='flex flex-col gap-2 p-4'>
            <div className='text-2xl font-bold'>{translations.title}</div>
            <div className='text-sm'>
              {t('features.location.subtext', {
                location: cities.map((c) => c.name).join(', '),
              })}
            </div>
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
    </div>
  )
}

export default PlaceListCard
