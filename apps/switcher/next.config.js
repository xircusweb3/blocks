/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },    
  transpilePackages: [
    '@xircus-web3/skinner', 
    '@xircus-web3/components',
    '@xircus-web3/composer',
    '@xircus-web3/uis'
  ],
}

module.exports = nextConfig
