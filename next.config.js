const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/phone-shop' : '',
  assetPrefix: isProd ? '/phone-shop/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;