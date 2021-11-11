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

/** A response object from the reCAPTCHA API. */
type CaptchaValidation = {
  /** Whether the reCAPTCHA token was successfully verified */
  success: boolean
  /** The timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ) */
  challenge_ts: string
  /** The hostname of the site where the reCAPTCHA was solved */
  hostname: string
  /** An array of error codes that describe the reasons for the failure */
  'error-codes'?: errorCode[]
}
/**
 * Verify the client-provided recaptcha token with Google's recaptcha verify API
 *
 * https://developers.google.com/recaptcha/docs/verify#api_request
 */
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
  return captchResponse.json()
}

/** An API endpoint that receives messages from the contact form. */
const submitQuery = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (!(request.method === 'POST')) {
    return response.status(405).json({ message: 'Method not allowed' })
  }

  // Any validation errors should be handled in the front end.
  // However, it's a best practice to check for them the server side as well.
  if (
    !(await contactFormSchema.isValid(request.body)) ||
    !request.body.recaptchaToken
  ) {
    return response
      .status(400)
      .json({ message: 'Bad request: Invalid form data' })
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
      return response
        .status(400)
        .json({ message: 'Bad request: reCAPTCHA token failed verification.' })
    }
  } catch (error) {
    console.log(error)
    return response.status(500).json({ message: 'Internal server error' })
  }

  const telegramResponse = await sendMessage(name, email, message)

  if (telegramResponse.ok) {
    return response.status(201).end()
  } else {
    return response.status(500).json({
      message:
        'Internal server error: Failed to send message via Telegram API.',
    })
  }
}

export default submitQuery
