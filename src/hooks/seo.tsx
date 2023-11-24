import { useTranslation } from 'next-i18next'
import { Coordinates, Type } from '~/features/place.types'
import { findNearestDistrict } from '~/static/location/districts'
import { withLocativeSuffix } from '~/utils/turkish'

type Result = {
  title: string
  description: string
  keywords: string
}

type SeoProps = {
  coordinates?: Coordinates
  type?: Type[]
}

const WithSuffixTypes: Type[] = [Type.Other]
const WithoutThatTypes: Type[] = [Type.Nightlife]

const getCityAndTypeText = (type: Type, that = true): string => {
  if (WithSuffixTypes.includes(type)) return 'withSuffix'
  if (that && WithoutThatTypes.includes(type)) return 'withoutThat'
  return 'withoutSuffix'
}

export const useListSeo = ({ coordinates, type }: SeoProps): Result => {
  const { t, i18n } = useTranslation('common')
  let title = t('seo.list.title')
  let description = t('seo.list.description')
  let keywords = t('seo.list.keywords')
  const district = coordinates ? findNearestDistrict(coordinates) : undefined
  const types = type && type.length > 0 ? type[0] : undefined

  if (district) {
    if (types) {
      title = t(`seo.list.cityAndTypeTexts.${getCityAndTypeText(types)}`, {
        city: withLocativeSuffix(i18n.language, district.cityName),
        type: t(`seo.list.types.${types}.title`),
      })

      description = t(`seo.list.types.${types}.descriptionWithCity`, {
        city: withLocativeSuffix(i18n.language, district.cityName),
      })
      keywords += `, ${withLocativeSuffix(i18n.language, district.cityName)}, ${t(
        `seo.list.types.${types}.keywordsWithCity`,
        {
          city: withLocativeSuffix(i18n.language, district.cityName),
        },
      )}`
    } else {
      title = t('seo.list.cityTexts.base', { city: withLocativeSuffix(i18n.language, district.cityName) })
      description = t('seo.list.cityTexts.description', { city: withLocativeSuffix(i18n.language, district.cityName) })
      keywords += `, ${district.cityName}`
    }
  } else if (types) {
    title = t(`seo.list.typeTexts.${getCityAndTypeText(types, false)}`, { type: t(`seo.list.types.${types}.title`) })
    description = t(`seo.list.types.${types}.descriptionWithoutCity`)
    keywords += `, ${t(`seo.list.types.${types}.keywords`)}`
  }

  return { title, description, keywords }
}
