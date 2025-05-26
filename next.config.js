/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para la exportación estática (requerida por Netlify)
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // Configuración de imágenes
  images: {
    // Deshabilitar la optimización de imágenes para exportación estática
    unoptimized: process.env.NODE_ENV === 'production',
    // Dominios permitidos para imágenes remotas
    domains: [
      'lh3.googleusercontent.com',  // Fotos de perfil de Google
      'googleusercontent.com',
      'graph.facebook.com',
      'platform-lookaside.fbsbx.com',
      'firebasestorage.googleapis.com', // Imágenes de Firebase Storage
      'images.unsplash.com', // Para imágenes de ejemplo
      'localhost', // Para desarrollo local
      'via.placeholder.com' // Para imágenes de ejemplo
    ],
    // Configuración de formatos de imagen
    formats: ['image/avif', 'image/webp'],
    // Configuración de tamaños de imagen
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Configuración de tamaños de imagen para diferentes densidades de píxeles
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Solo habilitar remotePatterns en desarrollo
    ...(process.env.NODE_ENV !== 'production' && {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
          port: '',
          pathname: '/**',
        },
      ],
    }),
  },

  // Configuración de redirecciones (manejada por netlify.toml en producción)
  ...(process.env.NODE_ENV !== 'production' && {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/inicio',
          permanent: true,
        },
      ]
    },
  }),
  
  // Configuración de reescrituras (solo en desarrollo)
  ...(process.env.NODE_ENV !== 'production' && {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.API_URL || 'http://localhost:3000/api'}/:path*`,
        },
      ]
    },
  }),

  // Configuración de cabeceras de seguridad
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
    ]
  },
  
  // Configuración de TypeScript
  typescript: {
    // Ignorar errores de TypeScript durante la construcción
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de ESLint
  eslint: {
    // Ignorar errores de ESLint durante la construcción
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  
  // Configuración de webpack
  webpack: (config, { isServer, dev }) => {
    // Configuraciones personalizadas de webpack
    
    // Solo en producción
    if (!dev && !isServer) {
      // Optimizaciones para el cliente
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }

    // Importante: devolver la configuración modificada
    return config;
  },
  
  // Configuración de compresión (manejada por Netlify)
  compress: false,
  
  // Generar mapas de fuente para producción
  productionBrowserSourceMaps: false,
  
  // Configuración de internacionalización (solo en desarrollo para exportación estática)
  ...(process.env.NODE_ENV !== 'production' && {
    i18n: {
      locales: ['es'],
      defaultLocale: 'es',
    },
  }),
  
  // Configuración de caché
  experimental: {
    // Habilita el caché de compilación persistente
    turbo: {
      rules: {
        '*.{js,jsx,ts,tsx}': ['@swc/jest'],
      },
    },
    // Mejora el rendimiento de la compilación
    optimizeCss: true,
    // Mejora el rendimiento de la carga de módulos
    optimizePackageImports: [
      'framer-motion',
      'react-icons',
      'date-fns',
      'zod',
      'react-hook-form',
      '@hookform/resolvers',
    ],
  },
  
  // Configuración de logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

// Configuración para análisis de paquetes
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Exportar la configuración
module.exports = withBundleAnalyzer(nextConfig);
