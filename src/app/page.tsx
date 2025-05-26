import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import DepartamentosSection from '@/components/sections/DepartamentosSection';
import MapaSection from '@/components/sections/MapaSection';
import ContactoSection from '@/components/sections/ContactoSection';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <DepartamentosSection />
      <MapaSection />
      <ContactoSection />
    </MainLayout>
  );
}
