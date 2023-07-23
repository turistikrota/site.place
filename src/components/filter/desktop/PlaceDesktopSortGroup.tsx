import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import Dropdown from '@turistikrota/ui/dropdown'
import { Order, Sort } from '~/features/place.types'
import { usePlaceFilter, usePlaceSort } from '~/features/place.filter'

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
  const { t } = useTranslation('sort.mobile.sort-by')

  useEffect(() => {
    setCurrentSort(selected ?? defaultSort)
  }, [selected])

  return (
    <Dropdown>
      <Dropdown.Button active={currentSort !== defaultSort}>{t('title')}</Dropdown.Button>
      <Dropdown.Overlay>
        {sorts.map((sort) => (
          <Dropdown.OverlayItem key={sort} onClick={() => onSelect(sort)} active={sort === currentSort}>
            {t(sort)}
          </Dropdown.OverlayItem>
        ))}
      </Dropdown.Overlay>
    </Dropdown>
  )
}

const OrderSection: React.FC<OrderSectionProps> = ({ selected, onSelect }) => {
  const { defaultOrder, orders } = usePlaceSort()
  const [currentOrder, setCurrentOrder] = useState<Order>(defaultOrder)
  const { t } = useTranslation('sort.mobile.order-by')

  useEffect(() => {
    setCurrentOrder(selected ?? defaultOrder)
  }, [selected])

  return (
    <Dropdown>
      <Dropdown.Button active={currentOrder !== defaultOrder}>{t('title')}</Dropdown.Button>
      <Dropdown.Overlay>
        {orders.map((order) => (
          <Dropdown.OverlayItem key={order} onClick={() => onSelect(order)} active={order === currentOrder}>
            {t(order)}
          </Dropdown.OverlayItem>
        ))}
      </Dropdown.Overlay>
    </Dropdown>
  )
}

export default function PlaceDesktopSortGroup() {
  const { defaultOrder, defaultSort } = usePlaceSort()
  const { t } = useTranslation('sort.mobile')
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
    console.log('sort', sort)
    query.filter.sort = sort
    push(query)
  }

  const onOrderSelect = (order: Order) => {
    query.filter.order = order
    push(query)
  }
  return (
    <div className='flex gap-3'>
      <SortSection selected={query.filter.sort} onSelect={onSortSelect} />
      <OrderSection selected={query.filter.order} onSelect={onOrderSelect} />
    </div>
  )
}
