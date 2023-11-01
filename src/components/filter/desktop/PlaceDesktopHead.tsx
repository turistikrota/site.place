import ClearButton from '../mobile/ClearButton'

type TitleProps = {
  className?: string
}

type PlaceDesktopHeadType = React.FC<React.PropsWithChildren> & {
  Title: typeof Title
  Clear: typeof ClearButton
}

const Title: React.FC<React.PropsWithChildren<TitleProps>> = ({ children, className }) => {
  return <div className={`font-bold text-gray-700 dark:text-gray-200 ${className ? className : ''}`}>{children}</div>
}

const PlaceDesktopHead: PlaceDesktopHeadType = ({ children }) => {
  return <div className='flex justify-between items-center mb-2'>{children}</div>
}

PlaceDesktopHead.Title = Title
PlaceDesktopHead.Clear = ClearButton

export default PlaceDesktopHead
