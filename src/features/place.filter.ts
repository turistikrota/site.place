import { deepEqual, findDiff } from '@turistikrota/ui/utils'
import debounce from '@turistikrota/ui/utils/debounce'
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PaginationRequest } from '~/types/pagination'
import {
  Order,
  PlaceFilterRequest,
  Sort,
  Type,
  isContentType,
  isDistance,
  isOrder,
  isPlaceType,
  isSort,
} from './place.types'

export const getQueryByKeyBindings = (searchParams: ReadonlyURLSearchParams | URLSearchParams) => {
  const query: PaginationRequest<PlaceFilterRequest> = { filter: {} }
  const keyBindings = {
    page: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.page = val
      }
    },
    limit: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.limit = val
      }
    },
    lat: (value: string) => {
      const lng = searchParams.get('lng')
      if (lng) {
        const lat = parseFloat(value)
        const lng2 = parseFloat(lng)
        if (!isNaN(lat) && !isNaN(lng2)) {
          query.filter.coordinates = [lat, lng2]
        }
      }
    },
    lng: (value: string) => {
      const lat = searchParams.get('lat')
      if (lat) {
        const lng = parseFloat(value)
        const lat2 = parseFloat(lat)
        if (!isNaN(lng) && !isNaN(lat2)) {
          query.filter.coordinates = [lat2, lng]
        }
      }
    },
    features: (value: string) => {
      query.filter.featureUUIDs = value.split(',')
    },
    types: (value: string) => {
      const list = value.split(',')
      const types: Type[] = list.filter((type) => isPlaceType(type)) as Type[]
      if (types.length > 0) {
        query.filter.types = types
      }
    },
    pay: (value: string) => {
      if (['on', 'off'].includes(value)) {
        if (value === 'on') {
          query.filter.isPayed = true
        } else if (value === 'off') {
          query.filter.isPayed = false
        } else {
          query.filter.isPayed = undefined
        }
      }
    },
    dist: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val) && isDistance(val)) {
        query.filter.distance = val
      }
    },
    time: (value: string) => {
      const [min, max] = value.split(',')
      const minVal = parseInt(min)
      const maxVal = parseInt(max)
      if (!isNaN(minVal) && !isNaN(maxVal) && minVal < maxVal) {
        query.filter.timeSpent = {
          min: minVal,
          max: maxVal,
        }
      }
    },
    minRev: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.filter.minReview = val
      }
    },
    maxRev: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.filter.maxReview = val
      }
    },
    minPoint: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.filter.minAveragePoint = val
      }
    },
    maxPoint: (value: string) => {
      const val = parseInt(value)
      if (!isNaN(val)) {
        query.filter.maxAveragePoint = val
      }
    },
    q: (value: string) => {
      query.filter.query = value
    },
    sort: (value: string) => {
      if (isSort(value)) {
        query.filter.sort = value
        return
      }
      query.filter.sort = undefined
    },
    order: (value: string) => {
      if (isOrder(value)) {
        query.filter.order = value
        return
      }
      query.filter.order = undefined
    },
    v: (value: string) => {
      if (isContentType(value)) {
        query.filter.v = value
      }
    },
  }
  searchParams.forEach((value, key) => {
    if (Object.keys(keyBindings).includes(key)) {
      keyBindings[key as keyof typeof keyBindings](value)
    }
  })
  return query
}

export const placeQueryToURL = (query: PaginationRequest<PlaceFilterRequest>): string => {
  const q = new URLSearchParams()
  if (query.page) {
    q.append('page', query.page.toString())
  }
  if (query.limit) {
    q.append('limit', query.limit.toString())
  }
  return q.toString()
}

