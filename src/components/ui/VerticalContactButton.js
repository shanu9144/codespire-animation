'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const VerticalContactButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const contactOptions = [
    {
      icon: Mail,
      label: 'Email Us',
      href: 'mailto:info@codespiresolutions.com',
      description: 'info@codespiresolutions.com'
    },
    {
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+16028373370',
      description: '(602) 837-3370'
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      href: '/contact',
      description: 'Noida, India'
    }
  ];

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      {/* Main Contact Button */}
      <motion.button
        onClick={toggleExpanded}
        className={`
          relative flex items-center justify-center
          w-16 h-32 bg-gradient-to-b from-blue-600 to-blue-700
          text-white font-semibold text-sm
          rounded-l-2xl shadow-2xl
          border border-blue-500/20
          transition-all duration-300 ease-out
          hover:shadow-blue-500/25 hover:shadow-2xl
          hover:scale-105 hover:from-blue-500 hover:to-blue-600
          group overflow-hidden
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: 0 }}
        animate={{ x: isExpanded ? -200 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Contact Icon */}
        <motion.div
          className="flex flex-col items-center space-y-1"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-medium tracking-wide">Contact</span>
          <span className="text-xs font-medium tracking-wide">us</span>
        </motion.div>

        {/* Close Icon (appears when expanded) */}
        <motion.div
          className="absolute top-2 right-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isExpanded ? 1 : 0, 
            scale: isExpanded ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
        >
          <X className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Expanded Contact Options */}
      <motion.div
        className="absolute right-16 top-0 bg-white rounded-l-2xl shadow-2xl border border-gray-200/50 backdrop-blur-sm"
        initial={{ opacity: 0, x: 50 }}
        animate={{ 
          opacity: isExpanded ? 1 : 0, 
          x: isExpanded ? 0 : 50,
          scale: isExpanded ? 1 : 0.8
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.3 
        }}
        style={{ 
          pointerEvents: isExpanded ? 'auto' : 'none' 
        }}
      >
        <div className="p-6 min-w-[280px]">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Get in Touch
            </h3>
            
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isExpanded ? 1 : 0, 
                  y: isExpanded ? 0 : 20 
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.3 
                }}
              >
                <Link
                  href={option.href}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
                  onClick={() => setIsExpanded(false)}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <option.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-600 group-hover:text-blue-500 transition-colors duration-200 truncate">
                      {option.description}
                    </p>
                  </div>
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
                delay: 0.3,
                duration: 0.3 
              }}
            >
              <Link
                href="/contact"
                className="block w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl text-center hover:from-blue-500 hover:to-blue-600 transition-all duration-200 hover:shadow-lg hover:scale-105"
                onClick={() => setIsExpanded(false)}
              >
                Send Message
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Backdrop (appears when expanded) */}
      <motion.div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
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
