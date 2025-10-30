'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Palette, Users, Brain, Zap, Search, Layout, Monitor, TestTube, Grid3X3 } from 'lucide-react';
import UIUXServicesHero from '@/components/sections/services/UIUXServicesHero';
import UIUXServicesGrid from '@/components/sections/services/UIUXServicesGrid';
import UIUXServicesCTA from '@/components/sections/services/UIUXServicesCTA';
import ProfessionalB2BBackground from '@/components/backgrounds/ProfessionalB2BBackground';
import UIUXDesignSEO from '@/lib/seo/UIUXDesignSEO';

const UIUXServicesPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <>
      <UIUXDesignSEO 
        title="UI/UX as a Service - Designing Experiences that Inspire and Perform | CodeSpire Solutions"
        description="Transform your digital products with our AI-powered UI/UX services. From user research to design systems, we craft intelligent, human-centered experiences that drive engagement and growth."
        keywords="UI/UX design, user experience, user interface, design services, AI-powered design, user research, prototyping, design systems, digital product design"
      />
      
      <div className="relative min-h-screen">
        <ProfessionalB2BBackground />
        
        {/* Hero Section */}
        <UIUXServicesHero />
        
        {/* Services Grid */}
        <UIUXServicesGrid />
        
        {/* CTA Section */}
        <UIUXServicesCTA />
      </div>
    </>
  );
};

export default UIUXServicesPage;
