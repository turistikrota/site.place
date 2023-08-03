import { useTranslation } from 'react-i18next'
import { Type } from '~/features/place.types'
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

type PlaceTypeItems = {
  icon: string
  text: string
  color: string
}

const PlaceTypes: Record<Type, PlaceTypeItems> = {
  [Type.Eating]: {
    icon: 'bx bx-food-menu',
    text: 'types.eating',
    color: 'bg-secondary-100 dark:bg-secondary-900',
  },
  [Type.Coffee]: {
    icon: 'bx bx-coffee',
    text: 'types.coffee',
    color: 'bg-yellow-100 dark:bg-yellow-900',
  },
  [Type.Bar]: {
    icon: 'bx bx-drink',
    text: 'types.bar',
    color: 'bg-blue-100 dark:bg-blue-900',
  },
  [Type.Beach]: {
    icon: 'bx bx-swim',
    text: 'types.beach',
    color: 'bg-green-100 dark:bg-green-900',
  },
  [Type.Amaze]: {
    icon: 'bx bx-cycling',
    text: 'types.amaze',
    color: 'bg-purple-100 dark:bg-purple-900',
  },
  [Type.Shopping]: {
    icon: 'bx bx-shopping-bag',
    text: 'types.shopping',
    color: 'bg-orange-100 dark:bg-orange-900',
  },
  [Type.Transport]: {
    icon: 'bx bx-bus',
    text: 'types.transport',
    color: 'bg-indigo-100 dark:bg-indigo-900',
  },
  [Type.Culture]: {
    icon: 'bx bxs-landmark',
    text: 'types.culture',
    color: 'bg-gray-100 dark:bg-gray-900',
  },
  [Type.Nature]: {
    icon: 'bx bxs-tree',
    text: 'types.nature',
    color: 'bg-teal-100 dark:bg-teal-900',
  },
  [Type.Health]: {
    icon: 'bx bx-heart',
    text: 'types.health',
    color: 'bg-blue-100 dark:bg-blue-900',
  },
  [Type.Sport]: {
    icon: 'bx bx-football',
    text: 'types.sport',
    color: 'bg-green-100 dark:bg-green-900',
  },
  [Type.Nightlife]: {
    icon: 'bx bx-moon',
    text: 'types.nightlife',
    color: 'bg-indigo-100 dark:bg-indigo-900',
  },
  [Type.Other]: {
    icon: 'bx bx-plus',
    text: 'types.other',
    color: 'bg-gray-100 dark:bg-gray-900',
  },
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
