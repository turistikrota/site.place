import { MobileInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import Radio from '@turistikrota/ui/cjs/form/radio'
import { useIsDesktop } from '@turistikrota/ui/cjs/hooks/dom'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import ScrollableSection from '~/components/ScrollableSection'
import { Distance } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'
import { deepMerge } from '~/utils/deepMerge'

const DefaultDistance: number = 100

type Props = {
  className?: string
}

const DistanceLabels: Record<Distance, string> = {
  7: '50 km',
  8: '30 km',
  9: '20 km',
  10: '10 km',
  11: '5 km',
  12: '2 km',
  13: '1 km',
  14: '500 m',
  15: '200 m',
}

export default function PlaceFilterDistanceGroup({ className }: Props) {
  const [distance, setDistance] = useState<number>(DefaultDistance)
  const { t } = useTranslation('filter')
  const isDesktop = useIsDesktop()
  const { query, push } = usePlaceFilter()

  useEffect(() => {
    const newDistance =
      query.filter.distance && query.filter.distance !== distance ? query.filter.distance : DefaultDistance
    push(deepMerge(query, { filter: { distance: newDistance } }))
  }, [query])

  const handleChange = (dist: number, direction: boolean) => {
    if (direction) {
      query.filter.distance = dist
    }
    push(query)
  }

  return (
    <>
      <MobileInfoBox>{t('components.distance.description')}</MobileInfoBox>
      <ScrollableSection className={className}>
        {Object.entries(DistanceLabels).map(([dist, label]) => (
          <Radio
            key={dist}
            name='distance'
            id={`distance-${dist}`}
            checked={distance === +dist}
            reverse={!isDesktop}
            effect={isDesktop ? 'hover' : undefined}
            onChange={(e) => handleChange(+dist, e)}
          >
            {label}
          </Radio>
        ))}
      </ScrollableSection>
    </>
  )
}
