import Dropdown from '@turistikrota/ui/dropdown'
import { deepMerge } from '@turistikrota/ui/utils'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { usePlaceSort } from '~/features/place.filter'
import { Order, Sort } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'

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
    <Dropdown>
      <Dropdown.Button active={currentSort !== defaultSort}>{t('mobile.sort-by.title')}</Dropdown.Button>
      <Dropdown.Overlay>
        {sorts.map((sort) => (
          <Dropdown.OverlayItem key={sort} onClick={() => onSelect(sort)} active={sort === currentSort}>
            {t(`mobile.sort-by.${sort}`)}
          </Dropdown.OverlayItem>
        ))}
      </Dropdown.Overlay>
    </Dropdown>
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
    <Dropdown>
      <Dropdown.Button active={currentOrder !== defaultOrder}>{t('mobile.order-by.title')}</Dropdown.Button>
      <Dropdown.Overlay>
        {orders.map((order) => (
          <Dropdown.OverlayItem key={order} onClick={() => onSelect(order)} active={order === currentOrder}>
            {t(`mobile.order-by.${order}`)}
          </Dropdown.OverlayItem>
        ))}
      </Dropdown.Overlay>
    </Dropdown>
  )
}

export default function PlaceDesktopSortGroup() {
  const { defaultOrder, defaultSort } = usePlaceSort()
  const [isDefault, setIsDefault] = useState<boolean>(true)
  const { query, push } = usePlaceFilter()

  useEffect(() => {
    const isSortDefault = query.filter.sort ? query.filter.sort === defaultSort : true
    const isOrderDefault = query.filter.order ? query.filter.order === defaultOrder : true
    setIsDefault(isSortDefault && isOrderDefault)
  }, [query])

  const onSortSelect = (sort: Sort) => {
    push(deepMerge(query, { filter: { sort } }))
  }

  const onOrderSelect = (order: Order) => {
    push(deepMerge(query, { filter: { order } }))
  }

  return (
    <div className='flex gap-3'>
      <SortSection selected={query.filter.sort} onSelect={onSortSelect} />
      <OrderSection selected={query.filter.order} onSelect={onOrderSelect} />
    </div>
  )
}
