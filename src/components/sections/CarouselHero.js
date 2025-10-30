"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";
import Wrapper from "../ui/Wrapper";
import { Heading, Text } from "../ui/Typography";
import OptimizedLiquidBackground from "../backgrounds/OptimizedLiquidBackground";
import { fontClasses } from "../../config/fonts";

const CarouselHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Hero slides data
  const slides = [
    {
      id: 1,
      title: "Transforming RFQ Management with AI –",
      subtitle: "Smart RFQ AI",
      description:
        "Intelligent Quoting for Modern Manufacturing",
      image:
        "/assets/images/products/Smart RFQ AI - Hero Card.jpg",
      cta: "Learn More",
      ctaLink: "/products/smart-rfq-ai",
      // accent removed
      // accentPosition removed
    },
    {
      id: 2,
      title: "Ready for Smart Sourcing Solutions –",
      subtitle: "Supplier Match AI",
      description:
        "Smarter Supplier Selection for Modern Sourcing",
      image:
        "/assets/images/products/Supplier_match.jpg",
      cta: "Learn More",
      ctaLink: "/products/supplier-match-ai",
      // accent removed
      // accentPosition removed
    },
    {
      id: 3,
      title: "Smarter Inventory and Sales Planning –",
      subtitle: "Forecast AI",
      description:
        "Identifies trends and demand shifts early for proactive planning",
      image:
        "/assets/images/products/Forecast AI - Hero Card.jpg",
      cta: "Learn More",
      ctaLink: "/products/forecast-ai",
      // accent removed
      // accentPosition removed
    },
    {
      id: 4,
      title: "Delivering Rapid AI Solutions –",
      subtitle: "AI POD as a Service",
      description:
        "Agile focused flexible PODs that handles end-to-end application builds from UI/UX to scalable backends",
      image:
        "/assets/images/services/AiPod.png",
      cta: "Learn More",
      ctaLink: "/services/ai-pod",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <OptimizedLiquidBackground
      variant="hero"
      intensity="medium"
      className="relative min-h-screen overflow-hidden"
    >
      <Wrapper className="min-h-screen flex items-center py-8 sm:py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Main Title */}
                <div>
                  <Heading level={1} size="h1" className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="block"
                    >
                      {currentSlideData.title}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="block text-primary"
                    >
                      {currentSlideData.subtitle}
                    </motion.span>
                  </Heading>
                </div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Text
                    size="body-lg"
                    color="secondary"
                    className={`max-w-xl leading-relaxed text-base sm:text-lg lg:text-xl ${fontClasses.descriptionMedium}`}
                  >
                    {currentSlideData.description}
                  </Text>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-row items-center space-x-3 sm:space-x-4"
                >
                  <Link href={currentSlideData.ctaLink} className="no-focus-outline cursor-pointer">
                    <Button variant="primary" size="md" className="group">
                      <span>{currentSlideData.cta}</span>
                    </Button>
                  </Link>

                  {/* Only show Watch Demo button for slide 4 (AI POD as a Service) */}
                  {currentSlideData.id === 4 && (
                    <Link href="/services" className="no-focus-outline cursor-pointer">
                      <Button variant="secondary" size="md" className="group">
                        <span>View Services</span>
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start space-x-3 mt-8 sm:mt-12"
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-primary"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full"
                      layoutId="activeSlide"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right Image Carousel */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[5/4.2] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl bg-gray-100">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* Image with error handling */}
                  <img
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback gradient background */}
                  <div
                    className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 items-center justify-center relative hidden"
                    style={{
                      background: `linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1d4ed8 100%)`
                    }}
                  >
                    {/* Tech-inspired overlay pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />

                    {/* Circuit board pattern overlay */}
                    <div className="absolute inset-0 opacity-30">
                      <svg className="w-full h-full" viewBox="0 0 400 300">
                        <defs>
                          <pattern
                            id="circuit"
                            x="0"
                            y="0"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                          >
                            <path
                              d="M0 20h40M20 0v40"
                              stroke="#00ff88"
                              strokeWidth="0.5"
                              opacity="0.3"
                            />
                            <circle
                              cx="20"
                              cy="20"
                              r="2"
                              fill="#00ff88"
                              opacity="0.5"
                            />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#circuit)" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Brand Accent removed */}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="carousel-arrow absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 z-10 focus:outline-none focus-visible:outline-none outline-none focus:outline-offset-0"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="carousel-arrow absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 z-10 focus:outline-none focus-visible:outline-none outline-none focus:outline-offset-0"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 lg:-top-8 lg:-left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-primary/20 rounded-full blur-xl"
            />

            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6 w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-primary/30 rounded-full blur-lg"
            />
          </div>
        </div>
      </Wrapper>

      {/* Progress Bar */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 w-48 sm:w-56 lg:w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          key={currentSlide}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>
    </OptimizedLiquidBackground>
  );
};

export default CarouselHero;
