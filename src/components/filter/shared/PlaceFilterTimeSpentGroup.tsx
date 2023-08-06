import { MobileInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import InputRange from '@turistikrota/ui/cjs/form/range'
import { useIsDesktop } from '@turistikrota/ui/cjs/hooks/dom'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { TimeSpent } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'

export default function PlaceFilterTimeSpentGroup() {
  const { t } = useTranslation('filter')
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
      <MobileInfoBox>{t('components.time-spent.description')}</MobileInfoBox>
      <InputRange
        onChange={handleChange}
        values={values}
        min={0}
        size={isDesktop ? 'md' : undefined}
        minText={t('components.time-spent.minText')}
        maxText={t('components.time-spent.maxText')}
      />
    </>
  )
}
