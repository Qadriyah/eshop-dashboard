/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/v1/files/download/**",
      },
    ],
  },
  swcMinify: true,
};

export default nextConfig;
