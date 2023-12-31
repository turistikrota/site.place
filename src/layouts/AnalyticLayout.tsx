import { useTranslation } from 'next-i18next'
import Script from 'next/script'
import { FC, PropsWithChildren } from 'react'

const TurkishAnalytics: FC = () => {
  return (
    <>
      <Script async={true} src='https://www.googletagmanager.com/gtag/js?id=G-6JLF4Y5XMX'></Script>
      <Script id='google-tag' strategy='afterInteractive'>
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-6JLF4Y5XMX');
  `}
      </Script>
    </>
  )
}

const EnglishAnalytics: FC = () => {
  return (
    <>
      <Script async={true} src='https://www.googletagmanager.com/gtag/js?id=G-VX790XP0CV'></Script>
      <Script id='google-tag' strategy='afterInteractive'>
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VX790XP0CV');
  `}
      </Script>
    </>
  )
}

const AnalyticLayout: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation()
  return (
    <>
      {children}
      {i18n.language === 'tr' ? <TurkishAnalytics /> : <EnglishAnalytics />}
    </>
  )
}

export default AnalyticLayout
