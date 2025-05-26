// Importaciones de Firebase
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwCkzBqnJyfhb8kBf6Cz4T2AiJBD91F7g",
  authDomain: "my-project-f7f6f.firebaseapp.com",
  projectId: "my-project-f7f6f",
  storageBucket: "my-project-f7f6f.firebasestorage.app",
  messagingSenderId: "475441303618",
  appId: "1:475441303618:web:2fc613f3be791efbbb9ddb",
  measurementId: "G-D1Q969R3FZ"
};

// Inicialización de Firebase
let app;
let auth;
let db;
let storage;
let googleProvider;

// Inicialización condicional solo en el cliente
if (typeof window !== 'undefined') {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    
    // Configuración de autenticación
    auth = getAuth(app);
    auth.languageCode = 'es'; // Establecer el idioma de los mensajes de autenticación
    
    // Configuración de Firestore
    db = getFirestore(app);
    
    // Configuración de Storage
    storage = getStorage(app);
    
    // Configuración del proveedor de Google
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    
    // Configuración de persistencia de autenticación
    if (auth) {
      import('firebase/auth').then(({ setPersistence, browserLocalPersistence }) => {
        return setPersistence(auth, browserLocalPersistence);
      }).catch(error => {
        console.error('Error al configurar la persistencia de autenticación:', error);
      });
    }
    
    console.log('Firebase inicializado correctamente');
  } catch (error) {
    console.error('Error al inicializar Firebase:', error);
    throw error; // Relanzar el error para que pueda ser manejado por el código que llama a esta función
  }
}

// Exportar instancias de Firebase
export { 
  app, 
  auth, 
  db, 
  storage, 
  googleProvider
};

// Exportar por defecto para compatibilidad
export default {
  app,
  auth,
  db,
  storage,
  googleProvider,
  firebaseConfig
};
