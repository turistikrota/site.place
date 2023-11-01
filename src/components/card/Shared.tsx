import { useTranslation } from 'next-i18next'
import { Type } from '~/features/place.types'
import { PlaceTypeItems, PlaceTypes } from '~/types/place'

type IsPayedProps = {
  isPayed: boolean
}

type PlaceTypeProps = {
  type: Type
}

export const IsPayedCard: React.FC<IsPayedProps> = ({ isPayed }) => {
  const { t } = useTranslation('place')

  if (isPayed)
    return (
      <div className='flex gap-1 px-2 py-1 rounded-md items-center bg-orange-200 bg-opacity-20  dark:bg-orange-600 dark:bg-opacity-20'>
        <div className='text-sm text-orange-600 dark:text-orange-200' suppressHydrationWarning>
          {t('card.payed')}
        </div>
      </div>
    )
  return (
    <div className='flex gap-1 px-2 py-1 rounded-md items-center bg-green-200 bg-opacity-20  dark:bg-green-600 dark:bg-opacity-20'>
      <div className='text-sm text-green-600 dark:text-green-200' suppressHydrationWarning>
        {t('card.free')}
      </div>
    </div>
  )
}

export const PlaceTypeCard = ({ type }: PlaceTypeProps) => {
  const { t } = useTranslation('place')
  const current: PlaceTypeItems = PlaceTypes[type] ? PlaceTypes[type] : PlaceTypes[Type.Other]

  return (
    <div className={`flex gap-1 px-2 py-1 rounded-md items-center ${current.color}`}>
      <i className={`${current.icon}`}></i>
      <div className={`text-sm`} suppressHydrationWarning>
        {t(current.text)}
      </div>
    </div>
  )
}
