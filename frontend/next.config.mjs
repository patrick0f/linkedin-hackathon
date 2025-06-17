/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'res.cloudinary.com'
            } 
        ]
    },
    experimental:{
        serverActions: {
            bodySizeLimit: '20mb' // Set desired value here
        }
    },
    // Configure the port
    env: {
        PORT: '5179'
    },
    // API proxy configuration for development
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5179/api/:path*'
            }
        ];
    }
};

export default nextConfig;
