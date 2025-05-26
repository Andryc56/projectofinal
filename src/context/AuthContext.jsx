"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  signInWithPopup,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage, googleProvider } from '@/config/firebase'; 
import { v4 as uuidv4 } from 'uuid';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Obtener datos adicionales del usuario desde Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            // Combinar datos de autenticación con datos de Firestore
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              providerData: firebaseUser.providerData, // Incluir providerData
              ...userDoc.data()
            });
          } else {
            // Si no hay datos adicionales, usar solo los datos de autenticación
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              providerData: firebaseUser.providerData // Incluir providerData
            });
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
          // Usar solo datos de autenticación si hay error
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            providerData: firebaseUser.providerData // Incluir providerData
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // Función para verificar la conexión a internet
  const checkNetworkConnection = () => {
    if (!navigator.onLine) {
      return { isOnline: false, error: 'Sin conexión a internet. Por favor, verifica tu conexión.' };
    }
    return { isOnline: true };
  };

  // Función para manejar errores de Firebase
  const handleFirebaseError = (error) => {
    console.error('Error de Firebase:', error);
    
    // Verificar si es un error de red
    if (error.code === 'auth/network-request-failed') {
      return 'Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo.';
    }
    
    // Mapear códigos de error a mensajes amigables
    const errorMessages = {
      'auth/invalid-credential': 'Credenciales incorrectas',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
      'auth/email-already-in-use': 'El correo electrónico ya está en uso',
      'auth/weak-password': 'La contraseña es demasiado débil',
      'auth/invalid-email': 'Correo electrónico no válido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
      'auth/requires-recent-login': 'Por favor, inicia sesión nuevamente antes de realizar esta acción',
      'auth/provider-already-linked': 'Esta cuenta ya está vinculada a otro usuario',
      'auth/credential-already-in-use': 'Estas credenciales ya están en uso',
    };
    
    return errorMessages[error.code] || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
  };

  // Función para iniciar sesión
  const login = async (email, password) => {
    // Verificar conexión a internet
    const { isOnline, error: networkError } = checkNetworkConnection();
    if (!isOnline) {
      return { success: false, error: networkError };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      const errorMessage = handleFirebaseError(error);
      return { success: false, error: errorMessage };
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (name, email, password) => {
    // Verificar conexión a internet
    const { isOnline, error: networkError } = checkNetworkConnection();
    if (!isOnline) {
      return { success: false, error: networkError };
    }

    try {
      // Validar datos de entrada
      if (!name || !email || !password) {
        return { success: false, error: 'Por favor completa todos los campos' };
      }

      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Actualizar el perfil con el nombre
      await firebaseUpdateProfile(firebaseUser, {
        displayName: name
      });
      
      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
        role: 'user', // Rol por defecto
        lastLogin: new Date().toISOString()
      });
      
      // Actualizar el estado del usuario con los nuevos datos
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: name,
        photoURL: firebaseUser.photoURL,
        providerData: firebaseUser.providerData,
        role: 'user',
        createdAt: new Date().toISOString()
      });
      
      return { success: true, user: firebaseUser };
    } catch (error) {
      const errorMessage = handleFirebaseError(error);
      return { success: false, error: errorMessage };
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Función para subir una imagen a Firebase Storage
  const uploadImage = async (file, path = 'profile-pictures') => {
    try {
      if (!file) throw new Error('No se proporcionó ningún archivo');
      
      // Generar un nombre de archivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const storageReference = storageRef(storage, `${path}/${fileName}`);
      
      // Subir el archivo
      await uploadBytes(storageReference, file);
      
      // Obtener la URL de descarga
      const downloadURL = await getDownloadURL(storageReference);
      
      return { success: true, url: downloadURL };
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      return { success: false, error: 'Error al subir la imagen' };
    }
  };

  // Función para eliminar una imagen de Firebase Storage
  const deleteImage = async (url) => {
    try {
      if (!url) return { success: true };
      
      // Obtener la referencia al archivo
      const storageReference = ref(storage, url);
      
      // Eliminar el archivo
      await deleteObject(storageReference);
      
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      return { success: false, error: 'Error al eliminar la imagen' };
    }
  };

  // Función para cambiar la contraseña del usuario
  const changePassword = async (currentPassword, newPassword) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No hay usuario autenticado');
      }

      // Verificar si el usuario se autenticó con Google
      const isGoogleUser = user.providerData.some(
        (provider) => provider.providerId === 'google.com'
      );

      // Si es usuario de Google, no requerir contraseña actual
      if (isGoogleUser) {
        // Verificar que la nueva contraseña cumpla con los requisitos
        if (!newPassword || newPassword.length < 6) {
          throw { 
            code: 'auth/weak-password', 
            message: 'La nueva contraseña debe tener al menos 6 caracteres' 
          };
        }

        // Para usuarios de Google, actualizamos directamente la contraseña
        // sin requerir reautenticación
        await updatePassword(user, newPassword);
        return { success: true };
      }

      // Para usuarios que no son de Google, seguir el flujo normal
      if (!user.email) {
        throw new Error('No se encontró el correo electrónico del usuario');
      }

      // Verificar que la contraseña actual no esté vacía
      if (!currentPassword) {
        throw { 
          code: 'auth/missing-password', 
          message: 'Por favor ingresa tu contraseña actual' 
        };
      }

      // Verificar que la nueva contraseña cumpla con los requisitos
      if (!newPassword || newPassword.length < 6) {
        throw { 
          code: 'auth/weak-password', 
          message: 'La nueva contraseña debe tener al menos 6 caracteres' 
        };
      }

      // Reautenticar al usuario
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Actualizar la contraseña
      await updatePassword(user, newPassword);

      return { success: true };
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      
      let errorMessage = 'Error al cambiar la contraseña';
      
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'La contraseña actual es incorrecta';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = error.message || 'La nueva contraseña es demasiado débil';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Por favor, inicia sesión nuevamente para cambiar tu contraseña';
      } else if (error.code === 'auth/missing-password') {
        errorMessage = error.message || 'Por favor ingresa tu contraseña actual';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // Función para actualizar el perfil del usuario
  const updateProfile = async (updatedData) => {
    // Validación de entrada
    if (!user) {
      return { success: false, error: 'No hay usuario autenticado' };
    }

    if (!updatedData || typeof updatedData !== 'object' || Object.keys(updatedData).length === 0) {
      return { success: false, error: 'No se proporcionaron datos para actualizar' };
    }
    
    const batch = writeBatch(db);
    const userRef = doc(db, 'users', user.uid);
    const updates = {};
    let newPhotoURL = null;
    let fileToUpload = null;
    
    try {
      // Validar y procesar la imagen de perfil si se proporciona
      if (updatedData.photoFile) {
        if (!(updatedData.photoFile instanceof File)) {
          throw new Error('El archivo de imagen no es válido');
        }
        
        // Validar tamaño de la imagen (máximo 5MB)
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        if (updatedData.photoFile.size > MAX_FILE_SIZE) {
          return { 
            success: false, 
            error: 'La imagen es demasiado grande. El tamaño máximo permitido es de 5MB.' 
          };
        }
        
        fileToUpload = updatedData.photoFile;
        delete updatedData.photoFile;
      }
      
      // Subir nueva imagen si existe
      if (fileToUpload) {
        const uploadResult = await uploadImage(fileToUpload);
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Error al subir la imagen');
        }
        newPhotoURL = uploadResult.url;
        
        // Si hay una imagen anterior, programar su eliminación (se ejecutará después de la actualización exitosa)
        const oldPhotoURL = user.photoURL;
        if (oldPhotoURL && oldPhotoURL.startsWith('https://firebasestorage.googleapis.com')) {
          // Usar un pequeño retraso para asegurar que la actualización se complete
          setTimeout(() => {
            deleteImage(oldPhotoURL).catch(error => {
              console.warn('No se pudo eliminar la imagen anterior:', error);
            });
          }, 5000); // 5 segundos de retraso
        }
        
        // Actualizar photoURL en Authentication
        await firebaseUpdateProfile(auth.currentUser, {
          photoURL: newPhotoURL
        });
        
        // Agregar a las actualizaciones
        updates.photoURL = newPhotoURL;
        batch.update(userRef, { photoURL: newPhotoURL });
      }
      
      // Actualizar displayName si se proporciona
      if (updatedData.name && typeof updatedData.name === 'string') {
        const trimmedName = updatedData.name.trim();
        if (trimmedName.length > 0) {
          await firebaseUpdateProfile(auth.currentUser, {
            displayName: trimmedName
          });
          updates.name = trimmedName;
          batch.update(userRef, { displayName: trimmedName });
        }
      }
      
      // Procesar otros campos para Firestore
      const firestoreUpdates = {};
      const excludedFields = ['name', 'photoURL', 'photoFile'];
      
      Object.entries(updatedData).forEach(([key, value]) => {
        if (!excludedFields.includes(key) && value !== undefined && value !== null) {
          firestoreUpdates[key] = value;
        }
      });
      
      // Si hay actualizaciones para Firestore, agregarlas al batch
      if (Object.keys(firestoreUpdates).length > 0) {
        batch.update(userRef, firestoreUpdates);
      }
      
      // Ejecutar todas las actualizaciones en una sola transacción
      if (batch._mutations.length > 0) {
        await batch.commit();
      }
      
      // Actualizar el estado local del usuario
      const updatedUser = {
        ...user,
        ...updates,
        ...firestoreUpdates,
        photoURL: newPhotoURL || user.photoURL,
        displayName: updates.name || user.displayName || user.name
      };
      
      // Eliminar duplicados y limpiar
      delete updatedUser.name;
      setUser(updatedUser);
      
      return { 
        success: true, 
        user: updatedUser,
        message: 'Perfil actualizado correctamente'
      };
      
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      
      // Revertir cambios si hay un error
      if (newPhotoURL) {
        deleteImage(newPhotoURL).catch(console.error);
      }
      
      // Mapear errores comunes a mensajes más amigables
      let errorMessage = 'Error al actualizar el perfil';
      const errorCode = error.code || '';
      
      if (errorCode.includes('auth/network-request-failed')) {
        errorMessage = 'Error de conexión. Por favor, verifica tu conexión a internet.';
      } else if (errorCode.includes('permission-denied')) {
        errorMessage = 'No tienes permiso para realizar esta acción.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { 
        success: false, 
        error: errorMessage,
        code: errorCode
      };
    }
  };

  // Función para iniciar sesión con Google
  const signInWithGoogle = async () => {
    // Verificar conexión a internet
    const { isOnline, error: networkError } = checkNetworkConnection();
    if (!isOnline) {
      return { success: false, error: networkError };
    }

    try {
      // Verificar si el proveedor de Google está configurado
      if (!googleProvider) {
        console.error('Google Auth Provider no está configurado correctamente');
        return { 
          success: false, 
          error: 'La autenticación con Google no está disponible en este momento' 
        };
      }

      // Iniciar sesión con Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Verificar si el usuario ya existe en Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        try {
          // Si es un nuevo usuario, guardar en Firestore
          await setDoc(doc(db, 'users', user.uid), {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            role: 'user' // Rol por defecto
          });
          
          // Actualizar el estado del usuario con los nuevos datos
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            providerData: user.providerData,
            role: 'user',
            createdAt: new Date().toISOString()
          });
        } catch (firestoreError) {
          console.error('Error al guardar datos del usuario en Firestore:', firestoreError);
          // No fallar la autenticación si hay un error al guardar en Firestore
        }
      } else {
        // Actualizar la última vez que inició sesión
        await updateDoc(doc(db, 'users', user.uid), {
          lastLogin: new Date().toISOString()
        });
      }
      
      return { success: true, user };
    } catch (error) {
      // Manejar errores específicos de autenticación con Google
      if (error.code === 'auth/popup-closed-by-user') {
        return { 
          success: false, 
          error: 'El inicio de sesión con Google fue cancelado' 
        };
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        return { 
          success: false, 
          error: 'Ya existe una cuenta con el mismo correo electrónico pero con un método de inicio de sesión diferente' 
        };
      } else if (error.code === 'auth/popup-blocked') {
        return { 
          success: false, 
          error: 'El navegador bloqueó la ventana emergente. Por favor, permite ventanas emergentes para este sitio.' 
        };
      }
      
      return { success: false, error: errorMessage };
    }
  };

  // Valor del contexto
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    signInWithGoogle,
    changePassword,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
