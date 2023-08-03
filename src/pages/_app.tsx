import '@turistikrota/ui/assets/config.css'
import 'boxicons/css/boxicons.min.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import 'sspin/dist/index.css'
import '~/styles/globals.css'
import '~/styles/leaflet.css'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default appWithTranslation(App)
