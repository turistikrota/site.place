import OnlyMobileHeader from '~/components/headers/OnlyMobileHeader'
import { TooltipProvider } from '@turistikrota/ui/cjs/tooltip/provider'
import { useSizeWithoutHeader } from '~/hooks/dom'

export default function MapLayout({ children }: React.PropsWithChildren) {
  const size = useSizeWithoutHeader()
  return (
    <>
      <OnlyMobileHeader />
      <main
        className='h-full'
        style={{
          minHeight: size,
        }}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </main>
    </>
  )
}
