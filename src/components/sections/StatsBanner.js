'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Users, Building, Globe, TrendingUp, Award } from 'lucide-react';
import { Heading, Text } from '../ui/Typography';
import { useAnimationPerformance } from '../../lib/performance';
import { fontClasses } from "@/config/fonts";
import TechnologyStackCarousel from './TechnologyStackCarousel';

// SVG icon wrappers for LLM logos
const SvgImg = ({ src, alt, size = 24, ...props }) => (
  <img src={src} alt={alt} width={size} height={size} {...props} />
);

// LLM Logo components
const ChatGPTIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/gpt.svg" alt="ChatGPT" size={size} {...props} />
);

const GeminiIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/gemini.webp" alt="Gemini" size={size} {...props} />
);

const PerplexityIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/perplexity.webp" alt="Perplexity" size={size} {...props} />
);

const GrokIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/grok.webp" alt="Grok" size={size} {...props} />
);

const OllamaIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/ollama.webp" alt="Ollama" size={size} {...props} />
);

// AI Text with LLM Logo Flip Component
const AITextWithLogos = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const intervalRef = useRef(null);
  
  const llmLogos = [
    { name: 'ChatGPT', icon: ChatGPTIcon, color: '#10A37F' },
    { name: 'Gemini', icon: GeminiIcon, color: '#4285F4' },
    { name: 'Ollama', icon: OllamaIcon, color: '#2496ED' },
    { name: 'Grok', icon: GrokIcon, color: '#FF9900' },
    { name: 'Perplexity', icon: PerplexityIcon, color: '#FF9900' },
  ];

  useEffect(() => {
    if (isHovered) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      // Start new interval
      intervalRef.current = setInterval(() => {
        setCurrentLogoIndex((prev) => (prev + 1) % llmLogos.length);
      }, 1500); 
    } else {
      // Clear interval when not hovered
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, llmLogos.length]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCurrentLogoIndex(0);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentLogoIndex(0);
  };

  const currentLogo = llmLogos[currentLogoIndex];
  const LogoComponent = currentLogo.icon;

  return (
    <span 
      className="relative inline-block cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.span
        className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.8 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        AI
      </motion.span>
      
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <motion.div
              key={currentLogoIndex}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <LogoComponent 
                size={32} 
                style={{ color: currentLogo.color }}
                className="drop-shadow-sm"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

// Counter animation hook with hydration fix
const useCounter = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!shouldStart || !mounted) return;
    
    let startTime;
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, shouldStart, mounted]);
  
  // Return the end value immediately on server, animated value on client
  return mounted && shouldStart ? count : (shouldStart ? end : 0);
};


// Professional stat item component with tile card styling
const ProfessionalStatItem = ({ number, suffix, label, delay = 0, shouldAnimate }) => {
  const [mounted, setMounted] = useState(false);
  const animatedNumber = useCounter(number, 2000, shouldAnimate);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.2, duration: 0.6 }}
      className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/40 shadow-sm"
    >
      <motion.div 
        className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: delay * 0.2 + 0.3, duration: 0.4 }}
      >
        {mounted ? (shouldAnimate ? animatedNumber : number) : number}
        <span className="text-2xl lg:text-3xl ml-1">{suffix}</span>
      </motion.div>
      <motion.div 
        className="text-sm text-gray-600 font-medium text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay * 0.2 + 0.5, duration: 0.4 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

const StatsBanner = () => {
  const { config, shouldReduceAnimations } = useAnimationPerformance();
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { 
    once: true, 
    threshold: 0.3,
    margin: "-100px 0px"
  });
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Updated stats data with new numbers
  const stats = [
    {
      number: 50,
      suffix: '+',
      label: 'Skilled Experts',
      delay: 0
    },
    {
      number: 10,
      suffix: '+',
      label: 'Satisfied Clients',
      delay: 1
    },
    {
      number: 5,
      suffix: '+',
      label: 'Global Industries',
      delay: 2
    },
    {
      number: 30,
      suffix: '+',
      label: 'Projects Delivered',
      delay: 3
    },
    {
      number: 70,
      suffix: '+',
      label: 'Technical Certifications',
      delay: 4
    },
    {
      number: 2,
      suffix: '+',
      label: 'Delivery Centers',
      delay: 5
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-4 bg-gradient-to-br from-blue-50 via-blue-50/40 to-indigo-50/50 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4">
        {/* Technology Stack Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <TechnologyStackCarousel />
        </motion.div>

        {/* Professional Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white/30 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-blue-100/20"
        >
          {/* Content with relative positioning */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left side - Description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-4xl lg:text-4xl font-bold leading-tight tracking-tight">
                  From Idea to Enterprise Grade
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    <AITextWithLogos />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"> in a Blink</span>
                  </span>
                </h3>
                <p className={`text-xl lg:text-xl text-gray-700 ${fontClasses.descriptionMedium}`}>
                  We build AI-powered products and scalable platforms for businesses who want tomorrow&apos;s innovation today.
                </p>
              </motion.div>

              {/* Right side - Stats Grid */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
              >
                {stats.map((stat, index) => (
                  <ProfessionalStatItem
                    key={index}
                    number={stat.number}
                    suffix={stat.suffix}
                    label={stat.label}
                    delay={stat.delay}
                    shouldAnimate={mounted && isInView && !shouldReduceAnimations}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBanner;