import React, { useEffect, useRef, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { TextInput } from '../TextInput/TextInput'
import { Spinner } from '../Spinner/Spinner'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from './ContactForm.module.scss'
import { contactFormSchema } from '../../utils/yupSchemas'

gsap.registerPlugin(ScrollTrigger)

type SubmittedValues = {
  name: string
  email: string
  message: string
}

const handleSubmit = async (
  values: SubmittedValues,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // What happens during form submission with Formik?:
  // https://formik.org/docs/guides/form-submission

  let response: Response | null
  let data: unknown

  try {
    // TODO: Replace process.env.DJANGO_URL
    response = await fetch('/api/submit-inquiry/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(values),
    })
    data = await response.json()
    // TODO: get rid of this `any`
  } catch (error: any) {
    // TODO: Handle this error better
    //  https://fettblog.eu/typescript-typing-catch-clauses/#2.-there-is-only-one-catch-clause-in-javascript
    alert(`Something went wrong:\n\n${error.name}: ${error.message}`)
    return
  }

  if (response.status === 201) {
    setSuccess(true)
  } else {
    alert(
      `Something went wrong (response code: ${response.status}):
          \n\nsent data:\n${JSON.stringify(values, null, 2)}
          \n\nserver response:\n${JSON.stringify(data, null, 2)}`
    )
    return
  }
}

export const ContactForm = () => {
  const [success, setSuccess] = useState(false)

  const nameRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const stagger = 0.2
    gsap
      .timeline({ scrollTrigger: nameRef.current })
      .from([nameRef.current, emailRef.current, messageRef.current], {
        opacity: 0,
        x: -200,
        duration: 0.5,
        stagger: stagger,
      })
      .from(submitRef.current, { duration: 0.3, opacity: 0 }, '>-0.3')
  }, [])

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
      }}
      validationSchema={contactFormSchema}
      onSubmit={(values) => handleSubmit(values, setSuccess)}
    >
      {/* TODO: Get rid of this `any` */}
      {({ isSubmitting }: { isSubmitting: boolean }) => {
        let buttonText

        if (isSubmitting) {
          buttonText = <Spinner className={styles.spinner} />
        } else {
          buttonText = success ? 'Thanks!' : 'Send Message'
        }

        return (
          <Form>
            <TextInput
              ref={nameRef}
              variant='input'
              id='name'
              label='Name'
              name='name'
              type='text'
            />
            <TextInput
              ref={emailRef}
              variant='input'
              id='email'
              label='Email'
              name='email'
              type='email'
            />
            <TextInput
              ref={messageRef}
              variant='textarea'
              id='message'
              label='Message'
              name='message'
            />

            <button
              ref={submitRef}
              className={`btn btn-gray ${success ? 'btn-success' : ''}`}
              type='submit'
              disabled={isSubmitting || success}
              style={{ minWidth: '10ch' }}
            >
              {buttonText}
            </button>
            {success && (
              <div className={styles.successMessage}>
                Thanks for contacting me! I&apos;ll get back to you as soon as
                possible{' '}
                <span
                  role='img'
                  aria-label='grinning face with smiling eyes emoji'
                >
                  😄
                </span>
              </div>
            )}
          </Form>
        )
      }}
    </Formik>
  )
}
