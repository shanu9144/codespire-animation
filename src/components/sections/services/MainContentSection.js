'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Brain, 
  Cloud, 
  Database, 
  Code,
  ArrowRight,
  Cpu,
  Network,
  Eye,
  Target,
  Zap
} from 'lucide-react';

const MainContentSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="col-span-full text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
              Engineering The Future,
            </h2>
            <h3 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              Powered By AI
            </h3>
          </motion.div>

          {/* Benefits Cards Grid */}
          <motion.div variants={containerVariants} className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Our Vision Card */}
            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                At CodeSpire, we're revolutionizing digital engineering through cutting-edge 
                <span className="font-semibold text-blue-600"> AI technologies</span>. Our comprehensive approach combines advanced machine learning, 
                cloud-native architectures, and intelligent automation to deliver solutions 
                that transform how businesses operate.
              </p>
            </motion.div>

            {/* Our Approach Card */}
            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Approach</h3>
              <p className="text-gray-600 leading-relaxed">
                From predictive analytics to autonomous systems, we empower organizations to 
                harness the full potential of artificial intelligence. Our engineering teams 
                work closely with clients to understand their unique challenges and develop 
                tailored solutions that drive measurable results.
              </p>
            </motion.div>

            {/* Why It Matters Card */}
            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why It Matters</h3>
              <p className="text-gray-600 leading-relaxed">
                With a focus on <span className="font-semibold text-blue-600">scalability</span>, reliability, and innovation, we ensure that every 
                solution we deliver is not just cutting-edge today, but future-ready for 
                tomorrow's challenges. Experience the power of 
                <span className="font-semibold text-blue-600"> AI-driven engineering</span> that adapts, 
                learns, and evolves with your business.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MainContentSection;