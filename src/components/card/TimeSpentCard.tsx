import { useTranslation } from 'next-i18next'
import { TimeSpent } from '~/features/place.types'
import { useTimeSpentUnit } from '~/hooks/timespent'

type Props = {
  data: TimeSpent
}

const TimeSpentCard: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation('place')
  const unit = useTimeSpentUnit(data)

  return (
    <div className='text-gray-500 dark:text-gray-300' suppressHydrationWarning>
      {t('card.time-spent', {
        min: data.min > 60 ? Math.round(data.min / 60) : data.min,
        max: data.max > 60 ? Math.round(data.max / 60) : data.max,
        unit: t(unit),
      })}
    </div>
  )
}

export default TimeSpentCard
