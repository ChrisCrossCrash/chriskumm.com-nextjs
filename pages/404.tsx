import Link from 'next/link'
import styles from './404.module.scss'

const NotFound = () => (
  <div className={styles.base}>
    <h1 className={styles.heading}>
      404 Not Found{' '}
      <span role='img' aria-label='crying face emoji'>
        😢
      </span>
    </h1>
    <Link href='/' className={styles.link}>
      go to homepage
    </Link>
  </div>
)

export default NotFound