export const placeToQuery = (place: PaginationRequest<PlaceFilterRequest>): string => {
  const query = new URLSearchParams()
  if (place.page) {
    query.append('page', place.page.toString())
  }
  if (place.limit) {
    query.append('limit', place.limit.toString())
  }
  if (place.filter.coordinates) {
    const [lat, lng] = place.filter.coordinates
    query.append('lat', lat.toString())
    query.append('lng', lng.toString())
  }
  if (place.filter.featureUUIDs) {
    query.append('features', place.filter.featureUUIDs.join(','))
  }
  if (place.filter.types) {
    query.append('types', place.filter.types.join(','))
  }
  if (place.filter.isPayed !== undefined) {
    query.append('pay', place.filter.isPayed ? 'on' : 'off')
  }
  if (place.filter.distance) {
    query.append('dist', place.filter.distance.toString())
  }
  if (place.filter.timeSpent) {
    const { min, max } = place.filter.timeSpent
    query.append('time', `${min},${max}`)
  }
  if (place.filter.minReview) {
    query.append('minRev', place.filter.minReview.toString())
  }
  if (place.filter.maxReview) {
    query.append('maxRev', place.filter.maxReview.toString())
  }
  if (place.filter.minAveragePoint) {
    query.append('minPoint', place.filter.minAveragePoint.toString())
  }
  if (place.filter.maxAveragePoint) {
    query.append('maxPoint', place.filter.maxAveragePoint.toString())
  }
  if (place.filter.query) {
    query.append('q', place.filter.query)
  }
  if (place.filter.sort) {
    query.append('sort', place.filter.sort)
  }
  if (place.filter.order) {
    query.append('order', place.filter.order)
  }
  if (place.filter.v) {
    query.append('v', place.filter.v)
  }
  return query.toString()
}

type Callback = () => void

type PlaceFilterHookResult = {
  query: PaginationRequest<PlaceFilterRequest>
  push: (query: PaginationRequest<PlaceFilterRequest>, cb?: Callback) => void
  immediatePush: (query: PaginationRequest<PlaceFilterRequest>, cb?: Callback) => void
  clean: (cb?: Callback) => void
  isFiltered: boolean
  isQueryChanged: boolean
  isOnlyPageChanged: boolean
}

export const usePlaceFilterProvider = (): PlaceFilterHookResult => {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState<PaginationRequest<PlaceFilterRequest>>(getQueryByKeyBindings(searchParams))
  const [lastQuery, setLastQuery] = useState<PaginationRequest<PlaceFilterRequest> | null>(null)
  const [isOnlyPageChanged, setIsOnlyPageChanged] = useState(false)
  const [isQueryChanged, setIsQueryChanged] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const debouncedPush = debounce((path: string, cb?: Callback) => {
    const url = `${pathname}?${path}`
    router.push(url, undefined, { shallow: true })
    if (cb) cb()
  }, 500)

  const cleaner = (cb?: Callback) => {
    debouncedPush('', cb)
  }

  const push = (newQuery: PaginationRequest<PlaceFilterRequest>, cb?: Callback) => {
    const path = placeToQuery(newQuery)
    debouncedPush(path, cb)
  }

  const immediatePush = (newQuery: PaginationRequest<PlaceFilterRequest>, cb?: Callback) => {
    const path = placeToQuery(newQuery)
    const url = `${pathname}?${path}`
    router.push(url, undefined, { shallow: true })
    if (cb) cb()
  }

  const setAllQueries = (newQuery: PaginationRequest<PlaceFilterRequest>) => {
    const oldQuery = { ...query }
    setQuery(newQuery)
    if (deepEqual(oldQuery, newQuery)) {
      return
    }
    setLastQuery(oldQuery)
    const diff = Object.keys(findDiff(oldQuery, newQuery)).filter((key) => key !== 'v')
    if (diff.length === 1 && diff.includes('page')) {
      setIsOnlyPageChanged(true)
      setIsQueryChanged(false)
      return
    } else if (diff.length === 0 && !deepEqual(oldQuery, newQuery)) {
      setIsOnlyPageChanged(false)
      setIsQueryChanged(false)
      return
    }
    setIsOnlyPageChanged(false)
    setIsQueryChanged(true)
  }

  useEffect(() => {
    const newQuery = getQueryByKeyBindings(searchParams)
    if (query.page === newQuery.page && !deepEqual(query.filter, newQuery.filter)) {
      newQuery.page = 1
    }
    if (query && placeToQuery(query) === placeToQuery(newQuery)) return
    setAllQueries(newQuery)
  }, [searchParams])

  useEffect(() => {
    if (lastQuery !== null) return
    setLastQuery(query)
  }, [])

  return {
    query,
    isQueryChanged,
    isOnlyPageChanged,
    isFiltered: Object.keys(query.filter).length > 0,
    clean: cleaner,
    push,
    immediatePush,
  }
}

type PlaceSortHookResult = {
  defaultSort: Sort
  defaultOrder: Order
  sorts: Sort[]
  orders: Order[]
}

export const usePlaceSort = (): PlaceSortHookResult => {
  return {
    defaultSort: Sort.Recent,
    defaultOrder: Order.Desc,
    orders: Object.values(Order),
    sorts: Object.values(Sort),
  }
}
