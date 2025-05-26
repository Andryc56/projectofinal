import type { Metadata } from "next";

// Font configuration using CSS variables
// These will be loaded via CSS @import in globals.css
export const fontVariables = {
  inter: "var(--font-inter)",
  robotoMono: "var(--font-roboto-mono)",
  montserrat: "var(--font-montserrat)",
  poppins: "var(--font-poppins)"
} as const;

// Font weights and styles for reference
export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700
} as const;

export const metadata: Metadata = {
  title: "Portal Informativo Departamental",
  description: "Portal informativo para los departamentos institucionales",
};
