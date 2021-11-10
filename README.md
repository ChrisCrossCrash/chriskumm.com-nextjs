# ChrisKumm.com NextJS Front End

My personal portfolio.

## TODO

- [ ] Improve lighthouse score
- [ ] Custom favicon
- [ ] Captcha for contact form
- [ ] Fine-tune layout (especially margins around text)
- [ ] Get InstaArt working again
- [ ] Update page data (skills, portfolio technologies)
- [ ] Improve error handling (don't use `alert`)
- [ ] Configure so that ESLint and Prettier are run pre-commit
- [ ] Look into [caching](https://nextjs.org/docs/going-to-production#caching)

## Known Issues

- This error only happens sometimes when you try to debug in VSCode:
  ```
  Could not read source map for internal/deps/acorn/acorn/dist/acorn.js: Invalid URL: internal/deps/acorn/acorn/dist/acorn.js
  ```
  These links might be helpful:
  - https://githubmemory.com/repo/microsoft/vscode-js-debug/issues/1052
  - https://github.com/vercel/next.js/issues/26726#issuecomment-872993859
