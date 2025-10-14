'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code, 
  Palette, 
  Cpu, 
  Cloud, 
  Database, 
  Zap, 
  Layers, 
  Globe, 
  Shield, 
  Rocket,
  Sparkles,
  Brain,
  CpuIcon
} from 'lucide-react';

const AppDevelopmentMainContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const technologies = [
    {
      icon: Code,
      title: 'Java & .NET',
      description: 'Building secure, scalable, and enterprise–grade applications with industry–leading frameworks.',
      gradient: 'from-blue-600 to-blue-700',
      glow: 'shadow-blue-500/25'
    },
    {
      icon: Palette,
      title: 'UI/UX with React and Node.js',
      description: 'Crafting intuitive, responsive interfaces paired with powerful backend solutions.',
      gradient: 'from-cyan-500 to-blue-600',
      glow: 'shadow-cyan-500/25'
    },
    {
      icon: Zap,
      title: 'DevOps',
      description: 'Streamlining development with CI/CD pipelines, automation, and deployment excellence.',
      gradient: 'from-indigo-600 to-blue-600',
      glow: 'shadow-indigo-500/25'
    },
    {
      icon: Layers,
      title: 'Microservices',
      description: 'Designing modular, agile architectures for flexibility and rapid innovation.',
      gradient: 'from-blue-600 to-indigo-600',
      glow: 'shadow-blue-500/25'
    },
    {
      icon: Cloud,
      title: 'Cloud Enablement',
      description: 'Leveraging AWS, Azure, and Google Cloud for cost–efficient, scalable apps.',
      gradient: 'from-cyan-500 to-blue-700',
      glow: 'shadow-cyan-500/25'
    },
    {
      icon: Globe,
      title: 'Integration Using APIs',
      description: 'Connecting systems seamlessly with custom, secure API solutions.',
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
                        <Brain className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="h-8 w-px bg-gradient-to-b from-blue-500 to-cyan-500" />
                    </div>
                    <h3 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                      <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-500 bg-clip-text text-transparent">
                        UI/UX Design
                      </span>
                    </h3>
                  </motion.div>
                  
                  {/* Description */}
                  <motion.div variants={itemVariants}>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                      At <span className="text-blue-600 font-semibold">CodeSpire Solutions</span>, we craft tailor–made application development solutions that power your business with the latest and greatest technologies. Whether you need robust software built from scratch or expert support to scale your vision, we deliver bespoke services in <span className="text-blue-600 font-semibold">Java, .NET, Python, APIs, databases, DevOps</span>, and more.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Our flexible staffing and capacity models, including dedicated POD structures, ensure seamless collaboration and results that exceed expectations. From startups to enterprises, we&apos;re your partner in turning ideas into high–performing applications.
                    </p>
                  </motion.div>
                  
                  {/* Technology Expertise Heading */}
                  <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-px bg-gradient-to-r from-blue-500 to-cyan-500 flex-1" />
                      <h4 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                        Our Top Technology Expertise
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
                    {/* Floating code elements */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center"
                    >
                      <Code className="w-4 h-4 text-white" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center"
                    >
                      <Cpu className="w-4 h-4 text-white" />
                    </motion.div>
                    
                    {/* Main visual - AI Code Display */}
                    <div className="bg-gray-900/90 rounded-2xl p-6 border border-blue-300/30">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <span className="text-blue-300 text-sm ml-4">AI-Powered Development</span>
                        </div>
                        
                        <div className="space-y-2 font-mono text-sm">
                          <div className="text-blue-400">
                            <span className="text-purple-400">const</span> <span className="text-cyan-300">aiApp</span> = <span className="text-yellow-300">new</span> <span className="text-green-400">Application</span>();
                          </div>
                          <div className="text-blue-300">
                            <span className="text-purple-400">aiApp</span>.<span className="text-cyan-300">useAI</span>(<span className="text-green-400">'React'</span>);
                          </div>
                          <div className="text-blue-400">
                            <span className="text-purple-400">aiApp</span>.<span className="text-cyan-300">deploy</span>(<span className="text-green-400">'Cloud'</span>);
                          </div>
                          <div className="text-gray-400">
                            <span className="text-gray-500">//</span> <span className="text-cyan-300">Building the future</span>
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

export default AppDevelopmentMainContent;