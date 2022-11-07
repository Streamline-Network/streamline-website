/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	redirects: () => [
		/* 	{
			source: "/donate",
			destination: "https://www.paypal.com/donate/?hosted_button_id=T85ZVPMTBWHPA",
			permanent: true,
		} */
	],
	outputFileTracing: false,
	experimental: {
		appDir: true,
	},
	env: {
		MAP_URL: "https://142.44.255.252:8024/server/Streamline SMP",
		STATS_URL: "https://142.44.255.252:8024/server/Streamline SMP",
	},
};

module.exports = nextConfig;
