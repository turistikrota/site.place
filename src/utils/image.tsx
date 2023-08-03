import { PlaceImage } from '~/features/place.types'

export const mapAndSortImages = (images: PlaceImage[]): string[] => {
  return images.sort((a, b) => a.order - b.order).map((image) => image.url)
}
