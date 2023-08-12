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
    <>
      <OnlyMobileHeader accessTokenIsExists={accessTokenIsExists} />
      <AccountProvider accessTokenIsExists={accessTokenIsExists} isAccountCookieExists={isAccountCookieExists}>
        <main>
          <TooltipProvider>{children}</TooltipProvider>
        </main>
      </AccountProvider>
    </>
  )
}
