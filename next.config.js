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
    // Stupidly, the build process needs to access the types for cypress to compile.
    // Maybe there's a way to just ignore this directory when the project is built?
    tsconfigPath: './tsconfig.build.json',
  },
}
