import Button from '@turistikrota/ui/cjs/button'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Coordinates } from '~/features/place.types'

type Props = {
  coordinates: Coordinates
}

const OpenWithGoogleMaps: React.FC<Props> = ({ coordinates }) => {
  const { t } = useTranslation('place')

  const openUrl = () => {
    window.open(`https://maps.google.com/?q=${coordinates[0]},${coordinates[1]}`, '_blank')
  }

  return (
    <Button className='col-span-4 flex items-center justify-center gap-2' variant='secondary' onClick={openUrl}>
      {t('directions')}
    </Button>
  )
}

export default OpenWithGoogleMaps
