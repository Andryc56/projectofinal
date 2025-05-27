// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de salida
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  
  // Ensure webpack resolves react and react-dom from the project's node_modules
  webpack: (config, { isServer }) => {
    // Force webpack to resolve react and react-dom from the project's node_modules
    config.resolve.alias = {
      ...config.resolve.alias,
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
      'react/jsx-runtime': require.resolve('react/jsx-runtime')
    };
    
    // Configuración de polyfills necesarios para Firebase
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },
  
  // Configuración de imágenes
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Deshabilitar la optimización de fuentes para evitar conflictos con Babel
  optimizeFonts: false,
  
  // Configuración de webpack
  webpack: (config, { isServer }) => {
    // Configuración de polyfills necesarios para Firebase
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },
  
  // Configuración de TypeScript
  typescript: {
    // Ignorar errores de TypeScript durante la construcción
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de ESLint
  eslint: {
    // Ejecutar ESLint durante la construcción
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de internacionalización
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  
  // Configuración experimental
  experimental: {
    // Optimizar importaciones de paquetes grandes
    optimizePackageImports: [
      'react-icons',
      'date-fns'
    ],
    // Mejorar el rendimiento del servidor
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
    // Configuración de características experimentales
    workerThreads: false,
    // Configuración mínima de Turbo
    turbo: {}
  },
  
  // Configuración de transpilación para paquetes de nodo
  transpilePackages: ['framer-motion'],
  
  // Configuración de encabezados de seguridad
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
  
  // Configuración de redirecciones
  async redirects() {
    return [];
  },
  
  // Configuración de reescrituras
  async rewrites() {
    return [];
  },
};

export default nextConfig;
