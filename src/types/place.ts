import { Type } from '~/features/place.types'

export type PlaceTypeItems = {
  icon: string
  text: string
  color: string
  variant?: string
}

export const PlaceTypes: Record<Type, PlaceTypeItems> = {
  [Type.Eating]: {
    icon: 'bx bx-food-menu',
    text: 'types.eating',
    color: 'bg-secondary-100 dark:bg-secondary-900',
    variant: 'secondary',
  },
  [Type.Coffee]: {
    icon: 'bx bx-coffee',
    text: 'types.coffee',
    color: 'bg-yellow-100 dark:bg-yellow-900',
    variant: 'yellow',
  },
  [Type.Bar]: {
    icon: 'bx bx-drink',
    text: 'types.bar',
    color: 'bg-blue-100 dark:bg-blue-900',
    variant: 'blue',
  },
  [Type.Beach]: {
    icon: 'bx bx-swim',
    text: 'types.beach',
    color: 'bg-green-100 dark:bg-green-900',
    variant: 'green',
  },
  [Type.Amaze]: {
    icon: 'bx bx-cycling',
    text: 'types.amaze',
    color: 'bg-purple-100 dark:bg-purple-900',
    variant: 'purple',
  },
  [Type.Shopping]: {
    icon: 'bx bx-shopping-bag',
    text: 'types.shopping',
    color: 'bg-orange-100 dark:bg-orange-900',
    variant: 'orange',
  },
  [Type.Transport]: {
    icon: 'bx bx-bus',
    text: 'types.transport',
    color: 'bg-indigo-100 dark:bg-indigo-900',
    variant: 'indigo',
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
    variant: 'teal',
  },
  [Type.Health]: {
    icon: 'bx bx-heart',
    text: 'types.health',
    color: 'bg-blue-100 dark:bg-blue-900',
    variant: 'blue',
  },
  [Type.Sport]: {
    icon: 'bx bx-football',
    text: 'types.sport',
    color: 'bg-green-100 dark:bg-green-900',
    variant: 'green',
  },
  [Type.Nightlife]: {
    icon: 'bx bx-moon',
    text: 'types.nightlife',
    color: 'bg-indigo-100 dark:bg-indigo-900',
    variant: 'indigo',
  },
  [Type.Other]: {
    icon: 'bx bx-plus',
    text: 'types.other',
    color: 'bg-gray-100 dark:bg-gray-900',
  },
}
