/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	redirects: () => [
		{
			source: "/donate",
			destination: "https://www.paypal.com/donate/?hosted_button_id=T85ZVPMTBWHPA",
			permanent: true,
		}
	],
	outputFileTracing: false,
	experimental: {
		appDir: true,
	},
};

module.exports = nextConfig;
