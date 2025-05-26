"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMenu, FiX, FiLogIn, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import UserProfile from '../auth/UserProfile';
import AuthModal from '../auth/AuthModal';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Portal Departamental
        </Link>

        {/* Navegación para desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="#departamentos" 
            className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Departamentos
          </Link>
          <Link 
            href="#mapa" 
            className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Mapa
          </Link>
          <Link 
            href="#contacto" 
            className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Contacto
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          
          {isAuthenticated ? (
            <UserProfile user={user} />
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
            >
              <FiLogIn size={18} />
              <span>Iniciar sesión</span>
            </button>
          )}
        </nav>

        {/* Botón de menú móvil */}
        <div className="md:hidden flex items-center gap-3">
          {isAuthenticated && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <FiUser />
              </div>
            </div>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <Link 
              href="#departamentos" 
              className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors py-3 border-b border-gray-100 dark:border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Departamentos
            </Link>
            <Link 
              href="#mapa" 
              className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors py-3 border-b border-gray-100 dark:border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mapa
            </Link>
            <Link 
              href="#contacto" 
              className="font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors py-3 border-b border-gray-100 dark:border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </Link>
            
            {isAuthenticated ? (
              <>
                <UserProfile user={user} />
                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <FiLogOut className="text-lg" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 py-3 text-blue-600 dark:text-blue-400 font-medium"
              >
                <FiLogIn size={18} />
                <span>Iniciar sesión</span>
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Modal de autenticación */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
}
