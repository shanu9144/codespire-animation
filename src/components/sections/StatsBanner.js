'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Building, Globe, TrendingUp, Award } from 'lucide-react';
import { Heading, Text } from '../ui/Typography';
import { useAnimationPerformance } from '../../lib/performance';

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

// Company logos component with actual company icons
const CompanyLogos = () => {
  const logos = [
    { 
      name: "Microsoft", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
        </svg>
      )
    },
    { 
      name: "Google", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      )
    },
    { 
      name: "Amazon", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.2 21.6c-.6 0-1.1-.2-1.5-.6-.4-.4-.6-.9-.6-1.5V4.5c0-.6.2-1.1.6-1.5.4-.4.9-.6 1.5-.6h9.6c.6 0 1.1.2 1.5.6.4.4.6.9.6 1.5v15c0 .6-.2 1.1-.6 1.5-.4.4-.9.6-1.5.6H7.2zm0-1.2h9.6V4.8H7.2v15.6z"/>
          <path d="M12 6.6c-1.2 0-2.2.4-3 1.2-.8.8-1.2 1.8-1.2 3s.4 2.2 1.2 3c.8.8 1.8 1.2 3 1.2s2.2-.4 3-1.2c.8-.8 1.2-1.8 1.2-3s-.4-2.2-1.2-3c-.8-.8-1.8-1.2-3-1.2zm0 1.2c.8 0 1.5.3 2 .8.5.5.8 1.2.8 2s-.3 1.5-.8 2c-.5.5-1.2.8-2 .8s-1.5-.3-2-.8c-.5-.5-.8-1.2-.8-2s.3-1.5.8-2c.5-.5 1.2-.8 2-.8z"/>
        </svg>
      )
    },
    { 
      name: "IBM", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        </svg>
      )
    },
    { 
      name: "Oracle", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    },
    { 
      name: "Salesforce", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        </svg>
      )
    },
    { 
      name: "Adobe", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    },
    { 
      name: "Intel", 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      )
    },
    { name: "NVIDIA", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12c4-5 9-7 14-7 2 0 4 .4 6 1.2-2 6-7 9.8-12 9.8-3 0-5.5-1-8-4z"/></svg>) },
    { name: "Tesla", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18c-3 1-6 2-9 2S6 5 3 4zm9 4c2.5 0 5.2-.5 8-1.5L12 22 4 6.5C6.8 7.5 9.5 8 12 8z"/></svg>) },
    { name: "Uber", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="11" width="18" height="2"/></svg>) },
    { name: "Airbnb", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c3 0 6 4 9 12-3 4-6 6-9 6s-6-2-9-6C6 7 9 3 12 3z"/></svg>) },
    { name: "Spotify", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.2 14.5c-.2.3-.6.4-.9.2-2.6-1.6-6-1.9-9.9-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 4.2-1.1 7.9-.8 10.9 1 .3.1.4.5.3.9zm1.3-3c-.2.3-.6.4-.9.2-3-1.9-7.6-2.5-11.1-1.2-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.9-1.4 8.9-.8 12.4 1.4.3.1.4.5.2.8zm.2-3.1c-3.5-2.1-9.4-2.3-12.8-1.1-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.8-1.4 10.2-1.2 14.2 1.3.3.2.4.6.2 1-.2.3-.6.4-1 .2z"/></svg>) },
    { name: "PayPal", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19l2-14h7a4 4 0 010 8H9l-1 6H6z"/></svg>) },
    { name: "Slack", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M6 15a2 2 0 110-4h2v4H6zm2 2a2 2 0 104 0v-2H8v2zm4-6V7a2 2 0 10-4 0v2h4zm2 2h2a2 2 0 100-4h-2v4zm0 2v2a2 2 0 104 0v-2h-4z"/></svg>) },
    { name: "Atlassian", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20l7-16 3 6-4 10H3zm11 0l4-10 3 6-2 4h-5z"/></svg>) }
  ];

  return (
    <div className="flex items-center justify-center space-x-8 lg:space-x-12 mb-16">
      {logos.map((company, index) => (
        <motion.div
          key={company.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          className="flex items-center justify-center h-12 md:h-14 px-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
        >
          {company.icon}
        </motion.div>
      ))}
    </div>
  );
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
  
  // Updated stats data to match reference
  const stats = [
    {
      number: 50,
      suffix: '+',
      label: 'Skilled Experts',
      delay: 0
    },
    {
      number: 7,
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
      number: 2.5,
      suffix: 'B',
      label: 'Revenue Generated',
      delay: 3
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-20 bg-gray-50 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4">
        {/* Company Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <CompanyLogos />
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
                We build AI-powered products and scalable platforms for businesses who want tomorrow's innovation today.
              </p>
            </motion.div>

            {/* Right side - Stats Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-8"
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