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
  Sparkles
} from 'lucide-react';

const MainContentSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const iconCards = [
    {
      icon: Brain,
      title: "AI Processing",
      description: "Advanced machine learning algorithms for intelligent decision making and automation",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Cloud,
      title: "Cloud Native",
      description: "Scalable cloud infrastructure designed for modern applications and services",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Database,
      title: "Robust APIs",
      description: "High-performance APIs with comprehensive documentation and monitoring",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Code,
      title: "Edge AI",
      description: "Distributed AI processing at the edge for real-time insights and responses",
      color: "from-orange-500 to-red-500"
    }
  ];
  
  return (
    <section ref={ref} className="relative py-12 lg:py-16 px-6">
      {/* Subtle gradient background instead of flat gray */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto">
        {/* Card with enhanced design */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-3xl shadow-2xl p-12 md:p-16 lg:p-20 border border-gray-100"
        >
          {/* Add inner glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 pointer-events-none" />
          
          {/* Decorative sparkles with glow */}
          <div className="absolute -left-8 top-16">
            <div className="relative">
              <Sparkles className="w-14 h-14 text-blue-500 drop-shadow-lg" />
              <div className="absolute inset-0 blur-xl bg-blue-400/40 rounded-full" />
            </div>
          </div>
          
          <div className="absolute -right-8 top-16">
            <div className="relative">
              <Sparkles className="w-14 h-14 text-purple-500 drop-shadow-lg" />
              <div className="absolute inset-0 blur-xl bg-purple-400/40 rounded-full" />
            </div>
          </div>
          
          {/* Content with relative positioning */}
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 leading-relaxed">
              <span className="text-[#2D3748]">Engineering The Future,</span><br />
              <span className="text-[#6B46C1]">Powered By AI</span>
            </h2>
            
            <div className="space-y-6 text-[#4A5568] text-lg leading-relaxed mb-12">
              <p>
                At CodeSpire, we're revolutionizing digital engineering through cutting-edge 
                AI technologies. Our comprehensive approach combines advanced machine learning, 
                cloud-native architectures, and intelligent automation to deliver solutions 
                that transform how businesses operate.
              </p>
              
              <p>
                From predictive analytics to autonomous systems, we empower organizations to 
                harness the full potential of artificial intelligence. Our engineering teams 
                work closely with clients to understand their unique challenges and develop 
                tailored solutions that drive measurable results.
              </p>
              
              <p>
                With a focus on scalability, reliability, and innovation, we ensure that every 
                solution we deliver is not just cutting-edge today, but future-ready for 
                tomorrow's challenges. Experience the power of AI-driven engineering that adapts, 
                learns, and evolves with your business.
              </p>
            </div>
            
            {/* Icon grid with elevated cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
              {iconCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:to-purple-400/20 rounded-2xl blur-xl transition-all duration-500" />
                    
                    {/* Card with enhanced design */}
                    <div className="relative flex flex-col items-center gap-4 p-8 rounded-3xl bg-white border border-gray-100 group-hover:border-purple-200 group-hover:shadow-2xl transition-all duration-300">
                      {/* Icon with enhanced styling */}
                      <div className="relative">
                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-xl group-hover:shadow-purple-500/50 group-hover:scale-110 transition-all duration-300`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        {/* Enhanced glow effect */}
                        <div className={`absolute inset-0 blur-2xl bg-purple-400/40 rounded-3xl group-hover:bg-purple-400/60 transition-all duration-300`} />
                      </div>
                      
                      <span className="text-lg font-bold text-gray-900 text-center">
                        {card.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Enhanced CTA Button */}
            <div className="flex justify-center">
              <motion.button
                className="relative group px-12 py-6 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Enhanced gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#6B46C1] to-[#8B5CF6]" />
                
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                
                {/* Enhanced shadow layers */}
                <div className="absolute inset-0 shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300" />
                
                {/* Button text */}
                <span className="relative text-white flex items-center gap-3">
                  About Our Services <ArrowRight className="w-6 h-6" />
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MainContentSection;