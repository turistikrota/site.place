/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    domains: [
      {
        domain: 'places.turistikrota.com',
        defaultLocale: 'en',
        http: true,
        locales: ['en'],
      },
      {
        domain: 'yerler.turistikrota.com',
        defaultLocale: 'tr',
        http: true,
        locales: ['tr'],
      },
    ],
    localeDetection: false,
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
}
