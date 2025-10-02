"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import HeroWithLiquid from '../sections/HeroWithLiquid';
import WhyCodeSpire from '../sections/WhyCodeSpire';
import WhyCodeSpireWithLiquid from '../sections/WhyCodeSpireWithLiquid';

/**
 * DesignComparison Component
 * 
 * Interactive comparison between original and enhanced designs
 */

const DesignComparison = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [showEnhanced, setShowEnhanced] = useState(false);

  const sections = {
    hero: {
      title: 'Hero Section',
      original: Hero,
      enhanced: HeroWithLiquid
    },
    why: {
      title: 'Why CodeSpire',
      original: WhyCodeSpire,
      enhanced: WhyCodeSpireWithLiquid
    }
  };

  const CurrentOriginal = sections[activeTab].original;
  const CurrentEnhanced = sections[activeTab].enhanced;

  return (
    <div className="design-comparison">
      {/* Controls */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Section Tabs */}
          <div className="flex space-x-4">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium ${!showEnhanced ? 'text-primary' : 'text-gray-500'}`}>
              Original
            </span>
            <button
              onClick={() => setShowEnhanced(!showEnhanced)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                showEnhanced ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <motion.span
                className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200"
                animate={{ x: showEnhanced ? 24 : 4 }}
              />
            </button>
            <span className={`text-sm font-medium ${showEnhanced ? 'text-primary' : 'text-gray-500'}`}>
              Enhanced
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Display */}
      <div className="relative">
        {/* Original Design */}
        <motion.div
          className="w-full"
          animate={{ 
            opacity: showEnhanced ? 0 : 1,
            scale: showEnhanced ? 0.95 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ 
            position: showEnhanced ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            zIndex: showEnhanced ? 1 : 2
          }}
        >
          <CurrentOriginal />
        </motion.div>

        {/* Enhanced Design */}
        <motion.div
          className="w-full"
          animate={{ 
            opacity: showEnhanced ? 1 : 0,
            scale: showEnhanced ? 1 : 0.95
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ 
            position: showEnhanced ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            zIndex: showEnhanced ? 2 : 1
          }}
        >
          <CurrentEnhanced />
        </motion.div>
      </div>

      {/* Info Panel */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {showEnhanced ? 'Enhanced Design Features' : 'Original Design'}
            </h3>
            
            {showEnhanced ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary">🌊</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Liquid Animations</h4>
                  <p className="text-sm text-gray-600">
                    Advanced WebGL shaders create organic, flowing backgrounds
                  </p>
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary">⚡</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Performance Optimized</h4>
                  <p className="text-sm text-gray-600">
                    Automatic quality scaling maintains smooth 60fps performance
                  </p>
                </div>
                
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary">🎨</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Brand Consistent</h4>
                  <p className="text-sm text-gray-600">
                    Maintains your existing color palette and professional look
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-lg text-gray-600">
                Your current professional design with clean typography, 
                consistent branding, and excellent user experience.
              </p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .design-comparison {
          position: relative;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default DesignComparison;