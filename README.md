# ChrisKumm.com Next JS Front End

My personal portfolio.

## TODO

- 🟢 High impact, low effort
  - Update page data (skills, portfolio technologies)
- 🟡 High impact, high effort
  - GDPR compliance
- 🟡 Low impact, low effort
  - Custom favicon
  - GitHub links for portfolio sites
  - Footer component
- 🔴 Low impact, high effort
  - Improve error handling (don't use `alert`)

## GDPR Compliance

Here are some helpful links for when completing the GDPR compliance TODO item:

- [React Cookie Consent](https://www.npmjs.com/package/react-cookie-consent)
- [YouTube: Is Your Website GDPR Ready? Follow this 7-step Checklist](https://www.youtube.com/watch?v=OrLJ1rj8ZTY)
- [YouTube: Easily Adding Privacy & Terms to your Websites - TermsFeed](https://www.youtube.com/watch?v=qTfUVSvGpTg)
- [Google Cloud Blog: A GDPR compliance checklist for evaluating your data strategy](https://cloud.google.com/blog/products/data-analytics/gdpr-compliance-checklist)

## Environment Variables

You'll need to create a `.env.local` with the following variables:

```
# Telegram API
# https://core.telegram.org/bots/api
TELEGRAM_TOKEN=
TELEGRAM_CHAT_ID=

# Google reCAPTCHA API
# https://www.google.com/recaptcha/admin/create
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
```
