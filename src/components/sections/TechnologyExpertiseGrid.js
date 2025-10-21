'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Code, 
  Monitor, 
  Settings, 
  Layers, 
  Cloud, 
  Database,
  Zap,
  Cpu,
  Globe,
  Users
} from 'lucide-react';

const TechnologyExpertiseGrid = () => {
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
  
  const expertiseCards = [
    {
      icon: Code,
      title: "Java & .NET",
      description: "Building secure, scalable, and enterprise-grade applications with industry-leading frameworks.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Monitor,
      title: "UI/UX with React & Node.js",
      description: "Crafting intuitive, responsive interfaces paired with powerful backend solutions.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Settings,
      title: "DevOps",
      description: "Streamlining development with CI/CD pipelines, automation, and deployment excellence.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Layers,
      title: "Microservices",
      description: "Designing modular, agile architectures for flexibility and rapid innovation.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Cloud,
      title: "Cloud Enablement",
      description: "Leveraging AWS, Azure, and Google Cloud for cost-efficient, scalable applications.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Database,
      title: "Database & Python",
      description: "Optimizing data management with SQL, NoSQL, and delivering versatile, high-performance apps for AI and analytics.",
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
                <span className="text-[#2D3748]">Our Top Technology</span><br />
                <span className="text-[#6B46C1]">Expertise</span>
              </h2>
            </div>
            <p className="text-xl text-[#4A5568] leading-relaxed">
              Comprehensive technology expertise that powers innovative solutions across 
              enterprise-grade applications, modern frameworks, and cutting-edge methodologies.
            </p>
          </motion.div>
          
          {/* Expertise Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {expertiseCards.map((expertise, index) => {
              const Icon = expertise.icon;
              return (
                <motion.div
                  key={expertise.title}
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
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${expertise.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 blur-xl bg-blue-400/30 rounded-xl group-hover:bg-blue-400/50 transition-all`} />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-gray-900 flex-shrink-0">
                        {expertise.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {expertise.description}
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

export default TechnologyExpertiseGrid;
