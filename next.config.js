/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (cfg, options = {}) => {
    cfg.externals.push('sharp')
    const { webpack } = options
    const regex = /^sharp$/
    cfg.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: regex,
      }),
    )
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
