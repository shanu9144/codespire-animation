'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Factory, 
  Cpu, 
  Building2, 
  Shield, 
  Heart,
  ArrowRight,
  Zap,
  TrendingUp,
  Users
} from 'lucide-react';

const industries = [
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    description: 'Smart automation and AI-driven optimization for modern manufacturing processes',
    icon: Factory,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1060/400/300',
    features: ['Process Automation', 'Quality Control', 'Predictive Maintenance']
  },
  {
    id: 'hitech',
    title: 'Hi-Tech',
    description: 'Cutting-edge AI solutions for technology companies and digital transformation',
    icon: Cpu,
    color: 'from-purple-500 to-pink-500',
    image: 'https://picsum.photos/id/1061/400/300',
    features: ['Digital Innovation', 'AI Integration', 'Tech Optimization']
  },
  {
    id: 'bfsi',
    title: 'BFSI',
    description: 'Banking, Financial Services & Insurance solutions with AI-powered insights',
    icon: Building2,
    color: 'from-green-500 to-emerald-500',
    image: 'https://picsum.photos/id/1070/400/300',
    features: ['Risk Management', 'Fraud Detection', 'Customer Analytics']
  },
  {
    id: 'defense',
    title: 'Public Sector & Defense',
    description: 'Secure, compliant AI systems for government and defense applications',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    image: 'https://picsum.photos/id/1063/400/300',
    features: ['Security Systems', 'Compliance', 'Strategic Intelligence']
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Life Sciences',
    description: 'AI-powered healthcare solutions improving patient outcomes and operational efficiency',
    icon: Heart,
    color: 'from-teal-500 to-blue-500',
    image: 'https://picsum.photos/id/1064/400/300',
    features: ['Patient Care', 'Medical Analytics', 'Drug Discovery']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

const IndustryCard = ({ industry, index, isHovered, onHover, onLeave }) => {
  const Icon = industry.icon;
  
  return (
    <motion.div
      variants={cardVariants}
      className="relative group"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Connecting Line Animation */}
      {index < industries.length - 1 && (
        <motion.div
          className="absolute top-1/2 -right-8 w-16 h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-10 hidden lg:block"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ 
            scaleX: isHovered === index ? 1 : 0.3, 
            opacity: isHovered === index ? 1 : 0.5 
          }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left' }}
        >
          <motion.div
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            animate={{ 
              x: isHovered === index ? 0 : -10,
              opacity: isHovered === index ? 1 : 0
            }}
          >
            <ArrowRight className="w-3 h-3 text-gray-400" />
          </motion.div>
        </motion.div>
      )}
      
      {/* Card */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full"
        whileHover={{ 
          y: -8,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header with Icon */}
        <div className="relative p-6 pb-4">
          <motion.div
            className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${industry.color} mb-4`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {industry.title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {industry.description}
          </p>
        </div>

        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
          <motion.img
            src={industry.image}
            alt={industry.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Features */}
        <div className="p-6 pt-4">
          <motion.div
            className="space-y-2"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {industry.features.map((feature, idx) => (
              <motion.div
                key={feature}
                className="flex items-center text-sm text-gray-600"
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${industry.color} mr-3`} />
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Geometric Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Hexagon */}
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 opacity-30"
        animate={{
          rotate: [0, 360],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon 
            points="50,5 85,25 85,75 50,95 15,75 15,25" 
            fill="rgba(147, 51, 234, 0.2)" 
            stroke="rgba(147, 51, 234, 0.4)" 
            strokeWidth="2"
          />
        </svg>
      </motion.div>
      
      {/* Triangle */}
      <motion.div
        className="absolute bottom-32 left-1/4 w-12 h-12 opacity-25"
        animate={{
          rotate: [0, 120, 240, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon 
            points="50,10 90,80 10,80" 
            fill="rgba(34, 197, 94, 0.2)" 
            stroke="rgba(34, 197, 94, 0.4)" 
            strokeWidth="2"
          />
        </svg>
      </motion.div>
      
      {/* Square */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-14 h-14 opacity-20"
        animate={{
          rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
          x: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-red-400 to-orange-400 rounded-lg border-2 border-red-300" />
      </motion.div>
      
      {/* Diamond */}
      <motion.div
        className="absolute bottom-20 right-10 w-10 h-10 opacity-30"
        animate={{
          rotate: [0, 180, 360],
          y: [0, -20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 transform rotate-45 border-2 border-cyan-300" />
      </motion.div>
      
      {/* Animated Lines */}
      <motion.svg
        className="absolute top-0 left-0 w-full h-full opacity-10"
        viewBox="0 0 1000 1000"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <motion.path
          d="M100,200 Q300,100 500,200 T900,200"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          animate={{
            pathLength: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M200,800 Q400,700 600,800 T1000,800"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          animate={{
            pathLength: [0, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="50%" stopColor="rgba(147, 51, 234, 0.5)" />
            <stop offset="100%" stopColor="rgba(236, 72, 153, 0.5)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.5)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.5)" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

const ParticleField = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
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
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      <FloatingElements />
      <ParticleField />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4 mr-2" />
            Industries We Serve
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Tailored AI Solutions for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Every Industry
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From manufacturing to healthcare, we deliver AI solutions tailored to your industry&apos;s 
            unique challenges and regulatory requirements.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
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

        {/* Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { icon: TrendingUp, value: '500+', label: 'Projects Delivered' },
            { icon: Users, value: '50+', label: 'Industry Experts' },
            { icon: Zap, value: '99%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}