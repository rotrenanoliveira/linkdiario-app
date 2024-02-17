/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.linkdiario.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
