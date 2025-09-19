/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: () => [
    {
      source: '/donate',
      destination:
        'https://discord.com/channels/775831180086870096/role-subscriptions',
      permanent: true,
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'crafatar.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
