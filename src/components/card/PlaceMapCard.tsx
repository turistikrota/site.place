import Carousel from '@turistikrota/ui/cjs/carousel'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { PlaceListItem, TranslationItem, getTranslations } from '~/features/place.types'
import { mapAndSortImages } from '~/utils/image'
import { ReviewCard } from './Shared'
import TimeSpentCard from './TimeSpentCard'

type Props = {
  item: PlaceListItem
}

export default function PlaceMapCard({ item }: Props) {
  const { i18n } = useTranslation('place')
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
    <div className='flex flex-col bg-second rounded-md'>
      <Link href={translations.slug} target='_blank' onClick={checkOutsideClick}>
        <Carousel
          imageAltPrefix={translations.title}
          images={mapAndSortImages(item.images)}
          sizeClassName='h-75 w-75'
        />

        <div className='flex flex-col gap-4 p-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <div className='text-xl font-bold'>{translations.title}</div>
              <div className='flex justify-between items-center'>
                <ReviewCard star={item.review.averagePoint} total={item.review.total} />
                <TimeSpentCard data={item.averageTimeSpent} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
