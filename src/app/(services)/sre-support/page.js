'use client';

import React from 'react';

import ParticleNetworkBackground from '@/components/backgrounds/ParticleNetworkBackground';
import SRESupportCTA from '@/components/sections/services/SRESupportCTA';
import SRESupportExpertise from '@/components/sections/services/SRESupportExpertise';
import SRESupportHero from '@/components/sections/services/SRESupportHero';
import SRESupportMainContent from '@/components/sections/services/SRESupportMainContent';

const SRESupportPage = () => {
  return (
    <>
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
            <SRESupportHero />
            
            {/* Main Content Section */}
            <SRESupportMainContent />
            
            {/* SRE Support Expertise Section */}
            <SRESupportExpertise />
            
            {/* CTA Section */}
            <SRESupportCTA />
          </main>
        </div>
      </div>
    </>
  );
};

export default SRESupportPage;
