# ChrisKumm.com NextJS Front End

My personal portfolio.

## TODO

- [x] Improve lighthouse score
- [ ] Custom favicon
- [x] Captcha for contact form
- [ ] Fine-tune layout (especially margins around text)
- [ ] Get InstaArt working again
- [ ] Update page data (skills, portfolio technologies)
- [ ] Improve error handling (don't use `alert`)
- [x] Configure so that ESLint and Prettier are run pre-commit
- [x] Look into [caching](https://nextjs.org/docs/going-to-production#caching)
- [ ] GDPR compliance - these might be helpful:
  - [React Cookie Consent](https://www.npmjs.com/package/react-cookie-consent)
  - [YouTube: Is Your Website GDPR Ready? Follow this 7-step Checklist](https://www.youtube.com/watch?v=OrLJ1rj8ZTY)
  - [YouTube: Easily Adding Privacy & Terms to your Websites - TermsFeed](https://www.youtube.com/watch?v=qTfUVSvGpTg)
  - [Google Cloud Blog: A GDPR compliance checklist for evaluating your data strategy](https://cloud.google.com/blog/products/data-analytics/gdpr-compliance-checklist)

## Known Issues

- This error only happens sometimes when you try to debug in VSCode:
  ```
  Could not read source map for internal/deps/acorn/acorn/dist/acorn.js: Invalid URL: internal/deps/acorn/acorn/dist/acorn.js
  ```
  These links might be helpful:
  - https://githubmemory.com/repo/microsoft/vscode-js-debug/issues/1052
  - https://github.com/vercel/next.js/issues/26726#issuecomment-872993859
