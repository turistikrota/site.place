import Logo from '../Logo'
//import AccountHeaderButton from './AccountHeaderButton'
import MobileHeader from '@turistikrota/ui/headers/mobile'
import HeaderLogo from './HeaderLogo'

export default function OnlyMobileHeader() {
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
          {/* 
          <AccountHeaderButton />
        */}
        </MobileHeader.Right>
      </MobileHeader>
    </>
  )
}
