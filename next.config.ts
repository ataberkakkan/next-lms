import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "next-lms.fly.storage.tigris.dev",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
