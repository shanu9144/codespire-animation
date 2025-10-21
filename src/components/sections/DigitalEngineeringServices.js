'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Brain, 
  Zap, 
  Cog, 
  Settings, 
  Shield, 
  FileText,
  ArrowRight,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  TrendingUp,
  Database,
  Layers,
  Workflow,
  Monitor,
  Code,
  Globe,
  Lock,
  Cpu,
  Activity,
  Eye,
  Rocket
} from 'lucide-react';

const DigitalEngineeringServices = () => {
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
      icon: Brain,
      title: "Smarter Consulting",
      description: "Transform data into strategic action with AI-driven insights.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Zap,
      title: "Faster Design & Engineering",
      description: "Accelerate innovation through AI-powered simulations and optimized frameworks.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Cog,
      title: "Efficient Manufacturing",
      description: "Achieve precision and efficiency with AI-enhanced automation.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Settings,
      title: "Seamless System Engineering",
      description: "Ensure flawless integration of complex systems with AI assistance.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Shield,
      title: "Reliable Product Testing",
      description: "Proactively mitigate risks with AI-powered predictive testing.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: FileText,
      title: "Streamlined Technical Publications",
      description: "Simplify documentation with AI-generated clear and compliant content.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    }
  ];
  
  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6">
      {/* Enhanced background with subtle textures */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/60 via-white/80 to-slate-50/40" />
      
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
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-[#2D3748]">Our AI-Powered Digital</span><br />
                <span className="text-[#6B46C1]">Engineering Services</span>
              </h2>
            </div>
            <p className="text-xl text-[#4A5568] leading-relaxed">
              Comprehensive digital engineering solutions powered by artificial intelligence to accelerate innovation and deliver exceptional results.
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
                    className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-100/60 group-hover:border-gray-200 shadow-md group-hover:shadow-2xl transition-all duration-300 flex flex-col"
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative flex flex-col h-full">
                      {/* Icon with depth */}
                      <div className="mb-6 flex-shrink-0">
                        <div className="relative inline-block">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 blur-xl bg-blue-400/30 rounded-xl group-hover:bg-blue-400/50 transition-all`} />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-gray-900 flex-shrink-0">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalEngineeringServices;
