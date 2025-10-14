'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Phone, MapPin, ArrowRight, Flame } from 'lucide-react';
import Link from 'next/link';

const VerticalContactButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls 50% of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setIsVisible(scrollPercent >= 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const contactOptions = [
    {
      icon: Mail,
      label: 'Email Us',
      href: 'mailto:info@codespiresolutions.com',
      description: 'info@codespiresolutions.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+16028373370',
      description: '(602) 837-3370',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      href: '/contact',
      description: 'Noida, India',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      {/* Main Contact Button */}
      <motion.button
        onClick={toggleExpanded}
        className={`
          relative flex flex-col items-center justify-between
          w-16 h-48 bg-gradient-to-b from-purple-500 via-purple-600 to-blue-700
          text-white font-bold text-xs tracking-wider
          rounded-l-2xl shadow-2xl shadow-purple-500/40
          border border-white/10 backdrop-blur-sm
          transition-all duration-500 ease-out
          hover:shadow-purple-500/50 hover:shadow-3xl
          hover:scale-105 hover:from-purple-400 hover:via-purple-500 hover:to-blue-600
          group overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:to-transparent
          before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
        `}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: 0 }}
        animate={{ x: isExpanded ? -320 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Flame Icon at Top */}
        <motion.div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
            <Flame className="w-3 h-3 text-white" />
          </div>
        </motion.div>

        {/* Vertical Text */}
        <motion.div
          className="flex flex-col items-center justify-center flex-1 relative z-10"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center space-y-1">
            <span className="text-xs font-bold tracking-wider uppercase leading-tight text-white transform -rotate-90">CONTACT</span>
          </div>
        </motion.div>

        {/* Close Icon */}
        <motion.div
          className="absolute top-2 right-2 z-20"
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={{ 
            opacity: isExpanded ? 1 : 0, 
            scale: isExpanded ? 1 : 0,
            rotate: isExpanded ? 0 : -90
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <X className="w-3 h-3 text-white" />
          </div>
        </motion.div>

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 rounded-l-2xl border border-white/20"
          animate={{ 
            scale: [1, 1.02, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Expanded Contact Options */}
      <motion.div
        className="absolute right-16 top-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20"
        initial={{ opacity: 0, x: 50, scale: 0.8 }}
        animate={{ 
          opacity: isExpanded ? 1 : 0, 
          x: isExpanded ? 0 : 50,
          scale: isExpanded ? 1 : 0.8
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.4 
        }}
        style={{ 
          pointerEvents: isExpanded ? 'auto' : 'none' 
        }}
      >
        <div className="p-8 min-w-[320px]">
          <div className="space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: isExpanded ? 1 : 0, 
                y: isExpanded ? 0 : -20 
              }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get in Touch
              </h3>
              <p className="text-sm text-gray-600">
                We're here to help you succeed
              </p>
            </motion.div>
            
            {/* Contact Options */}
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isExpanded ? 1 : 0, 
                  y: isExpanded ? 0 : 20 
                }}
                transition={{ 
                  delay: 0.2 + (index * 0.1),
                  duration: 0.3 
                }}
              >
                <Link
                  href={option.href}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-300 group border border-transparent hover:border-blue-100 hover:shadow-lg"
                  onClick={() => setIsExpanded(false)}
                >
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {option.label}
                    </p>
                    <p className="text-sm text-gray-600 group-hover:text-blue-500 transition-colors duration-200">
                      {option.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              </motion.div>
            ))}
            
            {/* Quick Contact Form Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isExpanded ? 1 : 0, 
                y: isExpanded ? 0 : 20 
              }}
              transition={{ 
                delay: 0.5,
                duration: 0.3 
              }}
            >
              <Link
                href="/contact"
                className="block w-full mt-6 py-4 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white text-base font-bold rounded-xl text-center hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 relative overflow-hidden group"
                onClick={() => setIsExpanded(false)}
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Send Message</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Backdrop */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-r from-black/10 via-black/20 to-black/10 backdrop-blur-sm z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsExpanded(false)}
        style={{ 
          pointerEvents: isExpanded ? 'auto' : 'none' 
        }}
      />
    </div>
  );
};

export default VerticalContactButton;