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
  Network
} from 'lucide-react';

const MainContentSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const iconCards = [
    {
      icon: Brain,
      title: "AI Processing",
      description: "Advanced machine learning algorithms for intelligent decision making and automation",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Cloud,
      title: "Cloud Native",
      description: "Scalable cloud infrastructure designed for modern applications and services",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Database,
      title: "Robust APIs",
      description: "High-performance APIs with comprehensive documentation and monitoring",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Code,
      title: "Edge AI",
      description: "Distributed AI processing at the edge for real-time insights and responses",
      color: "from-blue-500 to-blue-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section ref={ref} className="relative py-24 px-10">
      {/* Enhanced background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/60 to-gray-50/40" />
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Soft radial blur behind heading */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl" />
      
      {/* Additional depth elements */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-blue-500/3 rounded-full blur-2xl" />
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-cyan-500/4 rounded-full blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch"
        >
          {/* Left side - Content (60% width) */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-8 flex flex-col justify-center">
            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Engineering The Future,
              </h2>
              <h3 className="text-4xl font-semibold text-indigo-600 leading-tight">
                Powered By AI
              </h3>
            </div>

            {/* Section Labels with Content */}
            <div className="space-y-8">
              {/* Our Vision */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Our Vision</span>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At CodeSpire, we're revolutionizing digital engineering through cutting-edge 
                  <span className="font-semibold text-indigo-600"> AI technologies</span>. Our comprehensive approach combines advanced machine learning, 
                  cloud-native architectures, and intelligent automation to deliver solutions 
                  that transform how businesses operate.
                </p>
              </motion.div>

              {/* Divider */}
              <div className="border-t border-gray-200 mt-8 mb-6"></div>

              {/* Our Approach */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Our Approach</span>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  From predictive analytics to autonomous systems, we empower organizations to 
                  harness the full potential of artificial intelligence. Our engineering teams 
                  work closely with clients to understand their unique challenges and develop 
                  tailored solutions that drive measurable results.
                </p>
              </motion.div>

              {/* Divider */}
              <div className="border-t border-gray-200 mt-8 mb-6"></div>

              {/* Why It Matters */}
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Why It Matters</span>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With a focus on <span className="font-semibold text-indigo-600">scalability</span>, reliability, and innovation, we ensure that every 
                  solution we deliver is not just cutting-edge today, but future-ready for 
                  tomorrow's challenges. Experience the power of 
                  <span className="font-semibold text-indigo-600"> AI-driven engineering</span> that adapts, 
                  learns, and evolves with your business.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Visual (40% width) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 relative">
            <div className="relative h-full bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center">
              {/* Abstract AI Visual */}
              <div className="relative w-full h-full">
                {/* Neural Network Lines - Repeated Pattern */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 800">
                  {/* Original connection lines */}
                  <path
                    d="M50,50 Q150,100 250,50 M50,150 Q150,200 250,150 M50,250 Q150,300 250,250"
                    stroke="url(#gradient1)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.8"
                  />
                  <path
                    d="M50,50 Q150,150 250,50 M50,150 Q150,250 250,150"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                  />
                  
                  {/* Repeated pattern in middle area */}
                  <path
                    d="M50,300 Q150,350 250,300 M50,400 Q150,450 250,400 M50,500 Q150,550 250,500"
                    stroke="url(#gradient1)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.7"
                  />
                  <path
                    d="M50,300 Q150,400 250,300 M50,400 Q150,500 250,400"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.5"
                  />
                  
                  {/* Repeated pattern in upper area */}
                  <path
                    d="M50,600 Q150,650 250,600 M50,700 Q150,750 250,700 M50,800 Q150,850 250,800"
                    stroke="url(#gradient1)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.6"
                  />
                  <path
                    d="M50,600 Q150,700 250,600 M50,700 Q150,800 250,700"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.4"
                  />
                  
                  {/* Original nodes */}
                  <circle cx="50" cy="50" r="5" fill="url(#gradient1)" opacity="0.9" />
                  <circle cx="150" cy="100" r="4" fill="url(#gradient2)" opacity="0.8" />
                  <circle cx="250" cy="50" r="5" fill="url(#gradient1)" opacity="0.9" />
                  <circle cx="50" cy="150" r="4" fill="url(#gradient2)" opacity="0.8" />
                  <circle cx="150" cy="200" r="5" fill="url(#gradient1)" opacity="0.9" />
                  <circle cx="250" cy="150" r="4" fill="url(#gradient2)" opacity="0.8" />
                  <circle cx="50" cy="250" r="5" fill="url(#gradient1)" opacity="0.9" />
                  <circle cx="150" cy="300" r="4" fill="url(#gradient2)" opacity="0.8" />
                  <circle cx="250" cy="250" r="5" fill="url(#gradient1)" opacity="0.9" />
                  
                  {/* Middle area nodes */}
                  <circle cx="50" cy="300" r="4" fill="url(#gradient1)" opacity="0.7" />
                  <circle cx="150" cy="350" r="3" fill="url(#gradient2)" opacity="0.6" />
                  <circle cx="250" cy="300" r="4" fill="url(#gradient1)" opacity="0.7" />
                  <circle cx="50" cy="400" r="3" fill="url(#gradient2)" opacity="0.6" />
                  <circle cx="150" cy="450" r="4" fill="url(#gradient1)" opacity="0.7" />
                  <circle cx="250" cy="400" r="3" fill="url(#gradient2)" opacity="0.6" />
                  <circle cx="50" cy="500" r="4" fill="url(#gradient1)" opacity="0.7" />
                  <circle cx="150" cy="550" r="3" fill="url(#gradient2)" opacity="0.6" />
                  <circle cx="250" cy="500" r="4" fill="url(#gradient1)" opacity="0.7" />
                  
                  {/* Upper area nodes */}
                  <circle cx="50" cy="600" r="3" fill="url(#gradient1)" opacity="0.6" />
                  <circle cx="150" cy="650" r="2" fill="url(#gradient2)" opacity="0.5" />
                  <circle cx="250" cy="600" r="3" fill="url(#gradient1)" opacity="0.6" />
                  <circle cx="50" cy="700" r="2" fill="url(#gradient2)" opacity="0.5" />
                  <circle cx="150" cy="750" r="3" fill="url(#gradient1)" opacity="0.6" />
                  <circle cx="250" cy="700" r="2" fill="url(#gradient2)" opacity="0.5" />
                  <circle cx="50" cy="800" r="3" fill="url(#gradient1)" opacity="0.6" />
                  <circle cx="150" cy="850" r="2" fill="url(#gradient2)" opacity="0.5" />
                  <circle cx="250" cy="800" r="3" fill="url(#gradient1)" opacity="0.6" />
                  
                  {/* Gradients */}
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Floating elements - Original */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-8"
                >
                  <Cpu className="w-8 h-8 text-indigo-500 opacity-60" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-8 left-8"
                >
                  <Network className="w-8 h-8 text-blue-500 opacity-60" />
                </motion.div>
                
                {/* Additional floating elements in middle area */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-1/3 right-12"
                >
                  <Cpu className="w-6 h-6 text-indigo-400 opacity-50" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute top-1/2 left-12"
                >
                  <Network className="w-6 h-6 text-blue-400 opacity-50" />
                </motion.div>
                
                {/* Additional floating elements in upper area */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute top-2/3 right-16"
                >
                  <Cpu className="w-5 h-5 text-indigo-300 opacity-40" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  className="absolute top-3/4 left-16"
                >
                  <Network className="w-5 h-5 text-blue-300 opacity-40" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Cards Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {iconCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg border border-gray-100/60 hover:border-indigo-400 transition-all duration-300 h-full flex flex-col">
                    {/* Icon with pulse effect */}
                    <div className="relative mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center group-hover:animate-pulse`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <h4 className="text-sm font-bold text-black mb-2">{card.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed flex-grow">{card.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-12"
        >
          <motion.button
            className="relative group px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600" />
            
            {/* Shadow glow */}
            <div className="absolute inset-0 shadow-lg group-hover:shadow-xl group-hover:shadow-indigo-500/50 transition-all duration-300" />
            
            {/* Button text */}
            <span className="relative text-white flex items-center gap-3">
              About Our Services <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MainContentSection;