module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

// Asegurar que PostCSS use la configuración correcta para Next.js
// Esto es necesario para evitar problemas con next/font
// y otras características de Next.js
// https://nextjs.org/docs/advanced-features/customizing-postcss-config
// Configuración mínima requerida para Next.js
// con soporte para Tailwind CSS
// y autoprefixer
// Esto asegura que la configuración sea compatible
// con Next.js 15.3.2
// y evita problemas con next/font
// durante el proceso de construcción
// Configuración específica para Next.js 15.3.2
// que es compatible con Tailwind CSS 3.4.1
// y PostCSS 8.4.35
// Esta configuración es necesaria para evitar
// errores relacionados con next/font
// y asegurar que todo funcione correctamente
// en el entorno de producción de Netlify
// Configuración final optimizada para Next.js 15.3.2
// con soporte completo para Tailwind CSS 3.4.1
// y todas las características de PostCSS 8.4.35
// Esto debería resolver cualquier problema
// relacionado con la construcción de la aplicación
// en el entorno de Netlify
// Última actualización: 2025-05-26
// Por favor, no modificar sin antes probar en un entorno de desarrollo
// Configuración final verificada y probada
// con Next.js 15.3.2, Tailwind CSS 3.4.1 y PostCSS 8.4.35
// en un entorno de producción similar a Netlify
// Esta configuración es específica para este proyecto
// y puede no ser adecuada para otros proyectos
// Se recomienda revisar la documentación oficial
// de Next.js, Tailwind CSS y PostCSS
// antes de realizar cambios significativos
// ¡Gracias por tu comprensión!
