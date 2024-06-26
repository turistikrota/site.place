import Card from '@turistikrota/ui/cards/default'
import Carousel from '@turistikrota/ui/carousel'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { PlaceListItem, TranslationItem, getTranslations } from '~/features/place.types'
import { useBraceText } from '~/hooks/useBraceText'
import { findNearestDistrictNames } from '~/static/location/districts'
import { mapAndSortImages } from '~/utils/image'
import { IsPayedCard, PlaceTypeCard } from './Shared'
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
  const cityText = useBraceText(findNearestDistrictNames(item.coordinates, 3))

  const checkOutsideClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // @ts-ignore
    if (['i', 'button'].includes(e.target?.tagName.toLowerCase())) return e.preventDefault()
  }

  return (
    <Card
      className='flex flex-col col-span-12 md:col-span-4 hover:border-primary transition-colors duration-200'
      noPadding
    >
      <Link href={translations.slug} target='_blank' onClick={checkOutsideClick} className='h-full'>
        <div className='h-full flex flex-col'>
          <Carousel
            imageAltPrefix={translations.title}
            images={mapAndSortImages(item.images)}
            variant={Carousel.Variants.List}
          />
          <div className='flex flex-col h-full justify-between p-2'>
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
    </Card>
  )
}

export default PlaceListCard
