import { MobileInfoBox } from '@turistikrota/ui/cjs/accessibility/info'
import Checkbox from '@turistikrota/ui/cjs/form/checkbox'
import { useIsDesktop } from '@turistikrota/ui/cjs/hooks/dom'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import ScrollableSection from '~/components/ScrollableSection'
import { Type } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'

const types = Object.values(Type)

type Props = {
  className?: string
}

export default function PlaceFilterTypeGroup({ className }: Props) {
  const [selected, setSelected] = useState<Type[]>([])
  const { t } = useTranslation(['filter', 'place'])
  const { query, push } = usePlaceFilter()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!!query.filter.types && !query.filter.types.every((name) => selected.find((f) => f === name))) {
      setSelected([...query.filter.types])
    }
  }, [query])

  const handleChange = (type: Type) => {
    let newList: Type[] = []
    if (selected.includes(type)) {
      newList = selected.filter((item) => item !== type)
    } else {
      newList = [...selected, type]
    }
    setSelected(newList)
    query.filter.types = newList
    push(query)
  }

  return (
    <div className='space-y-4 lg:space-y-0'>
      <MobileInfoBox>{t('filter:components.types.description')}</MobileInfoBox>
      <ScrollableSection className={className}>
        {types.map((type) => (
          <Checkbox
            key={type}
            id={type}
            name='types'
            value={selected.includes(type)}
            onChange={() => handleChange(type)}
            reversed={!isDesktop}
            effect={isDesktop ? 'hover' : undefined}
          >
            {t(`place:types.${type}`)}
          </Checkbox>
        ))}
      </ScrollableSection>
    </div>
  )
}
