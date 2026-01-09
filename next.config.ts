import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Fail the build on type errors (recommended for production)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
