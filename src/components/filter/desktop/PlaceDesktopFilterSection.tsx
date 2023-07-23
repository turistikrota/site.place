type Props = {
  className?: string
}

const PlaceDesktopFilterSection: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  return <div className={`px-4 pb-4 border-b ${className ? className : ''}`}>{children}</div>
}

export default PlaceDesktopFilterSection
