'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Zap, Target, Clock } from 'lucide-react';

const DigitalEngineeringCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const floatingElements = [
    { icon: Sparkles, position: "top-10 left-10", delay: 0 },
    { icon: Zap, position: "top-20 right-20", delay: 0.5 },
    { icon: Target, position: "bottom-20 left-20", delay: 1 },
    { icon: Sparkles, position: "bottom-10 right-10", delay: 1.5 }
  ];
  
  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6">
      {/* Background with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
      
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center space-y-8"
        >
          {/* Main CTA Card */}
          <motion.div
            variants={cardVariants}
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 shadow-2xl"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700">
              {/* Animated mesh overlay */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
            
            {/* Noise texture for depth */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay"
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`
                 }} />
            
            {/* Content */}
            <div className="relative text-center text-white space-y-6">
              <div className="flex justify-center gap-4 mb-8">
                <Sparkles className="w-8 h-8" />
                <Sparkles className="w-10 h-10" />
                <Sparkles className="w-8 h-8" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-white">Transform your business with</span><br />
                <span className="text-[#6B46C1]">AI-powered Digital Engineering</span>
              </h2>
              
              <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Unlock the full potential of your digital engineering projects with our AI-driven expertise. 
                Contact us today to embark on a journey towards smarter innovation & a more efficient future.
              </p>
              
              {/* Stats with subtle cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
                {[
                  { icon: Zap, label: '50% Faster', desc: 'Development Speed' },
                  { icon: Target, label: '90% Accuracy', desc: 'Predictive Models' },
                  { icon: Clock, label: '24/7 Support', desc: 'Always Available' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <stat.icon className="w-10 h-10 mx-auto mb-3" />
                    <div className="text-2xl font-bold mb-1">{stat.label}</div>
                    <div className="text-sm text-blue-100">{stat.desc}</div>
                  </div>
                ))}
              </div>
              
              <button className="px-10 py-5 bg-white text-blue-600 font-bold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3">
                Contact Us <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalEngineeringCTA;
