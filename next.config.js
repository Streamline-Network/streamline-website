/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  redirects: () => [
    {
      source: '/donate',
      destination: 'https://discord.com/channels/775831180086870096/role-subscriptions',
      permanent: true,
    },
  ],
  env: {
    MAP_URL: 'https://142.44.255.252:8024/server/Streamline SMP',
    STATS_URL: 'https://142.44.255.252:8024/server/Streamline SMP',
  },
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
