import Image from 'next/image'
import { SkillData } from '../../types/types'
import styles from './SkillSection.module.scss'

export const SkillSection = (props: SkillData) => (
  <div className={`glass ${styles.base}`}>
    {/* TODO: Ensure that this image load doesn't require an extra round trip. */}
    <Image
      src={props.image.src}
      alt={props.image.alt}
      width={400}
      height={400}
    />
    <h1 className={styles.heading}>{props.title}</h1>
    <div className={styles.body}>
      {props.skills.map((item: string) => (
        <div className={styles.skillItem} key={item}>
          {item}
        </div>
      ))}
    </div>
  </div>
)
