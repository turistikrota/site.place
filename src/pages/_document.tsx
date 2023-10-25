import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script async={true} src='https://www.googletagmanager.com/gtag/js?id=G-6JLF4Y5XMX'></Script>
        <Script id='google-tag' strategy='afterInteractive'>
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-6JLF4Y5XMX');
`}
        </Script>
      </body>
    </Html>
  )
}
