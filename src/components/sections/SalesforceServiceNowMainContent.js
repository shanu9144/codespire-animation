'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Cloud, 
  Database, 
  Zap, 
  Layers, 
  Globe, 
  Shield, 
  Rocket,
  Sparkles,
  Brain,
  Settings,
  Users,
  Workflow
} from 'lucide-react';

const SalesforceServiceNowMainContent = () => {
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
                  Salesforce & ServiceNow Expertise
                </h3>
                <p className="text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-relaxed">
                  Unlock the full potential of your CRM and ITSM platforms with certified experts and custom solutions.
                </p>
              </motion.div>

              {/* Salesforce & ServiceNow Benefits Cards Grid */}
              <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Salesforce CRM Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Salesforce CRM</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Custom implementations, integrations, and optimizations to maximize your sales and marketing efficiency with industry-leading CRM solutions.
                  </p>
                </motion.div>

                {/* ServiceNow ITSM Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">ServiceNow ITSM</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Complete IT service management solutions that automate workflows, improve service delivery, and streamline operations.
                  </p>
                </motion.div>

                {/* Custom Development Card */}
                <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Development</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Building tailored applications and workflows that align with your unique business requirements and drive operational excellence.
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

export default SalesforceServiceNowMainContent;