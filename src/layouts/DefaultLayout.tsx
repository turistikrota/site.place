import { TooltipProvider } from '@turistikrota/ui/cjs/tooltip/provider'
import OnlyMobileHeader from '~/components/headers/OnlyMobileHeader'
import { AccountProvider } from '~/hooks/account'

type Props = {
  accessTokenIsExists: boolean
  isAccountCookieExists: boolean
}

export default function DefaultLayout({
  children,
  accessTokenIsExists,
  isAccountCookieExists,
}: React.PropsWithChildren<Props>) {
  return (
    <AccountProvider accessTokenIsExists={accessTokenIsExists} isAccountCookieExists={isAccountCookieExists}>
      <OnlyMobileHeader accessTokenIsExists={accessTokenIsExists} />
      <main>
        <TooltipProvider>{children}</TooltipProvider>
      </main>
    </AccountProvider>
  )
}
