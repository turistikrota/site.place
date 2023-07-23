import { PlaceFeatureListItem } from '~/features/place.types'
import { useQuery } from './query'
import { Services, apiUrl } from '~/config/services'

type UsePlaceFeaturesResponse = {
  features: PlaceFeatureListItem[]
  isLoading: boolean
  error: unknown | null
}

export const usePlaceFeatures = (): UsePlaceFeaturesResponse => {
  const {
    data: features,
    isLoading,
    error,
  } = useQuery<PlaceFeatureListItem[]>(apiUrl(Services.Place, '/feature'), true)
  return {
    features: features || [],
    isLoading,
    error,
  }
}
