import { I18nTranslation, ListResponse } from '@turistikrota/ui/types'

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
export type PlaceDetail = {
  features: FeatureItem[]
  images: PlaceImage[]
  translations: I18nTranslation<FullTranslation>
  averageTimeSpent: TimeSpent
  review: Review
  coordinates: Coordinates
  isPayed: boolean
  type: Type
  createdAt: Date
}

type FeatureItem = {
  uuid: string
  icon: string
  translations: I18nTranslation<FeatureTranslation>
}

type FeatureTranslation = {
  title: string
  description: string
}

export enum Type {
  Eating = 'eating',
  Coffee = 'coffee',
  Bar = 'bar',
  Beach = 'beach',
  Amaze = 'amaze',
}

export enum Sort {
  Popular = 'most_popular',
  Liked = 'most_liked',
  Recent = 'most_recent',
  Near = 'nearest',
}

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

type PlaceImage = {
  url: string
  order: number
}

type TranslationItem = {
  title: string
  description: string
  slug: string
}

type FullTranslation = TranslationItem & {
  markdownUrl: string
  seo: Seo
}

type Seo = {
  title: string
  description: string
  keywords: string
}

export type TimeSpent = {
  min: number
  max: number
}

type Review = {
  total: number
  averagePoint: number
}

export type ContentProps = {
  loading: boolean
  data: ListResponse<PlaceListItem> | null
}

export type Coordinates = [number, number]

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
