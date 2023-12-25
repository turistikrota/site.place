import { ListResponse } from '@turistikrota/ui/types'
import { Services, apiUrl } from '~/config/services'
import { PlaceFilterRequest, PlaceListItem } from '~/features/place.types'
import { PaginationRequest } from '~/types/pagination'
import { useQuery } from './query'

type UsePlacesResult = {
  places: ListResponse<PlaceListItem>
  isLoading: boolean
  error: unknown | null
  refetch: (params: any) => void
  nextPage: (params: any, page: number) => void
}

export const usePlaces = (
  query: PaginationRequest<PlaceFilterRequest>,
  initial?: ListResponse<PlaceListItem>,
): UsePlacesResult => {
  const {
    data: places,
    isLoading,
    error,
    refetch,
    nextPage,
  } = useQuery<ListResponse<PlaceListItem>>(
    apiUrl(Services.Place, `/?page=${query.page ?? 1}&limit=${query.limit ?? 9}`),
    {
      cache: false,
      method: 'POST',
      params: query.filter,
      withSSR: initial,
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
    nextPage,
  }
}
