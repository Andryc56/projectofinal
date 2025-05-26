import type { Metadata } from "next";
import { Inter, Roboto_Mono, Montserrat, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import React from 'react';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Informativo Departamental",
  description: "Portal informativo para los departamentos institucionales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <style jsx global>{`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-roboto-mono: ${robotoMono.style.fontFamily};
            --font-montserrat: ${montserrat.style.fontFamily};
            --font-poppins: ${poppins.style.fontFamily};
          }
        `}</style>
      </head>
      <body
        className={`${inter.variable} ${robotoMono.variable} ${montserrat.variable} ${poppins.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Toaster position="top-right" />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
