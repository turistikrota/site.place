import '@turistikrota/ui/assets/config.css'
import '~/styles/globals.css'
import 'boxicons/css/boxicons.min.css'
import 'sspin/dist/index.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default appWithTranslation(App)
