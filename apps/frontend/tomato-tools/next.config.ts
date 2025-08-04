import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["antd"],
  },
  transpilePackages: ["antd"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://tools-service.netlify.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
