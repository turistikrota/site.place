/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    domains: [
      {
        domain: 'places.turistikrota.com',
        defaultLocale: 'en',
      },
      {
        domain: 'yerler.turistikrota.com',
        defaultLocale: 'tr',
      },
    ],
    localeDetection: false,
  },
}
