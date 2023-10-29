import { Coordinates } from '@turistikrota/ui/cjs/types'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import {
  FeatureItem,
  FeatureTranslation,
  FullTranslation,
  Review,
  TimeSpent,
  Type,
  getTranslations,
} from '~/features/place.types'
import { useDayJS } from '~/hooks/dayjs'
import { useTimeSpent, useTimeSpentUnit } from '~/hooks/timespent'
import { useBraceText } from '~/hooks/useBraceText'
import { findBestNearestCities } from '~/static/location/cities'
import { PlaceTypeItems, PlaceTypes } from '~/types/place'
import FeatureCard, { FeatureVariants } from './FeatureCard'

type Props = {
  translations: FullTranslation
  coordinates: Coordinates
  review: Review
  features: FeatureItem[]
  updatedAt: Date | string
  timeSpent: TimeSpent
  type: Type
  isPayed: boolean
}

type CoreFeatureItem = {
  condition: boolean
  title: string
  icon: string
  text: string
  variant?: string
}

const defaultFeature: FeatureTranslation = {
  title: 'No title',
  description: 'No description',
}

const PlaceDetailContentCard: React.FC<Props> = ({
  coordinates,
  translations,
  review,
  features,
  updatedAt,
  timeSpent,
  isPayed,
  type,
}) => {
  const { t, i18n } = useTranslation('place')
  const dayjs = useDayJS(i18n.language)
  const cities = findBestNearestCities(coordinates, 2)
  const cityTexts = useBraceText(cities.map((city) => city.name))
  const currentType: PlaceTypeItems = PlaceTypes[type] ? PlaceTypes[type] : PlaceTypes[Type.Other]
  const timeSpentUnit = useTimeSpentUnit(timeSpent)
  const spent = useTimeSpent(timeSpent)

  const coreFeatures = useMemo<CoreFeatureItem[]>(
    () =>
      [
        {
          condition: !!cityTexts,
          variant: 'primary',
          icon: 'bx bx-map',
          title: t('features.location.text'),
          text: t('features.location.subtext', {
            location: cityTexts,
          }),
        },
        {
          condition: true,
          variant: currentType.variant,
          icon: currentType.icon,
          title: t(currentType.text),
          text: t(`types_desc.${type ?? Type.Other}`),
        },
        {
          condition: true,
          variant: 'teal',
          icon: 'bx bx-time',
          title: t('features.time.text'),
          text: t('features.time.subtext', {
            min: spent.min,
            max: spent.max,
            unit: t(timeSpentUnit),
          }),
        },
        {
          variant: 'warning',
          condition: isPayed,
          icon: 'bx bx-dollar',
          title: t('features.payed.text'),
          text: t('features.payed.subtext'),
        },
        {
          variant: 'success',
          condition: !isPayed,
          icon: 'bx bx-wallet',
          title: t('features.free.text'),
          text: t('features.free.subtext'),
        },
      ].filter((f) => f.condition),
    [timeSpentUnit],
  )

  return (
    <div className='flex flex-col h-full gap-10 md:gap-20 py-0 '>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>{translations.title}</h1>
        <div className='text-sm'>{translations.description}</div>
      </div>
      <div className='grid grid-cols-4 gap-3'>
        {features.map((feature, idx) => (
          <FeatureCard
            key={feature.uuid}
            icon={feature.icon}
            text={getTranslations<FeatureTranslation>(feature.translations, i18n.language, defaultFeature).title}
            subtext={
              getTranslations<FeatureTranslation>(feature.translations, i18n.language, defaultFeature).description
            }
            variant='primary'
            core
          ></FeatureCard>
        ))}
        {coreFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            text={feature.title}
            subtext={feature.text}
            variant={feature.variant as FeatureVariants}
          ></FeatureCard>
        ))}
        <div className='text-gray-400 text-sm col-span-4'>
          {t('base.updated', {
            date: dayjs(updatedAt).format('MMMM YYYY'),
          })}
        </div>
      </div>
    </div>
  )
}

export default PlaceDetailContentCard
