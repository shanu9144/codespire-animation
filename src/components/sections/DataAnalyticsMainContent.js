'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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
    <section ref={ref} className="relative py-20 px-6">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50" />
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Soft blurred shapes for depth */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Main Content Section */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-gray-100/50 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Analytics & AI</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  At CodeSpire Solutions, we specialize in transforming complex data into actionable business intelligence. Our comprehensive data analytics services combine cutting-edge AI technologies with deep industry expertise to help organizations make data-driven decisions that drive growth and innovation.
                </p>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Our Data Analytics Expertise</h4>
                <div className="space-y-3 text-gray-800">
                  <p><span className="font-semibold">Data Engineering:</span> Building robust data pipelines and infrastructure for seamless data flow and processing.</p>
                  <p><span className="font-semibold">Machine Learning:</span> Developing predictive models and AI algorithms that uncover hidden patterns in your data.</p>
                  <p><span className="font-semibold">Business Intelligence:</span> Creating interactive dashboards and reports that provide real-time insights into your business performance.</p>
                  <p><span className="font-semibold">Data Visualization:</span> Designing compelling visual representations that make complex data easily understandable.</p>
                  <p><span className="font-semibold">Cloud Analytics:</span> Leveraging cloud platforms for scalable, cost-effective data processing and storage.</p>
                  <p><span className="font-semibold">Data Governance:</span> Implementing best practices for data quality, security, and compliance.</p>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop"
                  alt="Data Analytics Illustration"
                  className="w-full rounded-2xl shadow-xl mx-auto"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataAnalyticsMainContent;
