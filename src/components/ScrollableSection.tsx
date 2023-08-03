type Props = {
  className?: string
  disableOverflow?: boolean
}

export default function ScrollableSection({
  className,
  children,
  disableOverflow = false,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={`${className ? className : 'max-h-[50vh] mt-2 space-y-1'} ${
        !disableOverflow ? 'overflow-y-auto overflow-x-hidden' : ''
      }`}
    >
      {children}
    </div>
  )
}
