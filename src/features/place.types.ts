import { I18nTranslation, ListResponse, isLocale } from '@turistikrota/ui/types'

export type PlaceFilterRequest = {
  query?: string
  coordinates?: Coordinates
  featureUUIDs?: string[]
  types?: Type[]
  isPayed?: boolean
  distance?: number
  timeSpent?: TimeSpent
  minReview?: number
  maxReview?: number
  minAveragePoint?: number
  maxAveragePoint?: number
  sort?: Sort
  order?: Order
  v?: ContentType
}

export type ContentType = 'list' | 'map'

export enum Type {
  Eating = 'eating',
  Coffee = 'coffee',
  Bar = 'bar',
  Beach = 'beach',
  Amaze = 'amaze',
  Shopping = 'shopping',
  Transport = 'transport',
  Culture = 'culture',
  Nature = 'nature',
  Health = 'health',
  Sport = 'sport',
  Nightlife = 'nightlife',
  Garden = 'garden',
  Temple = 'temple',
  Museum = 'museum',
  Antique = 'antique',
  ThemePark = 'themePark',
  Other = 'other',
}

export enum Sort {
  Recent = 'most_recent',
  Near = 'nearest',
}

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

export type TimeSpent = {
  min: number
  max: number
}

export type PlaceFeatureListItem = {
  uuid: string
  icon: string
  translations: I18nTranslation<PlaceFeatureListItemTranslations>
}

type PlaceFeatureListItemTranslations = {
  title: string
  description: string
}

export type PlaceListItem = {
  images: PlaceImage[]
  translations: I18nTranslation<TranslationItem>
  averageTimeSpent: TimeSpent
  review: Review
  coordinates: Coordinates
  isPayed: boolean
  type: Type
}

export type Restoration = {
  startDate: string
  endDate: string
}

export type PlaceDetail = {
  features: FeatureItem[]
  restorations: Restoration[]
  images: PlaceImage[]
  translations: I18nTranslation<FullTranslation>
  averageTimeSpent: TimeSpent
  review: Review
  coordinates: Coordinates
  isPayed: boolean
  type: Type
  createdAt: Date
  updatedAt: Date
}

export type FeatureItem = {
  uuid: string
  icon: string
  translations: I18nTranslation<FeatureTranslation>
}

export type FeatureTranslation = {
  title: string
  description: string
}

export type PlaceImage = {
  url: string
  order: number
}

export type TranslationItem = {
  title: string
  description: string
  slug: string
}

export type FullTranslation = TranslationItem & {
  markdownUrl: string
  seo: Seo
}

type Seo = {
  title: string
  description: string
  keywords: string
}

export type Review = {
  total: number
  averagePoint: number
}

export type ContentProps = {
  loading: boolean
  data: ListResponse<PlaceListItem> | null
  onNextPage?: () => void
}

export type Coordinates = [number, number]

export type Distance = 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export function isPlaceListResponse(response: any): response is ListResponse<PlaceListItem> {
  return response && response.list && response.total
}

export function isPlaceFeatureList(response: any): response is PlaceFeatureListItem[] {
  return Array.isArray(response) && response.length > 0
}

export function isPlaceType(type: string): type is Type {
  return Object.values(Type).includes(type as Type)
}

export function isSort(sort: string): sort is Sort {
  return Object.values(Sort).includes(sort as Sort)
}

export function isOrder(order: string): order is Order {
  return Object.values(Order).includes(order as Order)
}

export function isTimeSpent(timeSpent: any): timeSpent is TimeSpent {
  return timeSpent && typeof timeSpent.min === 'number' && typeof timeSpent.max === 'number'
}

export function isDistance(distance: any): distance is Distance {
  return typeof distance === 'number' && distance >= 7 && distance <= 15
}

export const getTranslations = <T>(obj: I18nTranslation<T>, locale: string, fb: T): T => {
  if (isLocale(locale) && obj[locale]) {
    return obj[locale]
  }
  if (obj.en) {
    return obj.en
  }
  if (obj.tr) {
    return obj.tr
  }
  return fb
}

export function isContentType(contentType: string): contentType is ContentType {
  return ['list', 'map'].includes(contentType)
}
