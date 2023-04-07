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
    <Link href='/' className={styles.link}>
      go to homepage
    </Link>
  </div>
)

export default NotFound
