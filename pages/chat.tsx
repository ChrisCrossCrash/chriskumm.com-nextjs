import type { NextPage } from 'next'
import styles from './chat.module.scss'
import Chat from '../components/Chat/Chat'

const ChatPage: NextPage = () => (
  <div className={styles.base}>
    <div className={styles.chatContainer}>
      <Chat />
    </div>
  </div>
)

export default ChatPage
