import { useState } from 'react'
import FilterPopup from './mobile/FilterPopup'
import FilterPopupSwitcher from './mobile/FilterPopupSwitcher'
import SortPopup from './mobile/SortPopup'
import { ContentProps } from '~/features/place.types'

export default function MobileFilterSection({ data, loading }: ContentProps) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  return (
    <>
      <FilterPopupSwitcher onFilterOpen={() => setFilterOpen(true)} onSortOpen={() => setSortOpen(true)} />
      <FilterPopup onClose={() => setFilterOpen(false)} open={filterOpen} data={data} loading={loading} />
      <SortPopup onClose={() => setSortOpen(false)} open={sortOpen} />
    </>
  )
}
