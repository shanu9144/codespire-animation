'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Code2 } from 'lucide-react';
import HighlightCard from '../ui/HighlightCard';
import { Heading, Text } from '../ui/Typography';
import CodeSpireLiquidBackground from '../backgrounds/CodeSpireLiquidBackground';

const WhyCodeSpireWithLiquid = () => {
  // Animation variants for the section header
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Container variants for staggered card animations
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

  // Enhanced highlight data with icons and content
  const highlights = [
    {
      id: 1,
      title: "Rapid AI Product Engineering",
      description: "From concept to deployment in weeks, not months. Our agile approach and pre-built AI frameworks accelerate your time-to-market while maintaining enterprise standards.",
      icon: Zap,
      delay: 0,
      accent: 'primary'
    },
    {
      id: 2,
      title: "Enterprise-Grade Quality",
      description: "Built for scale with security, compliance, and reliability at the core. Our solutions meet the highest enterprise standards with robust architecture and comprehensive testing.",
      icon: Shield,
      delay: 0.2,
      accent: 'secondary'
    },
    {
      id: 3,
      title: "AI + Full Stack Expertise",
      description: "Complete end-to-end solutions combining cutting-edge AI with full-stack development. From machine learning models to production-ready applications.",
      icon: Code2,
      delay: 0.4,
      accent: 'tertiary'
    }
  ];

  return (
    <CodeSpireLiquidBackground
      variant="section"
      intensity="low"
      enableMouseInteraction={false}
      className="py-16 sm:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <Heading level={2} size="h1" className="mb-6">
            Why Choose <span className="text-primary relative">
              CodeSpire
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 text-primary opacity-10 blur-sm"
                animate={{
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                CodeSpire
              </motion.div>
            </span>?
          </Heading>
          <Text 
            size="body-lg" 
            color="secondary" 
            className="max-w-3xl mx-auto leading-relaxed"
          >
            We combine deep AI expertise with enterprise-grade engineering to deliver 
            solutions that transform your business and scale with your growth.
          </Text>
        </motion.div>

        {/* Enhanced Highlights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
        >
          {highlights.map((highlight) => (
            <motion.div
              key={highlight.id}
              className="relative group"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Card with liquid accent background */}
              <div className="relative h-full">
                {/* Subtle liquid background for each card */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `linear-gradient(135deg, 
                        ${highlight.accent === 'primary' ? 'rgba(56, 75, 255, 0.05)' : 
                          highlight.accent === 'secondary' ? 'rgba(56, 75, 255, 0.03)' : 
                          'rgba(56, 75, 255, 0.02)'} 0%, 
                        transparent 50%, 
                        ${highlight.accent === 'primary' ? 'rgba(56, 75, 255, 0.02)' : 
                          highlight.accent === 'secondary' ? 'rgba(56, 75, 255, 0.01)' : 
                          'rgba(56, 75, 255, 0.005)'} 100%)`
                    }}
                  />
                </div>

                {/* Enhanced HighlightCard */}
                <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 h-full border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white/95">
                  {/* Icon with enhanced styling */}
                  <div className="mb-6">
                    <div className="inline-flex p-4 bg-primary/10 rounded-xl group-hover:bg-primary/15 transition-colors duration-300">
                      <highlight.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Title */}
                  <Heading level={3} size="h3" className="mb-4 group-hover:text-primary transition-colors duration-300">
                    {highlight.title}
                  </Heading>

                  {/* Description */}
                  <Text size="body" color="secondary" className="leading-relaxed">
                    {highlight.description}
                  </Text>

                  {/* Subtle hover indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary-hover rounded-b-xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced decorative section */}
        <div className="relative mt-16">
          {/* Subtle background pattern with liquid-inspired gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-primary/3 rounded-3xl opacity-50" />
          
          {/* Floating decorative elements with CodeSpire branding */}
          <motion.div
            className="absolute -top-4 left-1/4 w-3 h-3 bg-primary/30 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute -bottom-4 right-1/3 w-2 h-2 bg-primary/40 rounded-full"
            animate={{
              y: [0, 10, 0],
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Additional tech-inspired floating elements */}
          <motion.div
            className="absolute top-1/2 left-10 text-primary/20 text-2xl font-mono"
            animate={{
              rotate: [0, 360],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            ⚡
          </motion.div>

          <motion.div
            className="absolute top-1/3 right-10 text-primary/20 text-xl font-mono"
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🔒
          </motion.div>
        </div>

        {/* Call-to-action section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 bg-primary/5 rounded-full border border-primary/20">
            <Text size="sm" color="primary-color" className="font-medium">
              Ready to transform your business with AI?
            </Text>
            <motion.div
              className="ml-2 w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </CodeSpireLiquidBackground>
  );
};

export default WhyCodeSpireWithLiquid;