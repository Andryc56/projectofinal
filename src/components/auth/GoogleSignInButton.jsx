"use client";

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      
      if (result.success) {
        router.push('/');
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-lg transition-colors shadow-sm"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Conectando...</span>
        </>
      ) : (
        <>
          <FcGoogle size={20} />
          <span>Continuar con Google</span>
        </>
      )}
    </button>
  );
}
