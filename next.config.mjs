/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's.gravatar.com',
                port: '',
                pathname: '/avatar/**'
            }
        ]
    }
};

export default nextConfig;
