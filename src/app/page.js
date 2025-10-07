import CarouselHero from "../components/sections/CarouselHero";
import StatsBanner from "../components/sections/StatsBanner";
import WhyCodeSpire from "../components/sections/WhyCodeSpire";
// import IndustriesGrid from "../components/sections/IndustriesGrid";
import FinalCTABanner from "../components/sections/FinalCTABanner";
import OptimizedLiquidBackground from "../components/backgrounds/OptimizedLiquidBackground";
import IndustriesWeServe from "../components/sections/IndustriesWeServe";
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
          <div className="py-8 lg:py-12">
            <StatsBanner />
          </div>
        </Wrapper>
      </OptimizedLiquidBackground>

      {/* Why CodeSpire - UI only, no liquid background */}
      <Wrapper>
        <div className="py-4">
          <WhyCodeSpire />
        </div>
      </Wrapper>

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
        <div className="py-8 lg:py-12">
          <FinalCTABanner />
        </div>
      </Wrapper>

      {/* Industries with enhanced animations */}
      <Wrapper>
        <IndustriesWeServe />
      </Wrapper>



      {/* Feature Highlights Carousel */}
      <FeatureHighlightsCarousel />

    </div>
  );
}
