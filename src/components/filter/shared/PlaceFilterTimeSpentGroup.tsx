import { MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import InputRange from '@turistikrota/ui/form/range'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { deepMerge } from '@turistikrota/ui/utils'
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
    if (!query.filter.timeSpent) {
      setValues({ min: 0, max: 0 })
    }
    if (!firstSet) return
    if (!query.filter.timeSpent) {
      setValues({ min: 0, max: 0 })
      return
    }
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
    push(deepMerge(query, { filter: { timeSpent: values } }))
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
