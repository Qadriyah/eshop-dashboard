/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/api/v1/files/download/**",
      },
    ],
    domains: ["localhost"],
  },
  swcMinify: true,
};

export default nextConfig;
