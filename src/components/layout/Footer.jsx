"use client";

import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiInstagram, FiCalendar, FiBookOpen, FiAward, FiHelpCircle, FiFileText, FiUsers, FiArrowRight, FiExternalLink } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 pb-10 border-t border-blue-100 dark:border-gray-800">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-400/10 dark:bg-blue-500/10"></div>
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-purple-400/10 dark:bg-purple-500/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Logo y descripción */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 pb-12 border-b border-blue-100/50 dark:border-gray-700/50">
          <div className="md:w-1/3 mb-8 md:mb-0 pr-8">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Portal Departamental</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Plataforma informativa para estudiantes que facilita el acceso a los servicios departamentales del centro educativo, diseñada para mejorar la experiencia educativa.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group"
                aria-label="GitHub"
              >
                <FiGithub size={18} className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group"
                aria-label="Twitter"
              >
                <FiTwitter size={18} className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <FiInstagram size={18} className="text-gray-700 dark:text-gray-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
              </a>
            </div>
          </div>
          
          {/* Links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
            {/* Departamentos */}
            <div>
              <h3 className="text-lg font-semibold mb-5 text-gray-800 dark:text-gray-100 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                  <FiUsers className="text-blue-600 dark:text-blue-400" />
                </span>
                Departamentos
              </h3>
              <ul className="space-y-3 pl-11">
                <li>
                  <Link href="#pasantia" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="relative overflow-hidden">
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                      Pasantía
                    </span>
                    <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={14} />
                  </Link>
                </li>
                <li>
                  <Link href="#empresas" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="relative overflow-hidden">
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                      Involucración con Empresas
                    </span>
                    <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={14} />
                  </Link>
                </li>
                <li>
                  <Link href="#horas-sociales" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="relative overflow-hidden">
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                      60 Horas Sociales
                    </span>
                    <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={14} />
                  </Link>
                </li>
                <li>
                  <Link href="#almuerzo" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="relative overflow-hidden">
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                      Almuerzo Escolar
                    </span>
                    <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={14} />
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Enlaces útiles */}
            <div>
              <h3 className="text-lg font-semibold mb-5 text-gray-800 dark:text-gray-100 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mr-3">
                  <FiBookOpen className="text-indigo-600 dark:text-indigo-400" />
                </span>
                Enlaces útiles
              </h3>
              <ul className="space-y-3 pl-11">
                <li>
                  <Link href="#calendario" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                    <span className="relative overflow-hidden">
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                      Calendario académico
                    </span>
                    <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={14} />
                  </Link>
                </li>
                <li>
                  <Link href="#biblioteca" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                    <span className="relative overflow-hidden">
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                      Biblioteca digital
                    </span>
                    <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={14} />
                  </Link>
                </li>
                <li>
                  <Link href="#mapa" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                    <span className="relative overflow-hidden">
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                      Mapa del campus
                    </span>
                    <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={14} />
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                    <span className="relative overflow-hidden">
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                      Preguntas frecuentes
                    </span>
                    <FiArrowRight className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={14} />
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contacto */}
            <div>
              <h3 className="text-lg font-semibold mb-5 text-gray-800 dark:text-gray-100 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mr-3">
                  <FiMail className="text-purple-600 dark:text-purple-400" />
                </span>
                Contacto
              </h3>
              <div className="pl-11 space-y-4">
                <div className="group">
                  <div className="flex items-start gap-3 mb-2">
                    <FiMapPin className="text-purple-500 dark:text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">Av. Principal #123, Ciudad Universitaria, Santo Domingo</span>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <FiPhone className="text-purple-500 dark:text-purple-400 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">+1 (809) 123-4567</span>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex items-center gap-3">
                    <FiMail className="text-purple-500 dark:text-purple-400 flex-shrink-0" />
                    <a 
                      href="mailto:info@portaldepartamental.edu" 
                      className="relative overflow-hidden text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <span className="relative overflow-hidden">
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
                        info@portaldepartamental.edu
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright y enlaces legales */}
        <div className="mt-10 pt-8 border-t border-blue-100/50 dark:border-gray-700/50 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-md">
              <span className="text-white font-bold">PD</span>
            </div>
            <p>© {new Date().getFullYear()} Portal Departamental. Todos los derechos reservados.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-6">
            <Link href="/privacidad" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group">
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              Política de privacidad
            </Link>
            <Link href="/terminos" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative group">
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              Términos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
