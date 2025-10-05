'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Wrapper from '../../components/ui/Wrapper';
import OptimizedLiquidBackground from '../../components/backgrounds/OptimizedLiquidBackground';
import EnhancedLiquidBackground from '../../components/backgrounds/EnhancedLiquidBackground';
import { 
  Brain, 
  Zap, 
  Users, 
  Rocket, 
  Shield, 
  Database, 
  Cloud, 
  Code, 
  Smartphone, 
  Server, 
  BarChart3, 
  Settings,
  ArrowUp,
  CheckCircle,
  Target,
  Lightbulb,
  Cpu,
  Globe,
  Lock,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Star,
  ChevronDown,
  Play
} from 'lucide-react';

const ServicesPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  
  // Back to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('[data-section]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= scrollPosition && rect.bottom >= scrollPosition) {
          setActiveSection(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Connecting line component
  const ConnectingLine = ({ isActive, delay = 0 }) => (
    <motion.div
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
      className="relative flex justify-center my-24"
    >
      <div className="w-0.5 h-24 bg-gradient-to-b from-primary via-purple-500 to-primary rounded-full relative overflow-hidden">
        <motion.div
          animate={isActive ? { y: [0, 24, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent"
        />
        <motion.div
          animate={isActive ? { scale: [1, 1.5, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full"
        />
      </div>
    </motion.div>
  );

  // Flagship service benefits
  const flagshipBenefits = [
    {
      icon: Target,
      title: "Agile, focused PODs aligned to client goals",
      description: "Dedicated teams that understand your business objectives and deliver results that matter",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      icon: Users,
      title: "Flexible integration — onsite or hybrid with client teams",
      description: "Seamless collaboration with your existing workforce and culture",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      icon: Code,
      title: "Full-stack delivery — from UI/UX to scalable backends",
      description: "Complete end-to-end development capabilities with modern tech stacks",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: Brain,
      title: "Deployment of intelligent models solving real-world, high-value problems",
      description: "AI solutions that drive measurable business impact and competitive advantage",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50"
    }
  ];

  // Other services data
  const otherServices = [
    {
      icon: Code,
      title: "Digital Engineering",
      description:
        "Cutting-edge engineering solutions for transformative digital experiences.",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: Users,
      title: "IT And Non-IT Staffing",
      description:
        "Expert talent for seamless workforce optimization.",
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      icon: Settings,
      title: "Application Development And Testing",
      description:
        "Robust and modernized applications with rigorous quality assurance",
      color: "from-rose-500 to-orange-600",
      bgColor: "from-rose-50 to-orange-50",
    },
    {
      icon: BarChart3,
      title: "Data, Analytics And AI",
      description:
        "Actionable insights through advanced analytics and intelligent AI.",
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
    },
    {
      icon: Cloud,
      title: "Salesforce And ServiceNow",
      description:
        "Streamlined platforms for dynamic business efficiency.",
      color: "from-indigo-500 to-blue-600",
      bgColor: "from-indigo-50 to-blue-50",
    },
    {
      icon: Shield,
      title: "24/7 SRE Support",
      description:
        "Reliable, proactive system resilience and performance.",
      color: "from-slate-500 to-gray-700",
      bgColor: "from-slate-50 to-gray-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}

      {/* Hero Section */}
      <OptimizedLiquidBackground variant="hero" intensity="medium">
        <Wrapper className="py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Floating elements */}
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full"
            />
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute top-32 right-16 w-6 h-6 bg-purple-500/20 rounded-full"
              style={{ animationDelay: '1s' }}
            />
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="absolute bottom-20 left-20 w-3 h-3 bg-cyan-500/20 rounded-full"
              style={{ animationDelay: '2s' }}
            />

            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-500/10 px-4 py-2 rounded-full text-primary font-medium text-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Solutions
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
              variants={fadeInUp}
            >
              AI-Powered Services for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-cyan-500">
                Enterprise
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-12 max-w-4xl mx-auto"
              variants={fadeInUp}
            >
              At CodeSpire, we help enterprises conceive, build, and scale AI-powered products. 
              At the core of our delivery model is AI POD as a Service — our flagship approach 
              to embedding agile, high-performance teams that deliver rapid business outcomes.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              variants={fadeInUp}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-primary to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Discover AI PODs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group border-2 border-primary/20 text-primary px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300 hover:border-primary hover:shadow-xl"
              >
                <span className="flex items-center gap-3">
                  View All Services
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </motion.button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-sm font-medium">Explore Our Services</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </motion.div>
        </Wrapper>
      </OptimizedLiquidBackground>

      {/* Connecting Line */}
      <ConnectingLine isActive={activeSection >= 1} delay={0.5} />

      {/* Flagship Service Section */}
      <EnhancedLiquidBackground variant="section" intensity="high">
        <Wrapper className="py-28" data-section="0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-24"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-500/10 px-6 py-3 rounded-full text-primary font-semibold text-sm mb-8"
              variants={fadeInUp}
            >
              <Star className="w-4 h-4" />
              Our Flagship Service
            </motion.div>

            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
              variants={fadeInUp}
            >
              Your Dedicated AI Delivery Engine
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              AI POD as a Service is our flagship approach to embedding agile, high-performance teams 
              that deliver rapid business outcomes. Think of PODs as your AI strike teams — fast, 
              focused, and impact-driven.
            </motion.p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24"
          >
            {flagshipBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 h-full">
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <benefit.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Hover effect overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.bgColor} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                    initial={false}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center"
          >
            <div className="relative bg-gradient-to-r from-primary via-purple-600 to-cyan-500 rounded-3xl p-12 md:p-16 lg:p-20 text-white overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Deploy Your AI Strike Team?
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's discuss how AI PODs can accelerate your AI initiatives and drive measurable business outcomes.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                >
                  <span className="flex items-center gap-3">
                    Discover AI PODs
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Wrapper>
      </EnhancedLiquidBackground>

      {/* Connecting Line */}
      <ConnectingLine isActive={activeSection >= 2} delay={0.3} />

      {/* Other Services Section */}
        <Wrapper className="py-28" data-section="1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-24"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-teal-500/10 px-6 py-3 rounded-full text-green-600 font-semibold text-sm mb-8"
            variants={fadeInUp}
          >
            <Cpu className="w-4 h-4" />
            Comprehensive Services
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
            variants={fadeInUp}
          >
            Comprehensive AI & Technology Services
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            From AI product development to enterprise solutions, we provide end-to-end 
            services that drive innovation and business growth.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {otherServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 h-full">
                <motion.div 
                  className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                <motion.div
                  className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300"
                  whileHover={{ x: 4 }}
                >
                  Learn More
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>

                {/* Hover effect overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Wrapper>

      {/* Connecting Line */}
      <ConnectingLine isActive={activeSection >= 3} delay={0.2} />

      {/* Final CTA Section */}
      <OptimizedLiquidBackground variant="section" intensity="low">
        <Wrapper className="py-32" data-section="2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-6 py-3 rounded-full text-cyan-600 font-semibold text-sm mb-8"
              variants={fadeInUp}
            >
              <Rocket className="w-4 h-4" />
              Ready to Transform?
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
              Ready to Transform Your Business with AI?
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 md:mb-12 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
              Let's discuss how our AI services can accelerate your digital transformation 
              and drive measurable business outcomes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-primary to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  Schedule a Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group border-2 border-primary/20 text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary hover:text-white transition-all duration-300 hover:border-primary hover:shadow-xl"
              >
                <span className="flex items-center gap-3">
                  Download Our Capabilities
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </Wrapper>
      </OptimizedLiquidBackground>
    </div>
  );
};

export default ServicesPage;