/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disable ESLint during builds for migration
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript error checking
  },
  // Enable typed routes
  typedRoutes: true,
  // Webpack configuration for better TypeScript support
  webpack: (config, { isServer }) => {
    // Handle shader files
    config.module.rules.push({
      test: /\.(vert|frag|glsl)$/,
      use: 'raw-loader',
    });

    // Handle Three.js and WebGL modules
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: 'file-loader',
    });

    return config;
  },
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;