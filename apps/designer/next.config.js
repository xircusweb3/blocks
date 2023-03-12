/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },    
  transpilePackages: ["xw3-skins"],    
}

module.exports = nextConfig
