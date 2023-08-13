import { TooltipProvider } from '@turistikrota/ui/cjs/tooltip/provider'
import OnlyMobileHeader from '~/components/headers/OnlyMobileHeader'
import { AccountProvider } from '~/hooks/account'
import { useSizeWithoutHeader } from '~/hooks/dom'

type Props = {
  accessTokenIsExists: boolean
  isAccountCookieExists: boolean
}

export default function MapLayout({
  children,
  accessTokenIsExists,
  isAccountCookieExists,
}: React.PropsWithChildren<Props>) {
  const size = useSizeWithoutHeader()
  return (
    <AccountProvider accessTokenIsExists={accessTokenIsExists} isAccountCookieExists={isAccountCookieExists}>
      <OnlyMobileHeader accessTokenIsExists={accessTokenIsExists} />
      <main
        className='h-full'
        style={{
          minHeight: size,
        }}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </main>
    </AccountProvider>
  )
}
