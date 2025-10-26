import dynamic from 'next/dynamic';
import { Wrapper } from '@/components/ui';
import { StatsBanner, WhyCodeSpire, FinalCTABanner, IndustriesWeServe, FeatureHighlightsCarousel } from '@/components/sections';
import { HeroSkeleton } from '@/components/ui';

// Lazy load heavy components with loading states
const CarouselHero = dynamic(() => import('@/components/sections/CarouselHero'), {
  loading: () => <HeroSkeleton />
});

const OptimizedLiquidBackground = dynamic(() => import('@/components/backgrounds/OptimizedLiquidBackground'));

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Promo Video Section */}
      <section className="relative w-full overflow-hidden">
        <div className="w-full">
          <video
            controls
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          >
            <source src="/Codespire Promo Video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Modern Carousel Hero */}
      <CarouselHero />

      {/* Feature Highlights Carousel */}
      <FeatureHighlightsCarousel />

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

      {/* Final CTA Banner */}
      <Wrapper>
        <div className="py-8 lg:py-12">
          <FinalCTABanner />
        </div>
      </Wrapper>
    </div>
  );
}
