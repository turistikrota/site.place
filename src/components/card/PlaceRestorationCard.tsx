import Alert from '@turistikrota/ui/cjs/alert'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { Restoration } from '~/features/place.types'
import { useDayJS } from '~/hooks/dayjs'

type Props = {
  restorations: Restoration[]
}

const PlaceRestorationCard: React.FC<Props> = ({ restorations }) => {
  const { t, i18n } = useTranslation('place')
  const dayjs = useDayJS(i18n.language)
  const empty = dayjs('0001-01-01T00:00:00Z')
  const [visible, endDate] = useMemo(() => {
    const now = dayjs()
    for (const restoration of restorations) {
      const start = dayjs(restoration.startDate)
      const end = dayjs(restoration.endDate)
      if (end.isSame(empty) && !start.isSame(empty)) {
        return [true, empty.format()]
      }
      if (!end.isSame(empty) && end.isAfter(now)) {
        return [true, end.format()]
      }
    }
    return [false, empty.format()]
  }, [dayjs, restorations])
  if (!visible) return
  return (
    <Alert type='warning' showIcon className='mb-4'>
      <Alert.Title>{t('restoration.title')}</Alert.Title>
      <Alert.Description>
        {t('restoration.description')}&nbsp;
        {endDate === empty.format()
          ? t('restoration.soon')
          : t('restoration.soonWithDate', {
              date: dayjs(endDate).format('DD MMMM YYYY'),
            })}
      </Alert.Description>
    </Alert>
  )
}

export default PlaceRestorationCard
