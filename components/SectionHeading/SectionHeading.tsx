import React from 'react'
import styles from './SectionHeading.module.scss'

export const SectionHeading = (props: { children: React.ReactNode }) => (
  <div className={styles.base}>
    <h1>{props.children}</h1>
  </div>
)
