import React, { useState, useRef, useEffect } from 'react'
import styles from './Chat.module.scss'
import { ChatCompletionMessageParam } from 'openai/resources'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type ChatHistory = ChatCompletionMessageParam[]

/** A chat window for chatting with a bot. */
function Chat() {
  const [chatHistory, setChatHistory] = useState<ChatHistory>([
    {
      role: 'assistant',
      content: 'Hi! My name is Chris! Ask me anything.',
    },
  ])

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const messagesRef = useRef<HTMLDivElement>(null)

  // Auto-scroll when chatHistory changes
  useEffect(() => {
    const element = messagesRef.current
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }, [chatHistory])

  const submitMessage = async () => {
    const inputValue = inputRef.current?.value

    // If the input is empty, do nothing.
    if (!inputValue) return

    // Clear the input.
    inputRef.current!.value = ''

    // Add user input to chat immediately
    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        role: 'user',
        content: inputValue,
      },
    ])

    // Fetch the bot's response.
    const response = await fetch('/api/chat-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ...chatHistory,
        {
          role: 'user',
          content: inputValue,
        },
      ]),
    })
    const json = await response.json()
    const data = json as { result: string }
    const { result } = data

    // Add the bot's response to the chat history.
    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        role: 'assistant',
        content: result,
      },
    ])
  }

  return (
    <div className={styles.base}>
      <div className={styles.messages} ref={messagesRef}>
        {chatHistory.map((message, index) => (
          <Markdown
            key={index}
            className={`${styles.message} ${
              message.role === 'user' ? styles.user : styles.assistant
            }`}
            remarkPlugins={[remarkGfm]}
          >
            {message.content}
          </Markdown>
        ))}
      </div>
      <form className={styles.inputRow}>
        <textarea
          ref={inputRef}
          className={styles.chatInput}
          name='message'
          id='message'
          placeholder='Type your message here...'
          onKeyDown={(e) => {
            // The behavior should be similar to the ChatGPT website.
            // If the user presses enter (without shift), submit the form.
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault() // Prevent a newline from being inserted.
              submitMessage()
            }
            // Otherwise, just do the default of inserting a newline.
          }}
        />
        <input className={styles.submitBtn} type='submit' value='Send' />
      </form>
    </div>
  )
}

export default Chat
