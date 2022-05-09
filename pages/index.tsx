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

      {/* Meta Tags */}
      {/* https://metatags.io/ */}

      {/* Primary Meta Tags */}
      <meta name='title' content='ChrisKumm.com' />
      <meta name='description' content='Professional Full-Stack Developer' />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://www.chriskumm.com/' />
      <meta property='og:title' content='ChrisKumm.com' />
      <meta
        property='og:description'
        content='Professional Full-Stack Developer'
      />
      <meta
        property='og:image'
        content='https://www.chriskumm.com/images/cklogo-open-graph.jpg'
      />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://www.chriskumm.com/' />
      <meta property='twitter:title' content='ChrisKumm.com' />
      <meta
        property='twitter:description'
        content='Professional Full-Stack Developer'
      />
      <meta
        property='twitter:image'
        content='https://www.chriskumm.com/images/cklogo-open-graph.jpg'
      />
    </Head>

    <Hero />
    <Portfolio />
    <About />
    <Contact />
  </>
)

export default Home
