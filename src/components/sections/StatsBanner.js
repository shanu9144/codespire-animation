'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Building, Globe, TrendingUp, Award } from 'lucide-react';
import { Heading, Text } from '../ui/Typography';
import { useAnimationPerformance } from '../../lib/performance';
import TechnologyStackCarousel from './TechnologyStackCarousel';

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


// Professional stat item component
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
      className="text-center"
    >
      <div className="text-4xl lg:text-5xl font-semibold text-gray-800 mb-2">
        {mounted ? (shouldAnimate ? animatedNumber : number) : number}{suffix}
      </div>
      <div className="text-sm text-gray-600 font-medium">
        {label}
      </div>
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
      number: 70,
      suffix: '+',
      label: 'Skilled Experts',
      delay: 0
    },
    {
      number: 30,
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
      number: 160,
      suffix: '+',
      label: 'Projects Delivered',
      delay: 3
    },
    {
      number: 200,
      suffix: '+',
      label: 'Technical Certifications',
      delay: 4
    },
    {
      number: 4,
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
      {/* Clean animated background with floating tech elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating tech icons */}
        <div className="absolute top-10 left-8 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center animate-bounce opacity-20">
          <span className="text-blue-600 font-bold text-sm">⚡</span>
        </div>
        <div className="absolute top-20 right-12 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center animate-pulse opacity-15">
          <span className="text-purple-600 text-xs">🔗</span>
        </div>
        <div className="absolute top-32 left-1/4 w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center animate-ping opacity-10">
          <span className="text-green-600 text-sm">💻</span>
        </div>
        <div className="absolute top-16 right-1/3 w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center animate-bounce opacity-20" style={{ animationDelay: '1s' }}>
          <span className="text-orange-600 text-xs">⚙️</span>
        </div>
        <div className="absolute top-24 left-1/2 w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center animate-pulse opacity-15" style={{ animationDelay: '2s' }}>
          <span className="text-indigo-600 text-xs">🌐</span>
        </div>
        <div className="absolute top-40 right-8 w-4 h-4 bg-pink-100 rounded-full flex items-center justify-center animate-ping opacity-10" style={{ animationDelay: '3s' }}>
          <span className="text-pink-600 text-xs">🚀</span>
        </div>
        
        {/* Subtle gradient overlay to enhance the theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-indigo-50/15"></div>
      </div>
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
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 lg:p-12 shadow-lg border border-blue-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                From Idea to Enterprise-Grade AI in a Blink
              </h3>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed font-medium">
                We build AI-powered products and scalable platforms for businesses who want tomorrow&apos;s innovation today.
              </p>
            </motion.div>

            {/* Right side - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-3 gap-6"
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
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBanner;