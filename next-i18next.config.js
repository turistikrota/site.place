/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'tr',
    locales: ['en', 'tr'],
    domains: [
      {
        domain: 'places.turistikrota.com',
        defaultLocale: 'en',
        http: true,
      },
      {
        domain: 'yerler.turistikrota.com',
        defaultLocale: 'tr',
        http: true,
      },
    ],
    localeDetection: false,
    reloadOnPrerender: process.env.NODE_ENV === 'development',
  },
}
