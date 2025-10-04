'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Triangle, 
  Circle, 
  Leaf, 
  Minus,
  Factory,
  Cpu,
  Building2,
  Shield,
  Heart,
  Zap,
  Users,
  TrendingUp,
  Award,
  Code2,
  Rocket,
  Sparkles
} from 'lucide-react';

const InfiniteIconCarousel = () => {
  // Icon data with various shapes and colors
  const icons = [
    { Icon: Target, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { Icon: Triangle, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { Icon: Circle, color: 'text-green-600', bgColor: 'bg-green-100' },
    { Icon: Leaf, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    { Icon: Minus, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { Icon: Factory, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
    { Icon: Cpu, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
    { Icon: Building2, color: 'text-pink-600', bgColor: 'bg-pink-100' },
    { Icon: Shield, color: 'text-red-600', bgColor: 'bg-red-100' },
    { Icon: Heart, color: 'text-rose-600', bgColor: 'bg-rose-100' },
    { Icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { Icon: Users, color: 'text-teal-600', bgColor: 'bg-teal-100' },
    { Icon: TrendingUp, color: 'text-lime-600', bgColor: 'bg-lime-100' },
    { Icon: Award, color: 'text-amber-600', bgColor: 'bg-amber-100' },
    { Icon: Code2, color: 'text-violet-600', bgColor: 'bg-violet-100' },
    { Icon: Rocket, color: 'text-sky-600', bgColor: 'bg-sky-100' },
    { Icon: Sparkles, color: 'text-fuchsia-600', bgColor: 'bg-fuchsia-100' }
  ];

  // Duplicate the icons array to create seamless loop
  const duplicatedIcons = [...icons, ...icons];

  return (
    <div className="relative w-full overflow-hidden bg-gray-50 py-8">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />
      
      {/* Infinite scrolling container */}
      <motion.div
        className="flex items-center space-x-6"
        animate={{
          x: [0, -100 * icons.length], // Move by the width of one set of icons
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20, // 20 seconds for one complete cycle
            ease: "linear",
          },
        }}
        style={{
          width: `${duplicatedIcons.length * 120}px`, // Total width for all icons
        }}
      >
        {duplicatedIcons.map((iconData, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-20 h-20 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center group hover:shadow-md transition-all duration-300"
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <div className={`w-12 h-12 ${iconData.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <iconData.Icon className={`w-6 h-6 ${iconData.color} group-hover:rotate-12 transition-transform duration-300`} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteIconCarousel;
