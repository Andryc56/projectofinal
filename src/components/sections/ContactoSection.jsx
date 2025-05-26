"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMapPin, FiPhone, FiMail, FiClock, FiCheck, FiAlertCircle } from 'react-icons/fi';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactoSection() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    
    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      // Éxito
      setEnviado(true);
      setLoading(false);
      
      // Reseteamos el formulario después de 3 segundos
      setTimeout(() => {
        setEnviado(false);
        setFormData({
          nombre: '',
          email: '',
          asunto: '',
          mensaje: ''
        });
      }, 3000);
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
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
            <span className="text-blue-600 dark:text-blue-400">Contáctanos</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o necesitas más información? No dudes en contactarnos y te responderemos a la brevedad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-full">
              <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                Información de Contacto
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4 shadow-sm">
                    <FiMapPin size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-gray-900 dark:text-white">Dirección</h4>
                    <p className="text-gray-600 dark:text-gray-400">Av. Principal #123, Ciudad</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mr-4 shadow-sm">
                    <FiPhone size={24} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-gray-900 dark:text-white">Teléfono</h4>
                    <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-4 shadow-sm">
                    <FiMail size={24} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-gray-900 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">info@portaldepartamental.edu</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4 shadow-sm">
                    <FiClock size={24} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-gray-900 dark:text-white">Horario de Atención</h4>
                    <p className="text-gray-600 dark:text-gray-400">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-400">Sábados: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  También puedes visitarnos en nuestras oficinas durante el horario de atención para recibir asistencia personalizada.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                Envíanos un Mensaje
              </h3>
              
              {enviado ? (
                <motion.div 
                  className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg border border-green-200 dark:border-green-800 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
                      <FiCheck size={30} className="text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h4 className="text-xl font-medium text-green-800 dark:text-green-400 mb-2">¡Mensaje enviado con éxito!</h4>
                  <p className="text-green-700 dark:text-green-300">Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
                </motion.div>
              ) : error ? (
                <motion.div 
                  className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg border border-red-200 dark:border-red-800 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-red-100 dark:bg-red-800 rounded-full">
                      <FiAlertCircle size={30} className="text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <h4 className="text-xl font-medium text-red-800 dark:text-red-400 mb-2">Error al enviar el mensaje</h4>
                  <p className="text-red-700 dark:text-red-300 mb-4">Ha ocurrido un error al enviar tu mensaje. Por favor, inténtalo de nuevo.</p>
                  <button 
                    onClick={() => setError(false)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Intentar de nuevo
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nombre completo</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Tu nombre"
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="tu.email@ejemplo.com"
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="asunto" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Asunto</label>
                    <input
                      type="text"
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Asunto de tu mensaje"
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Mensaje</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Escribe tu mensaje aquí..."
                      disabled={loading}
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <FiSend size={18} />
                        <span>Enviar Mensaje</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
