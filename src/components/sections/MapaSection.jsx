"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiBook, FiCoffee, FiHome, FiMusic, FiActivity, FiInfo } from 'react-icons/fi';

// Datos de ubicaciones de los departamentos
const ubicaciones = [
  {
    id: 1,
    nombre: "Coordinación",
    descripcion: "Gestión y seguimiento académico",
    icono: <FiInfo size={20} />,
    posicion: { top: "25%", left: "15%" },
    color: "bg-purple-500",
    textColor: "text-purple-600 dark:text-purple-400"
  },
  {
    id: 2,
    nombre: "Pasantías y Empresas",
    descripcion: "Coordinación de pasantías y vinculación empresarial",
    icono: <FiActivity size={20} />,
    posicion: { top: "25%", left: "30%" },
    color: "bg-blue-500",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  {
    id: 3,
    nombre: "60 Horas Sociales",
    descripcion: "Gestión del programa de servicio comunitario",
    icono: <FiBook size={20} />,
    posicion: { top: "25%", left: "60%" },
    color: "bg-green-500",
    textColor: "text-green-600 dark:text-green-400"
  },
  {
    id: 4,
    nombre: "Almuerzo Escolar",
    descripcion: "Administración del servicio de alimentación",
    icono: <FiCoffee size={20} />,
    posicion: { top: "60%", left: "50%" },
    color: "bg-red-500",
    textColor: "text-red-600 dark:text-red-400"
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function MapaSection() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [show3DView, setShow3DView] = useState(false);

  const handleLocationClick = (id) => {
    setSelectedLocation(id === selectedLocation ? null : id);
  };

  return (
    <section id="mapa" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Mapa del <span className="text-blue-600 dark:text-blue-400">Campus</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explora las diferentes ubicaciones de nuestro campus y descubre dónde se encuentran nuestros departamentos y servicios.
          </p>
        </motion.div>

        <motion.div 
          className="relative w-full h-[550px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl mx-auto max-w-4xl overflow-hidden border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Fondo del mapa estilizado */}
          <div className="absolute inset-0 bg-blue-50 dark:bg-blue-950/30 opacity-70"></div>
          
          {/* Cuadrícula del mapa */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 border-opacity-20 dark:border-opacity-20"></div>
            ))}
          </div>

          {/* Caminos del campus */}
          <div className="absolute top-1/2 left-0 w-full h-6 bg-blue-100 dark:bg-blue-900/30 transform -translate-y-1/2 opacity-70"></div>
          
          {/* Conectores verticales a cada departamento */}
          <div className="absolute top-[25%] left-[15%] w-1 h-[25%] bg-blue-100 dark:bg-blue-900/30 opacity-50"></div>
          <div className="absolute top-[25%] left-[30%] w-1 h-[25%] bg-blue-100 dark:bg-blue-900/30 opacity-40"></div>
          <div className="absolute top-[25%] left-[60%] w-1 h-[25%] bg-blue-100 dark:bg-blue-900/30 opacity-100"></div>
          <div className="absolute top-[50%] left-[50%] w-1 h-[30%] bg-blue-100 dark:bg-blue-900/30 opacity-40"></div>

          {/* Áreas de los departamentos */}
          <div className="absolute top-[15%] left-[5%] w-[20%] h-[33%] bg-purple-100 dark:bg-purple-900/20 rounded-lg opacity-50"></div>
          <div className="absolute top-[15%] left-[25%] w-[10%] h-[33%] bg-blue-100 dark:bg-blue-900/20 rounded-lg opacity-50"></div>
          <div className="absolute top-[15%] left-[55%] w-[15%] h-[33%] bg-green-100 dark:bg-green-900/20 rounded-lg opacity-50"></div>
          <div className="absolute top-[70%] left-[38%] w-[30%] h-[40%] bg-red-100 dark:bg-red-900/20 rounded-lg opacity-50"></div>

          {/* Botón de información */}
          <button 
            className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md z-30 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setShowInfo(!showInfo)}
          >
            <FiInfo size={20} className="text-blue-600 dark:text-blue-400" />
          </button>

          {/* Panel de información */}
          {showInfo && (
            <motion.div 
              className="absolute top-16 right-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-30 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cómo usar el mapa</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Haz clic en los marcadores para ver más información sobre cada ubicación del campus.
              </p>
              <div className="flex justify-end">
                <button 
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  onClick={() => setShowInfo(false)}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          )}

          {/* Marcadores de ubicaciones */}
          {ubicaciones.map((ubicacion) => (
            <motion.div
              key={ubicacion.id}
              className="absolute cursor-pointer z-20"
              style={{ 
                top: ubicacion.posicion.top, 
                left: ubicacion.posicion.left 
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLocationClick(ubicacion.id)}
            >
              <motion.div 
                className={`flex items-center justify-center w-12 h-12 rounded-full ${ubicacion.color} shadow-lg`}
                animate={{ 
                  y: [0, -5, 0],
                  scale: selectedLocation === ubicacion.id ? 1.1 : 1
                }}
                transition={{ 
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.2 }
                }}
              >
                <FiMapPin size={24} className="text-white" />
              </motion.div>
              
              {/* Tooltip con información */}
              {selectedLocation === ubicacion.id && (
                <motion.div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-30 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-full ${ubicacion.color} mr-3`}>
                      {ubicacion.icono}
                    </div>
                    <h4 className={`font-semibold ${ubicacion.textColor}`}>{ubicacion.nombre}</h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{ubicacion.descripcion}</p>
                  <div className="flex justify-end mt-2">
                    <button 
                      className={`text-xs ${ubicacion.textColor} hover:underline`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLocation(null);
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Leyenda del mapa */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Leyenda</h4>
            <div className="space-y-2.5">
              {ubicaciones.map((ubicacion) => (
                <div key={ubicacion.id} className="flex items-center text-xs">
                  <div className={`w-3 h-3 rounded-full ${ubicacion.color} mr-2`}></div>
                  <span className="text-gray-800 dark:text-gray-200">{ubicacion.nombre}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Botón para vista 3D */}
          <div className="absolute bottom-4 right-4">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShow3DView(true)}
            >
              <FiMapPin className="text-white" />
              <span>Ver en 3D</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Modal para vista 3D - Se activará cuando tengas el enlace */}
        {show3DView && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Vista 3D del Mapa</h3>
                <button 
                  onClick={() => setShow3DView(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-700 dark:text-gray-300 mb-4">Próximamente: Vista 3D interactiva del campus</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Estamos trabajando en una experiencia 3D inmersiva.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
