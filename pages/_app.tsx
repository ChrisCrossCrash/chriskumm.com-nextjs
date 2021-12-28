import type { AppProps } from 'next/app'
import '@fontsource/metropolis/900.css'
import '@fontsource/inter'
import '@fontsource/inter/700.css'
import '@fontsource/orbitron'
import 'modern-normalize'
import '@chris-cross-crash/ck-css'
import '@chris-cross-crash/ck-css/colors.scss'
import '../styles/globals.scss'
import '../styles/buttons.scss'
import { ThemeProvider } from '../contexts/ThemeContext'
import '../styles/animations.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
