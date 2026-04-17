/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true, // Performance ke liye best
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;
