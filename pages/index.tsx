import type { NextPage, GetStaticProps } from 'next'
import Head from 'next/head'
import { Hero } from '../components/Hero/Hero'
import { Portfolio } from '../components/Portfolio/Portfolio'
import { PortfolioSiteData } from '../types/types'

type HomeProps = {
  projects: PortfolioSiteData[]
}

const Home: NextPage<HomeProps> = () => (
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
