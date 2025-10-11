'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnimationTest = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
      <h3 className="font-bold text-sm mb-2">Animation Status</h3>
      
      {/* Test Basic Motion */}
      <div className="mb-2">
        <span className="text-xs">Basic Motion: </span>
        <motion.div
          className="inline-block w-4 h-4 bg-green-500 rounded-full ml-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Test Framer Motion */}
      <div className="mb-2">
        <span className="text-xs">Framer Motion: </span>
        <motion.div
          className="inline-block w-4 h-4 bg-blue-500 rounded-full ml-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Test CSS Animations */}
      <div className="mb-2">
        <span className="text-xs">CSS Animation: </span>
        <div className="inline-block w-4 h-4 bg-purple-500 rounded-full ml-2 animate-pulse" />
      </div>

      {/* Test SVG Animations */}
      <div className="mb-2">
        <span className="text-xs">SVG Animation: </span>
        <motion.svg
          className="inline-block w-4 h-4 ml-2"
          viewBox="0 0 24 24"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="12" cy="12" r="10" fill="none" stroke="orange" strokeWidth="2" />
          <path d="M12 2v10l4 4" stroke="orange" strokeWidth="2" fill="none" />
        </motion.svg>
      </div>

      {/* Test Transform Animations */}
      <div className="mb-2">
        <span className="text-xs">Transform: </span>
        <motion.div
          className="inline-block w-4 h-4 bg-red-500 ml-2"
          animate={{
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Test Geometry Animations */}
      <div className="mb-2">
        <span className="text-xs">Geometry: </span>
        <motion.div
          className="inline-block ml-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <svg width="16" height="16" viewBox="0 0 100 100">
            <polygon 
              points="50,5 85,25 85,75 50,95 15,75 15,25" 
              fill="rgba(34, 197, 94, 0.6)" 
              stroke="rgba(34, 197, 94, 1)" 
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>

      {/* Performance Check */}
      <div className="text-xs text-gray-500 mt-2">
        {typeof window !== 'undefined' && window.requestAnimationFrame ? 
          '✅ RAF Available' : '❌ RAF Missing'}
      </div>
    </div>
  );
};

export default AnimationTest;