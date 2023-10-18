import React, { useState } from 'react'
import styles from './Chat.module.scss'
import { ChatCompletionMessageParam } from 'openai/resources'

type ChatHistory = ChatCompletionMessageParam[]

/** A chat window for chatting with a bot. */
function Chat() {
  const [chatHistory, setChatHistory] = useState<ChatHistory>([
    {
      role: 'assistant',
      content: 'I am an AI created by OpenAI. How can I help you today?',
    },
  ])

  const inputRef = React.createRef<HTMLInputElement>()

  return (
    <div className={styles.base}>
      <div className={styles.messages}>
        {/* TODO: Auto-scroll to new messages. */}
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.role === 'user' ? styles.user : styles.assistant
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form
        className={styles.inputRow}
        onSubmit={async (e) => {
          e.preventDefault()
          const inputValue = inputRef.current?.value

          // If the input is empty, do nothing.
          if (!inputValue) return

          // Add the user's message to the chat history.
          setChatHistory((history) => {
            const newHistory = [...history]
            newHistory.push({
              role: 'user',
              content: inputValue,
            })
            return newHistory
          })

          // Clear the input.
          inputRef.current!.value = ''

          // Fetch some data from JSONPlaceholder.
          // TODO: Replace this with a real API call to the OpenAI API.
          const response = await fetch(
            'https://jsonplaceholder.typicode.com/todos/1',
          )
          const json = await response.json()
          const result = json.title as string

          // Add the bot's response to the chat history.
          setChatHistory((history) => {
            const newHistory = [...history]
            newHistory.push({
              role: 'assistant',
              content: result,
            })
            return newHistory
          })
        }}
      >
        <input
          ref={inputRef}
          className={styles.chatInput}
          type='text'
          name='message'
          id='message'
          placeholder='Type your message here...'
        />
        <input className={styles.submitBtn} type='submit' value='Send' />
      </form>
    </div>
  )
}

export default Chat
