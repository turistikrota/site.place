import { deepEqual } from '@turistikrota/ui/cjs/utils'
import { useCallback, useEffect, useState } from 'react'
import { isPlaceListResponse } from '~/features/place.types'
import { httpClient } from '~/http/client'

type UseQueryResult<T = unknown> = {
  data: T | null
  isLoading: boolean
  error: unknown | null
  refetch: () => void
  nextPage: (page: number) => void
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
  defaultUrl: string,
  opts: Options<T> = { cache: false, withSSR: undefined },
): UseQueryResult<T> => {
  const [data, setData] = useState<T | null>(opts.withSSR || null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(
    (skipCache: boolean = false, page?: number) => {
      return fetcher(defaultUrl, skipCache, page)
    },
    [defaultUrl],
  )

  const fetcher = (url: string, skipCache: boolean = false, page?: number) => {
    let cached = false
    if (page) {
      if (isPlaceListResponse(data) && !data.isNext) return
    }
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
      promise = httpClient.post(url, opts.params)
    } else {
      promise = httpClient.get(url)
    }
    promise
      .then((res) => {
        if (page) {
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
        } else {
          setError(err)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (!!opts.withSSR) return
    fetchData()
  }, [defaultUrl])

  return {
    data,
    isLoading,
    error,
    refetch: () => fetchData(true),
    nextPage: (page: number) => fetchData(true, page),
  }
}
