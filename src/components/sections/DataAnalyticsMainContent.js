'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Database, 
  BarChart3, 
  Brain, 
  TrendingUp, 
  PieChart, 
  Cloud, 
  Shield,
  Sparkles,
  Cpu,
  Zap
} from 'lucide-react';

const DataAnalyticsMainContent = () => {
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
                  Data Analytics & AI
                </h3>
                <p className="text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-relaxed">
                  Transform raw data into strategic insights that drive business growth and innovation.
                </p>
              </motion.div>

              {/* Data Analytics Benefits Cards Grid */}
              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Data Engineering Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Data Engineering</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Building robust data pipelines and infrastructure for seamless data flow, processing, and storage across your organization.
                  </p>
                </motion.div>

                {/* Machine Learning Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Machine Learning</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Developing predictive models and AI algorithms that uncover hidden patterns and provide intelligent insights from your data.
                  </p>
                </motion.div>

                {/* Business Intelligence Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business Intelligence</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Creating interactive dashboards and reports that provide real-time insights into your business performance and KPIs.
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

export default DataAnalyticsMainContent;