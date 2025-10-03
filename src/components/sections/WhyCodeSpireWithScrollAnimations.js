/**
 * WhyCodeSpireWithScrollAnimations - Enhanced WhyCodeSpire section with scroll animations
 * Combines existing animations with new scroll-triggered effects
 */

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
import {
  ScrollAnimatedSection,
  ScrollRevealText,
  StaggeredGrid,
  ParallaxElement,
  MorphingIcon
} from '../animations';

const WhyCodeSpireWithScrollAnimations = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Enhanced highlight data with morphing icons
  const highlights = [
    {
      id: 1,
      title: "Innovate",
      subtitle: "Cutting-Edge AI Solutions",
      description: "Unleash cutting-edge creativity to pioneer market-leading solutions with advanced AI technologies and innovative approaches.",
      icon: Sparkles,
      morphPreset: "heartFill",
      image: "https://picsum.photos/500/300?random=1",
      gradient: "from-blue-500 to-cyan-500",
      position: "left"
    },
    {
      id: 2,
      title: "Engineer",
      subtitle: "Enterprise-Grade Development",
      description: "Achieve peak performance and optimize operational efficiency through meticulous digital engineering and robust architecture.",
      icon: Code2,
      morphPreset: "menuToX",
      image: "https://picsum.photos/500/300?random=2",
      gradient: "from-purple-500 to-pink-500",
      position: "right"
    },
    {
      id: 3,
      title: "Evolve",
      subtitle: "Continuous Innovation",
      description: "Change in the right direction to stay ahead in a dynamic digital world with adaptive solutions and future-ready technology.",
      icon: Rocket,
      morphPreset: "arrowRotate",
      image: "https://picsum.photos/500/300?random=3",
      gradient: "from-green-500 to-emerald-500",
      position: "left"
    },
    {
      id: 4,
      title: "Excellence",
      subtitle: "Quality Assurance",
      description: "Deliver exceptional results with rigorous testing, quality assurance, and enterprise-grade security standards.",
      icon: Award,
      morphPreset: "playToPause",
      image: "https://picsum.photos/500/300?random=4",
      gradient: "from-orange-500 to-red-500",
      position: "right"
    },
    {
      id: 5,
      title: "Empower",
      subtitle: "Team Collaboration",
      description: "Enable teams with powerful tools, seamless collaboration, and comprehensive support for maximum productivity.",
      icon: Users,
      morphPreset: "heartFill",
      image: "https://picsum.photos/500/300?random=5",
      gradient: "from-teal-500 to-blue-500",
      position: "center"
    }
  ];

  // Enhanced Card Component with scroll animations
  const EnhancedCard = ({ highlight, index }) => {
    const Icon = highlight.icon;
    const isLeft = highlight.position === 'left';
    const isRight = highlight.position === 'right';
    const isCenter = highlight.position === 'center';
    
    return (
      <motion.div
        className={`relative group ${
          isCenter ? 'col-span-full max-w-md mx-auto' : ''
        }`}
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full transition-all duration-300 hover:shadow-2xl">
          {/* Image Section with Parallax */}
          <div className="relative h-48 overflow-hidden">
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-40`} />
            
            {/* Parallax Image */}
            <ParallaxElement speed={0.2}>
              <img
                src={highlight.image}
                alt={highlight.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                loading="lazy"
              />
            </ParallaxElement>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
            {/* Morphing Icon */}
            <div className={`absolute top-4 ${isLeft ? 'left-4' : 'right-4'} p-3 rounded-xl bg-gradient-to-r ${highlight.gradient} shadow-lg hover:scale-110 hover:rotate-3 transition-transform duration-200`}>
              <MorphingIcon
                preset={highlight.morphPreset}
                size={24}
                className="text-white"
                triggers={['hover']}
                duration={300}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <ScrollRevealText 
              className="text-2xl font-bold text-gray-900 mb-2"
              revealBy="word"
              staggerDelay={100}
              triggerOffset="30%"
            >
              {highlight.title}
            </ScrollRevealText>
            
            <ScrollRevealText 
              className="text-sm font-medium text-gray-500 mb-3"
              revealBy="character"
              staggerDelay={30}
              triggerOffset="30%"
            >
              {highlight.subtitle}
            </ScrollRevealText>
            
            <ScrollRevealText 
              className="text-gray-600 leading-relaxed mb-4"
              revealBy="character"
              staggerDelay={15}
              triggerOffset="30%"
            >
              {highlight.description}
            </ScrollRevealText>

            {/* CTA Button */}
            <motion.button 
              className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Learn More
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Enhanced Background Animation with Parallax
  const AnimatedBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Parallax Gradient Orbs */}
        <ParallaxElement speed={0.3}>
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
        </ParallaxElement>
        
        <ParallaxElement speed={-0.2}>
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
        </ParallaxElement>

        <ParallaxElement speed={0.4}>
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
        </ParallaxElement>

        {/* Floating Geometric Shapes with Parallax */}
        <ParallaxElement speed={0.6}>
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
        </ParallaxElement>

        <ParallaxElement speed={-0.4}>
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
        </ParallaxElement>
      </div>
    );
  };

  return (
    <ScrollAnimatedSection 
      className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden"
      transitionType="fadeUp"
      stagger={200}
    >
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with Scroll Animations */}
        <div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4 hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-4 h-4 mr-2" />
            What We Do
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <ScrollRevealText
              revealBy="word"
              staggerDelay={200}
              className="block"
            >
              Purposeful
            </ScrollRevealText>
            <ScrollRevealText
              revealBy="word"
              staggerDelay={200}
              className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Digital Engineering
            </ScrollRevealText>
          </h2>
          
          <ScrollRevealText 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            revealBy="character"
            staggerDelay={20}
            triggerOffset="20%"
          >
            Our approach is rooted in a deep understanding of today&apos;s challenges, 
            enabling our clients to innovate for growth, engineer efficient solutions 
            with precision, and evolve strategies to help our clients stay ahead of the curve.
          </ScrollRevealText>
        </div>

        {/* Enhanced Cards Grid with Staggered Animation */}
        <StaggeredGrid
          columns={2}
          gap="2rem"
          animationType="scaleIn"
          staggerDelay={150}
          className="max-w-6xl mx-auto"
        >
          {highlights.slice(0, 4).map((highlight, index) => (
            <EnhancedCard
              key={highlight.id}
              highlight={highlight}
              index={index}
            />
          ))}
        </StaggeredGrid>
        
        {/* Center Card with Special Animation */}
        <ScrollAnimatedSection 
          className="flex justify-center mt-8"
          transitionType="liquid"
          stagger={0}
          triggerOffset="30%"
        >
          <EnhancedCard
            highlight={highlights[4]}
            index={4}
          />
        </ScrollAnimatedSection>
      </div>
    </ScrollAnimatedSection>
  );
};

export default WhyCodeSpireWithScrollAnimations;