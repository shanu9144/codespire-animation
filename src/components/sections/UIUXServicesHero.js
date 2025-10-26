'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Palette, Users, Brain, Zap, Rocket } from 'lucide-react';

const UIUXServicesHero = () => {
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
  
  return (
    <section ref={ref} className="relative py-16 lg:py-20 px-6 pb-20 bg-gradient-to-br from-slate-50/80 via-white/70 to-gray-50/60 overflow-hidden">
      {/* Enhanced gradient background with depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-blue-50/40 to-slate-50/50">
        {/* Add subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-100/30 via-transparent to-transparent" />
      </div>
      
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
      
      {/* Main Content with enhanced design */}
      <div className="relative z-10 max-w-6xl mx-auto text-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100/60"
        >
          <div className="space-y-6">
            {/* Decorative stars */}
            <div className="flex justify-center gap-4 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></div>
            </div>
            
            {/* Main Heading with enhanced design */}
            <h1 className="text-3xl md:text-6xl lg:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-[#2D3748]">UI/UX as a Service</span><br />
              <span className="bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6] bg-clip-text text-transparent">Designing Experiences that Inspire and Perform</span></h1>
            
            {/* Description */}
            <p className="text-xl md:text-2xl text-[#4A5568] leading-relaxed max-w-4xl mx-auto">
              From intuitive interfaces to seamless user journeys, we craft intelligent, human-centered designs powered by data, creativity, and AI innovation.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Design Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
              
              <motion.a
                href="/schedule-demo"
                className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-8 py-4 rounded-xl font-semibold text-lg border border-blue-200 hover:bg-blue-100 hover:text-blue-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-5 h-5" />
                Schedule Demo
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UIUXServicesHero;
