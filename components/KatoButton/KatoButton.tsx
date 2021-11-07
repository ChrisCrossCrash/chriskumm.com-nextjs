// Adapted from 'Button Hover' by Katherine Kato on Codepen
// https://codepen.io/kathykato/pen/rZRaNe?editors=1100

import styles from './KatoButton.module.scss'

type KatoButtonProps = {
  children: string
  url: string
}

export const KatoButton = (props: KatoButtonProps) => (
  <a href={props.url} target='_blank' rel='noreferrer' className={styles.base}>
    <span className={styles.circle} aria-hidden='true'>
      <span className={`${styles.icon} ${styles.arrow}`} />
    </span>
    <span className={styles.buttonText}>{props.children}</span>
  </a>
)
