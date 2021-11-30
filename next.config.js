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
  typescript: {
    // The build process has its own tsconfig.json, which ignores the cypress directory.
    tsconfigPath: './tsconfig.build.json',
  },

  // https://nextjs.org/docs/api-reference/next.config.js/redirects
  async redirects() {
    return [
      {
        source: '/art',
        destination: 'https://insta-art-frontend.vercel.app/',
        permanent: false,
      },
      {
        source: '/shopping',
        destination: 'https://ck-shopping.vercel.app/',
        permanent: false,
      },
    ]
  },
}
