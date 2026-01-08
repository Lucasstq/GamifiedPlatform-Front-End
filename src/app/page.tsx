import Navbar from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import ClassesSection from '@/components/ClassesSection';
import JourneySection from '@/components/JourneySection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ClassesSection />
      <JourneySection />
      <CTASection />
      <Footer />
    </div>
  );
}
