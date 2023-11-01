import Alert from '@turistikrota/ui/cjs/alert'
import Button from '@turistikrota/ui/cjs/button'
import { ListResponse, Variant } from '@turistikrota/ui/cjs/types'
import debounce from '@turistikrota/ui/cjs/utils/debounce'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { ContentType, Coordinates, PlaceListItem } from '~/features/place.types'
import { usePlaceFilter } from '~/hooks/place.filter'
import { usePlaces } from '~/hooks/usePlaces'
import { isValidationError } from '~/types/error'
import { deepMerge } from '~/utils/deepMerge'
import PlaceListSeo from '../seo/PlaceListSeo'

type Props = {
  response?: ListResponse<PlaceListItem>
  error: any
}
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
    <div className='fixed bottom-6 right-1/2 transform translate-x-1/2 z-500'>
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

export default function ContentSwitcher({ response, error }: Props) {
  const { t } = useTranslation('common')
  const { query, push, immediatePush, isQueryChanged, isOnlyPageChanged, clean } = usePlaceFilter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { places, isLoading, refetch, nextPage, error: apiError } = usePlaces(query, response)
  const active = useMemo(() => {
    return query.filter.v ? query.filter.v : 'list'
  }, [query.filter])
  const debouncedFilter = debounce(() => {
    if (isLoading || !!apiError) return
    if (isOnlyPageChanged) return nextPage(query.filter, places.page + 1)
    refetch(query.filter)
  }, 500)

  useEffect(() => {
    if (!isQueryChanged && !isOnlyPageChanged) return
    debouncedFilter()
  }, [query])

  useEffect(() => {
    if (!error || !isValidationError(error)) return
    setErrorMessage(error.map((err) => err.message).join(', '))
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
    clean()
  }, [error])

  const toggleActive = (newActive: ContentType) => {
    if (newActive === 'list' && query.limit) {
      return immediatePush(deepMerge(query, { limit: undefined, page: 1, filter: { v: 'list' } }))
    } else if (newActive === 'map' && query.limit !== 1000) {
      immediatePush(deepMerge(query, { limit: 1000, page: 1, filter: { v: 'map' } }))
    }
  }

  const onCoordinateChange = (coordinates: Coordinates, zoom: number) => {
    push(deepMerge(query, { filter: { coordinates, distance: zoom } }))
  }

  if (active === 'list') {
    return (
      <>
        <PlaceListSeo coordinates={query.filter.coordinates} type={query.filter.types} />
        {errorMessage && (
          <div className='p-4 pb-0'>
            <Alert type='error' closable onClose={() => setErrorMessage('')}>
              {errorMessage}
            </Alert>
          </div>
        )}
        <DynamicList data={places} loading={isLoading} isNext={places.isNext} />
        <FixedButton
          text={t('content-switch.map')}
          icon='map-alt'
          onClick={() => toggleActive('map')}
          variant='primary'
        />
      </>
    )
  }

  return (
    <>
      <PlaceListSeo coordinates={query.filter.coordinates} type={query.filter.types} />
      {errorMessage && (
        <div className='p-4 pb-0'>
          <Alert type='error' closable onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        </div>
      )}
      <DynamicMap data={places} loading={isLoading} onChange={onCoordinateChange} position={[41.0082, 28.9784]} />
      <FixedButton
        text={t('content-switch.list')}
        icon='list-ul'
        onClick={() => toggleActive('list')}
        variant='secondary'
      />
    </>
  )
}
