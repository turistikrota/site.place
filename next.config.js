const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['@turistikrota/ui', '@turistikrota/location-tr'],
  images: {
    domains: ['s3.turistikrota.com', 'avatar.turistikrota.com'],
  },
  i18n,
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = nextConfig
