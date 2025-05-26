"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiInfo, FiMapPin, FiUsers } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950">
      {/* Elementos decorativos de fondo */}
      <motion.div 
        className="absolute top-20 right-[10%] w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-10 left-[15%] w-64 h-64 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                Portal Informativo <span className="text-blue-600 dark:text-blue-400">Departamental</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Descubre toda la información sobre nuestros departamentos, ubicaciones y servicios disponibles para estudiantes y personal.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#departamentos"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Explorar Departamentos
                  <FiArrowRight />
                </Link>
                <Link 
                  href="#contacto"
                  className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2"
                >
                  Contactar
                  <FiInfo />
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <FiUsers className="text-blue-600 dark:text-blue-400" size={18} />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">5 Departamentos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <FiMapPin className="text-blue-600 dark:text-blue-400" size={18} />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Mapa Interactivo</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl transform rotate-3 scale-105 opacity-20 dark:opacity-10"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Departamentos Destacados</h3>
                  <div className="space-y-4">
                    {['Pasantía e Involucración con Empresas', '60 Horas Sociales', 'Coordinación', 'Almuerzo Escolar'].map((dept, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-amber-500'][index]}`}></div>
                        <span className="text-gray-800 dark:text-gray-200">{dept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Curva decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white dark:text-gray-950 fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
