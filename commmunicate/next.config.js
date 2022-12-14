// eslint-disable-next-line @typescript-eslint/no-var-requires
const optimizedImages = require('next-optimized-images')

/** @type {import('next').NextConfig} */
const nextConfig = optimizedImages({
  reactStrictMode: true,
  handleImages: ['svg'],

  images: {
    loader: 'akamai',
    path: '',
  },
  trailingSlash: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      // https://github.com/vercel/next.js/issues/7755#issuecomment-937721514
      config.resolve.fallback.fs = false
    }
    config.resolve.mainFields = ['browser', 'main', 'module']
    return config
  },
})

module.exports = nextConfig
