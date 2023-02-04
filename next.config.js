/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  redirects: () => [
    {
      source: '/donate',
      destination: 'https://patreon.com/streamlinesmp/',
      permanent: true,
    },
  ],
  env: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
