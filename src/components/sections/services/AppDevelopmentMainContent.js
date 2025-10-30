'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code, 
  Palette, 
  Cpu, 
  Cloud, 
  Database, 
  Zap, 
  Layers, 
  Globe, 
  Shield, 
  Rocket,
  Sparkles,
  Brain,
  CpuIcon
} from 'lucide-react';

const AppDevelopmentMainContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section ref={ref} className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Main Content Section */}
          <motion.div 
            variants={itemVariants} 
            className="relative"
          >
            {/* Glassmorphism card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-16 border border-blue-200/50 shadow-2xl">
              {/* Main Heading */}
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  UI/UX Design
                </h3>
                <p className="text-xl leading-relaxed bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-relaxed">
                  Crafting intuitive, responsive interfaces that users love for modern applications.
                </p>
              </motion.div>

              {/* UI/UX Benefits Cards Grid */}
              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User Research Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">User Research</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Deep understanding of user needs through comprehensive research, personas, and journey mapping to create meaningful experiences.
                  </p>
                </motion.div>

                {/* Responsive Design Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Responsive Design</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Mobile-first approach ensuring seamless experiences across all devices with modern design principles and accessibility standards.
                  </p>
                </motion.div>

                {/* Prototyping Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Prototyping</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Interactive prototypes and wireframes that bring ideas to life, enabling rapid iteration and stakeholder alignment.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppDevelopmentMainContent;