import styles from './Hero.module.scss'
import { Waves } from '../Waves/Waves'

export const Hero = () => (
  <div
    className={styles.base}
    // style={{ backgroundImage: heroBg }}
  >
    <div>
      <video autoPlay muted loop className={styles.videoBg}>
        {/* TODO Replace this video and add fallbacks */}
        <source src='/videos/r-place.webm' type='video/webm' />
      </video>
    </div>
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
        <a className={`btn btn-mango ${styles.ctaBtn}`} href='#portfolio'>
          Portfolio
        </a>
        <a className='btn btn-outline-mango' href='#contact'>
          Contact
        </a>
      </div>
    </div>
    <Waves />
  </div>
)
