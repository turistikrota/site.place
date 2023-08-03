import { TooltipProvider } from '@turistikrota/ui/cjs/tooltip/provider'
import OnlyMobileHeader from '~/components/headers/OnlyMobileHeader'

export default function DefaultLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <OnlyMobileHeader />
      <main>
        <TooltipProvider>{children}</TooltipProvider>
      </main>
    </>
  )
}
