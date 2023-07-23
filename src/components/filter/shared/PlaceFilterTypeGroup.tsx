import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { MobileInfoBox } from '@turistikrota/ui/accessibility/info'
import Checkbox from '@turistikrota/ui/form/checkbox'
import { useIsDesktop } from '@turistikrota/ui/hooks/dom'
import { Type } from '~/features/place.types'
import { usePlaceFilter } from '~/features/place.filter'

const types = Object.values(Type)

export default function PlaceFilterTypeGroup() {
  const [selected, setSelected] = useState<Type[]>([])
  const { t } = useTranslation('filter.components.types')
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
      <MobileInfoBox>{t('description')}</MobileInfoBox>
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
          {t(`translation.${type}`)}
        </Checkbox>
      ))}
    </div>
  )
}
