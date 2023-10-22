import path from 'path'
import { promises as fs } from 'fs'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'
import { verifyToken, CaptchaValidation } from '../../utils/verifyToken'
import type { NextApiRequest, NextApiResponse } from 'next'

type ChatApiRequest = {
  clientMessages: ChatCompletionMessageParam[]
  recaptchaToken: string
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

/** Next.js API endpoint to handle chat completions. */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!(req.method === 'POST')) {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { clientMessages, recaptchaToken } = req.body as ChatApiRequest

  if (!clientMessages || !recaptchaToken) {
    return res.status(400).json({ message: 'Bad request: Invalid form data' })
  }

  // Verify the ReCAPTCHA token
  try {
    let verification: CaptchaValidation | undefined

    if (process.env.NODE_ENV === 'development') {
      // The security of disabling the ReCaptcha for testing hinges on the fact
      // that the verification step is bypassed here (not on the client).
      // If not in a development environment, the fake recaptchaToken would fail the `verifyToken` call.
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
      return res.status(400).json({
        message: 'Bad request: reCAPTCHA token failed verification.',
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }

  const content = await getTextFileString(
    path.join(process.cwd(), 'data', 'system-message.md'),
  )
  const systemMessage: ChatCompletionMessageParam = {
    role: 'system',
    content,
  }
  const messages = [systemMessage, ...clientMessages]

  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo',
  })

  const result = completion.choices[0].message.content

  if (!result) {
    res.status(500).json({ error: 'Something went wrong' })
    return
  }

  res.status(200).json({ result })
}

/** Gets the content of a text file as a string. */
async function getTextFileString(filePath: string): Promise<string> {
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    return fileContents
  } catch (error) {
    console.error('Error reading file:', error)
    throw new Error('Failed to read file')
  }
}
