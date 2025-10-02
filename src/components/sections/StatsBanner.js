'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Building, Globe } from 'lucide-react';
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

// Individual stat item component
const StatItem = ({ icon: Icon, number, suffix, label, delay = 0, shouldAnimate }) => {
  const { config } = useAnimationPerformance();
  const [mounted, setMounted] = useState(false);
  const animatedNumber = useCounter(number, 2000, shouldAnimate);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const itemVariants = {
    hidden: config.enableComplexAnimations ? { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    } : { opacity: 0 },
    visible: config.enableComplexAnimations ? { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6 * config.animationDuration,
        delay: delay * config.staggerDelay,
        ease: "easeOut"
      }
    } : { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center text-center group"
    >
      {/* Icon with subtle animation */}
      <motion.div
        className="mb-4 p-4 bg-primary/10 rounded-full"
        whileHover={config.enableComplexAnimations ? { 
          scale: 1.1,
          backgroundColor: "rgba(56, 75, 255, 0.15)"
        } : {}}
        transition={{ duration: 0.2 }}
      >
        <Icon className="w-8 h-8 text-primary" />
      </motion.div>
      
      {/* Animated number */}
      <div className="mb-2">
        <Heading level={2} size="h1" className="text-primary">
          {mounted ? (shouldAnimate ? animatedNumber : number) : number}{suffix}
        </Heading>
      </div>
      
      {/* Label */}
      <Text size="body" color="secondary" className="font-medium">
        {label}
      </Text>
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
  
  // Stats data
  const stats = [
    {
      icon: Users,
      number: 50,
      suffix: '+',
      label: 'Skilled Experts',
      delay: 0
    },
    {
      icon: Building,
      number: 7,
      suffix: '+',
      label: 'Satisfied Clients',
      delay: 1
    },
    {
      icon: Globe,
      number: 5,
      suffix: '+',
      label: 'Global Industries',
      delay: 2
    }
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.staggerDelay,
        delayChildren: shouldReduceAnimations ? 0 : 0.2 * config.animationDuration
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-16 bg-gradient-to-r from-gray-50 to-white overflow-hidden"
    >
      {/* Subtle background pattern */}
      {config.enableGradients && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      )}
      
      {/* Floating background elements */}
      {config.enableFloatingElements && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"
            animate={config.enableComplexAnimations ? {
              x: [0, 30, 0],
              y: [0, -20, 0],
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-24 h-24 bg-primary/5 rounded-full blur-xl"
            animate={config.enableComplexAnimations ? {
              x: [0, -20, 0],
              y: [0, 15, 0],
            } : {}}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      )}
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted && isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 * config.animationDuration }}
          className="text-center mb-12"
        >
          <Text size="body" color="primary-color" className="font-semibold mb-2">
            At a Glance
          </Text>
          <Heading level={2} size="h2" className="max-w-2xl mx-auto">
            Trusted by Industry Leaders Worldwide
          </Heading>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted && isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
              delay={stat.delay}
              shouldAnimate={mounted && isInView && !shouldReduceAnimations}
            />
          ))}
        </motion.div>

        {/* Bottom decorative element */}
        {mounted && config.enableComplexAnimations && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.8 * config.animationDuration, 
              delay: 0.6 * config.animationDuration 
            }}
            className="flex justify-center mt-12"
          >
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default StatsBanner;