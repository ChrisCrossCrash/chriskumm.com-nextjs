import { SectionHeading } from '../SectionHeading/SectionHeading'
import styles from './Portfolio.module.scss'
import { PortfolioSite } from '../PortfolioSite/PortfolioSite'
import { portfolioSites } from '../../data/portfolioSites'

export const Portfolio = () => (
  <div id='portfolio'>
    <SectionHeading>Portfolio</SectionHeading>
    <div className={styles.content}>
      {portfolioSites.map((project) => (
        <PortfolioSite key={project.title} project={project} />
      ))}
    </div>
  </div>
)
