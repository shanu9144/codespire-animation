import { 
  CarouselHero, 
  StatsBanner, 
  WhyCodeSpire, 
  FinalCTABanner, 
  IndustriesWeServe, 
  FeatureHighlightsCarousel 
} from '@/components/sections';
import { OptimizedLiquidBackground } from '@/components/backgrounds';
import { Wrapper } from '@/components/ui';

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
