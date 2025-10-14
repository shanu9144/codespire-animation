'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroDemoSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-8 lg:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Book Your Demo
            </h1>
            <p className="text-xl lg:text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-relaxed max-w-4xl mx-auto">
              Ready to see how AI can transform your business? Schedule a 30-minute demo with our experts.
            </p>
          </motion.div>

          {/* Demo Booking Card */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-8 lg:p-12 rounded-2xl text-white text-center shadow-2xl">
              <motion.h2 
                variants={itemVariants}
                className="text-3xl lg:text-4xl font-bold mb-6"
              >
                Schedule Your 30-Minute Demo
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed"
              >
                Choose a time that works for you and let&apos;s discuss your AI transformation journey.
              </motion.p>
              <motion.div
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://calendly.com/vik-codespiresolutions/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-purple-600 hover:bg-gray-50 text-lg lg:text-xl px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold cursor-pointer hover:cursor-pointer"
                >
                  Book Demo Now <ArrowRight className="ml-2 inline h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroDemoSection;
