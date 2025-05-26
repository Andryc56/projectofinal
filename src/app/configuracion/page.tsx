import React from 'react';
import { FiSettings, FiBell, FiUser, FiInfo } from 'react-icons/fi';
import Link from 'next/link';

export const metadata = {
  title: 'Configuración',
  description: 'Configura tus preferencias y ajustes de la cuenta',
};

const ConfiguracionPage = () => {
  const configuraciones = [
    {
      id: 'perfil',
      titulo: 'Perfil',
      descripcion: 'Administra tu información personal y preferencias de cuenta',
      icono: <FiUser className="w-6 h-6 text-blue-600" />,
      ruta: '/perfil',
    },
    {
      id: 'notificaciones',
      titulo: 'Notificaciones',
      descripcion: 'Configura cómo y cuándo recibir notificaciones',
      icono: <FiBell className="w-6 h-6 text-green-600" />,
      ruta: '/configuracion/notificaciones',
    },
    {
      id: 'sobre',
      titulo: 'Sobre la aplicación',
      descripcion: 'Información sobre la aplicación y versión',
      icono: <FiInfo className="w-6 h-6 text-purple-600" />,
      ruta: '/configuracion/sobre',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <FiSettings className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configuración</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Personaliza tu experiencia en la plataforma
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
          {configuraciones.map((item) => (
            <Link 
              key={item.id}
              href={item.ruta}
              className="block hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
            >
              <div className="flex items-center p-6">
                <div className="flex-shrink-0 mr-4">
                  {item.icono}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.titulo}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.descripcion}
                  </p>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPage;
