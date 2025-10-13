'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Zap, Target, Clock } from 'lucide-react';

const AppDevelopmentCTA = () => {
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
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
      
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
          className="text-center space-y-12"
        >
          {/* Main Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h2 className="text-5xl font-semibold text-gray-900 leading-tight">
              Build Faster. Ship Better.<br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Enterprise-Grade Applications
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Let&apos;s turn your idea into a secure, scalable product with exceptional UX. From startups to enterprises, we&apos;re your partner in turning ideas into high–performing applications.
            </p>
          </motion.div>
          
          {/* Stats Cards */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-3 gap-6 mt-10"
          >
            {[
              { icon: Zap, label: 'Enterprise', desc: 'Grade Quality' },
              { icon: Target, label: '10+ Tech', desc: 'Expertise Areas' },
              { icon: Clock, label: '24/7', desc: 'Support Available' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-100/50 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
                  {/* Icon with gradient outline */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5">
                      <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                        <stat.icon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 blur-xl bg-blue-400/20 rounded-2xl group-hover:bg-blue-400/30 transition-all duration-300" />
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Button */}
          <motion.div variants={itemVariants} className="pt-8">
            <motion.button
              className="group relative px-12 py-5 rounded-full font-bold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600" />
              
              {/* Subtle shadow glow */}
              <div className="absolute inset-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300" />
              
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              
              {/* Button text */}
              <span className="relative flex items-center gap-3">
                Get a Free Consultation <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppDevelopmentCTA;