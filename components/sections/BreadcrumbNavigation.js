'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const BreadcrumbNavigation = () => {
  const breadcrumbVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };
  
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <div className="fixed top-6 left-6 right-6 z-50 flex justify-between items-center">
      {/* Time Badge */}
      <motion.div
        variants={badgeVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <motion.div
          variants={pulseVariants}
          animate="pulse"
          className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="font-semibold text-sm">1 Issue</span>
        </motion.div>
        
        {/* Notification dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Breadcrumb Navigation */}
      <motion.nav
        variants={breadcrumbVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center space-x-2 text-white/80"
        aria-label="Breadcrumb"
      >
        <Link 
          href="/" 
          className="flex items-center gap-1 hover:text-white transition-colors duration-200"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">Home</span>
        </Link>
        
        <ChevronRight className="w-4 h-4 text-white/50" />
        
        <Link 
          href="/services" 
          className="text-sm font-medium hover:text-white transition-colors duration-200"
        >
          Services
        </Link>
        
        <ChevronRight className="w-4 h-4 text-white/50" />
        
        <span className="text-sm font-semibold text-white">
          Digital Engineering
        </span>
      </motion.nav>
    </div>
  );
};

export default BreadcrumbNavigation;
