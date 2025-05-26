import type { Metadata } from "next";
import { Inter, Roboto_Mono, Montserrat, Poppins } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

export const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Informativo Departamental",
  description: "Portal informativo para los departamentos institucionales",
};
