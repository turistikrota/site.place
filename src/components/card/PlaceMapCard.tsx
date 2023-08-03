import Carousel from '@turistikrota/ui/cjs/carousel'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

type Props = {
  images: string[]
  slug: string
}

export default function PlaceMapCard({ images, slug }: Props) {
  const checkOutsideClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    // @ts-ignore
    if (['i', 'button'].includes(e.target?.tagName.toLowerCase())) return e.preventDefault()
  }

  return (
    <div className='flex flex-col bg-second rounded-md'>
      <Link href={slug} target='_blank' onClick={checkOutsideClick}>
        <Carousel images={images} sizeClassName='h-72 w-72' />
      </Link>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <div className='text-xl font-bold'>Villa Bliss</div>
            <div className='text-sm'>Kalkan, Antalya</div>
          </div>
        </div>
      </div>
    </div>
  )
}
