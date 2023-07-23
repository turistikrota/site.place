import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import InputRange from '@turistikrota/ui/form/range'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { TimeSpent } from '~/features/place.types'
import { usePlaceFilter } from '~/features/place.filter'

export default function PlaceFilterTimeSpentGroup() {
  const { t } = useTranslation('filter.components.time-spent')
  const [firstSet, setFirstSet] = useState<boolean>(false)
  const [values, setValues] = useState<TimeSpent>({ min: 0, max: 0 })
  const { query, push } = usePlaceFilter()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!firstSet || !query.filter.timeSpent) return
    const minIsZero = query.filter.timeSpent.min === 0
    const maxIsZero = query.filter.timeSpent.max === 0
    const minIsDifferent = query.filter.timeSpent.min !== values.min
    const maxIsDifferent = query.filter.timeSpent.max !== values.max
    setFirstSet(true)
    if (minIsZero && maxIsZero) return
    if (minIsDifferent || maxIsDifferent) {
      setValues(query.filter.timeSpent)
    }
  }, [query])

  const handleChange = (values: TimeSpent) => {
    setValues(values)
    query.filter.timeSpent = values
    push(query)
  }

  return (
    <>
      <MobileInfoBox>{t('description')}</MobileInfoBox>
      <InputRange
        onChange={handleChange}
        values={values}
        min={0}
        size={isDesktop ? 'md' : undefined}
        minText={t('minText')}
        maxText={t('maxText')}
      />
    </>
  )
}
