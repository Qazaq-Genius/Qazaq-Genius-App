/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["kk","en", "ru"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'i1.sndcdn.com',
        port: ''
      },
    ],
  },
}

module.exports = nextConfig
