'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Lightbulb, 
  Zap, 
  Cog, 
  RefreshCw, 
  FileText, 
  Users,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const AIServicesGrid = () => {
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const services = [
    {
      icon: Lightbulb,
      title: "Smarter Consulting",
      description: "AI-driven insights and strategic guidance to optimize your engineering processes and decision-making capabilities.",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: Zap,
      title: "Faster Design & Engineering",
      description: "Accelerate your design cycles with AI-powered tools that automate complex calculations and optimize solutions.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Cog,
      title: "Efficient Manufacturing",
      description: "Streamline production processes with intelligent automation and predictive maintenance systems.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: RefreshCw,
      title: "Seamless System Engineering",
      description: "Integrate complex systems with AI orchestration for seamless connectivity and optimal performance.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: FileText,
      title: "Reliable Product Testing",
      description: "Comprehensive testing frameworks powered by AI to ensure quality and reliability at every stage.",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: Users,
      title: "Streamlined Technical Publications",
      description: "Automated documentation and technical writing solutions that maintain consistency and accuracy.",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    }
  ];
  
  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-slate-50/50" />
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-blue-500" />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-[#2D3748]">Our AI-Powered Digital</span><br />
                <span className="text-[#6B46C1]">Engineering Services</span>
              </h2>
              <Sparkles className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-xl text-[#4A5568] leading-relaxed">
              Comprehensive solutions that leverage artificial intelligence to transform 
              every aspect of your engineering workflow, from concept to deployment.
            </p>
          </motion.div>
          
          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Hover glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                  
                  {/* Card with layered depth */}
                  <motion.div
                    className="relative h-full bg-white rounded-2xl p-8 border border-gray-100 group-hover:border-gray-200 shadow-md group-hover:shadow-2xl transition-all duration-300"
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative">
                      {/* Icon with depth */}
                      <div className="mb-6">
                        <div className="relative inline-block">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 blur-xl bg-blue-400/30 rounded-xl group-hover:bg-blue-400/50 transition-all`} />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-gray-900">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      
                      <button className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <motion.button
              className="relative group px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600" />
              
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              
              {/* Shadow layers */}
              <div className="absolute inset-0 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300" />
              
              {/* Button text */}
              <span className="relative text-white flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Explore All Services
                <ArrowRight className="w-5 h-5" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIServicesGrid;
