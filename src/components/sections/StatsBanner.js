'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  <SvgImg src="/assets/images/gpt.svg" alt="ChatGPT" size={size} {...props} />
);

const GeminiIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/gemini.webp" alt="Gemini" size={size} {...props} />
);

const PerplexityIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/perplexity.webp" alt="Perplexity" size={size} {...props} />
);

const GrokIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/grok.webp" alt="Grok" size={size} {...props} />
);

const OllamaIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/ollama.webp" alt="Ollama" size={size} {...props} />
);

// LLM Logos array - moved outside component to prevent recreation on every render
const llmLogos = [
  { name: 'ChatGPT', icon: ChatGPTIcon, color: '#10A37F' },
  { name: 'Perplexity', icon: PerplexityIcon, color: '#FF9900' },
  { name: 'Gemini', icon: GeminiIcon, color: '#4285F4' },
  { name: 'Grok', icon: GrokIcon, color: '#FF9900' },
  { name: 'Ollama', icon: OllamaIcon, color: '#2496ED' },
];

// AI Text with LLM Logo Flip Component
const AITextWithLogos = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const intervalRef = useRef(null);

  // Clear interval helper
  const clearIntervalSafely = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isHovered) {
      // Start cycling through logos immediately and continuously
      intervalRef.current = setInterval(() => {
        setCurrentLogoIndex((prev) => {
          const nextIndex = (prev + 1) % llmLogos.length;
          return nextIndex;
        });
      }, 1500); // Slightly faster for better UX
    } else {
      // Clear interval when not hovered
      clearIntervalSafely();
    }
    
    // Cleanup function
    return () => clearIntervalSafely();
  }, [isHovered]);


  const handleMouseEnter = useCallback(() => {
    if (!isHovered) {
      setIsHovered(true);
      setCurrentLogoIndex(0);
    }
  }, [isHovered]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCurrentLogoIndex(0);
  }, []);

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
              key={`logo-${currentLogoIndex}-${currentLogo.name}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center"
            >
              <LogoComponent 
                size={32} 
                style={{ color: currentLogo.color }}
                className="drop-shadow-sm"
              />
              {/* <span className="text-xs text-gray-500 mt-1 font-medium">
                {currentLogo.name}
              </span> */} 
              {/* /Uncomment for display of logo name */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

// Counter animation hook with hydration fix and performance optimization
const useCounter = (end, duration = 2500, shouldStart = false) => {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const animationFrameRef = useRef(null);
  const countRef = useRef(0);
  const hasAnimatedRef = useRef(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    if (!shouldStart || !mounted) {
      // Reset flag when animation should not start
      hasAnimatedRef.current = false;
      return;
    }
    
    // Prevent re-triggering if already animated
    if (hasAnimatedRef.current) {
      return;
    }
    
    // Mark that animation has started
    hasAnimatedRef.current = true;
    
    // Reset animation state when starting
    countRef.current = 0;
    setCount(0);
    
    let startTime;
    let lastRenderedCount = 0;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smoother easing function - easeOutCubic for more gradual, smooth counting
      // This makes the animation start slower and gradually speed up, then slow down at the end
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const newCount = Math.floor(end * easeOutCubic);
      
      // Update every frame for smooth counting (not skipping numbers)
      // This ensures numbers count smoothly without jumps
      if (newCount !== lastRenderedCount) {
        countRef.current = newCount;
        setCount(newCount);
        lastRenderedCount = newCount;
      }
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value is set exactly
        if (countRef.current !== end) {
          countRef.current = end;
          setCount(end);
        }
        animationFrameRef.current = null;
      }
    };
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animate);
    }, 50);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [end, duration, shouldStart, mounted]);
  
  // Return 0 if not mounted or not should start, otherwise return count
  if (!mounted) return 0;
  if (!shouldStart) return 0;
  return count;
};


// Professional stat item component with tile card styling
const ProfessionalStatItem = ({ number, suffix, label, delay = 0, shouldAnimate }) => {
  const [mounted, setMounted] = useState(false);
  const animatedNumber = useCounter(number, 2500, shouldAnimate);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: delay * 0.1, duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-xl p-6 border border-white/40 shadow-sm"
      style={{ willChange: 'transform, opacity' }}
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
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-2"
        >
          <TechnologyStackCarousel />
        </motion.div>

        {/* Professional Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="relative bg-white/90 rounded-2xl p-8 lg:p-12 border border-blue-100/20"
          style={{ willChange: 'transform' }}
        >
          {/* Content with relative positioning */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left side - Description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
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
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
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