import Carousel from '@turistikrota/ui/cjs/carousel'
import { useImagePreview } from '@turistikrota/ui/cjs/image/preview'

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
      sizeClassName='h-104'
      onClick={openPreview}
      autoPlay
      showSubImages
    />
  )
}
