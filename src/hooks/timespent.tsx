import { useEffect, useState } from 'react'
import { TimeSpent } from '~/features/place.types'

export const useTimeSpentUnit = (data: TimeSpent): string => {
  const [unit, setUnit] = useState('card.minute')

  useEffect(() => {
    if (data.min === data.max) {
      safeSet('card.minute')
    } else if (data.max > 60) {
      safeSet('card.hour')
    } else {
      safeSet('card.minute')
    }
  }, [data])

  const safeSet = (key: string) => {
    if (unit !== key) setUnit(key)
  }

  return unit
}

export const useTimeSpent = (data: TimeSpent): TimeSpent =>
  data.max > 60 ? { min: Math.round(data.min / 60), max: Math.round(data.max / 60) } : data
