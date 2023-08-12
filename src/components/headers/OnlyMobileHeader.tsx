import MobileHeader from '@turistikrota/ui/cjs/headers/mobile'
import dynamic from 'next/dynamic'
import Logo from '../Logo'
import HeaderLogo from './HeaderLogo'

type Props = {
  accessTokenIsExists: boolean
}

const AccountHeaderButton = dynamic(() => import('./AccountHeaderButton'), {
  ssr: false,
})

export default function OnlyMobileHeader({ accessTokenIsExists }: Props) {
  return (
    <>
      <MobileHeader>
        <MobileHeader.Left>
          <HeaderLogo>
            <Logo width={186} height={30} />
          </HeaderLogo>
        </MobileHeader.Left>
        <MobileHeader.Fill className='hidden md:flex'>{``}</MobileHeader.Fill>
        <MobileHeader.Right>
          <AccountHeaderButton accessTokenIsExists={accessTokenIsExists} />
        </MobileHeader.Right>
      </MobileHeader>
    </>
  )
}
