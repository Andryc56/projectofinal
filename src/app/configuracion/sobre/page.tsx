import React from 'react';
import { FiInfo, FiGithub, FiGlobe, FiMail, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export const metadata = {
  title: 'Sobre la aplicación',
  description: 'Información sobre la aplicación y el equipo de desarrollo',
};

const SobrePage = () => {
  const detallesAplicacion = [
    {
      nombre: 'Versión',
      valor: '1.0.0',
    },
    {
      nombre: 'Desarrollado por',
      valor: 'Equipo de Desarrollo',
    },
    {
      nombre: 'Última actualización',
      valor: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  ];

  const enlacesUtiles = [
    {
      nombre: 'Documentación',
      url: 'https://docs.ejemplo.com',
      icono: <FiGlobe className="w-5 h-5 mr-2 text-blue-600" />,
    },
    {
      nombre: 'Repositorio',
      url: 'https://github.com/tu-usuario/tu-repositorio',
      icono: <FiGithub className="w-5 h-5 mr-2 text-gray-800 dark:text-gray-200" />,
    },
    {
      nombre: 'Soporte',
      url: 'mailto:soporte@ejemplo.com',
      icono: <FiMail className="w-5 h-5 mr-2 text-green-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/configuracion" 
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Volver a configuración
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                <FiInfo className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sobre la aplicación</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Información sobre la plataforma y el equipo de desarrollo
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Acerca de
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Esta plataforma ha sido desarrollada para ofrecer una experiencia de usuario excepcional,
                con un enfoque en la usabilidad y el rendimiento. Nuestro objetivo es proporcionar
                herramientas que hagan tu trabajo más fácil y eficiente.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Detalles técnicos
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                  {detallesAplicacion.map((item, index) => (
                    <li key={index} className="px-4 py-3 sm:px-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {item.nombre}
                        </span>
                        <span className="text-sm text-gray-900 dark:text-white font-medium">
                          {item.valor}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Enlaces útiles
              </h2>
              <div className="grid gap-3">
                {enlacesUtiles.map((enlace, index) => (
                  <a
                    key={index}
                    href={enlace.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    {enlace.icono}
                    <span className="text-gray-700 dark:text-gray-200">
                      {enlace.nombre}
                    </span>
                    <svg
                      className="ml-auto h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobrePage;
