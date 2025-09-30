import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Disable image optimization (requires server)
  images: {
    unoptimized: true,
  },

  // Add trailing slashes for GitHub Pages routing
  trailingSlash: true,

  // Base path for GitHub Pages subdirectory deployment
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // Asset prefix for CDN support
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',

  // Strict mode for React 19
  reactStrictMode: true,

  // Production optimizations
  swcMinify: true,

  // Compiler options for smaller bundles
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },

  // Webpack customizations
  webpack: (config, { isServer }) => {
    // GLSL shader loader for Three.js
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });

    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

export default nextConfig;
