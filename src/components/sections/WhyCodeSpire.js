'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Code2, 
  Rocket, 
  Users, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const WhyCodeSpire = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Enhanced highlight data with reliable images
  const highlights = [
    {
      id: 1,
      title: "Innovate",
      subtitle: "Cutting-Edge AI Solutions",
      description: "Unleash cutting-edge creativity to pioneer market-leading solutions with advanced AI technologies and innovative approaches.",
      icon: Sparkles,
      image: "https://picsum.photos/500/300?random=1",
      fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='18'%3EInnovate%3C/text%3E%3C/svg%3E",
      gradient: "from-blue-500 to-cyan-500",
      position: "left"
    },
    {
      id: 2,
      title: "Engineer",
      subtitle: "Enterprise-Grade Development",
      description: "Achieve peak performance and optimize operational efficiency through meticulous digital engineering and robust architecture.",
      icon: Code2,
      image: "https://picsum.photos/500/300?random=2",
      fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='18'%3EEngineer%3C/text%3E%3C/svg%3E",
      gradient: "from-purple-500 to-pink-500",
      position: "right"
    },
    {
      id: 3,
      title: "Evolve",
      subtitle: "Continuous Innovation",
      description: "Change in the right direction to stay ahead in a dynamic digital world with adaptive solutions and future-ready technology.",
      icon: Rocket,
      image: "https://picsum.photos/500/300?random=3",
      fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='18'%3EEvolve%3C/text%3E%3C/svg%3E",
      gradient: "from-green-500 to-emerald-500",
      position: "left"
    },
    {
      id: 4,
      title: "Excellence",
      subtitle: "Quality Assurance",
      description: "Deliver exceptional results with rigorous testing, quality assurance, and enterprise-grade security standards.",
      icon: Award,
      image: "https://picsum.photos/500/300?random=4",
      fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='18'%3EExcellence%3C/text%3E%3C/svg%3E",
      gradient: "from-orange-500 to-red-500",
      position: "right"
    },
    {
      id: 5,
      title: "Empower",
      subtitle: "Team Collaboration",
      description: "Enable teams with powerful tools, seamless collaboration, and comprehensive support for maximum productivity.",
      icon: Users,
      image: "https://picsum.photos/500/300?random=5",
      fallbackImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='18'%3EEmpower%3C/text%3E%3C/svg%3E",
      gradient: "from-teal-500 to-blue-500",
      position: "center"
    }
  ];

  // Enhanced Card Component with optimized image handling
  const EnhancedCard = ({ highlight, index }) => {
    const Icon = highlight.icon;
    const isLeft = highlight.position === 'left';
    const isRight = highlight.position === 'right';
    const isCenter = highlight.position === 'center';
    
    return (
      <motion.div
        variants={cardVariants}
        className={`relative group ${
          isCenter ? 'col-span-full max-w-md mx-auto' : ''
        }`}
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            {/* Gradient Background - Always visible */}
            <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-40`} />
            
            {/* Static Image with CSS hover effect */}
            <img
              src={highlight.image}
              alt={highlight.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
            {/* Floating Icon */}
            <div className={`absolute top-4 ${isLeft ? 'left-4' : 'right-4'} p-3 rounded-xl bg-gradient-to-r ${highlight.gradient} shadow-lg hover:scale-110 hover:rotate-3 transition-transform duration-200`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {highlight.title}
            </h3>
            
            <p className="text-sm font-medium text-gray-500 mb-3">
              {highlight.subtitle}
            </p>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              {highlight.description}
            </p>

            {/* CTA Button */}
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 group hover:translate-x-1 transition-all duration-200">
              Learn More
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Background Animation Component
  const AnimatedBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <motion.div
          className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100">
            <polygon 
              points="50,5 85,25 85,75 50,95 15,75 15,25" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 opacity-10"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="40" height="40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
        </motion.div>
      </div>
    );
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4 hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 mr-2" />
            What We Do
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Purposeful
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Digital Engineering
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our approach is rooted in a deep understanding of today&apos;s challenges, 
            enabling our clients to innovate for growth, engineer efficient solutions 
            with precision, and evolve strategies to help our clients stay ahead of the curve.
          </p>
        </div>

        {/* Enhanced Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {highlights.slice(0, 4).map((highlight, index) => (
            <EnhancedCard
              key={highlight.id}
              highlight={highlight}
              index={index}
            />
          ))}
          
          {/* Center Card */}
          <div className="md:col-span-2 flex justify-center mt-8">
            <EnhancedCard
              highlight={highlights[4]}
              index={4}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyCodeSpire;