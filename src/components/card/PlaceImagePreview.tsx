import Carousel from '@turistikrota/ui/carousel'
import { useImagePreview } from '@turistikrota/ui/image/preview'

type Props = {
  images: string[]
  title: string
}

export default function PlaceImagePreview({ images, title }: Props) {
  const preview = useImagePreview()

  const openPreview = (_: string, idx: number) => {
    preview.show(idx)
  }

  return (
    <Carousel
      imageAltPrefix={title}
      images={images}
      onClick={openPreview}
      autoPlay
      variant={Carousel.Variants.DetailVertical}
      showPreview
    />
  )
}
