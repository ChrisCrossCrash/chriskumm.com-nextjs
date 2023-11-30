import React, { useState, useRef, useEffect } from 'react'
import styles from './Chat.module.scss'
import { ChatCompletionMessageParam } from 'openai/resources'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Spinner } from '../Spinner/Spinner'
import ReCAPTCHA from 'react-google-recaptcha'

type ChatHistory = ChatCompletionMessageParam[]

/** A chat window for chatting with a bot. */
function Chat() {
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatHistory>([
    {
      role: 'assistant',
      content: 'Hi! My name is Chris! Ask me anything.',
    },
  ])

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  // Validate ReCAPTCHA Site Key
  if (!recaptchaSiteKey) {
    throw new Error(
      'NEXT_PUBLIC_RECAPTCHA_SITE_KEY could not be loaded from environmental variables.',
    )
  }

  // Auto-scroll when chatHistory changes
  useEffect(() => {
    const element = messagesRef.current
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }, [chatHistory])

  const submitMessage = async () => {
    const inputValue = inputRef.current?.value
    const recaptcha = recaptchaRef.current

    // If the input is empty, do nothing.
    if (!inputValue) return

    // Execute ReCAPTCHA
    let recaptchaToken: string | null | undefined
    if (process.env.NODE_ENV === 'development') {
      recaptchaToken = 'testRecaptchaToken'
    } else {
      recaptchaToken = await recaptcha?.executeAsync()
    }

    if (typeof recaptchaToken !== 'string') {
      throw new Error('Recaptcha token is not a string')
    }

    setIsLoading(true)

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
    const response = await fetch('https://api.chriskumm.com/api/ai-chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientMessages: [
          ...chatHistory,
          {
            role: 'user',
            content: inputValue,
          },
        ],
        recaptchaToken,
      }),
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

    // Reset the ReCAPTCHA widget so that it can be used again.
    recaptcha?.reset()

    setIsLoading(false)
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
            {message.content as string}
          </Markdown>
        ))}
        {isLoading && (
          <div className={`${styles.message} ${styles.assistant}`}>
            <Spinner className={styles.spinner} />
          </div>
        )}
      </div>
      <form
        className={styles.inputRow}
        onSubmit={(e) => {
          e.preventDefault()
          submitMessage()
        }}
      >
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
        <ReCAPTCHA
          ref={recaptchaRef}
          size='invisible'
          sitekey={recaptchaSiteKey}
        />
      </form>
    </div>
  )
}

export default Chat
