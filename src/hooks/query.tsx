import { useEffect, useState } from 'react'
import { isPlaceListResponse } from '~/features/place.types'
import { httpClient } from '~/http/client'
import { deepEqual } from '~/utils/deepEqual'

type UseQueryResult<T = unknown> = {
  data: T | null
  isLoading: boolean
  error: unknown | null
  refetch: () => void
  nextPage: () => void
}

type CacheEntity<T = unknown> = {
  data: T
  expiresAt: number
  params: any
}

type Options<T> = {
  cache?: boolean
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  params?: any
  withSSR?: T
}

export const useQuery = <T = unknown,>(
  url: string,
  opts: Options<T> = { cache: false, withSSR: undefined },
): UseQueryResult<T> => {
  const [data, setData] = useState<T | null>(opts.withSSR || null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetcher = (url: string, skipCache: boolean = false, isNextPage: boolean = false) => {
    let cached = false
    setIsLoading(true)
    if (!skipCache && typeof window !== 'undefined') {
      const cacheData = localStorage.getItem(url)
      if (cacheData) {
        const cacheEntity: CacheEntity<T> = JSON.parse(cacheData)
        if (cacheEntity.expiresAt > Date.now() && deepEqual(cacheEntity.params, opts.params)) {
          cached = true
          setData(cacheEntity.data)
          setIsLoading(false)
          return
        }
      }
    }
    if (cached) return
    let promise
    if (opts && opts.method === 'POST') {
      if (isNextPage) {
        if (isPlaceListResponse(data) && !data.isNext) return
        opts.params.page = (opts.params.page || 1) + 1
      }
      promise = httpClient.post(url, opts.params)
    } else {
      promise = httpClient.get(url)
    }
    promise
      .then((res) => {
        if (isNextPage) {
          setData((prevData: any) => ({
            ...res.data,
            list: [...prevData.list, ...res.data.list],
          }))
        } else {
          setData(res.data)
        }
        if (opts.cache && typeof window !== 'undefined') {
          const cacheEntity: CacheEntity<T> = {
            data: res.data,
            expiresAt: Date.now() + 1000 * 60 * 60 * 24,
            params: opts.params,
          }
          localStorage.setItem(url, JSON.stringify(cacheEntity))
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          setError(err.response.data)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!!opts.withSSR) return
    fetcher(url, opts.cache)
  }, [url])

  return {
    data,
    isLoading,
    error,
    refetch: () => fetcher(url, true),
    nextPage: () => fetcher(url, true, true),
  }
}
