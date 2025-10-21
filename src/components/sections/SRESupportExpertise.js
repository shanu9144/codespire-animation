'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Clock, 
  Shield, 
  DollarSign, 
  Target,
  Brain,
  Zap,
  BarChart3,
  Monitor,
  CheckCircle,
  AlertTriangle,
  Settings,
  Users,
  Activity,
  Database,
  Cloud,
  Server,
  Eye,
  TrendingUp,
  Globe,
  Lock
} from 'lucide-react';

const SRESupportExpertise = () => {
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

  const commitmentServices = [
    {
      icon: Clock,
      title: "Around-the-Clock Expertise",
      description: "Our SRE team monitors and maintains your critical systems 24/7, ensuring rapid issue resolution and maximum uptime.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: DollarSign,
      title: "Fixed-Fee Certainty",
      description: "Enjoy predictable budgeting with our fixed-fee support plans, tailored to your specific needs and free from unexpected costs.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Target,
      title: "Customized Support, Crystal-Clear Scope",
      description: "We collaborate closely to define your exact requirements, ensuring our SRE support aligns perfectly with your infrastructure and goals.",
      color: "from-blue-500 to-blue-600"
    }
  ];

  const innovativeFeatures = [
    {
      icon: Brain,
      title: "Proactive AI Monitoring",
      description: "Our AI anticipates potential problems in real-time, preventing downtime before it occurs.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Automated Incident Response",
      description: "Common issues are resolved instantly, significantly reducing resolution times. Expert SRE support is readily available for complex incidents.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Optimization",
      description: "Gain actionable insights into your application performance through comprehensive and user-friendly analytics.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Monitor,
      title: "Full Transparency via Client Portal",
      description: "Easily track application status, review reports, and communicate with our team through our centralized client portal.",
      color: "from-blue-500 to-blue-600"
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
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-[#2D3748]">24/7 SRE Support</span><br />
                <span className="text-[#6B46C1]">Powering Continuous Reliability</span>
              </h2>
            </div>
            <p className="text-xl text-[#4A5568] leading-relaxed">
              Your applications and platforms are the engine of your success. CodeSpire Solutions delivers 24/7 Site Reliability Engineering (SRE) support, 
              guaranteeing exceptional uptime and peak performance, allowing you to concentrate on innovation and growth.
            </p>
          </motion.div>

          {/* Our Commitment Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-[#2D3748]">Our Commitment To</span><br />
                <span className="text-[#6B46C1]">Your Reliability</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {commitmentServices.map((service, index) => {
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

          {/* Innovative Edge Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-[#2D3748]">The Innovative Edge</span><br />
                <span className="text-[#6B46C1]">Of CodeSpire SRE</span>
              </h3>
              <p className="text-xl text-[#4A5568] leading-relaxed mb-8">
                We leverage cutting-edge technology to provide unparalleled reliability:
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {innovativeFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
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
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            {/* Glow effect */}
                            <div className={`absolute inset-0 blur-xl bg-blue-400/30 rounded-xl group-hover:bg-blue-400/50 transition-all`} />
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-4 text-gray-900 flex-shrink-0">
                          {feature.title}
                        </h3>
                        
                        <p className="text-gray-600 leading-relaxed flex-grow">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SRESupportExpertise;
