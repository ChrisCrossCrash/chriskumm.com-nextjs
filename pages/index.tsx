import type { NextPage } from 'next'
import Head from 'next/head'
import { Hero } from '../components/Hero/Hero'
import { Portfolio } from '../components/Portfolio/Portfolio'
import { About } from '../components/About/About'
import { Contact } from '../components/Contact/Contact'

const Home: NextPage = () => (
  <>
    <Head>
      <title>ChrisKumm.com</title>
      <meta name='description' content='Professional Full-Stack Developer' />

      {/* https://realfavicongenerator.net/ */}

      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicons/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicons/favicon-16x16.png'
      />
      <link rel='manifest' href='/site.webmanifest' />
      <link
        rel='mask-icon'
        href='/favicons/safari-pinned-tab.svg'
        color='#5bbad5'
      />
      <meta name='msapplication-TileColor' content='#2b5797' />
      <meta name='theme-color' content='#ffffff' />
    </Head>

    <Hero />
    <Portfolio />
    <About />
    <Contact />
  </>
)

export default Home
