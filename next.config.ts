import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qglijyhoyivzybcpguyp.supabase.co",
      },
    ],
  },
};

export default nextConfig;
