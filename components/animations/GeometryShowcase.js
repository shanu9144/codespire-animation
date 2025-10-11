'use client';

import { motion } from 'framer-motion';

const GeometryShowcase = () => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 p-4 rounded-lg backdrop-blur-sm">
      <h3 className="text-white font-bold text-sm mb-4">Geometry Animations</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Rotating Hexagon */}
        <motion.div
          className="w-12 h-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,5 85,25 85,75 50,95 15,75 15,25" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="3"
            />
          </svg>
        </motion.div>

        {/* Pulsing Circle */}
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-green-400"
          animate={{ 
            scale: [1, 1.3, 1],
            borderColor: ["#4ade80", "#06b6d4", "#8b5cf6", "#4ade80"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Morphing Square to Circle */}
        <motion.div
          className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500"
          animate={{ 
            borderRadius: ["0%", "50%", "0%"],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Triangle Rotation */}
        <motion.div
          className="w-12 h-12"
          animate={{ rotate: [0, 120, 240, 360] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,10 90,80 10,80" 
              fill="rgba(239, 68, 68, 0.7)" 
              stroke="#ef4444" 
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        {/* Diamond Pulse */}
        <motion.div
          className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 transform rotate-45"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [45, 225, 45]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* Star Animation */}
        <motion.div
          className="w-12 h-12"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon 
              points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" 
              fill="#fbbf24" 
              stroke="#f59e0b" 
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>

      {/* Complex Path Animation */}
      <div className="mt-4">
        <motion.svg
          className="w-full h-8"
          viewBox="0 0 200 40"
        >
          <motion.path
            d="M10,20 Q50,5 100,20 T190,20"
            stroke="#8b5cf6"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.svg>
      </div>

      {/* Status Indicator */}
      <div className="mt-2 text-xs text-green-400">
        ✅ All geometry animations loaded
      </div>
    </div>
  );
};

export default GeometryShowcase;