// Este archivo es necesario para habilitar el renderizado del lado del servidor (SSR) en Netlify
const { createServer } = require('@netlify/functions');
const server = require('@netlify/next');

// Configura el servidor Next.js
const nextServer = server({
  // Ruta al directorio .next
  distDir: '.next',
  // Configuración de desarrollo (false en producción)
  dev: false,
  // Configuración de directorios
  dir: process.cwd(),
  // Configuración de host y puerto
  hostname: 'localhost',
  port: 3000,
});

// Crea el manejador de la función Netlify
exports.handler = createServer(async (event, context) => {
  try {
    // Procesa la solicitud con el servidor Next.js
    return await nextServer(event, context);
  } catch (error) {
    console.error('Error en la función de servidor:', error);
    return {
      statusCode: 500,
      body: 'Error interno del servidor',
    };
  }
});
