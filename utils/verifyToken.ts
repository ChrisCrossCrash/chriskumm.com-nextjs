type errorCode =
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'bad-request'
  | 'timeout-or-duplicate'

/** A response object from the reCAPTCHA API. */
export type CaptchaValidation = {
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
export const verifyToken = async (
  token: string,
): Promise<CaptchaValidation> => {
  const captchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      method: 'POST',
    },
  )
  return captchaResponse.json()
}
