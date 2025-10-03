import CarouselHero from "../components/sections/CarouselHero";
import StatsBanner from "../components/sections/StatsBanner";
import WhyCodeSpire from "../components/sections/WhyCodeSpire";
import IndustriesGrid from "../components/sections/IndustriesGrid";
import FinalCTABanner from "../components/sections/FinalCTABanner";
import OptimizedLiquidBackground from "../components/backgrounds/OptimizedLiquidBackground";
import EnhancedLiquidBackground from "../components/backgrounds/EnhancedLiquidBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Modern Carousel Hero */}
      <CarouselHero />

      {/* Stats with subtle animation */}
      <OptimizedLiquidBackground variant="section" intensity="low">
        <StatsBanner />
      </OptimizedLiquidBackground>

      {/* Why CodeSpire with enhanced rotating liquid animation */}
      <EnhancedLiquidBackground variant="section" intensity="high">
        <WhyCodeSpire />
      </EnhancedLiquidBackground>

      {/* Industries with subtle animation */}
      <OptimizedLiquidBackground variant="section" intensity="low">
        <IndustriesGrid />
      </OptimizedLiquidBackground>

      {/* Final CTA Banner */}
      <FinalCTABanner />
      
      {/* Industries with enhanced animations */}
      <IndustriesWeServe />
    </div>
  );
}
