/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	redirects: () => [
		{
			source: "/donate",
			destination: "https://patreon.com/streamlinesmp/",
			permanent: true,
		},
	],
	outputFileTracing: false,
	experimental: {
		appDir: true,
	},
	env: {
		MAP_URL: "https://142.44.255.252:8024/server/Streamline SMP",
		STATS_URL: "https://142.44.255.252:8024/server/Streamline SMP",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				port: "",
			},
		],
	},
};

module.exports = nextConfig;
