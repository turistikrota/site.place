import { ListResponse } from '@turistikrota/ui/cjs/types'
import { PlaceFilterRequest, PlaceListItem } from '~/features/place.types'
import { PaginationRequest } from '~/types/pagination'
import { useQuery } from './query'
import { placeToQuery } from '~/features/place.filter'
import { Services, apiUrl } from '~/config/services'

type UsePlacesResult = {
  places: ListResponse<PlaceListItem>
  isLoading: boolean
  error: unknown | null
  refetch: () => void
}

export const usePlaces = (query: PaginationRequest<PlaceFilterRequest>): UsePlacesResult => {
  const {
    data: places,
    isLoading,
    error,
    refetch,
  } = useQuery<ListResponse<PlaceListItem>>(
    apiUrl(Services.Place, `/?page=${query.page ?? 1}&limit=${query.limit ?? 100}`),
    {
      cache: true,
      method: 'POST',
      params: query,
    },
  )
  return {
    places: places || {
      filteredTotal: 0,
      isNext: false,
      isPrev: false,
      list: [],
      page: 0,
      total: 0,
    },
    isLoading,
    error,
    refetch,
  }
}
