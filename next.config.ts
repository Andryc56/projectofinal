import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
  }
};

export default nextConfig;
