"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiEdit2, FiSave, FiLock, FiAlertCircle, FiUpload, FiCamera } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import dynamic from 'next/dynamic';

// Import MainLayout with SSR disabled to avoid hydration issues
const MainLayout = dynamic(
  () => import('@/components/layout/MainLayout'),
  { ssr: false, loading: () => <div>Loading...</div> }
);

export default function PerfilPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading, updateProfile, changePassword } = useAuth();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    photoURL?: string;
    photoFile?: File;
  }>({
    name: '',
    email: ''
  });
  const [photoPreview, setPhotoPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  // Cargar datos del usuario
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        photoURL: user.photoURL || ''
      }));
      if (user.photoURL) {
        setPhotoPreview(user.photoURL);
      }
    }
  }, [user]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Crear una URL temporal para la vista previa
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
      
      // Actualizar formData con el archivo, no con la URL de datos
      setFormData(prev => ({
        ...prev,
        photoFile: file
      }));
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    // Validar que las contraseñas coincidan
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    // Validar longitud mínima de la contraseña
    if (passwordData.newPassword.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const result = await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: 'Contraseña actualizada correctamente' 
        });
        
        // Limpiar el formulario
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setShowChangePassword(false);
      } else {
        setPasswordError(result.error || 'Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setPasswordError('Ocurrió un error al cambiar la contraseña');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setIsUploading(true);
      
      // Crear un objeto con solo los campos que han cambiado
      const updatedData: {[key: string]: any} = {};
      
      if (formData.name !== user.name) updatedData.name = formData.name;
      
      // Si hay un archivo de imagen, se manejará en el contexto
      if (formData.photoFile) {
        updatedData.photoFile = formData.photoFile;
      }
      
      // Solo actualizar si hay cambios
      if (Object.keys(updatedData).length > 0) {
        const result = await updateProfile(updatedData);
        
        if (result.success) {
          setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
          setIsEditing(false);
          
          // Actualizar la vista previa con la nueva URL de la imagen
          if (result.user?.photoURL) {
            setPhotoPreview(result.user.photoURL);
          }
        } else {
          setMessage({ 
            type: 'error', 
            text: result.error || 'Error al actualizar el perfil' 
          });
          
          // Restaurar la vista previa anterior si hay un error
          if (user.photoURL) {
            setPhotoPreview(user.photoURL);
          } else {
            setPhotoPreview('');
          }
        }
      } else {
        setMessage({ type: 'info', text: 'No se detectaron cambios para guardar' });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error inesperado';
      setMessage({ 
        type: 'error', 
        text: errorMessage 
      });
      
      // Restaurar la vista previa anterior en caso de error
      if (user.photoURL) {
        setPhotoPreview(user.photoURL);
      }
      
      console.error('Error al actualizar perfil:', error);
    } finally {
      setIsUploading(false);
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setMessage(prev => ({ ...prev, text: '' }));
      }, 3000);
    }
  };

  if (loading || !user) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Mi Perfil</h1>
            <p className="text-blue-100 mt-2">Gestiona tu información personal</p>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="space-y-8">
              {/* Sección de foto de perfil */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Foto de perfil" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <FiUser className="text-white text-5xl" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg transform transition-transform hover:scale-110"
                        title="Cambiar foto"
                      >
                        <FiCamera className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  {user.name || 'Usuario'}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
              </div>

              {message.text && (
                <div className={`mb-6 p-4 rounded-lg flex items-center ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' 
                    : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                }`}>
                  <FiAlertCircle className="mr-2 flex-shrink-0" />
                  <span>{message.text}</span>
                </div>
              )}
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 flex flex-col items-center">
                    <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-5xl mb-4">
                      <FiUser />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
                    
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="mt-4 flex items-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                    >
                      {isEditing ? (
                        <>
                          <FiLock size={18} />
                          <span>Cancelar edición</span>
                        </>
                      ) : (
                        <>
                          <FiEdit2 size={18} />
                          <span>Editar perfil</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Nombre completo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${!isEditing ? 'opacity-75 cursor-not-allowed' : ''}`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Correo electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${!isEditing ? 'opacity-75 cursor-not-allowed' : ''}`}
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <button
                        type="submit"
                        className={`flex items-center gap-2 px-4 py-2 ${
                          isUploading 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        } text-white rounded-lg transition-colors`}
                        disabled={!isEditing || isUploading}
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                            <span>Guardando...</span>
                          </>
                        ) : (
                          <>
                            <FiSave />
                            <span>Guardar cambios</span>
                          </>
                        )}
                      </button>
                    )}
                  </form>
                  
                  {/* Sección de cambio de contraseña */}
                  <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Seguridad de la cuenta</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Actualiza tu contraseña para mantener tu cuenta segura
                        </p>
                      </div>
                      <button
                        onClick={() => setShowChangePassword(!showChangePassword)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      >
                        {showChangePassword ? 'Cancelar' : 'Cambiar contraseña'}
                      </button>
                    </div>

                    {showChangePassword && (
                      <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                        {passwordError && (
                          <div className="p-3 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-sm">
                            {passwordError}
                          </div>
                        )}
                        
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Contraseña actual
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nueva contraseña
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            minLength={6}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Confirmar nueva contraseña
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            minLength={6}
                            required
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isUploading}
                            className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${
                              isUploading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                          >
                            {isUploading ? 'Actualizando...' : 'Actualizar contraseña'}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
