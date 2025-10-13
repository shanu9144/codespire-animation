'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Salesforce & ServiceNow Expertise</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  At CodeSpire Solutions, we are certified Salesforce and ServiceNow partners with deep expertise in enterprise implementations. Our team delivers comprehensive solutions that streamline your business processes, enhance customer relationships, and optimize IT service management.
                </p>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Our Platform Expertise</h4>
                <div className="space-y-3 text-gray-800">
                  <p><span className="font-semibold">Salesforce CRM:</span> Custom implementations, integrations, and optimizations to maximize your sales and marketing efficiency.</p>
                  <p><span className="font-semibold">ServiceNow ITSM:</span> Complete IT service management solutions that automate workflows and improve service delivery.</p>
                  <p><span className="font-semibold">Custom Development:</span> Building tailored applications and workflows that align with your unique business requirements.</p>
                  <p><span className="font-semibold">Data Migration:</span> Seamless data transfer and system integration with minimal downtime and data loss.</p>
                  <p><span className="font-semibold">Training & Support:</span> Comprehensive user training and ongoing support to ensure successful adoption.</p>
                  <p><span className="font-semibold">Cloud Integration:</span> Connecting Salesforce and ServiceNow with your existing systems and third-party applications.</p>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1400&auto=format&fit=crop"
                  alt="Salesforce ServiceNow Illustration"
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

export default SalesforceServiceNowMainContent;
