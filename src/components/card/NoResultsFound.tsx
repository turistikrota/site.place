// NoResultsFound.tsx
import Button from '@turistikrota/ui/cjs/button'
import React from 'react'

interface NoResultsFoundProps {
  onResetFilters?: () => void
}

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ onResetFilters }) => {
  return (
    <div className='flex flex-col items-center justify-center py-12 text-gray-600 dark:text-gray-200'>
      <i className='bx bx-2xl bx-search-alt'></i>
      <h1 className='text-2xl font-bold mb-4'>Sonuç Bulunamadı</h1>
      <p className='text-lg mb-6'>Filtrelerinizle eşleşen bir sonuç bulamadık.</p>
      {onResetFilters && (
        <Button onClick={() => onResetFilters()} block={false}>
          Filtreleri Sıfırla
        </Button>
      )}
    </div>
  )
}

export default NoResultsFound
