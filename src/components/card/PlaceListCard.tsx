import Carousel from '@turistikrota/ui/cjs/carousel'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { PlaceListItem, TranslationItem, getTranslations } from '~/features/place.types'
import { useBraceText } from '~/hooks/useBraceText'
import { findBestNearestCities } from '~/static/location/cities'
import { mapAndSortImages } from '~/utils/image'
import { IsPayedCard, PlaceTypeCard } from './Shared'
import TimeSpentCard from './TimeSpentCard'

type Props = {
  item: PlaceListItem
}

const PlaceListCard: React.FC<Props> = ({ item }) => {
  const { t, i18n } = useTranslation('place')
  const cities = findBestNearestCities(item.coordinates, 3)
  const translations = getTranslations<TranslationItem>(item.translations, i18n.language, {
    title: '',
    slug: '',
    description: '',
  })
  const cityText = useBraceText(cities.map((c) => c.name))

  const checkOutsideClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // @ts-ignore
    if (['i', 'button'].includes(e.target?.tagName.toLowerCase())) return e.preventDefault()
  }

  return (
    <div className='flex flex-col col-span-12 md:col-span-4 bg-second rounded-md'>
      <Link href={translations.slug} target='_blank' onClick={checkOutsideClick} className='h-full'>
        <div className='h-full flex flex-col'>
          <Carousel
            imageAltPrefix={translations.title}
            images={mapAndSortImages(item.images)}
            sizeClassName='h-72'
            imageClassName='rounded-b-none'
            imgLoadingClassName='rounded-t-md'
          />
          <div className='flex flex-col h-full justify-between p-4'>
            <div className='flex flex-col gap-2'>
              <div className='text-xl font-bold line-clamp-2'>{translations.title}</div>
              <div className='text-sm'>
                {t('features.location.subtext', {
                  location: cityText,
                })}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between items-center'>
                <div></div>
                <TimeSpentCard data={item.averageTimeSpent} />
              </div>
              <div className='flex justify-between items-center'>
                <IsPayedCard isPayed={item.isPayed} />
                <PlaceTypeCard type={item.type} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PlaceListCard
