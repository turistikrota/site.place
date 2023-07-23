import { useTranslation } from 'react-i18next'
import ClearButton from './ClearButton'
import { PlaceFilterRequest } from '~/features/place.types'
import { usePlaceFilter } from '~/features/place.filter'

type Props = {
  title: string
  filterKey: keyof PlaceFilterRequest | null
  closeable?: boolean
  clearable?: boolean
  resultCount: number
  onClose: () => void
  onClearAll: () => void
}

type FilterComponent = React.FC<Props> & {
  TitleSection: typeof FilterTitleSection
  Title: typeof FilterTitle
  ClearButton: typeof ClearButton
}

const FilterTitleSection: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className='flex justify-between items-center'>{children}</div>
}
const FilterTitle: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <span className='text-2xl font-semibold'>{children}</span>
}

const FilterHead: FilterComponent = ({
  title,
  resultCount,
  filterKey,
  clearable = false,
  closeable = false,
  onClose,
  onClearAll,
}) => {
  const { t } = useTranslation('ux')
  const { query, push } = usePlaceFilter()

  const clear = () => {
    if (filterKey) {
      query.filter[filterKey] = undefined
      push(query)
    }
  }
  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          {closeable && (
            <span
              className='text-gray-600 dark:text-gray-300 mr-3 h-full flex items-center'
              onClick={onClose}
              role='button'
              title={t('button.close')}
              aria-label={t('button.close')}
            >
              <i className='bx bx-sm bx-arrow-back'></i>
            </span>
          )}
          <span className='text-2xl font-semibold'>{title}</span>
        </div>
        {filterKey && !!query.filter[filterKey] && <ClearButton onClear={() => clear()} />}
        {!filterKey && clearable && <ClearButton onClear={() => onClearAll()} text={t('button.clear-filter')} />}
      </div>
      {!closeable && (
        <span className='text-gray-500 text-sm dark:text-gray-400'>
          {resultCount} {t('label.result')}
        </span>
      )}
    </>
  )
}

FilterHead.TitleSection = FilterTitleSection
FilterHead.Title = FilterTitle
FilterHead.ClearButton = ClearButton

export default FilterHead