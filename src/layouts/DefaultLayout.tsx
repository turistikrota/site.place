import { TooltipProvider } from '@turistikrota/ui/cjs/tooltip/provider'
import OnlyMobileHeader from '~/components/headers/OnlyMobileHeader'
import { AccountProvider } from '~/hooks/account'

type Props = {
  accessTokenIsExists: boolean
  accountCookie: string
}

export default function DefaultLayout({
  children,
  accessTokenIsExists,
  accountCookie,
}: React.PropsWithChildren<Props>) {
  return (
    <AccountProvider accessTokenIsExists={accessTokenIsExists} accountCookie={accountCookie}>
      <OnlyMobileHeader accessTokenIsExists={accessTokenIsExists} />
      <main>
        <TooltipProvider>{children}</TooltipProvider>
      </main>
    </AccountProvider>
  )
}
