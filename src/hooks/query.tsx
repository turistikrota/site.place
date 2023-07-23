import { useState, useEffect } from 'react'
import { httpClient } from '~/http/client'

type UseQueryResult<T = unknown> = {
  data: T | null
  isLoading: boolean
  error: unknown | null
}

type CacheEntity<T = unknown> = {
  data: T
  expiresAt: number
}

export const useQuery = <T = unknown,>(url: string, cache?: boolean): UseQueryResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cached = false
    setIsLoading(true)
    if (cache && typeof window !== 'undefined') {
      const cacheData = localStorage.getItem(url)
      if (cacheData) {
        const cacheEntity: CacheEntity<T> = JSON.parse(cacheData)
        if (cacheEntity.expiresAt > Date.now()) {
          cached = true
          setData(cacheEntity.data)
          setIsLoading(false)
          return
        }
      }
    }
    if (cached) return
    httpClient
      .get(url)
      .then((res) => {
        setData(res.data)
        if (cache && typeof window !== 'undefined') {
          const cacheEntity: CacheEntity<T> = {
            data: res.data,
            expiresAt: Date.now() + 1000 * 60 * 60 * 24,
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
  }, [url])

  return { data, isLoading, error }
}
