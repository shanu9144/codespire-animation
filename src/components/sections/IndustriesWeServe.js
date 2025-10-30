'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
 
import { 
  Factory, 
  Cpu, 
  Building2, 
  Shield, 
  Heart,
  Zap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle
} from 'lucide-react';

const industries = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Automate RFQs, predict demand, improve supplier quality.',
    icon: Factory,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1060/400/300',
    imageResolution: '400x300',
    imageSizeName: 'small',
    features: ['RFQ Process Optimization', 'Supplier Match Intelligence', 'Predictive Forecasting']
  },
  {
    id: 'defense',
    title: 'Public Sector & Defense',
    description: 'Secure operations using compliant and adaptive AI systems.',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1063/400/300',
    imageResolution: '400x300',
    imageSizeName: 'small',
    features: ['Strategic Intelligence', 'Compliance Automation', 'Secure AI Infrastructure']
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Life Sciences',
    description: 'Accelerate diagnosis, discovery, and personalized patient care.',
    icon: Heart,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1064/400/300',
    imageResolution: '400x300',
    imageSizeName: 'small',
    features: ['Patient Insights', 'Predictive Analytics', 'Drug Discovery']
  },
  {
    id: 'bfsi',
    title: 'BFSI',
    description: 'Enhance decisions with AI for risk and fraud.',
    icon: Building2,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1070/400/300',
    imageResolution: '400x300',
    imageSizeName: 'small',
    features: ['Risk Intelligence', 'Fraud Detection', 'Customer Insights']
  },
  {
    id: 'hitech',
    title: 'Hi-Tech',
    description: 'Drive innovation with AI and smarter digital ecosystems.',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1061/400/300',
    imageResolution: '400x300',
    imageSizeName: 'small',
    features: ['Digital Acceleration', 'AI Integration', 'System Optimization']
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
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

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.3
    }
  }
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const IndustryCard = ({ industry }) => {
  const Icon = industry.icon;
  
  return (
    <motion.div
      variants={cardVariants}
      className="relative group h-full"
    >
      {/* Card */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-200/50 hover:border-gray-300/50 h-full transition-all duration-300 flex flex-col group-hover:bg-white/90"
        whileHover={{ 
          y: -8,
          scale: 1.02,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Image Container with Overlay */}
        <div className="relative w-full h-48 overflow-hidden">
          <motion.img
            src={industry.image}
            alt={industry.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          
          {/* Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          
          {/* Blue Accent Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>

        {/* Content - Perfectly Structured */}
        <div className="flex-1 flex flex-col p-6 min-h-[280px] min-w-[320px]">
          {/* Icon */}
          <motion.div 
            variants={iconVariants} 
            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${industry.color} shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4`}
            whileHover={{ 
              scale: 1.1, 
              rotate: 5,
              transition: { duration: 0.2 }
            }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          
          {/* Title - Fixed Height */}
          <motion.h3 
            variants={textVariants} 
            className="text-xl font-bold text-gray-900 mb-3 leading-tight h-12 flex items-center"
          >
            {industry.title}
          </motion.h3>
          
          {/* Description - Fixed Height */}
          <motion.p 
            variants={textVariants} 
            className="text-gray-600 text-sm leading-relaxed mb-6 h-16 flex items-start"
          >
            {industry.description}
          </motion.p>

          {/* Feature List - Fixed at bottom with consistent spacing */}
          <motion.ul 
            className="space-y-3 mt-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {industry.features.map((feature, index) => (
              <motion.li 
                key={feature} 
                variants={listItemVariants}
                className="flex items-center text-sm text-gray-700 min-h-[20px]"
                whileHover={{ 
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-blue-500 mr-3 flex-shrink-0"
                  whileHover={{ 
                    scale: 1.2,
                    backgroundColor: "#3B82F6"
                  }}
                  transition={{ duration: 0.2 }}
                />
                <span className="flex-1 leading-relaxed">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Modern geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-60"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-full opacity-50"
        animate={{
          y: [0, -15, 0],
          x: [0, -8, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-40"
        animate={{
          rotate: [0, 90, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-6 h-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full opacity-40"
        animate={{
          y: [0, -12, 0],
          x: [0, 6, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />
    </div>
  );
};

const ModernBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30"
          style={{
            left: `${20 + i * 8}%`,
            top: `${30 + i * 5}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
      
      {/* Large Background Blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

export default function IndustriesWeServe() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered && isInView) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          return nextIndex >= industries.length - 2 ? 0 : nextIndex;
        });
      }, 4000); // Auto-advance every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered, isInView]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      // If we're at the end, loop back to start
      return nextIndex >= industries.length - 2 ? 0 : nextIndex;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      // If we're at the start, loop to end
      return prevIndex < 0 ? industries.length - 3 : prevIndex;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Show all cards but only animate the visible ones
  const getCardAnimation = (index) => {
    const cardIndex = index - currentIndex;
    if (cardIndex < 0 || cardIndex >= 3) {
      return { opacity: 0, x: cardIndex < 0 ? -100 : 100, scale: 0.9 };
    }
    return { opacity: 1, x: 0, scale: 1 };
  };

  return (
    <section ref={ref} className="relative py-24 px-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      <ModernBackground />
      <FloatingElements />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 rounded-full text-sm font-medium mb-6 border border-blue-200/50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-blue-600 font-bold text-lg">Industries We Serve</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Tailored AI Solutions for {" "}
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Every Industry
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From manufacturing to healthcare, we deliver AI solutions tailored to your industry's 
            unique challenges and regulatory requirements.
          </p>
        </motion.div>

        {/* Industries Container with Navigation */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 group focus:outline-none focus:ring-0 focus:border-gray-200/50 active:outline-none"
            style={{ outline: 'none', boxShadow: 'none' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl border border-gray-200/50 hover:border-gray-300/50 transition-all duration-300 group focus:outline-none focus:ring-0 focus:border-gray-200/50 active:outline-none"
            style={{ outline: 'none', boxShadow: 'none' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <ArrowRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
          </motion.button>

          {/* Industries Grid - Showing only 3 cards with increased width */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch px-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {industries.map((industry, index) => {
              const animation = getCardAnimation(index);
              const isVisible = index >= currentIndex && index < currentIndex + 3;
              
              return (
                <motion.div
                  key={industry.id}
                  animate={animation}
                  transition={{
                    duration: 0.6,
                    delay: isVisible ? (index - currentIndex) * 0.15 : 0,
                    ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoother transitions
                  }}
                  className={isVisible ? "block" : "hidden"}
                >
                  <IndustryCard
                    industry={industry}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}