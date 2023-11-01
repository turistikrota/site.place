import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { Coordinates, Type } from '~/features/place.types'
import { findBestNearestCities } from '~/static/location/cities'
import { makeHtmlTitle } from '~/utils/seo'
import BaseSeo from './BaseSeo'

type SeoProps = {
  coordinates?: Coordinates
  type?: Type[]
}

const PlaceListSeo: React.FC<SeoProps> = ({ coordinates, type }) => {
  const { t } = useTranslation('common')
  let title = t('seo.list.title')
  let description = t('seo.list.description')
  let keywords = t('seo.list.keywords')
  let canonical = t('url')
  const cities = coordinates ? findBestNearestCities(coordinates, 1) : undefined
  const types = type && type.length > 0 ? type[0] : undefined

  if (cities && cities.length > 0) {
    if (types) {
      title = t('seo.list.titleWithCityAndType', { city: cities[0].name, type: t(`types.${types}`) })
      description = t('seo.list.descriptionWithCityAndType', { city: cities[0].name, type: t(`types.${types}`) })
      canonical += `?lat=${cities[0].coordinates[0]}&lng=${cities[0].coordinates[1]}&type=${types}`
      keywords += `, ${cities[0].name}, ${t(`types.${types}`)}`
    } else {
      title = t('seo.list.titleWithCity', { city: cities[0].name })
      description = t('seo.list.descriptionWithCity', { city: cities[0].name })
      canonical += `?lat=${cities[0].coordinates[0]}&lng=${cities[0].coordinates[1]}`
      keywords += `, ${cities[0].name}`
    }
  } else if (types) {
    title = t('seo.list.titleWithType', { type: t(`types.${types}`) })
    description = t('seo.list.descriptionWithType', { type: t(`types.${types}`) })
    canonical += `?type=${types}`
    keywords += `, ${t(`types.${types}`)}`
  }

  title = makeHtmlTitle(title)

  return (
    <Head>
      <BaseSeo />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@turistikrota' />
      <meta name='twitter:creator' content='@turistikrota' />
      <link rel='canonical' href={canonical} />
    </Head>
  )
}

export default PlaceListSeo
