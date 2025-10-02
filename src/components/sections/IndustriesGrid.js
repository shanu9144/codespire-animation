'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Factory, 
  Cpu, 
  Building2, 
  Shield, 
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Heading, Text } from '../ui/Typography';

const IndustriesGrid = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  // Animation variants for the section header
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Container variants for staggered card animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  // Individual card variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
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

  // Industries data
  const industries = [
    {
      id: 1,
      name: "Manufacturing",
      description: "Smart automation and AI-driven optimization for modern manufacturing processes",
      icon: Factory,
      gradient: "from-blue-500 to-primary",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      name: "Hi-Tech",
      description: "Cutting-edge AI solutions for technology companies and digital transformation",
      icon: Cpu,
      gradient: "from-purple-500 to-primary",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: 3,
      name: "BFSI",
      description: "Banking, Financial Services & Insurance solutions with AI-powered insights",
      icon: Building2,
      gradient: "from-green-500 to-primary",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      name: "Public Sector & Defense",
      description: "Secure, compliant AI systems for government and defense applications",
      icon: Shield,
      gradient: "from-red-500 to-primary",
      bgColor: "bg-red-50",
      iconColor: "text-red-600"
    },
    {
      id: 5,
      name: "Healthcare & Life Sciences",
      description: "AI-powered healthcare solutions improving patient outcomes and research",
      icon: Heart,
      gradient: "from-pink-500 to-primary",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600"
    }
  ];

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % industries.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + industries.length) % industries.length);
  };

  // Touch/swipe handling for mobile
  const handleTouchStart = useRef(null);
  const handleTouchEnd = (e) => {
    if (!handleTouchStart.current) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const touchStart = handleTouchStart.current;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    handleTouchStart.current = null;
  };

  const handleTouchStartCapture = (e) => {
    handleTouchStart.current = e.touches[0].clientX;
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <Heading level={2} size="h1" className="mb-6">
            Industries We <span className="text-primary">Serve</span>
          </Heading>
          <Text 
            size="body-lg" 
            color="secondary" 
            className="max-w-3xl mx-auto leading-relaxed"
          >
            From manufacturing to healthcare, we deliver AI solutions tailored to your industry&apos;s 
            unique challenges and regulatory requirements.
          </Text>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group cursor-pointer"
            >
              <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                {/* Icon container */}
                <div className={`relative ${industry.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <industry.icon className={`w-8 h-8 ${industry.iconColor} group-hover:text-primary transition-colors duration-300`} />
                </div>
                
                {/* Content */}
                <div className="relative">
                  <Heading 
                    level={3} 
                    size="h3" 
                    className="mb-3 group-hover:text-primary transition-colors duration-300"
                  >
                    {industry.name}
                  </Heading>
                  <Text 
                    size="body" 
                    color="secondary" 
                    className="leading-relaxed"
                  >
                    {industry.description}
                  </Text>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Carousel container */}
            <div 
              ref={carouselRef}
              className="overflow-hidden rounded-2xl"
              onTouchStart={handleTouchStartCapture}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
              >
                {industries.map((industry) => (
                  <div
                    key={industry.id}
                    className="w-full flex-shrink-0 px-2"
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mx-2">
                      {/* Icon container */}
                      <div className={`${industry.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                        <industry.icon className={`w-8 h-8 ${industry.iconColor}`} />
                      </div>
                      
                      {/* Content */}
                      <Heading level={3} size="h3" className="mb-3">
                        {industry.name}
                      </Heading>
                      <Text size="body" color="secondary" className="leading-relaxed">
                        {industry.description}
                      </Text>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary transition-colors duration-200"
              aria-label="Previous industry"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary transition-colors duration-200"
              aria-label="Next industry"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {industries.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="relative mt-16">
          {/* Floating decorative elements */}
          <motion.div
            className="absolute -top-4 left-1/6 w-3 h-3 bg-primary/20 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute -bottom-4 right-1/4 w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              y: [0, 12, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          
          <motion.div
            className="absolute top-8 right-1/6 w-1.5 h-1.5 bg-primary/25 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.25, 0.5, 0.25]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default IndustriesGrid;