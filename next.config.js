/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración de salida
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuración de imágenes
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
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
      'framer-motion',
      'react-icons',
      'date-fns'
    ],
    // Mejorar el rendimiento del servidor
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
    // Mejorar el rendimiento de la compilación
    workerThreads: true,
    // Configuración de Turbo (objeto vacío para desactivar la advertencia)
    turbo: {}
  },
  
  // Configuración de encabezados de seguridad
  headers: async () => {
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
    return [
      // Redirecciones personalizadas aquí si son necesarias
    ];
  },
  
  // Configuración de reescrituras
  async rewrites() {
    return [
      // Reescrituras personalizadas aquí si son necesarias
    ];
  },
  
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

  // Configuración de redirecciones
  async redirects() {
    return [
      {
        source: '/',
        destination: '/inicio',
        permanent: true,
      },
    ]
  },
  
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
    // Configuración específica para el cliente
    if (!isServer) {
      // Configuración para el navegador
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        dgram: false,
      };
    }

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
  
  // Configuración de internacionalización
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  
  // Configuración experimental
  experimental: {
    // Optimizar importaciones de paquetes grandes
    optimizePackageImports: [
      'framer-motion',
      'react-icons',
      'date-fns'
    ],
    // Mejorar el rendimiento del servidor
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs'],
    // Mejorar el rendimiento de la compilación
    workerThreads: true,
    // Configuración de Turbo (objeto vacío para desactivar la advertencia)
    turbo: {}
  },
  
  // La caché ahora se maneja automáticamente por Next.js
  // No es necesario configurarla manualmente
  
  // Configuración de logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

// Exportar la configuración
module.exports = nextConfig;
