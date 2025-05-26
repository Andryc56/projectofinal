"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiUser, FiLogOut, FiSettings, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown}
        className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-expanded={isOpen}
      >
        {user.photoURL ? (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image 
              src={user.photoURL} 
              alt="Foto de perfil" 
              width={32} 
              height={32} 
              className="object-cover w-full h-full"
            />
          </div>
        ) : (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <FiUser />
          </div>
        )}
        <span className="hidden md:block font-medium text-gray-700 dark:text-gray-300">
          {user.displayName?.split(' ')[0] || user.name?.split(' ')[0] || 'Usuario'}
        </span>
        <FiChevronDown 
          className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
        >
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
            {user.photoURL ? (
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src={user.photoURL} 
                  alt="Foto de perfil" 
                  width={40} 
                  height={40} 
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <FiUser size={18} />
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user.displayName || user.name || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
          
          <Link 
            href="/perfil" 
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <FiUser className="text-gray-500" />
            <span>Mi Perfil</span>
          </Link>
          
          <Link 
            href="/configuracion" 
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <FiSettings className="text-gray-500" />
            <span>Configuración</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiLogOut className="text-red-500" />
            <span>Cerrar sesión</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
