import '@fontsource/metropolis/900.css'
import '@fontsource/inter'
import '@fontsource/inter/700.css'
import 'modern-normalize'
import '@chris-cross-crash/ck-css'
import '@chris-cross-crash/ck-css/colors.scss'
import '../styles/globals.scss'
import '../styles/buttons.scss'
import '../styles/animations.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
