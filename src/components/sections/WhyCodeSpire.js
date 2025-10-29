'use client';

import React, { useState, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { 
  Zap, 
  Shield, 
  Code2, 
  Rocket, 
  Users, 
  Award,
  ArrowRight,
  Sparkles,
  Brain,
  TrendingUp
} from 'lucide-react';
import { fontClasses } from "@/config/fonts";
import InfiniteCarousel from '../ui/InfiniteCarousel';

const WhyCodeSpire = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Marquee items for the section (pills)
  const marqueeItems = useMemo(() => [
    { label: 'Trusted AI Partner', Icon: Shield },
    { label: 'End-to-End Execution', Icon: Rocket },
    { label: 'AI POD as a Service', Icon: Sparkles },
    { label: 'MLOps & Governance', Icon: Code2 },
    { label: 'Enterprise Security', Icon: Shield },
    { label: 'Faster Time-to-Value', Icon: TrendingUp },
    { label: 'Human-in-the-Loop', Icon: Users },
    { label: 'Proven Outcomes', Icon: Award }
  ], []);

  const marqueeNodes = useMemo(() => marqueeItems.map((item, idx) => (
    <div
      key={`marquee-pill-${idx}`}
      className="px-4 py-2 bg-white/80 backdrop-blur border border-gray-200 rounded-full flex items-center gap-2 shadow-sm"
    >
      <item.Icon className="w-4 h-4 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">{item.label}</span>
    </div>
  )), [marqueeItems]);

  // Enhanced highlight data with new content
  const highlights = [
    {
      id: 1,
      title: "Innovation",
      subtitle: "AI POD as a Service",
      description: "Driving transformation through AI POD as a Service and products like Smart RFQ AI, Supplier Match AI, and Forecast AI.",
      icon: Sparkles,
      image: "/Innovation.jpg",
      fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='18'%3EInnovation%3C/text%3E%3C/svg%3E",
      gradient: "from-blue-500 to-cyan-500",
      position: "left",
      link: "/services/ai-pod"
    },
    {
      id: 2,
      title: "Intelligence",
      subtitle: "Smart AI Solutions",
      description: "Empowering smarter decisions with AI PODs and intelligent products that optimize data, supply chains, and business performance.",
      icon: Brain,
      image: "/Intelligence.jpg",
      fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='18'%3EIntelligence%3C/text%3E%3C/svg%3E",
      gradient: "from-purple-500 to-pink-500",
      position: "right",
      link: "/products/supplier-match-ai"
    },
    {
      id: 3,
      title: "Impact",
      subtitle: "Measurable Growth",
      description: "Delivering measurable growth and efficiency through scalable AI solutions that turn innovation into lasting business value.",
      icon: TrendingUp,
      image: "/Impact.jpg",
      fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='18'%3EImpact%3C/text%3E%3C/svg%3E",
      gradient: "from-green-500 to-emerald-500",
      position: "left",
      link: "/services"
    }
  ];

  // Enhanced Card Component with optimized image handling
  const EnhancedCardBase = ({ highlight, index }) => {
    const Icon = highlight.icon;
    const isLeft = highlight.position === 'left';
    const isRight = highlight.position === 'right';
    const isCenter = highlight.position === 'center';
    
    return (
      <motion.div
        variants={cardVariants}
        className={`relative group ${
          isCenter ? 'col-span-full max-w-md mx-auto' : ''
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
          {/* Image Section */}
          <div className="relative h-56 overflow-hidden">
            {/* Gradient Background - Always visible */}
            <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-40`} />
            
            {/* Static Image with CSS hover effect */}
            <img
              src={highlight.image}
              alt={highlight.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {highlight.title}
            </h3>
            
            <p className="text-sm font-medium text-gray-500 mb-3">
              {highlight.subtitle}
            </p>
            
            <p className={`text-gray-600 mb-4 ${fontClasses.description}`}>
              {highlight.description}
            </p>

            {/* CTA Button */}
            <Link 
              href={highlight.link} 
              className="flex items-center text-sm font-large text-blue-600 hover:text-white group hover:translate-x-1 transition-all duration-200 no-focus-outline cursor-pointer" 
              style={{ color: '#2563eb' }}
              tabIndex={0}
            >
              Learn More
              <ArrowRight className="w-4 h-4 ml-2 text-blue-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" style={{ color: '#2563eb' }} />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  };

  const EnhancedCard = React.memo(EnhancedCardBase);

  // Background Animation Component
  const AnimatedBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <motion.div
          className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100">
            <polygon 
              points="50,5 85,25 85,75 50,95 15,75 15,25" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 opacity-10"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="40" height="40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
        </motion.div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative py-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4 hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 mr-2 text-blue-600" />
           <span className="text-blue-600 font-bold text-lg">What We Do</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight md:leading-[1.15]">
          Purposeful AI Products and 
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            Innovative Solutions
            </span>
          </h2>
          
          <p className={`text-xl text-gray-600 max-w-6xl mx-auto ${fontClasses.descriptionMedium}`}>
          Our approach is rooted in a deep understanding of today&apos;s challenges, enabling our clients with AI to innovate for growth, engineer efficient AI solutions with precision, and evolve strategies to help our clients stay ahead of the curve.
          </p>
        </div>

        {/* Infinite marquee under the header */}
        <div className="mb-8">
          <InfiniteCarousel
            items={marqueeNodes}
            speed={40}
            direction="left"
            pauseOnHover={true}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
            itemClassName=""
            containerClassName=""
            showGradients={true}
            gradientSize="w-24"
          />
        </div>

        {/* Enhanced Cards Grid - Only three cards with proper spacing */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {highlights.slice(0, 3).map((highlight, index) => (
            <EnhancedCard
              key={highlight.id}
              highlight={highlight}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyCodeSpire;