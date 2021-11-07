import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Hero } from '../components/Hero/Hero'
import { Portfolio } from '../components/Portfolio/Portfolio'

const Home: NextPage = () => (
  <>
    <Head>
      <title>ChrisKumm.com</title>
      <meta name='description' content='Professional Full-Stack Developer' />
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Hero />
    <Portfolio />
  </>
)

export default Home
