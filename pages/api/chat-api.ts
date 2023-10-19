import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const clientMessages = req.body as ChatCompletionMessageParam[]
  const systemMessage: ChatCompletionMessageParam = {
    role: 'system',
    content: 'You are a highly intelligent chatbot.',
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

  console.log('result', result)

  res.status(200).json({ result })
}
