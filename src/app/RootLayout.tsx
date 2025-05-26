'use client';

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import React, { useEffect } from 'react';
import { inter, robotoMono, montserrat, poppins } from './layout-config';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Apply fonts when the component mounts
  useEffect(() => {
    if (inter?.style?.fontFamily) document.documentElement.style.setProperty('--font-inter', inter.style.fontFamily);
    if (robotoMono?.style?.fontFamily) document.documentElement.style.setProperty('--font-roboto-mono', robotoMono.style.fontFamily);
    if (montserrat?.style?.fontFamily) document.documentElement.style.setProperty('--font-montserrat', montserrat.style.fontFamily);
    if (poppins?.style?.fontFamily) document.documentElement.style.setProperty('--font-poppins', poppins.style.fontFamily);
  }, []);

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} ${montserrat.variable} ${poppins.variable} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
