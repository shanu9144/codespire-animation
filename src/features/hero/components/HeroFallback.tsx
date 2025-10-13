/**
 * Fallback Hero component for reduced motion or low-end devices
 * Provides the same content without animations
 */

import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import Button from '@/shared/ui/button/Button';
import { Heading, Text } from '@/shared/ui/typography/Typography';

const HeroFallback: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main headline without animations */}
          <div className="mb-6">
            <Heading level={1} size="hero" className="mb-4">
              From Idea to{' '}
              <span className="text-primary">Enterprise-Grade AI</span>{' '}
              in a Blink
            </Heading>
          </div>

          {/* Subheadline */}
          <div className="mb-12">
            <Text 
              size="body-lg" 
              color="secondary" 
              className="max-w-3xl mx-auto leading-relaxed"
            >
              Transform your business with cutting-edge AI solutions. From rapid prototyping 
              to enterprise deployment, we deliver AI products that scale with your ambitions.
            </Text>
          </div>

          {/* CTA Buttons without animations */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/schedule-demo">
              <Button 
                variant="primary" 
                size="lg"
                className="group"
              >
                <span>Schedule a Demo</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/products">
              <Button 
                variant="secondary" 
                size="lg"
                className="group"
              >
                <Play className="w-5 h-5 mr-2" />
                <span>Explore Products</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFallback;
