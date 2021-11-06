import type { NextPage } from 'next'
import Head from 'next/head'
import { Hero } from '../components/Hero/Hero'

const Home: NextPage = () => (
  <>
    <Head>
      <title>ChrisKumm.com</title>
      <meta name='description' content='Professional Full-Stack Developer' />
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Hero />
  </>
)

export default Home
