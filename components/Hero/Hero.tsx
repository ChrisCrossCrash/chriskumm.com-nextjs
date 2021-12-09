import styles from './Hero.module.scss'
import { Waves } from '../Waves/Waves'
import { useTheme } from '../../contexts/ThemeContext'
import Image from 'next/image'

export const Hero = () => {
  const theme = useTheme()

  return (
    <div className={styles.base}>
      <div className={`contain ${styles.container}`}>
        {/* Heading */}
        <div className={styles.headingSmall}>I make websites that</div>
        <div className={styles.headingLarge}>
          <div>get</div>
          <div>noticed</div>
          <div>online.</div>
        </div>

        {/* Button Row */}
        <div>
          <a
            className={`btn ${theme.cssModule.btn} ${styles.ctaBtn}`}
            href='#portfolio'
          >
            Portfolio
          </a>
          <a className={`btn ${theme.cssModule.btnOutline}`} href='#contact'>
            Contact
          </a>
        </div>
      </div>
      <div className={styles.heroBgContainer}>
        <Image
          src={theme.heroSectionBackground}
          alt=''
          objectFit='cover'
          layout='fill'
        />
      </div>
      <Waves />
    </div>
  )
}
