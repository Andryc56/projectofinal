// Tipos para variables de entorno
declare namespace NodeJS {
  interface ProcessEnv {
    // Firebase
    readonly NEXT_PUBLIC_FIREBASE_API_KEY: string
    readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
    readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
    readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
    readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
    readonly NEXT_PUBLIC_FIREBASE_APP_ID: string
    readonly NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string
    
    // Configuración de la aplicación
    readonly NEXT_PUBLIC_BASE_URL: string
    readonly NODE_ENV: 'development' | 'production' | 'test'
    
    // Autenticación
    readonly NEXTAUTH_URL: string
    readonly NEXTAUTH_SECRET: string
    
    // ReCAPTCHA (opcional)
    readonly NEXT_PUBLIC_RECAPTCHA_SITE_KEY?: string
    readonly RECAPTCHA_SECRET_KEY?: string
    
    // Otras variables de entorno personalizadas
    [key: string]: string | undefined
  }
}

// Extender el objeto global de Node.js con nuestras variables de entorno
declare global {
  namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {}
  }
}
