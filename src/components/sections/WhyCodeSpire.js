'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Code2 } from 'lucide-react';
import HighlightCard from '../ui/HighlightCard';
import { Heading, Text } from '../ui/Typography';

const WhyCodeSpire = () => {
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

  // Highlight data with icons and content
  const highlights = [
    {
      id: 1,
      title: "Rapid AI Product Engineering",
      description: "From concept to deployment in weeks, not months. Our agile approach and pre-built AI frameworks accelerate your time-to-market while maintaining enterprise standards.",
      icon: Zap,
      delay: 0
    },
    {
      id: 2,
      title: "Enterprise-Grade Quality",
      description: "Built for scale with security, compliance, and reliability at the core. Our solutions meet the highest enterprise standards with robust architecture and comprehensive testing.",
      icon: Shield,
      delay: 0.2
    },
    {
      id: 3,
      title: "AI + Full Stack Expertise",
      description: "Complete end-to-end solutions combining cutting-edge AI with full-stack development. From machine learning models to production-ready applications.",
      icon: Code2,
      delay: 0.4
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gray-50/50">
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
            Why Choose <span className="text-primary">CodeSpire</span>?
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

        {/* Highlights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
        >
          {highlights.map((highlight) => (
            <HighlightCard
              key={highlight.id}
              title={highlight.title}
              description={highlight.description}
              icon={highlight.icon}
              delay={highlight.delay}
              className="h-full"
            />
          ))}
        </motion.div>

        {/* Optional decorative elements */}
        <div className="relative mt-16">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl opacity-50" />
          
          {/* Floating decorative elements */}
          <motion.div
            className="absolute -top-4 left-1/4 w-3 h-3 bg-primary/20 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute -bottom-4 right-1/3 w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              y: [0, 10, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyCodeSpire;