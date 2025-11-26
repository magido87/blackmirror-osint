import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Netlify deployment
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slashes for better static hosting compatibility
  trailingSlash: true,
  
  // Disable React strict mode double-render in production
  reactStrictMode: false,
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Production source maps disabled for security
  productionBrowserSourceMaps: false,
};

export default nextConfig;
