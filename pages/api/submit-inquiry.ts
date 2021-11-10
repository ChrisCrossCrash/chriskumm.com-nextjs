import type { NextApiRequest, NextApiResponse } from 'next'
import { contactFormSchema } from '../../utils/yupSchemas'
import { sendMessage } from '../../utils/telegramApi'

type errorCode =
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'bad-request'
  | 'timeout-or-duplicate'

// https://developers.google.com/recaptcha/docs/verify
type CaptchaValidation = {
  success: boolean
  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  challenge_ts: string
  // the hostname of the site where the reCAPTCHA was solved
  hostname: string
  'error-codes'?: errorCode[]
}

const verifyToken = async (token: string): Promise<CaptchaValidation> => {
  const captchResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
    }
  )
  const captchaValidation: Promise<CaptchaValidation> = captchResponse.json()
  return captchaValidation
}

const submitQuery = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (!(request.method === 'POST')) {
    return response.status(405).end()
  }

  // Any validation errors should be handled in the front end.
  // However, it's a best practice to check for them the server side as well.
  if (
    !(await contactFormSchema.isValid(request.body)) ||
    !request.body.recaptchaToken
  ) {
    return response.status(400).end()
  }

  const { name, email, message, recaptchaToken }: { [key: string]: string } =
    request.body

  try {
    let verification: CaptchaValidation | undefined

    // The security of disabling the ReCaptcha for testing hinges on the fact
    // that the verification step is bypassed here (not on the client).
    // If not in a development environment, the fake recaptchaToken would fail the `verifyToken` call.
    if (process.env.NODE_ENV === 'development') {
      verification = {
        success: true,
        challenge_ts: '2020-05-01T00:00:00Z',
        hostname: 'chriskumm.com',
      }
    } else {
      // Ping the Google recaptcha verify API to verify the captcha code you received
      verification = await verifyToken(recaptchaToken)
    }

    if (!verification.success) {
      return response.status(400).end()
    }
  } catch (error) {
    console.log(error)
    return response.status(500).end()
  }

  const telegramResponse = await sendMessage(name, email, message)

  if (telegramResponse.ok) {
    return response.status(201).json({ status: 'ok' })
  } else {
    return response.status(500).end()
  }
}

export default submitQuery
