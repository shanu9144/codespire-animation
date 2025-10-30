'use client';

import React from 'react';

import ParticleNetworkBackground from '@/components/backgrounds/ParticleNetworkBackground';
import DigitalEngineeringCTA from '@/components/sections/services/DigitalEngineeringCTA';
import DigitalEngineeringHero from '@/components/sections/services/DigitalEngineeringHero';
import DigitalEngineeringServices from '@/components/sections/services/DigitalEngineeringServices';
import { DigitalEngineeringSEO } from '@/lib/seo/DigitalEngineeringSEO';

const DigitalEngineeringPage = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <DigitalEngineeringSEO />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-white/70 to-gray-50/60 relative">
        {/* Subtle texture overlay */}
        <div
          className="fixed inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.05) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        
        {/* 3D Particle Network Background */}
        <ParticleNetworkBackground />
        
        {/* Main Layout */}
        <div className="relative z-10">
          {/* Main Content Area - Full Width */}
          <main>
            {/* Hero Section */}
            <DigitalEngineeringHero />
            
            {/* AI-Powered Digital Engineering Services */}
            <DigitalEngineeringServices />
            
            {/* CTA Section */}
            <DigitalEngineeringCTA />
          </main>
        </div>
      </div>
    </>
  );
};

export default DigitalEngineeringPage;
