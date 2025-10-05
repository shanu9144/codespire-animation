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
import CodeSpireLiquidBackground from '../backgrounds/CodeSpireLiquidBackground';

const HeroWithLiquid = () => {
  // Get performance configuration and monitoring
  const { config, shouldReduceAnimations, logMetrics } = useAnimationPerformance();

  // Log performance metrics in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        logMetrics();
      }, 3000);
      
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
      
      <CodeSpireLiquidBackground
        variant="hero"
        intensity="medium"
        enableMouseInteraction={true}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto px-4 py-20 text-center">
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
                  className="inline-block text-primary relative"
                  variants={itemVariants}
                >
                  Enterprise-Grade AI
                  {/* Subtle glow effect for the primary text */}
                  <motion.div
                    className="absolute inset-0 text-primary opacity-20 blur-sm"
                    animate={config.enableComplexAnimations ? {
                      opacity: [0.2, 0.4, 0.2]
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Enterprise-Grade AI
                  </motion.div>
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

            {/* CTA Buttons with enhanced hover effects */}
            <motion.div 
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div 
                variants={buttonVariants}
                whileHover={config.enableComplexAnimations ? { 
                  scale: 1.05,
                  y: -2
                } : {}}
                whileTap={config.enableComplexAnimations ? { scale: 0.95 } : {}}
              >
                <Link href="/schedule-demo">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span className="relative z-10">Schedule a Demo</span>
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
                    
                    {/* Enhanced button background effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Subtle shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div 
                variants={buttonVariants}
                whileHover={config.enableComplexAnimations ? { 
                  scale: 1.05,
                  y: -2
                } : {}}
                whileTap={config.enableComplexAnimations ? { scale: 0.95 } : {}}
              >
                <Link href="/products">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="group relative overflow-hidden backdrop-blur-sm bg-white/90 hover:bg-white transition-all duration-300"
                  >
                    <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110 relative z-10" />
                    <span className="relative z-10">Explore Products</span>
                    
                    {/* Enhanced secondary button effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust indicators with subtle animation */}
            <motion.div
              variants={itemVariants}
              className="mt-16 pt-8 border-t border-gray-200/50"
            >
              <Text size="sm" color="secondary" className="mb-4">
                Trusted by industry leaders
              </Text>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                {/* Placeholder for client logos */}
                <div className="w-24 h-8 bg-gray-300/30 rounded"></div>
                <div className="w-20 h-8 bg-gray-300/30 rounded"></div>
                <div className="w-28 h-8 bg-gray-300/30 rounded"></div>
                <div className="w-22 h-8 bg-gray-300/30 rounded"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating code-inspired elements */}
        {config.enableComplexAnimations && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating brackets */}
            <motion.div
              className="absolute top-1/4 left-10 text-primary/20 text-6xl font-mono"
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {'<'}
            </motion.div>
            
            <motion.div
              className="absolute top-1/3 right-10 text-primary/20 text-6xl font-mono"
              animate={{
                y: [0, 20, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              {'>'}
            </motion.div>

            {/* Floating dots representing data points */}
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-primary/40 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        )}
      </CodeSpireLiquidBackground>
    </>
  );
};

export default HeroWithLiquid;