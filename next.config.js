const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://s3.turistikrota.com'],
  },
  i18n,
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = nextConfig
