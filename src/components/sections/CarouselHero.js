"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";
import Wrapper from "../ui/Wrapper";
import { Heading, Text } from "../ui/Typography";
import OptimizedLiquidBackground from "../backgrounds/OptimizedLiquidBackground";

const CarouselHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Hero slides data
  const slides = [
    {
      id: 1,
      title: "Revolutionize EV Batteries with",
      subtitle: "Next-gen Precision",
      description:
        "Unlock speed, scale, and compliance with R Systems & SyncoraDMP",
      image:
        "https://picsum.photos/id/1050/800/600",
      cta: "Learn More",
      ctaLink: "/ev-batteries",
      accent: "Panasonic CONNECT",
      accentPosition: "top-right",
    },
    {
      id: 2,
      title: "Transform Healthcare with",
      subtitle: "AI-Powered Diagnostics",
      description:
        "Advanced machine learning for faster, more accurate medical insights",
      image:
        "https://picsum.photos/id/1051/800/600",
      cta: "Learn More",
      ctaLink: "/healthcare",
      accent: "MedTech AI",
      accentPosition: "bottom-left",
    },
    {
      id: 3,
      title: "Accelerate Manufacturing with",
      subtitle: "Smart Automation",
      description:
        "Industry 4.0 solutions that optimize production and reduce costs",
      image:
        "https://picsum.photos/id/1039/800/600",
      cta: "Learn More",
      ctaLink: "/manufacturing",
      accent: "SmartFactory Pro",
      accentPosition: "top-left",
    },
    {
      id: 4,
      title: "Enhance Finance with",
      subtitle: "Intelligent Analytics",
      description:
        "Real-time insights and predictive modeling for better decisions",
      image:
        "https://picsum.photos/id/1043/800/600",
      cta: "Learn More",
      ctaLink: "/finance",
      accent: "FinanceAI Suite",
      accentPosition: "bottom-right",
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
      <Wrapper className="h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Main Title */}
                <div>
                  <Heading level={1} size="hero" className="mb-2">
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
                    className="max-w-xl leading-relaxed"
                  >
                    {currentSlideData.description}
                  </Text>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex items-center space-x-4"
                >
                  <Link href={currentSlideData.ctaLink}>
                    <Button variant="primary" size="lg" className="group">
                      <span>{currentSlideData.cta}</span>
                    </Button>
                  </Link>

                  <Link href="/demo">
                    <Button variant="secondary" size="lg" className="group">
                      <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                      <span>Watch Demo</span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center space-x-3 mt-12"
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
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
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

              {/* Brand Accent */}
              <motion.div
                key={`accent-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className={`absolute ${
                  currentSlideData.accentPosition === "top-right"
                    ? "top-4 right-4"
                    : currentSlideData.accentPosition === "top-left"
                    ? "top-4 left-4"
                    : currentSlideData.accentPosition === "bottom-left"
                    ? "bottom-4 left-4"
                    : "bottom-4 right-4"
                } bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg`}
              >
                <Text size="sm" className="font-semibold text-gray-800">
                  {currentSlideData.accent}
                </Text>
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 z-10"
            >
              <ChevronRight className="w-6 h-6" />
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
              className="absolute -top-8 -left-8 w-16 h-16 bg-primary/20 rounded-full blur-xl"
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
              className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary/30 rounded-full blur-lg"
            />
          </div>
        </div>
      </Wrapper>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
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
