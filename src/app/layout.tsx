import type { Metadata } from "next";
import RootLayout from "./RootLayout";
import { inter, robotoMono, montserrat, poppins } from './layout-config';

export const metadata: Metadata = {
  title: "Portal Informativo Departamental",
  description: "Portal informativo para los departamentos institucionales",};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>
      {children}
    </RootLayout>
  );
}
