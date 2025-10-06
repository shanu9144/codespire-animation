'use client';

import React from 'react';
import { motion } from 'framer-motion';



// Professional stat item component
const ProfessionalStatItem = ({ number, suffix, label }) => {
  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-semibold text-gray-800 mb-2">
        {number}{suffix}
      </div>
      <div className="text-sm text-gray-600 font-medium">
        {label}
      </div>
    </div>
  );
};

const StatsBanner = () => {
  
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
    <section className="relative py-12 bg-gray-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating data points */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-16 left-12 w-2 h-2 bg-blue-400 rounded-full opacity-40"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-24 right-20 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40"
        />
        <motion.div
          animate={{
            y: [0, -10, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-16 left-16 w-1 h-1 bg-cyan-400 rounded-full opacity-40"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-20 right-12 w-2 h-2 bg-green-400 rounded-full opacity-40"
        />
        {/* Neural network connections */}
        <motion.div
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 opacity-30"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/3 w-6 h-0.5 bg-gradient-to-r from-purple-300 to-cyan-300 opacity-30"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Professional Stats Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 lg:p-12 shadow-lg border border-blue-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Description */}
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                From Idea to Enterprise-Grade AI in a Blink
              </h3>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed font-medium">
                We build AI-powered products and scalable platforms for businesses who want tomorrow&apos;s innovation today.
              </p>
            </div>

            {/* Right side - Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <ProfessionalStatItem
                  key={index}
                  number={stat.number}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;