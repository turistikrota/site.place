import Carousel from '@turistikrota/ui/cjs/carousel'
import { Locales } from '@turistikrota/ui/cjs/types'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { PlaceListItem } from '~/features/place.types'
import FiveStars from '../Stars'

type Props = {
  item: PlaceListItem
}

export default function PlaceMapCard({ item }: Props) {
  const { t, i18n } = useTranslation('place')
  const translations = item.translations[i18n.language as Locales]

  const checkOutsideClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // @ts-ignore
    if (['i', 'button'].includes(e.target?.tagName.toLowerCase())) return e.preventDefault()
  }

  const calculateUnit = () => {
    if (item.averageTimeSpent.min === item.averageTimeSpent.max) {
      return t('card.minute')
    } else if (item.averageTimeSpent.max > 60) {
      return t('card.hour')
    } else {
      return t('card.minute')
    }
  }

  return (
    <div className='flex flex-col bg-second rounded-md'>
      <Link href={translations.slug} target='_blank' onClick={checkOutsideClick}>
        <Carousel
          images={item.images.sort((a, b) => a.order - b.order).map((image) => image.url)}
          sizeClassName='h-72 w-72'
        />
      </Link>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <div className='text-xl font-bold'>{translations.title}</div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-1 items-center'>
                <FiveStars star={item.review.averagePoint} iconSize='bx-xs' />
                <div className='text-sm text-gray-600 dark:text-gray-300'>{item.review.total}</div>
              </div>
              <div className='text-gray-500 dark:text-gray-300'>
                {t('card.time-spent', {
                  min: item.averageTimeSpent.min,
                  max: item.averageTimeSpent.max,
                  unit: calculateUnit(),
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
