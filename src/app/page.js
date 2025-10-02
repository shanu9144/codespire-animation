import CarouselHero from '../components/sections/CarouselHero';
import StatsBanner from '../components/sections/StatsBanner';
import WhyCodeSpire from '../components/sections/WhyCodeSpire';
import IndustriesWeServe from '../components/sections/IndustriesWeServe';
import OptimizedLiquidBackground from '../components/backgrounds/OptimizedLiquidBackground';
import EnhancedLiquidBackground from '../components/backgrounds/EnhancedLiquidBackground';

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
      
      {/* Industries with enhanced animations */}
      <IndustriesWeServe />
    </div>
  );
}