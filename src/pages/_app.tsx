import '@turistikrota/ui/assets/config.css'
import '~/styles/globals.css'
import 'boxicons/css/boxicons.min.css'
import 'sspin/dist/index.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
