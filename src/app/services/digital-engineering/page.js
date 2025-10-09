'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Wrapper from '../../../components/ui/Wrapper';
import Button from '../../../components/ui/Button';
import { ArrowRight, ArrowDown, ChevronRight, Brain, Zap, Cog, Shield, FileText, Users, Cpu, Cloud, Database, Code2 } from 'lucide-react';

const DigitalEngineeringPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
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

  // Services data
  const allServices = [
    { title: "Digital Engineering", href: "/services/digital-engineering", active: true },
    { title: "Cloud Solutions", href: "/services#cloud" },
    { title: "AI & Machine Learning", href: "/services#ai" },
    { title: "Data Analytics", href: "/services#data-analytics" },
    { title: "Application Development", href: "/services#app-dev" },
    { title: "24/7 SRE Support", href: "/services#sre-support" },
  ];

  const aiServices = [
    {
      icon: Brain,
      title: "Smarter Consulting",
      description: "Transform data into strategic action with AI-driven insights and predictive analytics."
    },
    {
      icon: Zap,
      title: "Faster Design & Engineering",
      description: "Accelerate innovation through AI-powered simulations and optimized frameworks."
    },
    {
      icon: Cog,
      title: "Efficient Manufacturing",
      description: "Achieve precision and efficiency with AI-enhanced automation and quality control."
    },
    {
      icon: Shield,
      title: "Seamless System Engineering",
      description: "Ensure flawless integration of complex systems with AI assistance and monitoring."
    },
    {
      icon: FileText,
      title: "Reliable Product Testing",
      description: "Proactively mitigate risks with AI-powered predictive testing and validation."
    },
    {
      icon: Users,
      title: "Streamlined Technical Publications",
      description: "Simplify documentation with AI-generated clear and compliant content."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Network Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"></div>
        
        {/* Animated Network Dots and Lines */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="#60A5FA" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Network Connection Lines */}
            <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="#60A5FA" strokeWidth="1" opacity="0.3"/>
            <line x1="30%" y1="40%" x2="50%" y2="30%" stroke="#60A5FA" strokeWidth="1" opacity="0.3"/>
            <line x1="50%" y1="30%" x2="70%" y2="50%" stroke="#60A5FA" strokeWidth="1" opacity="0.3"/>
            <line x1="70%" y1="50%" x2="85%" y2="35%" stroke="#60A5FA" strokeWidth="1" opacity="0.3"/>
            <line x1="20%" y1="60%" x2="40%" y2="70%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
            <line x1="40%" y1="70%" x2="60%" y2="80%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
            <line x1="60%" y1="80%" x2="80%" y2="65%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
            
            {/* Network Nodes */}
            <circle cx="10%" cy="20%" r="4" fill="#60A5FA" opacity="0.8"/>
            <circle cx="30%" cy="40%" r="5" fill="#3B82F6" opacity="0.8"/>
            <circle cx="50%" cy="30%" r="4" fill="#60A5FA" opacity="0.8"/>
            <circle cx="70%" cy="50%" r="5" fill="#3B82F6" opacity="0.8"/>
            <circle cx="85%" cy="35%" r="4" fill="#60A5FA" opacity="0.8"/>
            <circle cx="20%" cy="60%" r="4" fill="#3B82F6" opacity="0.8"/>
            <circle cx="40%" cy="70%" r="5" fill="#60A5FA" opacity="0.8"/>
            <circle cx="60%" cy="80%" r="4" fill="#3B82F6" opacity="0.8"/>
            <circle cx="80%" cy="65%" r="5" fill="#60A5FA" opacity="0.8"/>
          </svg>
        </div>
        
        {/* Additional overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-gray-900/40"></div>
        
        <Wrapper>
          <div className="relative z-10 text-center">

            {/* Main Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-5xl mx-auto"
            >
              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl lg:text-8xl font-bold mb-8 text-white drop-shadow-2xl"
              >
                Digital Engineering
              </motion.h1>
              
              {/* Subheading */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-2xl lg:text-3xl font-medium mb-12 text-black"
              >
                Engineering the Future, Powered by AI
              </motion.h2>
              
              {/* Scroll Down Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mb-16"
              >
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex flex-col items-center space-y-2 cursor-pointer"
                  onClick={() => {
                    const nextSection = document.getElementById('main-content');
                    nextSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="text-white text-sm font-medium">Scroll Down</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowDown className="h-6 w-6 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </Wrapper>

        {/* Breadcrumb Navigation - Bottom Left */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-8 z-20"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors hover:underline cursor-pointer hover:cursor-pointer">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white transition-colors hover:underline cursor-pointer hover:cursor-pointer">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Digital Engineering</span>
          </div>
        </motion.nav>
      </section>

      {/* Main Content */}
      <section id="main-content" className="py-16 lg:py-24 bg-gray-50">
        <Wrapper>
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Left Sidebar - All Services */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="lg:col-span-1"
            >
              <div className="sticky top-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">All Services</h3>
                <nav className="space-y-1">
                  {allServices.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 group cursor-pointer hover:cursor-pointer ${
                        service.active
                          ? 'bg-primary text-white shadow-lg border-l-4 border-blue-300'
                          : 'text-white hover:bg-white hover:text-primary hover:border-l-4 hover:border-primary/30 hover:shadow-md'
                      }`}
                    >
                      <span className="text-sm font-medium">{service.title}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                        service.active ? 'text-white' : 'text-gray-400 group-hover:text-primary group-hover:translate-x-1'
                      }`} />
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-3"
            >
              {/* Introduction Section */}
              <motion.div 
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg mb-12"
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                      Engineering The Future, Powered By AI
                    </h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        At CodeSpire Solutions, we are redefining digital engineering by integrating the transformative power of artificial intelligence. Our comprehensive suite of services leverages cutting-edge AI to deliver significantly smarter, faster, and more efficient solutions.
                      </p>
                      <p>
                        From consulting and design to manufacturing and system engineering, we provide end-to-end digital transformation that drives tangible business results and competitive advantage.
                      </p>
                      <p>
                        Our AI-powered approach ensures precision, scalability, and innovation at every step of your digital engineering journey.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-2xl p-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                          <Cpu className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-sm text-gray-600">AI Processing</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                          <Cloud className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-sm text-gray-600">Cloud Native</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                          <Database className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-sm text-gray-600">Data Analytics</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                          <Code2 className="w-8 h-8 text-primary mx-auto mb-2" />
                          <div className="text-sm text-gray-600">Smart Code</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* AI Services Section */}
              <motion.div variants={fadeInUp} className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                  Our AI-Powered Digital Engineering Services
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiServices.map((service, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.02,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="group bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-8 h-8 text-primary group-hover:text-blue-600 transition-colors duration-300" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {service.description}
                        </p>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div 
                variants={fadeInUp}
                className="bg-gradient-to-r from-primary to-blue-600 p-8 lg:p-12 rounded-2xl text-white text-center"
              >
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  Transform your business with AI-powered Digital Engineering
                </h3>
                <p className="text-lg mb-8 leading-relaxed opacity-90">
                  Unlock the full potential of your digital engineering projects with our AI-driven expertise. Contact us today to embark on a journey towards smarter innovation and a more efficient future.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-primary text-white hover:bg-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:cursor-pointer">
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </Wrapper>
      </section>



      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 z-50 cursor-pointer hover:cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
        </motion.button>
      )}
    </div>
  );
};

export default DigitalEngineeringPage;
