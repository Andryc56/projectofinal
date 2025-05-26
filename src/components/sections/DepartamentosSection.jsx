"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiBriefcase, FiUsers, FiGrid, FiCoffee, FiActivity, FiChevronDown, FiChevronUp, FiCheck, FiMapPin, FiMail, FiPhone, FiClock, FiInfo, FiAward, FiClipboard, FiHelpCircle, FiUser } from 'react-icons/fi';
import { departamentos } from '@/data/departamentos';

// Mapeo de iconos para los departamentos
const iconMap = {
  FiBriefcase: FiBriefcase,
  FiUsers: FiUsers,
  FiGrid: FiGrid,
  FiCoffee: FiCoffee,
  FiActivity: FiActivity
};

// Colores para los departamentos
const colorClasses = {
  'bg-blue-500': 'bg-blue-500 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
  'bg-green-500': 'bg-green-500 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
  'bg-purple-500': 'bg-purple-500 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20',
  'bg-amber-500': 'bg-amber-500 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20',
  'bg-teal-500': 'bg-teal-500 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20',
  'bg-red-500': 'bg-red-500 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function DepartamentosSection() {
  const [selectedDept, setSelectedDept] = useState(null);
  const [activeTab, setActiveTab] = useState('detalles');

  const handleSelectDept = (dept) => {
    if (selectedDept && selectedDept.id === dept.id) {
      setSelectedDept(null);
    } else {
      setSelectedDept(dept);
      // Añadir un pequeño retraso para asegurar que el elemento exista en el DOM
      setTimeout(() => {
        const detailSection = document.getElementById('dept-detail-section');
        if (detailSection) {
          detailSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setActiveTab('detalles'); // Resetear a la pestaña de detalles cuando se selecciona un nuevo departamento
  };

  // Extraer el color base y las clases de color
  const getColorClasses = (colorBase) => {
    return colorClasses[colorBase] || '';
  };

  return (
    <section id="departamentos" className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Nuestros <span className="text-blue-600 dark:text-blue-400">Departamentos</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Conoce los diferentes departamentos que conforman nuestra institución y los servicios que ofrecen a nuestra comunidad.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {departamentos.map((dept) => {
            const Icon = iconMap[dept.icono];
            const isSelected = selectedDept?.id === dept.id;
            const colorClasses = getColorClasses(dept.color);
            
            return (
              <motion.div
                key={dept.id}
                className="card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 flex flex-col h-full"
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-2 ${dept.color}`} />
                
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                  <div className={`absolute bottom-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-medium text-white ${dept.color}`}>
                    {dept.nombre}
                  </div>
                  <Image 
                    src={dept.imagen} 
                    alt={dept.nombre}
                    width={500}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-full ${dept.color} bg-opacity-10 dark:bg-opacity-20 mr-3`}>
                      {Icon && <Icon className={`text-${dept.color.split('-')[1]}-600 dark:text-${dept.color.split('-')[1]}-400`} size={20} />}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{dept.nombre}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {dept.descripcion}
                  </p>
                </div>
                
                <div className="p-6 pt-0 mt-auto">
                  <button 
                    className={`flex items-center justify-center w-full py-3 px-4 rounded-lg ${dept.color} text-white transition-colors hover:opacity-90 font-medium`}
                    onClick={() => handleSelectDept(dept)}
                  >
                    {isSelected ? 'Ver menos' : 'Ver más'}
                    {isSelected ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {selectedDept && (
          <motion.div 
            id="dept-detail-section"
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedDept.nombre}</h2>
                <p className="text-white/90 text-lg max-w-3xl">{selectedDept.descripcion}</p>
              </div>
              <Image 
                src={selectedDept.imagen} 
                alt={selectedDept.nombre}
                width={1200}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mb-6">
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'detalles' ? `text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400 border-b-2 border-${selectedDept.color.split('-')[1]}-500` : 'text-gray-500 dark:text-gray-400'}`}
                  onClick={() => setActiveTab('detalles')}
                >
                  Información General
                </button>
                {selectedDept.documentos && selectedDept.documentos.length > 0 && (
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'documentos' ? `text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400 border-b-2 border-${selectedDept.color.split('-')[1]}-500` : 'text-gray-500 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('documentos')}
                  >
                    Documentos
                  </button>
                )}
                {selectedDept.beneficios && (
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'beneficios' ? `text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400 border-b-2 border-${selectedDept.color.split('-')[1]}-500` : 'text-gray-500 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('beneficios')}
                  >
                    Beneficios
                  </button>
                )}
                {selectedDept.requisitos && (
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'requisitos' ? `text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400 border-b-2 border-${selectedDept.color.split('-')[1]}-500` : 'text-gray-500 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('requisitos')}
                  >
                    Requisitos
                  </button>
                )}
                {selectedDept.menuSemanal && (
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'menu' ? `text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400 border-b-2 border-${selectedDept.color.split('-')[1]}-500` : 'text-gray-500 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('menu')}
                  >
                    Menú Semanal
                  </button>
                )}
                <button
                  className={`px-4 py-2 font-medium ${activeTab === 'encargados' ? `text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400 border-b-2 border-${selectedDept.color.split('-')[1]}-500` : 'text-gray-500 dark:text-gray-400'}`}
                  onClick={() => setActiveTab('encargados')}
                >
                  Nuestro Equipo
                </button>
                {selectedDept.categorias && (
                  <button
                    className={`px-4 py-2 font-medium ${activeTab === 'categorias' ? `text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400 border-b-2 border-${selectedDept.color.split('-')[1]}-500` : 'text-gray-500 dark:text-gray-400'}`}
                    onClick={() => setActiveTab('categorias')}
                  >
                    Categorías
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2">
                  {activeTab === 'detalles' && (
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-3/4">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {selectedDept.descripcionLarga}
                          </p>
                        </div>
                        <div>
                          <a 
                            href={`mailto:${selectedDept.contacto}`}
                            className={`px-4 py-2 rounded-md ${selectedDept.color} text-white flex items-center justify-center`}
                          >
                            <FiMail className="mr-2" size={16} />
                            Contactar
                          </a>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg flex items-center">
                        <FiCheck className={`mr-2 text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} size={20} />
                        Características del programa
                      </h4>
                      <ul className="space-y-3 mb-6">
                        {selectedDept.detalles.map((detalle, index) => (
                          <li key={index} className="flex items-start">
                            <span className={`mr-2 mt-1 text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`}>
                              <FiCheck size={16} />
                            </span>
                            <span className="text-gray-700 dark:text-gray-300">{detalle}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {activeTab === 'documentos' && selectedDept.documentos && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg flex items-center">
                        <FiClipboard className={`mr-2 text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} size={20} />
                        Documentos Disponibles
                      </h4>
                      <div className="grid gap-4">
                        {selectedDept.documentos.map((documento, index) => (
                          <div 
                            key={index} 
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 dark:border-gray-700"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">{documento.titulo}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{documento.descripcion}</p>
                                <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-500">
                                  <span className="mr-3">{documento.tamaño}</span>
                                  <span>Actualizado: {new Date(documento.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                              </div>
                              <a 
                                href={documento.archivo} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`px-3 py-1.5 rounded-md ${selectedDept.color} text-white text-sm hover:opacity-90 transition-opacity`}
                                download
                              >
                                Descargar
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300 flex items-start">
                          <FiInfo className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                          Para visualizar los documentos, necesitarás un lector de PDF. Si no tienes uno instalado, puedes descargar Adobe Reader de forma gratuita.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'beneficios' && selectedDept.beneficios && (
                    <div>
                      <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg flex items-center">
                        <FiAward className={`mr-2 text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} size={20} />
                        Beneficios del programa
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-5">
                        <ul className="space-y-4">
                          {selectedDept.beneficios.map((beneficio, index) => (
                            <li key={index} className="flex items-start">
                              <div className={`p-2 rounded-full ${selectedDept.color} text-white mr-3 flex-shrink-0`}>
                                <FiCheck size={16} />
                              </div>
                              <div>
                                <span className="text-gray-700 dark:text-gray-300 font-medium">{beneficio}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400 italic">Estos beneficios están disponibles para todos los estudiantes que participen en el programa {selectedDept.nombre}.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'requisitos' && selectedDept.requisitos && (
                    <div>
                      <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg flex items-center">
                        <FiClipboard className={`mr-2 text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} size={20} />
                        Requisitos de participación
                      </h4>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        {selectedDept.requisitos.map((requisito, index) => (
                          <div 
                            key={index} 
                            className={`flex items-start p-4 ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/30'}`}
                          >
                            <div className={`p-2 rounded-full ${selectedDept.color} bg-opacity-10 dark:bg-opacity-20 mr-3 flex-shrink-0`}>
                              <FiInfo className={`text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} size={16} />
                            </div>
                            <div>
                              <span className="text-gray-700 dark:text-gray-300 font-medium">{requisito}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <a 
                          href={`mailto:${selectedDept.contacto}`}
                          className={`flex items-center justify-center w-full py-3 px-4 rounded-lg ${selectedDept.color} text-white transition-colors hover:opacity-90 font-medium mt-4`}
                        >
                          <FiMail className="mr-2" />
                          Contactar para más información
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'menu' && selectedDept.menuSemanal && (
                    <div>
                      <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg flex items-center">
                        <FiCoffee className={`mr-2 text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} size={20} />
                        Menú Semanal
                      </h4>
                      <div className="space-y-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <div className="flex flex-col space-y-2">
                          <p className="font-medium text-gray-900 dark:text-white">Lunes</p>
                          <p className="text-gray-700 dark:text-gray-300">{selectedDept.menuSemanal.lunes}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <p className="font-medium text-gray-900 dark:text-white">Martes</p>
                          <p className="text-gray-700 dark:text-gray-300">{selectedDept.menuSemanal.martes}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <p className="font-medium text-gray-900 dark:text-white">Miércoles</p>
                          <p className="text-gray-700 dark:text-gray-300">{selectedDept.menuSemanal.miercoles}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <p className="font-medium text-gray-900 dark:text-white">Jueves</p>
                          <p className="text-gray-700 dark:text-gray-300">{selectedDept.menuSemanal.jueves}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <p className="font-medium text-gray-900 dark:text-white">Viernes</p>
                          <p className="text-gray-700 dark:text-gray-300">{selectedDept.menuSemanal.viernes}</p>
                        </div>
                      </div>
                      
                      {selectedDept.opcionesEspeciales && (
                        <div className="mt-6">
                          <h5 className="font-medium mb-3 text-gray-900 dark:text-white">Opciones especiales disponibles:</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedDept.opcionesEspeciales.map((opcion, index) => (
                              <span key={index} className={`px-3 py-1 rounded-full text-sm bg-${selectedDept.color.split('-')[1]}-100 dark:bg-${selectedDept.color.split('-')[1]}-900/30 text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`}>
                                {opcion}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'categorias' && selectedDept.categorias && (
                    <div>
                      <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg flex items-center">
                        <FiGrid className={`mr-2 text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} size={20} />
                        Categorías
                      </h4>
                      <div className="space-y-4">
                        {selectedDept.categorias.map((categoria, index) => {
                          const [titulo, contenido] = categoria.split(': ');
                          return (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                              <p className="font-medium text-gray-900 dark:text-white mb-2">{titulo}</p>
                              <p className="text-gray-700 dark:text-gray-300">{contenido}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'encargados' && selectedDept.encargados && (
                    <div>
                      <h4 className="font-semibold mb-6 text-gray-900 dark:text-white text-xl flex items-center">
                        <FiUsers className={`mr-2 text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} size={24} />
                        Nuestro Equipo
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedDept.encargados.map((encargado, index) => (
                          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                            <div className="relative h-48 w-full">
                              <Image
                                src={encargado.imagen}
                                alt={encargado.nombre}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="p-5">
                              <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{encargado.nombre}</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{encargado.cargo}</p>
                              <a 
                                href={`mailto:${encargado.contacto}`}
                                className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <FiMail className="mr-1" size={14} />
                                {encargado.contacto}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-100 dark:border-gray-700 sticky top-24">
                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg flex items-center">
                      <FiInfo className={`mr-2 text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} size={20} />
                      Información de contacto
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full ${selectedDept.color} bg-opacity-10 dark:bg-opacity-20 mr-3`}>
                          <FiUser className={`text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Responsable</p>
                          <p className="text-gray-600 dark:text-gray-400">{selectedDept.responsable}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full ${selectedDept.color} bg-opacity-10 dark:bg-opacity-20 mr-3`}>
                          <FiMail className={`text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Correo electrónico</p>
                          <p className="text-gray-600 dark:text-gray-400">{selectedDept.contacto}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full ${selectedDept.color} bg-opacity-10 dark:bg-opacity-20 mr-3`}>
                          <FiMapPin className={`text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Ubicación</p>
                          <p className="text-gray-600 dark:text-gray-400">{selectedDept.ubicacion}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className={`p-2 rounded-full ${selectedDept.color} bg-opacity-10 dark:bg-opacity-20 mr-3`}>
                          <FiClock className={`text-${selectedDept.color.split('-')[1]}-600 dark:text-${selectedDept.color.split('-')[1]}-400`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Horario de atención</p>
                          <p className="text-gray-600 dark:text-gray-400">{selectedDept.horario}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
