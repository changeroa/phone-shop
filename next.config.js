const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/phone-shop' : '',
  assetPrefix: isProd ? '/phone-shop/' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true,
}