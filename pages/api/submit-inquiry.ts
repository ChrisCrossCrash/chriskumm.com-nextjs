import type { NextApiRequest, NextApiResponse } from 'next'
import { contactFormSchema } from '../../utils/yupSchemas'
import { sendMessage } from '../../utils/telegramApi'

const submitQuery = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  if (!(request.method === 'POST')) {
    return response.status(405).end()
  }

  // Any validation errors should be handled in the front end.
  // However, it's a best practice to check for them the server side as well.
  if (!(await contactFormSchema.isValid(request.body))) {
    return response.status(400).end()
  }

  const { name, email, message }: { [key: string]: string } = request.body

  const token = process.env.TELEGRAM_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    // You didn't set enviroment variables for Telegram API.
    return response.status(500).end()
  }

  const telegramResponse = await sendMessage(
    name,
    email,
    message,
    token,
    chatId
  )

  if (telegramResponse.ok) {
    return response.status(201).json({ status: 'ok' })
  } else {
    return response.status(500).end()
  }
}

export default submitQuery
