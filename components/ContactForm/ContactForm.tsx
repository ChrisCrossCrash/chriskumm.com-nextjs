import React, { useEffect, useRef, useState } from 'react'
import { Formik, Form } from 'formik'
import { TextInput } from '../TextInput/TextInput'
import { Spinner } from '../Spinner/Spinner'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ReCAPTCHA from 'react-google-recaptcha'
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
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  recaptchaRef: React.RefObject<ReCAPTCHA>
) => {
  // What happens during form submission with Formik?:
  // https://formik.org/docs/guides/form-submission

  let response: Response | null

  recaptchaRef.current?.render()

  // Make a fake recaptchaToken in development. This is safe because the verification
  // on the `/api/submit-inquiry` endpoint is only done in production.
  let recaptchaToken: string | null | undefined
  if (process.env.NODE_ENV === 'development') {
    recaptchaToken = 'testRecaptchaToken'
  } else {
    recaptchaToken = await recaptchaRef.current?.executeAsync()
  }

  if (typeof recaptchaToken !== 'string') {
    throw new Error('Recaptcha token is not a string')
  }

  try {
    response = await fetch('/api/submit-inquiry/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...values,
        recaptchaToken,
      }),
    })
  } catch (error) {
    // TODO: Handle this error better
    //  https://fettblog.eu/typescript-typing-catch-clauses/#2.-there-is-only-one-catch-clause-in-javascript
    if (error instanceof Error) {
      alert(`Something went wrong:\n\n${error.name}: ${error.message}`)
    } else {
      alert(`Something went wrong.`)
    }
    return
  }

  if (response.status === 201) {
    setSuccess(true)
    return
  }

  let data = await response.json()

  if (data.message) {
    alert(`Something went wrong: ${data.message}`)
  } else {
    alert('Something went wrong')
  }
}

export const ContactForm = () => {
  const [success, setSuccess] = useState(false)

  const nameRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!recaptchaSiteKey) {
    throw new Error(
      'NEXT_PUBLIC_RECAPTCHA_SITE_KEY could not be loaded from environmental variables.'
    )
  }

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
      onSubmit={(values) => handleSubmit(values, setSuccess, recaptchaRef)}
    >
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

            {/* Don't render the ReCAPTCHA element in development. This is safe because the
             verification on the `/api/submit-inquiry` endpoint is only done in production. */}
            {process.env.NODE_ENV !== 'development' && (
              <ReCAPTCHA
                ref={recaptchaRef}
                size='invisible'
                sitekey={recaptchaSiteKey}
                asyncScriptOnLoad={ScrollTrigger.refresh}
              />
            )}

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
