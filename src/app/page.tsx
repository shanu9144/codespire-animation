"use client";

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { Wrapper } from '@/components/ui';
import { StatsBanner, WhyCodeSpire, FinalCTABanner, IndustriesWeServe, FeatureHighlightsCarousel } from '@/components/sections';
import { HeroSkeleton } from '@/components/ui';
import { Play, Pause } from 'lucide-react';

// Lazy load heavy components with loading states
const CarouselHero = dynamic(() => import('@/components/sections/CarouselHero'), {
  loading: () => <HeroSkeleton />
});

const OptimizedLiquidBackground = dynamic(() => import('@/components/backgrounds/OptimizedLiquidBackground'));

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.muted = false;
      void video.play();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Promo Video Section */}
      <section 
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-full relative">
          <video
            ref={videoRef}
            loop
            playsInline
            className="w-full h-auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/Codespire Promo Video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>

          {isHovered && (
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center focus:outline-none"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/60 transition">
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </span>
            </button>
          )}
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
