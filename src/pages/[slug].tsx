import Carousel from '@turistikrota/ui/cjs/carousel'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMemo } from 'react'
import MarkdownContent from '~/components/MarkdownContent'
import FiveStars from '~/components/Stars'
import FeatureCard, { FeatureVariants } from '~/components/card/FeatureCard'
import { Services, apiUrl } from '~/config/services'
import { FullTranslation, PlaceDetail, Type, getTranslations } from '~/features/place.types'
import { useDayJS } from '~/hooks/dayjs'
import { useTimeSpentUnit } from '~/hooks/timespent'
import { useBraceText } from '~/hooks/useBraceText'
import { httpClient } from '~/http/client'
import DefaultLayout from '~/layouts/DefaultLayout'
import { findBestNearestCities } from '~/static/location/cities'
import { PlaceTypeItems, PlaceTypes } from '~/types/place'
import { getMdContent } from '~/utils/getMdContent'
import { mapAndSortImages } from '~/utils/image'

type Props = {
  response: PlaceDetail
  md: string
}

type FeatureItem = {
  condition: boolean
  title: string
  icon: string
  text: string
  variant?: string
}

export default function PlaceDetail({ response, md }: Props) {
  const { t, i18n } = useTranslation('place')
  const translations = getTranslations<FullTranslation>(response.translations, i18n.language, {
    title: '',
    slug: '',
    description: '',
    markdownUrl: '',
    seo: {
      description: '',
      keywords: '',
      title: '',
    },
  })
  const dayjs = useDayJS(i18n.language)
  const cities = findBestNearestCities(response.coordinates, 2)
  const cityTexts = useBraceText(cities.map((city) => city.name))
  const currentType: PlaceTypeItems = !!PlaceTypes[response.type] ? PlaceTypes[response.type] : PlaceTypes[Type.Other]
  const timeSpentUnit = useTimeSpentUnit(response.averageTimeSpent)

  const features = useMemo<FeatureItem[]>(
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
          text: t(`types_desc.${response.type ?? Type.Other}`),
        },
        {
          condition: true,
          variant: 'teal',
          icon: 'bx bx-time',
          title: t('features.time.text'),
          text: t('features.time.subtext', {
            min: response.averageTimeSpent.min,
            max: response.averageTimeSpent.max,
            unit: t(timeSpentUnit),
          }),
        },
        {
          variant: 'warning',
          condition: response.isPayed,
          icon: 'bx bx-dollar',
          title: t('features.payed.text'),
          text: t('features.payed.subtext'),
        },
        {
          variant: 'success',
          condition: !response.isPayed,
          icon: 'bx bx-wallet',
          title: t('features.free.text'),
          text: t('features.free.subtext'),
        },
      ].filter((f) => f.condition),
    [timeSpentUnit],
  )

  return (
    <DefaultLayout>
      <section className='max-w-7xl p-4 xl:px-0 mx-auto lg:h-full grow grid grid-cols-12 gap-4'>
        <div className='col-span-12 md:col-span-8'>
          <Carousel images={mapAndSortImages(response?.images)} sizeClassName='h-104' />
          <section className='mt-4'>
            <MarkdownContent content={md} />
          </section>
        </div>
        <div className='col-span-12 md:col-span-4'>
          <div className='flex flex-col h-full gap-20 p-4 py-0'>
            <div className='flex flex-col gap-2'>
              <div className='text-2xl font-bold'>{translations.title}</div>
              <div className='text-sm'>{translations.description}</div>
            </div>
            <div className='grid grid-cols-4 gap-3'>
              <div className='col-span-4 flex justify-between items-center'>
                <FiveStars star={response.review.averagePoint} iconSize='bx-md' />
                <div className='flex items-end gap-1'>
                  <div className='text-4xl font-bold text-gray-600 dark:text-gray-300'>{response.review.total}</div>
                  <div className='text-lg text-gray-600 dark:text-gray-300'>{t('reviews')}</div>
                </div>
              </div>
              {response.features.map((feature, idx) => (
                <FeatureCard
                  key={feature.uuid}
                  icon={feature.icon}
                  text={feature.translations.en.title}
                  subtext={feature.translations.en.description}
                  variant='primary'
                  core
                ></FeatureCard>
              ))}
              {features.map((feature, index) => (
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
                  date: dayjs(response.updatedAt).format('MMMM YYYY'),
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}

export async function getServerSideProps(ctx: any) {
  const slug = ctx.query.slug
  if (!slug) {
    return {
      notFound: true,
    }
  }
  const locale = ctx.locale ?? 'tr'
  const res = await httpClient.get(apiUrl(Services.Place, `/${slug}`)).catch((_err) => {
    return { data: undefined, status: 500 }
  })
  if (res.status === 404) {
    return {
      notFound: true,
    }
  }
  const md = await getMdContent(res.data.translations[locale].markdownUrl)
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common', 'filter', 'sort', 'place'])),
      response: !!res.data ? res.data : null,
      md,
    },
  }
}
