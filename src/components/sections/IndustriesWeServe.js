'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Factory, 
  Cpu, 
  Building2, 
  Shield, 
  Heart,
  Zap
} from 'lucide-react';

const industries = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Automate RFQs, predict demand, improve supplier quality.',
    icon: Factory,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1060/400/300',
    features: ['RFQ Process Optimization', 'Supplier Match Intelligence', 'Predictive Forecasting']
  },
  {
    id: 'hitech',
    title: 'Hi-Tech',
    description: 'Drive innovation with AI and smarter digital ecosystems.',
    icon: Cpu,
    color: 'from-purple-500 to-pink-500',
    image: 'https://picsum.photos/id/1061/400/300',
    features: ['Digital Acceleration', 'AI Integration', 'System Optimization']
  },
  {
    id: 'bfsi',
    title: 'BFSI',
    description: 'Enhance decisions with AI for risk and fraud.',
    icon: Building2,
    color: 'from-green-500 to-emerald-500',
    image: 'https://picsum.photos/id/1070/400/300',
    features: ['Risk Intelligence', 'Fraud Detection', 'Customer Insights']
  },
  {
    id: 'defense',
    title: 'Public Sector & Defense',
    description: 'Secure operations using compliant and adaptive AI systems.',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    image: 'https://picsum.photos/id/1063/400/300',
    features: ['Strategic Intelligence', 'Compliance Automation', 'Secure AI Infrastructure']
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Life Sciences',
    description: 'Accelerate diagnosis, discovery, and personalized patient care.',
    icon: Heart,
    color: 'from-teal-500 to-blue-500',
    image: 'https://picsum.photos/id/1064/400/300',
    features: ['Patient Insights', 'Predictive Analytics', 'Drug Discovery']
  }
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

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
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 0.5
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

const IndustryCard = ({ industry, index, isHovered, onHover, onLeave }) => {
  const Icon = industry.icon;
  
  return (
    <motion.div
      variants={cardVariants}
      className="relative group h-full"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Card */}
      <motion.div
        className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden border border-gray-100 h-full transition-all duration-300 flex flex-col min-h-[620px]"
        whileHover={{ 
          y: -4,
          scale: 1.02,
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Header with Icon */}
        <div className="relative p-6 pb-4 min-h-[280px] flex flex-col">
          <motion.div
            variants={iconVariants}
            className={`inline-flex h-12 w-12 items-center justify-center p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 mb-4 shadow-sm`}
            whileHover={{ 
              scale: 1.05, 
              rotate: 2,
              boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          
          <motion.h3 
            variants={textVariants}
            className="text-xl font-semibold text-gray-900 mb-3 min-h-[28px] flex items-center"
          >
            {industry.title}
          </motion.h3>
          {index < 3 && (
            <div className="h-5" aria-hidden="true" />
          )}
          {index < 3 && (
            <div className="h-5" aria-hidden="true" />
          )}
          
          <motion.p 
            variants={textVariants}
            className="text-gray-600 text-sm leading-relaxed min-h-20"
          >
            {industry.description}
          </motion.p>
        </div>

        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={industry.image}
            alt={industry.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Features */}
        <div className="p-6 pt-4 mt-auto">
          <motion.div
            variants={textVariants}
            className="space-y-3"
          >
            {industry.features.map((feature, idx) => (
              <motion.div
                key={feature}
                className="flex items-center text-sm text-blue-600"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
              >
                <motion.div 
                  className={`w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mr-3`}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                {feature}
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Simple floating circles */}
      <motion.div
        className="absolute top-20 left-10 w-16 h-16 bg-blue-100 rounded-full opacity-40"
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-12 h-12 bg-purple-100 rounded-full opacity-30"
        animate={{
          y: [0, -10, 0],
          x: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-1/4 w-10 h-10 bg-green-100 rounded-lg opacity-30"
        animate={{
          rotate: [0, 90, 0],
          y: [0, -8, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-8 h-8 bg-orange-100 rounded-full opacity-25"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-6 h-6 bg-purple-100 rounded-full opacity-30"
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
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

const ParticleField = () => {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-blue-200 rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function IndustriesWeServe() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative pt-16 pb-12 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      <FloatingElements />
      <ParticleField />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Zap className="w-6 h-6 mr-2 text-blue-600" />
            <span className="text-blue-600 font-bold text-lg">Industries We Serve</span>
            
          </motion.div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tailored AI Solutions for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Every Industry
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From manufacturing to healthcare, we deliver AI solutions tailored to your industry&apos;s 
            unique challenges and regulatory requirements.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
              index={index}
              isHovered={hoveredCard}
              onHover={setHoveredCard}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </motion.div>

        {/* Stats Section removed as per requirement */}
      </div>
    </section>
  );
}