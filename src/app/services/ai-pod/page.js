"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wrapper, Button } from '@/shared/ui';
import { ArrowRight, ArrowDown, ChevronRight, Zap, Users, Target, TrendingUp, Scale, CheckCircle, Factory, Heart, CreditCard, Truck, ShoppingCart, Laptop } from 'lucide-react';

const AIPodPage = () => {
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
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // All services for sidebar
  const allServices = [
    { title: "Digital Engineering", href: "/services/digital-engineering", active: false },
    { title: "AI POD as a Service", href: "/services/ai-pod", active: true },
    { title: "Cloud Solutions", href: "/services/cloud-solutions", active: false },
    { title: "AI & Machine Learning", href: "/services/ai-ml", active: false },
    { title: "Data Analytics", href: "/services/data-analytics", active: false },
    { title: "Application Development", href: "/services/app-development", active: false },
    { title: "24/7 SRE Support", href: "/services/sre-support", active: false }
  ];

  // Key benefits data
  const keyBenefits = [
    {
      icon: TrendingUp,
      title: "Save 50-60%",
      description: "Spend less than $100K annually versus $500K+ for in-house teams."
    },
    {
      icon: Users,
      title: "More Expertise",
      description: "5+ AI specialists for the cost of one hire."
    },
    {
      icon: Zap,
      title: "Fast Results",
      description: "Deploy AI in 2-4 weeks, not months."
    },
    {
      icon: Scale,
      title: "Scalable",
      description: "Adjust team size instantly, no fixed costs."
    },
    {
      icon: Target,
      title: "High Impact",
      description: "90%+ model accuracy, $500K+ in value."
    }
  ];

  // How it works steps
  const howItWorks = [
    {
      step: "1",
      title: "Assess",
      duration: "1-2 Days",
      description: "Identify high-impact AI opportunities."
    },
    {
      step: "2", 
      title: "Deploy",
      duration: "1 Week",
      description: "Assign a tailored AI POD of experts."
    },
    {
      step: "3",
      title: "Deliver", 
      duration: "2-4 Weeks",
      description: "Build and deploy custom AI solutions."
    },
    {
      step: "4",
      title: "Optimize",
      duration: "Ongoing",
      description: "Refine and scale for sustained ROI."
    }
  ];

  // Industries served
  const industries = [
    {
      icon: Factory,
      title: "Manufacturing",
      benefit: "Cut downtime 30% with predictive maintenance."
    },
    {
      icon: Heart,
      title: "Healthcare", 
      benefit: "Boost diagnostics accuracy by 25%."
    },
    {
      icon: CreditCard,
      title: "Fintech",
      benefit: "Improve retention 20% with fraud detection."
    },
    {
      icon: Truck,
      title: "Logistics",
      benefit: "Save 40% on operations."
    },
    {
      icon: ShoppingCart,
      title: "Retail",
      benefit: "Increase sales 15-20% with AI recommendations."
    },
    {
      icon: Laptop,
      title: "Tech",
      benefit: "Reduce R&D costs by 35%."
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
                AI POD as a Service
              </motion.h1>
              
              {/* Subheading */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-2xl lg:text-3xl font-medium mb-12 text-black"
              >
                Max AI Impact, Min Cost
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
            <span className="text-white">AI POD as a Service</span>
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
            <div className="lg:col-span-3">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-16"
              >
                {/* Overview Section */}
                <motion.div variants={cardVariants} className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Overview</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    CodeSpire&apos;s AI POD as a Service delivers a managed AI team, slashing costs by 60% versus in-house hires. For less than a $200K AI specialist, get 5+ experts delivering tailored solutions 70% faster.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <div className="text-3xl font-bold text-primary mb-2">60%</div>
                      <div className="text-gray-700">Cost Reduction vs In-House</div>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                      <div className="text-3xl font-bold text-green-600 mb-2">70%</div>
                      <div className="text-gray-700">Faster Delivery</div>
                    </div>
                  </div>
                </motion.div>

                {/* Key Benefits Section */}
                <motion.div variants={cardVariants} className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Key Benefits</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {keyBenefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:border-primary transition-all duration-300 group"
                      >
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-primary rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                            <benefit.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* How It Works Section */}
                <motion.div variants={cardVariants} className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">How It Works</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {howItWorks.map((step, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -5 }}
                        className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-primary transition-all duration-300"
                      >
                        <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                          {step.step}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <div className="text-sm text-primary font-medium mb-3">{step.duration}</div>
                        <p className="text-gray-700 leading-relaxed">{step.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Industries Served Section */}
                <motion.div variants={cardVariants} className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Industries Served</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {industries.map((industry, index) => (
                      <motion.div
                        key={index}
                        variants={cardVariants}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-primary transition-all duration-300 group"
                      >
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-primary rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
                            <industry.icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 ml-3">{industry.title}</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{industry.benefit}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Why AI POD Section */}
                <motion.div variants={cardVariants} className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why AI POD?</h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    In-house AI costs $500K+ for 2-3 experts. Our AI POD delivers 5+ specialists, faster results, and scalability for less than $100K, maximizing ROI without risks.
                  </p>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                      <h3 className="text-xl font-semibold text-red-800 mb-4">In-House AI Team</h3>
                      <ul className="space-y-2 text-red-700">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                          $500K+ annual cost
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                          Only 2-3 experts
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                          Long hiring process
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                          Fixed costs & risks
                        </li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                      <h3 className="text-xl font-semibold text-green-800 mb-4">AI POD as a Service</h3>
                      <ul className="space-y-2 text-green-700">
                        <li className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          Less than $100K annually
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          5+ AI specialists
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          Deploy in 2-4 weeks
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          Scalable & flexible
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Call to Action Section */}
                <motion.div 
                  variants={cardVariants}
                  className="bg-gradient-to-r from-primary to-blue-600 p-8 lg:p-12 rounded-2xl text-white text-center"
                >
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                    Start Now!
                  </h3>
                  <p className="text-lg mb-8 leading-relaxed opacity-90">
                    Get more AI power for less. Contact us to transform your business.
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

export default AIPodPage;
