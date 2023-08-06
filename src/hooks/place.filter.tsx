import { createContext, useContext } from 'react'
import { usePlaceFilterProvider } from '~/features/place.filter'
import { PlaceFilterRequest } from '~/features/place.types'
import { PaginationRequest } from '~/types/pagination'

type Callback = () => void

type PlaceFilterContext = {
  query: PaginationRequest<PlaceFilterRequest>
  push: (query: PaginationRequest<PlaceFilterRequest>, cb?: Callback) => void
  clean: (cb?: Callback) => void
  isFiltered: boolean
  isQueryChanged: boolean
  isOnlyPageChanged: boolean
}

const PlaceFilterContext = createContext<PlaceFilterContext>({
  query: {
    page: 1,
    limit: 10,
    filter: {},
  },
  push: () => {},
  clean: () => {},
  isFiltered: false,
  isQueryChanged: false,
  isOnlyPageChanged: false,
})

export const usePlaceFilter = () => useContext(PlaceFilterContext)

export const PlaceFilterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { ...values } = usePlaceFilterProvider()
  return <PlaceFilterContext.Provider value={values}>{children}</PlaceFilterContext.Provider>
}
