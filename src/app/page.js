import CarouselHero from "../components/sections/CarouselHero";
import StatsBanner from "../components/sections/StatsBanner";
import WhyCodeSpire from "../components/sections/WhyCodeSpire";
import IndustriesGrid from "../components/sections/IndustriesGrid";
import FinalCTABanner from "../components/sections/FinalCTABanner";
import OptimizedLiquidBackground from "../components/backgrounds/OptimizedLiquidBackground";
import EnhancedLiquidBackground from "../components/backgrounds/EnhancedLiquidBackground";
import IndustriesWeServe from "../components/sections/IndustriesWeServe";
import InfiniteIconCarousel from "../components/ui/InfiniteIconCarousel";
import TechnologyStackCarousel from "../components/sections/TechnologyStackCarousel";
import FeatureHighlightsCarousel from "../components/sections/FeatureHighlightsCarousel";
import Wrapper from "../components/ui/Wrapper";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Modern Carousel Hero */}
      <CarouselHero />

      {/* Stats with subtle animation */}
      <OptimizedLiquidBackground variant="section" intensity="low">
        <Wrapper>
          <div className="space-section">
            <StatsBanner />
          </div>
        </Wrapper>
      </OptimizedLiquidBackground>

      {/* Why CodeSpire with enhanced rotating liquid animation */}
      <EnhancedLiquidBackground variant="section" intensity="high">
        <Wrapper>
          <div className="space-section">
            <WhyCodeSpire />
          </div>
        </Wrapper>
      </EnhancedLiquidBackground>

      {/* Industries with subtle animation
      <OptimizedLiquidBackground variant="section" intensity="low">
        <Wrapper>
          <div className="space-section">
            <IndustriesGrid />
          </div>
        </Wrapper>
      </OptimizedLiquidBackground> */}

      {/* Final CTA Banner */}
      <Wrapper>
        <div className="space-section">
          <FinalCTABanner />
        </div>
      </Wrapper>

      {/* Industries with enhanced animations */}
      <Wrapper>
        <div className="space-section">
          <IndustriesWeServe />
        </div>
      </Wrapper>

      {/* Technology Stack Carousel */}
      <TechnologyStackCarousel />


      {/* Feature Highlights Carousel */}
      <FeatureHighlightsCarousel />

      {/* Infinite Icon Carousel */}
      <InfiniteIconCarousel />
    </div>
  );
}
