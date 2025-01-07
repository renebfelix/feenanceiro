/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_HOST: process.env.API_HOST,
		RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
		RECAPTCHA_KEY: process.env.RECAPTCHA_KEY
	},
	async redirects() {
		return [
			{
				source: "/",
				destination: "/login",
				permanent: true
			}
		]
	}
};

export default nextConfig;
