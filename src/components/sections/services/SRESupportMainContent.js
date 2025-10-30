'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Monitor, 
  AlertTriangle, 
  Zap, 
  TrendingUp, 
  Shield, 
  Database,
  Clock,
  Activity,
  Brain,
  Server,
  BarChart3,
  Lock
} from 'lucide-react';

const SRESupportMainContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
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
                  Site Reliability Engineering
                </h3>
                <p className="text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-relaxed">
                  Proactive monitoring, rapid incident response, and continuous optimization to maximize uptime and performance.
                </p>
              </motion.div>

              {/* SRE Benefits Cards Grid */}
              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 24/7 Monitoring Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Monitor className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Monitoring</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Continuous system monitoring with real-time alerts and proactive issue detection to ensure optimal performance and reliability.
                  </p>
                </motion.div>

                {/* Incident Response Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Incident Response</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Rapid response to system issues with defined SLAs and escalation procedures to minimize downtime and restore services quickly.
                  </p>
                </motion.div>

                {/* Performance Optimization Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Optimization</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Continuous tuning and optimization to improve system performance, efficiency, and scalability for better user experiences.
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

export default SRESupportMainContent;