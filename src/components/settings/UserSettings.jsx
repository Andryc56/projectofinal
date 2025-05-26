"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from 'next-themes';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import ThemePreferences from '@/components/ui/ThemePreferences';

export default function UserSettings() {
  const { user, updateProfile } = useAuth();
  const { setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    theme: 'system',
    notifications: true,
    language: 'es'
  });

  // Cargar preferencias del usuario
  useEffect(() => {
    const loadUserPreferences = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const preferencesDoc = await getDoc(doc(db, 'userPreferences', user.uid));
        
        if (preferencesDoc.exists()) {
          const data = preferencesDoc.data();
          setUserPreferences({
            theme: data.theme || 'system',
            notifications: data.notifications !== undefined ? data.notifications : true,
            language: data.language || 'es'
          });
          
          // Aplicar tema guardado
          if (data.theme) {
            setTheme(data.theme);
          }
        }
      } catch (error) {
        console.error('Error al cargar preferencias:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserPreferences();
  }, [user, setTheme]);

  // Guardar tema en las preferencias
  const saveThemePreference = async (theme) => {
    if (!user) return;
    
    try {
      const preferencesRef = doc(db, 'userPreferences', user.uid);
      const preferencesDoc = await getDoc(preferencesRef);
      
      if (preferencesDoc.exists()) {
        await updateDoc(preferencesRef, {
          theme
        });
      } else {
        await setDoc(preferencesRef, {
          theme,
          notifications: true,
          language: 'es'
        });
      }
      
      setUserPreferences(prev => ({
        ...prev,
        theme
      }));
    } catch (error) {
      console.error('Error al guardar preferencia de tema:', error);
    }
  };

  // Escuchar cambios de tema y guardarlos en Firebase
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('portal-departamental-theme');
      if (currentTheme && user) {
        // Eliminar comillas del valor almacenado
        const cleanTheme = currentTheme.replace(/"/g, '');
        saveThemePreference(cleanTheme);
      }
    };

    window.addEventListener('storage', handleThemeChange);
    return () => window.removeEventListener('storage', handleThemeChange);
  }, [user]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-80 rounded-lg"></div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Configuración de usuario</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Tema de la aplicación</h3>
          <ThemePreferences />
        </div>
        
        {/* Otras secciones de preferencias */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Notificaciones</h3>
          <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Notificaciones del sistema</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Recibir alertas sobre actualizaciones y eventos importantes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={userPreferences.notifications}
                  onChange={() => {
                    setUserPreferences(prev => ({
                      ...prev,
                      notifications: !prev.notifications
                    }));
                    // Aquí se agregaría lógica para guardar en Firebase
                  }}
                />
                <div className={`
                  w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-500 rounded-full peer 
                  dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                  after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                  after:transition-all dark:border-gray-600 peer-checked:bg-blue-600
                `}></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Idioma</h3>
        <div className="p-4 sm:p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="max-w-xs">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Seleccionar idioma
            </label>
            <select
              id="language"
              name="language"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={userPreferences.language}
              onChange={(e) => {
                setUserPreferences(prev => ({
                  ...prev,
                  language: e.target.value
                }));
                // Aquí se agregaría lógica para guardar en Firebase
              }}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={async () => {
            // Guardar todas las preferencias en Firebase
            try {
              const preferencesRef = doc(db, 'userPreferences', user.uid);
              await setDoc(preferencesRef, userPreferences, { merge: true });
              alert('Preferencias guardadas correctamente');
            } catch (error) {
              console.error('Error al guardar preferencias:', error);
              alert('Error al guardar preferencias');
            }
          }}
        >
          Guardar preferencias
        </button>
      </div>
    </div>
  );
}