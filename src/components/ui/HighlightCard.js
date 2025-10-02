'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { Heading, Text } from './Typography';

const HighlightCard = forwardRef(({ 
  title,
  description,
  icon: Icon,
  delay = 0,
  className = '',
  ...props 
}, ref) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: delay + 0.2,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    hover: {
      boxShadow: "0 20px 40px rgba(56, 75, 255, 0.15), 0 0 0 1px rgba(56, 75, 255, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative ${className}`}
      {...props}
    >
      <motion.div
        variants={glowVariants}
        className="relative bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:border-primary/20 transition-colors duration-300 h-full"
      >
        {/* Background glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icon container */}
        <motion.div 
          variants={iconVariants}
          className="relative z-10 mb-6"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <Heading 
            level={3} 
            size="h3" 
            className="mb-4 group-hover:text-primary transition-colors duration-300"
          >
            {title}
          </Heading>
          
          <Text 
            size="body" 
            color="secondary" 
            className="leading-relaxed"
          >
            {description}
          </Text>
        </div>

        {/* Subtle decorative element */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </motion.div>
  );
});

HighlightCard.displayName = 'HighlightCard';

export default HighlightCard;