import { useTranslation } from 'next-i18next'
import { Type } from '~/features/place.types'
import { PlaceTypeItems, PlaceTypes } from '~/types/place'
import FiveStars from '../Stars'

type ReviewCardProps = {
  star: number
  total: number
  
}

type IsPayedProps = {
  isPayed: boolean
}

type PlaceTypeProps = {
  type: Type
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ star, total }) => {
  return (
    <div className='flex gap-1 items-center'>
      <FiveStars star={star} iconSize='bx-xs' />
      <div className='text-sm text-gray-600 dark:text-gray-300'>{total}</div>
    </div>
  )
}

export const IsPayedCard: React.FC<IsPayedProps> = ({ isPayed }) => {
  const { t } = useTranslation('place')

  if (isPayed)
    return (
      <div className='flex gap-1 px-2 py-1 rounded-md items-center bg-orange-100 dark:bg-orange-900'>
        <div className='text-sm text-gray-600 dark:text-gray-300' suppressHydrationWarning>
          {t('card.payed')}
        </div>
      </div>
    )
  return (
    <div className='flex gap-1 px-2 py-1 rounded-md items-center bg-green-100 dark:bg-green-900'>
      <div className='text-sm text-gray-600 dark:text-gray-300' suppressHydrationWarning>
        {t('card.free')}
      </div>
    </div>
  )
}

export const PlaceTypeCard = ({ type }: PlaceTypeProps) => {
  const { t } = useTranslation('place')
  const current: PlaceTypeItems = !!PlaceTypes[type] ? PlaceTypes[type] : PlaceTypes[Type.Other]

  return (
    <div className={`flex gap-1 px-2 py-1 rounded-md items-center ${current.color}`}>
      <i className={`${current.icon}`}></i>
      <div className={`text-sm`} suppressHydrationWarning>
        {t(current.text)}
      </div>
    </div>
  )
}
