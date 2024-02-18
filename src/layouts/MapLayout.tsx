import { TooltipProvider } from '@turistikrota/ui/tooltip/provider'
import OnlyMobileHeader from '~/components/headers/OnlyMobileHeader'
import { AccountProvider } from '~/hooks/account'
import { useSizeWithoutHeader } from '~/hooks/dom'

type Props = {
  accessTokenIsExists: boolean
  accountCookie: string
}

export default function MapLayout({ children, accessTokenIsExists, accountCookie }: React.PropsWithChildren<Props>) {
  const size = useSizeWithoutHeader()
  return (
    <AccountProvider accessTokenIsExists={accessTokenIsExists} accountCookie={accountCookie}>
      <main
        className='h-full'
        style={{
          minHeight: size,
        }}
      >
        <OnlyMobileHeader accessTokenIsExists={accessTokenIsExists} />
        <TooltipProvider>{children}</TooltipProvider>
      </main>
    </AccountProvider>
  )
}
