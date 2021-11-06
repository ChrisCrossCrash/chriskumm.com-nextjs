import styles from './Posts.module.css'
import { locators } from './Posts.locators'

export default function Posts(props: any) {
  const { posts, users } = props
  const postsSection = posts.map((post: any) => {
    const user = users.find((user: any) => post.userId === user.id)
    return (
      <div key={post.id}>
        <h2 data-testid={locators.title}>{post.title}</h2>
        <p className={styles.userName} data-testid={locators.userName}>
          By: <span>{user.name}</span>
        </p>
        <p data-testid={locators.body}>{post.body}</p>
      </div>
    )
  })
  return <div>{postsSection}</div>
}
