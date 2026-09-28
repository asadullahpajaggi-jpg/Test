import type { NextConfig } from "next";

/**
 * Central place for framework-level configuration.
 * Keep this minimal until a future phase needs image domains,
 * redirects, headers, etc. Documented here so nobody has to
 * hunt for where these decisions live.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  typescript: {
    // Never let a broken build slip through silently.
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
