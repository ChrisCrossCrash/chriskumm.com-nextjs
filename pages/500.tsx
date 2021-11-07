import Link from 'next/link'
import styles from './404.module.scss'

const NotFound = () => (
  <div className={styles.base}>
    <h1 className={styles.heading}>
      500 Internal Server Error{' '}
      <span role='img' aria-label='man facepalming emoji'>
        🤦‍♂️
      </span>
    </h1>
    <Link href='/'>
      <a className={styles.link}>go to homepage</a>
    </Link>
  </div>
)

export default NotFound
