'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FiBell, FiCheck, FiArrowLeft, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NotificationSettings() {
  const { user } = useAuth();
  // Estado para las configuraciones de notificaciones
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    inApp: true,
    news: true,
    updates: true,
    reminders: true,
    marketing: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Cargar configuraciones guardadas
  useEffect(() => {
    const loadNotificationSettings = async () => {
      if (!user?.uid) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Referencia al documento del usuario en Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists() && userDoc.data().notificationSettings) {
          // Si existen configuraciones guardadas, actualizar el estado
          setSettings(prev => ({
            ...prev,
            ...userDoc.data().notificationSettings
          }));
        }
        // Si no existen configuraciones, se mantienen los valores por defecto
      } catch (err) {
        console.error('Error al cargar configuraciones:', err);
        setError('No se pudieron cargar las configuraciones. Por favor, inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNotificationSettings();
  }, [user]);

  const handleSettingChange = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      // Referencia al documento del usuario en Firestore
      const userDocRef = doc(db, 'users', user.uid);
      
      // Actualizar el documento con las nuevas configuraciones
      await setDoc(
        userDocRef,
        {
          notificationSettings: settings,
          updatedAt: serverTimestamp()
        },
        { merge: true } // Fusionar con los datos existentes
      );
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error al guardar configuraciones:', err);
      setError('Error al guardar las configuraciones. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Cargando configuraciones...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30">
            <FiAlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">Error</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{error}</p>
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/configuracion" 
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
          >
            <FiArrowLeft className="mr-2" /> Volver a configuración
          </Link>
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
              <FiBell className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Preferencias de notificaciones</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Configura cómo y cuándo quieres recibir notificaciones
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
          {/* Configuración general */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preferencias generales</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificaciones por correo</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recibir notificaciones importantes por correo electrónico
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('email')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.email ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificaciones push</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recibir notificaciones en tu navegador
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('push')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.push ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.push ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notificaciones en la aplicación</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Mostrar notificaciones dentro de la aplicación
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('inApp')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.inApp ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.inApp ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Tipos de notificaciones */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tipos de notificaciones</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Novedades y actualizaciones</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nuevas características y actualizaciones de la plataforma
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('updates')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.updates ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.updates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Recordatorios</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Recordatorios de actividades importantes
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('reminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.reminders ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.reminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Noticias y promociones</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ofertas especiales y contenido promocional
                  </p>
                </div>
                <button
                  onClick={() => handleSettingChange('marketing')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.marketing ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.marketing ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Botón de guardar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 gap-4">
            {error && (
              <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                <FiAlertCircle className="mr-1.5 h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {saveSuccess && (
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <FiCheck className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  <span>Configuración guardada</span>
                </div>
              )}
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  isSaving ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-w-[120px] justify-center`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </>
                ) : (
                  <>
                    <FiCheck className="-ml-1 mr-2 h-4 w-4" />
                    Guardar cambios
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>Los cambios pueden tardar unos minutos en aplicarse a todas las notificaciones.</p>
        </div>
      </div>
    </div>
  );
}
