import { useTranslation } from 'next-i18next'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  const { i18n } = useTranslation()
  return (
    <Html lang={i18n.language}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
