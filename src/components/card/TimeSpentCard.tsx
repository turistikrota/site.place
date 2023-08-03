import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TimeSpent } from '~/features/place.types'

type Props = {
  data: TimeSpent
}

const TimeSpentCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation('place')
  const [unit, setUnit] = useState('card.minute')

  const safeSet = (key: string) => {
    if (unit !== key) setUnit(key)
  }

  useEffect(() => {
    if (data.min === data.max) {
      safeSet('card.minute')
    } else if (data.max > 60) {
      safeSet('card.hour')
    } else {
      safeSet('card.minute')
    }
  }, [data])

  return (
    <div className='text-gray-500 dark:text-gray-300' suppressHydrationWarning>
      {t('card.time-spent', {
        min: data.min,
        max: data.max,
        unit: t(unit),
      })}
    </div>
  )
}

export default TimeSpentCard
