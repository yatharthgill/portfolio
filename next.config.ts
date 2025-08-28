import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure TypeScript path mapping works in production builds
  typescript: {
    // Don't fail build on type errors (but still show them)
    ignoreBuildErrors: false,
  },
  eslint: {
    // Don't fail build on ESLint errors during deployment
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
