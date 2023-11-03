/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        API_URL: process.env.API_URL
    },
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                port: '8000',
            }
        ]
    }
}

module.exports = nextConfig
