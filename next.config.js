/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
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
