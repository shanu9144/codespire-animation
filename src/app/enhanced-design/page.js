"use client";

import React from 'react';
import HeroWithLiquid from '../../components/sections/HeroWithLiquid';
import StatsBanner from '../../components/sections/StatsBanner';
import WhyCodeSpireWithLiquid from '../../components/sections/WhyCodeSpireWithLiquid';
import IndustriesGrid from '../../components/sections/IndustriesGrid';
import CodeSpireLiquidBackground from '../../components/backgrounds/CodeSpireLiquidBackground';

/**
 * Enhanced Design Page
 * 
 * Showcases the existing CodeSpire design enhanced with advanced liquid shader effects
 * while maintaining the original color theme and professional aesthetic
 */

export default function EnhancedDesignPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section with Liquid Background */}
      <HeroWithLiquid />
      
      {/* Stats Banner with Subtle Liquid Accent */}
      <CodeSpireLiquidBackground
        variant="subtle"
        intensity="low"
        enableMouseInteraction={false}
      >
        <StatsBanner />
      </CodeSpireLiquidBackground>
      
      {/* Enhanced Why CodeSpire Section */}
      <WhyCodeSpireWithLiquid />
      
      {/* Industries Grid with Accent Background */}
      <CodeSpireLiquidBackground
        variant="accent"
        intensity="low"
        enableMouseInteraction={true}
        className="py-16"
      >
        <IndustriesGrid />
      </CodeSpireLiquidBackground>

      {/* Additional showcase section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Enhanced with Advanced Liquid Animations
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Experience the same professional CodeSpire design you know and trust, 
              now enhanced with subtle, performance-optimized liquid shader effects 
              that add depth and interactivity while maintaining your brand identity.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-primary text-xl">🎨</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Brand Consistent</h3>
                <p className="text-gray-600 text-sm">
                  Maintains your existing color palette and professional aesthetic
                </p>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-primary text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Optimized</h3>
                <p className="text-gray-600 text-sm">
                  Automatic quality scaling ensures smooth performance on all devices
                </p>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-primary text-xl">🖱️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive</h3>
                <p className="text-gray-600 text-sm">
                  Subtle mouse interactions add engagement without being distracting
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison section */}
      <CodeSpireLiquidBackground
        variant="section"
        intensity="medium"
        enableMouseInteraction={true}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                The Perfect Balance
              </h2>
              <p className="text-lg text-gray-600">
                Professional design meets cutting-edge technology
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  What You Get
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Same Professional Look:</strong>
                      <span className="text-gray-600 ml-1">Your existing color scheme and typography remain unchanged</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Enhanced Depth:</strong>
                      <span className="text-gray-600 ml-1">Subtle liquid animations add visual interest and modernity</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Smart Performance:</strong>
                      <span className="text-gray-600 ml-1">Automatic optimization ensures great performance everywhere</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Accessibility First:</strong>
                      <span className="text-gray-600 ml-1">Respects user preferences for reduced motion</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary text-2xl">🚀</span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      Ready to Upgrade?
                    </h4>
                    <p className="text-gray-600 mb-6">
                      Experience the enhanced design that maintains your brand while adding modern flair.
                    </p>
                    <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors duration-200">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CodeSpireLiquidBackground>
    </div>
  );
}