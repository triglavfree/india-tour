import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tildacdn.pub',
      },
      {
        protocol: 'https',
        hostname: 'thb.tildacdn.pub',
      },
    ],
  },
  // Разрешить доступ с других устройств в локальной сети
  allowedDevOrigins: ['localhost', '127.0.0.1', '*.local'],
};

export default nextConfig;
