'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import Button from '../ui/Button';
import { Heading, Text } from '../ui/Typography';
import { useAnimationPerformance } from '../../lib/performance';
import HeroFallback from './HeroFallback';
import PerformanceMonitor from '../ui/PerformanceMonitor';

// Floating geometric elements component
const FloatingElements = ({ config }) => {
  // Don't render floating elements if performance config disables them
  if (!config.enableFloatingElements) {
    return null;
  }

  const elements = [
    { id: 1, size: 'w-20 h-20', position: 'top-20 left-10', delay: 0 },
    { id: 2, size: 'w-16 h-16', position: 'top-40 right-20', delay: 0.2 },
    { id: 3, size: 'w-12 h-12', position: 'top-60 left-1/4', delay: 0.4 },
    { id: 4, size: 'w-24 h-24', position: 'bottom-40 right-10', delay: 0.6 },
    { id: 5, size: 'w-14 h-14', position: 'bottom-20 left-20', delay: 0.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} ${element.position} bg-primary opacity-10 rounded-full ${config.enableBlur ? 'blur-sm' : ''}`}
          initial={config.enableComplexAnimations ? { 
            opacity: 0, 
            scale: 0,
            rotate: 0 
          } : { opacity: 0.1 }}
          animate={config.enableComplexAnimations ? { 
            opacity: 0.1, 
            scale: 1,
            rotate: 360 
          } : { opacity: 0.1 }}
          transition={config.enableComplexAnimations ? { 
            duration: 2 * config.animationDuration,
            delay: element.delay * config.animationDuration,
            ease: "easeOut",
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }
          } : { duration: 0 }}
        />
      ))}
      
      {/* Additional floating shapes - only show if complex animations are enabled */}
      {config.enableComplexAnimations && (
        <>
          <motion.div
            className="absolute top-32 right-1/3 w-8 h-8 border-2 border-primary opacity-20 rotate-45"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.2, y: 0 }}
            transition={{ duration: 1.5 * config.animationDuration, delay: 1 * config.animationDuration }}
          />
          
          <motion.div
            className="absolute bottom-32 left-1/3 w-6 h-6 bg-primary opacity-15 rounded-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.15, x: 0 }}
            transition={{ duration: 1.5 * config.animationDuration, delay: 1.2 * config.animationDuration }}
          />
        </>
      )}
    </div>
  );
};

const Hero = () => {
  // Get performance configuration and monitoring
  const { config, shouldReduceAnimations, logMetrics } = useAnimationPerformance();

  // Log performance metrics in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        logMetrics();
      }, 3000); // Log after 3 seconds to capture initial performance
      
      return () => clearTimeout(timer);
    }
  }, [logMetrics]);

  // Use fallback component for users who prefer reduced motion
  if (shouldReduceAnimations) {
    return <HeroFallback />;
  }

  // Animation variants for staggered text - adjusted based on performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.staggerDelay,
        delayChildren: shouldReduceAnimations ? 0 : 0.3 * config.animationDuration
      }
    }
  };

  const itemVariants = {
    hidden: shouldReduceAnimations ? { opacity: 0 } : { 
      opacity: 0, 
      y: 30 
    },
    visible: shouldReduceAnimations ? { opacity: 1 } : { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6 * config.animationDuration,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: shouldReduceAnimations ? { opacity: 0 } : { 
      opacity: 0, 
      y: 20 
    },
    visible: shouldReduceAnimations ? { opacity: 1 } : { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6 * config.animationDuration,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Performance Monitor for development */}
      <PerformanceMonitor show={process.env.NODE_ENV === 'development'} />
      
      <section className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden">
        {/* Floating geometric background elements */}
        <FloatingElements config={config} />
      
      {/* Gradient mesh background overlay - only show if gradients are enabled */}
      {config.enableGradients && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
      )}
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Main headline with staggered animation */}
          <motion.div variants={itemVariants} className="mb-6">
            <Heading level={1} size="hero" className="mb-4">
              <motion.span
                className="inline-block"
                variants={itemVariants}
              >
                From Idea to
              </motion.span>{' '}
              <motion.span
                className="inline-block text-primary"
                variants={itemVariants}
              >
                Enterprise-Grade AI
              </motion.span>{' '}
              <motion.span
                className="inline-block"
                variants={itemVariants}
              >
                in a Blink
              </motion.span>
            </Heading>
          </motion.div>

          {/* Subheadline with fade-in effect */}
          <motion.div variants={itemVariants} className="mb-12">
            <Text 
              size="body-lg" 
              color="secondary" 
              className="max-w-3xl mx-auto leading-relaxed"
            >
              Transform your business with cutting-edge AI solutions. From rapid prototyping 
              to enterprise deployment, we deliver AI products that scale with your ambitions.
            </Text>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div 
              variants={buttonVariants}
              whileHover={config.enableComplexAnimations ? { scale: 1.05 } : {}}
              whileTap={config.enableComplexAnimations ? { scale: 0.95 } : {}}
            >
              <Link href="/schedule-demo">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10">Schedule a Demo</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              variants={buttonVariants}
              whileHover={config.enableComplexAnimations ? { scale: 1.05 } : {}}
              whileTap={config.enableComplexAnimations ? { scale: 0.95 } : {}}
            >
              <Link href="/products">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="group relative overflow-hidden"
                >
                  <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110 relative z-10" />
                  <span className="relative z-10">Explore Products</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional visual element - subtle pulse animation */}
          {config.enableComplexAnimations && (
            <motion.div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full opacity-5 -z-10 ${config.enableBlur ? 'blur-3xl' : ''}`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.08, 0.05]
              }}
              transition={{
                duration: 4 * config.animationDuration,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Hero;