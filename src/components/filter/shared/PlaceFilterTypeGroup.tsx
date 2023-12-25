import { MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Checkbox from '@turistikrota/ui/form/checkbox'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import ScrollableSection from '~/components/ScrollableSection'
import { Type } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'

const types = Object.values(Type)

type Props = {
  className?: string
}

export default function PlaceFilterTypeGroup({ className }: Props) {
  const { t } = useTranslation(['filter', 'place'])
  const { query, push } = usePlaceFilter()
  const isDesktop = useIsDesktop()

  const selected = useMemo(() => {
    if (!query.filter.types) return []
    return query.filter.types
  }, [query])

  const handleChange = (type: Type) => {
    let newList: Type[] = []
    if (selected.includes(type)) {
      newList = selected.filter((item) => item !== type)
    } else {
      newList = [...selected, type]
    }
    push({
      ...query,
      filter: {
        ...query.filter,
        types: newList,
      },
    })
  }

  return (
    <div className='space-y-2 lg:space-y-0'>
      <MobileInfoBox>{t('filter:components.types.description')}</MobileInfoBox>
      <ScrollableSection className={className ? className : 'space-y-2 lg:space-y-0 max-h-60'}>
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
