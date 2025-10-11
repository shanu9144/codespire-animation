'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const DigitalEngineeringHero = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section className="relative py-16 lg:py-20 px-6 pb-20 bg-gradient-to-br from-slate-50/50 to-white overflow-hidden">
      {/* Gradient background with depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        {/* Add subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-100/20 via-transparent to-transparent" />
      </div>
      
      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes with enhanced styling */}
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 border-2 border-blue-200/60 rounded-lg opacity-40 shadow-lg"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        
        <motion.div
          className="absolute top-32 right-32 w-16 h-16 bg-gradient-to-r from-purple-200/80 to-pink-200/80 rounded-full opacity-50 shadow-lg"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-r from-cyan-200/80 to-blue-200/80 rounded-full opacity-60 shadow-lg"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute top-1/2 right-20 w-8 h-8 border-2 border-green-200/60 rounded-full opacity-40 shadow-lg"
          animate={{ 
            rotate: [0, -360],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear",
            delay: 2
          }}
        />
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-8">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Enhanced floating dots */}
        <motion.div
          className="absolute top-40 left-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-70 shadow-lg"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute bottom-40 right-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-60 shadow-lg"
          animate={{ 
            y: [0, 25, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>
      
      {/* Main Content with glassmorphism */}
      <div className="relative z-10 max-w-5xl mx-auto text-center py-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-sm bg-white/10 rounded-3xl p-8 py-12 border border-white/20 shadow-xl"
        >
          <div className="space-y-6">
            {/* Main Heading with two-line design */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-left">
              <span className="text-[#2D3748]">Digital Engineering</span><br />
              <span className="text-[#6B46C1]">for Every Industry</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-[#4A5568] leading-relaxed max-w-3xl text-left">
              From manufacturing to healthcare, we deliver AI solutions tailored to your industry's unique challenges and regulatory requirements.
            </p>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default DigitalEngineeringHero;
