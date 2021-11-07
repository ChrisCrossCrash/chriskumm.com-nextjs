/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },

  // Normally I wouldn't want to build the source maps for production,
  // but the point of this site is to showcase my code.
  productionBrowserSourceMaps: true,
}
