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
  
  const technologies = [
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Building robust data pipelines and infrastructure for seamless data flow and processing.',
      gradient: 'from-blue-600 to-blue-700',
      glow: 'shadow-blue-500/25'
    },
    {
      icon: Brain,
      title: 'Machine Learning',
      description: 'Developing predictive models and AI algorithms that uncover hidden patterns in your data.',
      gradient: 'from-cyan-500 to-blue-600',
      glow: 'shadow-cyan-500/25'
    },
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Creating interactive dashboards and reports that provide real-time insights into your business performance.',
      gradient: 'from-indigo-600 to-blue-600',
      glow: 'shadow-indigo-500/25'
    },
    {
      icon: PieChart,
      title: 'Data Visualization',
      description: 'Designing compelling visual representations that make complex data easily understandable.',
      gradient: 'from-blue-600 to-indigo-600',
      glow: 'shadow-blue-500/25'
    },
    {
      icon: Cloud,
      title: 'Cloud Analytics',
      description: 'Leveraging cloud platforms for scalable, cost-effective data processing and storage.',
      gradient: 'from-cyan-500 to-blue-700',
      glow: 'shadow-cyan-500/25'
    },
    {
      icon: Shield,
      title: 'Data Governance',
      description: 'Implementing best practices for data quality, security, and compliance.',
      gradient: 'from-blue-700 to-indigo-600',
      glow: 'shadow-blue-500/25'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };
  
  const techVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  
  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Modern light gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20" />
      
      {/* Animated geometric patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 60px 60px, 60px 60px',
        }} />
      </div>
      
      {/* Floating AI-themed elements */}
      <motion.div 
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full blur-xl"
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* AI neural network pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
          <defs>
            <pattern id="neural" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-blue-400" />
              <path d="M20,20 L80,80 M80,20 L20,80" stroke="currentColor" strokeWidth="0.5" className="text-blue-300" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural)" />
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-20"
        >
          {/* Main Content Section */}
          <motion.div 
            variants={itemVariants} 
            className="relative"
          >
            {/* Glassmorphism card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-16 border border-blue-200/50 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column - Content */}
                <div className="space-y-8">
                  {/* Main Heading */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center"
                      >
                        <BarChart3 className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="h-8 w-px bg-gradient-to-b from-blue-500 to-cyan-500" />
                    </div>
                    <h3 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                      <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
                        Data Analytics & AI
                      </span>
                    </h3>
                  </motion.div>
                  
                  {/* Description */}
                  <motion.div variants={itemVariants}>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                      At <span className="text-blue-600 font-semibold">CodeSpire Solutions</span>, we specialize in transforming complex data into actionable business intelligence. Our comprehensive data analytics services combine cutting-edge AI technologies with deep industry expertise to help organizations make data-driven decisions that drive growth and innovation.
                    </p>
                  </motion.div>
                  
                  {/* Technology Expertise Heading */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-px bg-gradient-to-r from-blue-500 to-cyan-500 flex-1" />
                      <h4 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                        Our Data Analytics Expertise
                      </h4>
                      <div className="h-px bg-gradient-to-r from-cyan-500 to-blue-500 flex-1" />
                    </div>
                  </motion.div>
                  
                  {/* Technology Grid */}
                  <div className="grid gap-4">
                    {technologies.map((tech, index) => (
                      <motion.div
                        key={tech.title}
                        variants={techVariants}
                        whileHover={{ 
                          scale: 1.02, 
                          x: 10,
                          transition: { duration: 0.2 }
                        }}
                        className="group"
                      >
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 hover:border-blue-300/50 transition-all duration-300 hover:bg-white/80 hover:shadow-lg">
                          <div className="flex items-start gap-4">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className={`w-12 h-12 bg-gradient-to-r ${tech.gradient} rounded-xl flex items-center justify-center shadow-lg ${tech.glow} group-hover:shadow-xl transition-all duration-300`}
                            >
                              <tech.icon className="w-6 h-6 text-white" />
                            </motion.div>
                            <div className="flex-1">
                              <h5 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                {tech.title}
                              </h5>
                              <p className="text-gray-600 leading-relaxed">
                                {tech.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Right Column - Visual */}
                <motion.div 
                  variants={cardVariants}
                  className="relative"
                >
                  {/* AI-themed visual container */}
                  <div className="relative bg-gradient-to-br from-blue-50/80 to-indigo-50/60 rounded-3xl p-8 border border-blue-200/50 backdrop-blur-sm">
                    {/* Floating data elements */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center"
                    >
                      <Database className="w-4 h-4 text-white" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center"
                    >
                      <TrendingUp className="w-4 h-4 text-white" />
                    </motion.div>
                    
                    {/* Main visual - Data Analytics Display */}
                    <div className="bg-gray-900/90 rounded-2xl p-6 border border-blue-300/30">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <span className="text-blue-300 text-sm ml-4">Data Analytics Dashboard</span>
                        </div>
                        
                        <div className="space-y-2 font-mono text-sm">
                          <div className="text-blue-400">
                            <span className="text-purple-400">const</span> <span className="text-cyan-300">analytics</span> = <span className="text-yellow-300">new</span> <span className="text-green-400">DataEngine</span>();
                          </div>
                          <div className="text-blue-300">
                            <span className="text-purple-400">analytics</span>.<span className="text-cyan-300">processData</span>(<span className="text-green-400">'BigData'</span>);
                          </div>
                          <div className="text-blue-400">
                            <span className="text-purple-400">analytics</span>.<span className="text-cyan-300">generateInsights</span>(<span className="text-green-400">'AI'</span>);
                          </div>
                          <div className="text-gray-400">
                            <span className="text-gray-500">//</span> <span className="text-cyan-300">Unlocking data potential</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Glowing effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-3xl blur-xl" />
                  </div>
                  
                  {/* Floating particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataAnalyticsMainContent;
