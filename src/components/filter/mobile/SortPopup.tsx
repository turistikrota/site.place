import RadioGroup from '@turistikrota/ui/cjs/form/radio/group'
import Popup from '@turistikrota/ui/cjs/popup'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { usePlaceSort } from '~/features/place.filter'
import { Order, Sort } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'
import FilterHead from './FilterPopupHead'

type Props = {
  onClose: () => void
  open: boolean
}

type SortSectionProps = {
  selected?: Sort
  onSelect: (sort: Sort) => void
}

type OrderSectionProps = {
  selected?: Order
  onSelect: (order: Order) => void
}

const SortSection: React.FC<SortSectionProps> = ({ selected, onSelect }) => {
  const { defaultSort, sorts } = usePlaceSort()
  const [currentSort, setCurrentSort] = useState<Sort>(defaultSort)
  const { t } = useTranslation('sort')

  useEffect(() => {
    setCurrentSort(selected ?? defaultSort)
  }, [selected])

  return (
    <RadioGroup
      title={t('mobile.sort-by.title')}
      clearText={t('mobile.sort-by.clear-text')}
      clearAriaLabel={t('mobile.sort-by.clear-aria-label')}
    >
      {sorts.map((sort) => (
        <RadioGroup.Item
          key={sort}
          id={sort}
          name='sort-by'
          reverse
          checked={currentSort === sort}
          onChange={() => onSelect(sort)}
        >
          {t(`mobile.sort-by.${sort}`)}
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  )
}

const OrderSection: React.FC<OrderSectionProps> = ({ selected, onSelect }) => {
  const { defaultOrder, orders } = usePlaceSort()
  const [currentOrder, setCurrentOrder] = useState<Order>(defaultOrder)
  const { t } = useTranslation('sort')

  useEffect(() => {
    setCurrentOrder(selected ?? defaultOrder)
  }, [selected])

  return (
    <RadioGroup
      title={t('mobile.order-by.title')}
      clearText={t('mobile.order-by.clear-text')}
      clearAriaLabel={t('mobile.order-by.clear-aria-label')}
    >
      {orders.map((order, idx) => (
        <RadioGroup.Item
          key={idx}
          id={`${order}-${idx}`}
          name='order'
          reverse
          checked={currentOrder === order}
          onChange={() => onSelect(order)}
        >
          {t(`mobile.order-by.${order}`)}
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  )
}

const SortPopup: React.FC<Props> = ({ onClose, open }) => {
  const { defaultOrder, defaultSort } = usePlaceSort()
  const { t } = useTranslation('sort')
  const [isDefault, setIsDefault] = useState<boolean>(true)
  const { query, push } = usePlaceFilter()

  useEffect(() => {
    const isSortDefault = query.filter.sort ? query.filter.sort === defaultSort : true
    const isOrderDefault = query.filter.order ? query.filter.order === defaultOrder : true
    setIsDefault(isSortDefault && isOrderDefault)
  }, [query])

  const clear = () => {
    query.filter.sort = undefined
    query.filter.order = undefined
    push(query)
  }

  const onSortSelect = (sort: Sort) => {
    query.filter.sort = sort
    push(query)
  }

  const onOrderSelect = (order: Order) => {
    query.filter.order = order
    push(query)
  }

  return (
    <Popup
      onClose={onClose}
      open={open}
      size='2xl'
      head={
        <FilterHead.TitleSection>
          <FilterHead.Title>{t('mobile.title')}</FilterHead.Title>
          {!isDefault && <FilterHead.ClearButton onClear={() => clear()} />}
        </FilterHead.TitleSection>
      }
    >
      <SortSection selected={query.filter.sort} onSelect={onSortSelect} />
      <OrderSection selected={query.filter.order} onSelect={onOrderSelect} />
    </Popup>
  )
}

export default SortPopup
