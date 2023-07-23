import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Button from '@turistikrota/ui/cjs/button'
import debounce from '@turistikrota/ui/cjs/utils/debounce'
import { ListResponse, Variant } from '@turistikrota/ui/cjs/types'
import { PlaceListItem, isPlaceListResponse } from '~/features/place.types'
import { usePlaceFilter } from '~/features/place.filter'
import { usePlaces } from '~/hooks/usePlaces'

type ContentType = 'list' | 'map'

export type ContentProps = {
  loading: boolean
  data: ListResponse<PlaceListItem> | null
}

const DynamicList = dynamic(() => import('./list'))
const DynamicMap = dynamic(() => import('./map'), { ssr: false })

type ButtonProps = {
  text: string
  icon: string
  onClick: () => void
  variant: Variant
}

const FixedButton: React.FC<ButtonProps> = ({ text, variant, icon, onClick }) => {
  return (
    <div className='fixed bottom-10 right-1/2 transform translate-x-1/2 z-500'>
      <Button
        onClick={() => onClick()}
        className='hover:scale-103 hover:shadow-lg flex items-center justify-center gap-2 text-lg'
        variant={variant}
        title={text}
      >
        <i className={`bx bx-sm bx-${icon}`} />
        {text}
      </Button>
    </div>
  )
}

export default function ContentSwitcher() {
  const { t } = useTranslation('content-switch')
  const { query } = usePlaceFilter()
  const { places, isLoading, refetch } = usePlaces(query)
  const [active, setActive] = useState<ContentType>('list')
  const debouncedFilter = debounce(() => {
    refetch()
  }, 500)

  useEffect(() => {
    debouncedFilter()
  }, [query])

  if (active === 'list') {
    return (
      <>
        <DynamicList data={places} loading={isLoading} />
        <FixedButton text={t('map')} icon='map-alt' onClick={() => setActive('map')} variant='primary' />
      </>
    )
  }

  return (
    <>
      <DynamicMap data={places} loading={isLoading} position={[41.0082, 28.9784]} />
      <FixedButton text={t('list')} icon='list-ul' onClick={() => setActive('list')} variant='secondary' />
    </>
  )
}
