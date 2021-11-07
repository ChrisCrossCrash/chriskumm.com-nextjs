import * as styles from './Hero.module.scss'
import { Waves } from '../Waves/Waves'
import { heroBg } from './heroBg'

export const Hero = () => (
  <div className={styles.base} style={{ backgroundImage: heroBg }}>
    <div className={`contain ${styles.container}`}>
      {/* Heading */}
      <div className={styles.headingSmall}>I make websites that</div>
      <div className={styles.headingLarge}>
        <div>get</div>
        <div>noticed</div>
        <div>online.</div>
      </div>

      {/* Button Row */}
      <div className={styles.buttonRow}>
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
