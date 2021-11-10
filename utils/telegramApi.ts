// https://core.telegram.org/bots/api#sendmessage

/** Send a contact form message, given the Telegram token and chat ID. */
export const sendMessage = async (
  name: string,
  email: string,
  message: string,
  token: string,
  chatId: string | number
): Promise<Response> => {
  const url = `https://api.telegram.org/bot${token}/sendMessage`
  const body = {
    chat_id: { chatId },
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
