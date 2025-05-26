/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Required for static exports
    domains: [
      'lh3.googleusercontent.com',  // Para fotos de perfil de Google
      'googleusercontent.com',
      'graph.facebook.com',         // Por si en el futuro añades Facebook
      'platform-lookaside.fbsbx.com',
      'firebasestorage.googleapis.com' // Para imágenes almacenadas en Firebase Storage
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  // Enable React Strict Mode
  reactStrictMode: true,
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configure webpack
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
