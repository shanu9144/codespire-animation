'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Zap, Scale, Target, Factory, Heart, CreditCard, Truck, ShoppingCart, Laptop, CheckCircle, Shield } from 'lucide-react';

const AIPodMainContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Key benefits data
  const keyBenefits = [
    {
      icon: TrendingUp,
      title: 'Save 50-60%',
      description: 'Spend less than $100K annually versus $500K+ for in-house teams.',
    },
    {
      icon: Users,
      title: 'More Expertise',
      description: '5+ AI specialists for the cost of one hire.',
    },
    {
      icon: Zap,
      title: 'Fast Results',
      description: 'Deploy AI in 2-4 weeks, not months.',
    },
    {
      icon: Scale,
      title: 'Scalable',
      description: 'Adjust team size instantly, no fixed costs.',
    },
    {
      icon: Target,
      title: 'High Impact',
      description: '90%+ model accuracy, $500K+ in value.',
    },
    {
      icon: Shield,
      title: 'Risk-Free',
      description: 'No long-term commitments, cancel anytime.',
    },
  ];

  // How it works steps
  const howItWorks = [
    {
      step: '1',
      title: 'Assess',
      duration: '1-2 Days',
      description: 'Identify high-impact AI opportunities.',
    },
    {
      step: '2', 
      title: 'Deploy',
      duration: '1 Week',
      description: 'Assign a tailored AI POD of experts.',
    },
    {
      step: '3',
      title: 'Deliver', 
      duration: '2-4 Weeks',
      description: 'Build and deploy custom AI solutions.',
    },
    {
      step: '4',
      title: 'Optimize',
      duration: 'Ongoing',
      description: 'Refine and scale for sustained ROI.',
    },
  ];

  // Industries served
  const industries = [
    {
      icon: Factory,
      title: 'Manufacturing',
      benefit: 'Cut downtime 30% with predictive maintenance.',
    },
    {
      icon: Heart,
      title: 'Healthcare', 
      benefit: 'Boost diagnostics accuracy by 25%.',
    },
    {
      icon: CreditCard,
      title: 'Fintech',
      benefit: 'Improve retention 20% with fraud detection.',
    },
    {
      icon: Truck,
      title: 'Logistics',
      benefit: 'Save 40% on operations.',
    },
    {
      icon: ShoppingCart,
      title: 'Retail',
      benefit: 'Increase sales 15-20% with AI recommendations.',
    },
    {
      icon: Laptop,
      title: 'Tech',
      benefit: 'Reduce R&D costs by 35%.',
    },
  ];
  
  return (
    <section ref={ref} className="relative py-20 px-6">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50" />
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Soft blurred shapes for depth */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Overview Section */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-gray-100/50 shadow-sm">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              CodeSpire&apos;s AI POD as a Service delivers a managed AI team, slashing costs by 60% versus in-house hires. For less than a $200K AI specialist, get 5+ experts delivering tailored solutions 70% faster.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-primary mb-2">60%</div>
                <div className="text-gray-700">Cost Reduction vs In-House</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">70%</div>
                <div className="text-gray-700">Faster Delivery</div>
              </div>
            </div>
          </motion.div>

          {/* Key Benefits Section */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-gray-100/50 shadow-sm">
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
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-gray-100/50 shadow-sm">
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
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-gray-100/50 shadow-sm">
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
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-gray-100/50 shadow-sm">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why AI POD?</h2>
            <p className="text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-relaxed mb-6">
              In-house AI costs $500K+ for 2-3 experts. Our AI POD delivers 5+ specialists, faster results, and scalability for less than $100K, maximizing ROI without risks.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">In-House AI Team</h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    $500K+ annual cost
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Only 2-3 experts
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Long hiring process
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Fixed costs & risks
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">AI POD as a Service</h3>
                <ul className="space-y-2 text-blue-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Less than $100K annually
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    5+ AI specialists
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Deploy in 2-4 weeks
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3" />
                    Scalable & flexible
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIPodMainContent;