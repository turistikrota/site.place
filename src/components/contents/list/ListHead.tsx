import PlaceDesktopSortGroup from '~/components/filter/desktop/PlaceDesktopSortGroup'

const ListHead: React.FC = () => {
  return (
    <section className='flex items-center justify-between w-full border-none pt-0 lg:pt-4 pb-4'>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-300'>Places</h1>
        <p className='text-sm text-gray-600 dark:text-gray-400'>Find your favorite places</p>
      </div>
      <PlaceDesktopSortGroup />
    </section>
  )
}

export default ListHead
