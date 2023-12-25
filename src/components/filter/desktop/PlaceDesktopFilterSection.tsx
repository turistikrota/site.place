type Props = {
  className?: string
}

const PlaceDesktopFilterSection: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  return <div className={`px-2 pb-2 border-b ${className ? className : ''}`}>{children}</div>
}

export default PlaceDesktopFilterSection
