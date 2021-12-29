import Image from 'next/image'
import { SkillData } from '../../types/types'
import styles from './SkillSection.module.scss'

export const SkillSection = (props: SkillData) => (
  <div className={`glass ${styles.base}`}>
    <props.image />
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
