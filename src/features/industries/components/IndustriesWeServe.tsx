'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
 
import { 
  Factory, 
  Cpu, 
  Building2, 
  Shield, 
  Heart,
  Zap
} from 'lucide-react';

interface Industry {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  image: string;
  features: string[];
}

const industries: Industry[] = [
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
    id: 'defense',
    title: 'Public Sector & Defense',
    description: 'Secure operations using compliant and adaptive AI systems.',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1063/400/300',
    features: ['Strategic Intelligence', 'Compliance Automation', 'Secure AI Infrastructure']
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Life Sciences',
    description: 'Accelerate diagnosis, discovery, and personalized patient care.',
    icon: Heart,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1064/400/300',
    features: ['Patient Insights', 'Predictive Analytics', 'Drug Discovery']
  },
  {
    id: 'bfsi',
    title: 'BFSI',
    description: 'Enhance decisions with AI for risk and fraud.',
    icon: Building2,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1070/400/300',
    features: ['Risk Intelligence', 'Fraud Detection', 'Customer Insights']
  },
  {
    id: 'hitech',
    title: 'Hi-Tech',
    description: 'Drive innovation with AI and smarter digital ecosystems.',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-500',
    image: 'https://picsum.photos/id/1061/400/300',
    features: ['Digital Acceleration', 'AI Integration', 'System Optimization']
  },
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
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
  }
};

interface IndustryCardProps {
  industry: Industry;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ industry }) => {
  const Icon = industry.icon;
  
  return (
    <motion.div
      variants={cardVariants}
      className="relative group h-full"
    >
      {/* Card */}
      <motion.div
        className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden border border-gray-100 h-full transition-all duration-300 flex flex-col min-h-[480px]"
        whileHover={{ 
          y: -4,
          scale: 1.02,
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Fixed-height Image */}
        <div className="w-full h-40 overflow-hidden">
          <motion.img
            src={industry.image}
            alt={industry.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col gap-2">
          <motion.div variants={iconVariants} className={`inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r ${industry.color}`}>
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <motion.h3 variants={textVariants} className="text-lg font-semibold text-gray-900">{industry.title}</motion.h3>
          <motion.p variants={textVariants} className="text-gray-600 text-sm leading-relaxed">{industry.description}</motion.p>
        </div>

        {/* Bullet list */}
        <ul className="p-4 pt-0 space-y-1.5 mt-auto">
          {industry.features.map((feature) => (
            <li key={feature} className="flex items-center text-sm text-blue-600">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-3"></span>
              {feature}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

const FloatingElements: React.FC = () => {
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

const ParticleField: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use fixed positions for SSR, random for client
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: isClient ? Math.random() * 100 : (i * 12.5), // Fixed positions for SSR
    y: isClient ? Math.random() * 100 : (i * 10 + 20), // Fixed positions for SSR
    size: isClient ? Math.random() * 3 + 1 : 2, // Fixed size for SSR
    duration: isClient ? Math.random() * 8 + 6 : 7, // Fixed duration for SSR
    delay: isClient ? Math.random() * 3 : i * 0.3, // Fixed delay for SSR
  }));

  if (!isClient) {
    return null; // Don't render particles during SSR
  }

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

const IndustriesWeServe: React.FC = () => {
  return (
    <section className="relative pt-16 pb-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      <FloatingElements />
      <ParticleField />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
          {industries.map((industry) => (
            <IndustryCard
              key={industry.id}
              industry={industry}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default IndustriesWeServe;
