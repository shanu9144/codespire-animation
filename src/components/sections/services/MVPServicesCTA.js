'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Zap, Target, CheckCircle } from 'lucide-react';

const MVPServicesCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    { value: "60%", label: "Faster Product Launch Time" },
    { value: "80%", label: "Reduction in Development Rework" },
    { value: "End-to-End", label: "Support From Idea to Scale" }
  ];
  
  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6">
      {/* Enhanced background with subtle textures */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white/80 to-purple-50/40" />
      
      {/* Subtle mesh pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Soft depth elements */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/4 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-2xl" />
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Main Content */}
          <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-[#2D3748]">Bring Your Ideas to Life —</span><br />
              <span className="text-[#6B46C1]">Faster, Smarter, Better</span>
            </h2>
            <p className="text-xl text-[#4A5568] leading-relaxed mb-12">
              Transform your concepts into tangible, validated products with our AI-powered MVP and Prototyping expertise. 
              Let's help you shorten innovation cycles and move from vision to value — faster than ever before.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/60">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MVPServicesCTA;
