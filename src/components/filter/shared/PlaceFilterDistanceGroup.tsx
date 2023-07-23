import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { MobileInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import Input from '@turistikrota/ui/cjs/form/input'
import { usePlaceFilter } from '~/features/place.filter'

const DefaultDistance: number = 100

type Props = {
  onClose: () => void
}

export default function PlaceFilterDistanceGroup() {
  const [distance, setDistance] = useState<number>(DefaultDistance)
  const { t } = useTranslation('filter')
  const { query, push } = usePlaceFilter()

  useEffect(() => {
    if (!!query.filter.distance && query.filter.distance !== distance) {
      setDistance(query.filter.distance)
    }
  }, [query])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value) {
      setDistance(value)
      query.filter.distance = value
      push(query)
    }
  }

  return (
    <>
      <MobileInfoBox>{t('components.distance.description')}</MobileInfoBox>
      <Input<number>
        label={t('components.distance.label')}
        name='distance'
        type='number'
        pattern='[0-9]*'
        value={distance}
        onChange={handleChange}
      />
    </>
  )
}
