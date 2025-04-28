/** @type {import('next').NextConfig} */
const path = require('path');

// Get environment variables with fallbacks
const appRootPath = process.env.APP_ROOT_PATH || path.resolve(__dirname);
const srcDir = process.env.SRC_DIR || 'src';
const publicDir = process.env.PUBLIC_DIR || 'public';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const port = parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || 'localhost';

const nextConfig = {
  // Enable static exports for deployment flexibility
  output: process.env.NEXT_STATIC_EXPORT === 'true' ? 'export' : undefined,

  // Configure path resolution
  distDir: '.next',
  basePath,

  // Configure server options
  serverRuntimeConfig: {
    PROJECT_ROOT: appRootPath,
  },

  // Configure experimental features
  experimental: {
    // Optimize for faster builds
    optimizeCss: true,
    // Improve client-side navigation
    scrollRestoration: true
  },

  // Configure image domains for external images
  images: {
    domains: [
      'images.unsplash.com',
      'tonasket.org',
      'okanogancounty.org',
      'img1.wsimg.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },

  // Environment variables that should be available to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WEATHER_API_URL: process.env.NEXT_PUBLIC_WEATHER_API_URL,
    NEXT_PUBLIC_BASE_PATH: basePath,
    APP_ROOT_PATH: appRootPath,
    SRC_DIR: srcDir,
    PUBLIC_DIR: publicDir,
  },

  // Configure redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Ensure we're using the correct directories
  webpack: (config, { dev, isServer }) => {
    // Resolve paths from the root directory
    config.resolve.modules.push(path.resolve(appRootPath));

    // Add src directory to module resolution
    config.resolve.modules.push(path.resolve(appRootPath, srcDir));

    // Optimize for production builds
    if (!dev) {
      // Enable React optimization
      config.optimization.usedExports = true;

      // Minimize bundle size
      config.optimization.minimize = true;

      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // Get the name of the npm package
              const match = module.context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              const packageName = match ? match[1] : 'unknown';
              // Return a nice package name
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      };
    }

    return config;
  },
};

module.exports = nextConfig;
