/**
 * Send a Telegram message. Requires `TELEGRAM_TOKEN` and
 * `TELEGRAM_CHAT_ID` environment variables to be set.
 *
 * https://core.telegram.org/bots/api#sendmessage
 */
export const sendMessage = async (
  name: string,
  email: string,
  message: string
): Promise<Response> => {
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`
  const body = {
    chat_id: process.env.TELEGRAM_CHAT_ID,
    text: `${name}\n${email}\n${message}`,
  }

  let response: Promise<Response>

  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Sent message:\n${body.text}\n(This message would have been sent via Telegram in production.)`
    )

    response = new Promise((resolve) =>
      resolve(new Response(null, { status: 201 }))
    )
  } else {
    response = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }

  return response
}
