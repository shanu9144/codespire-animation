"use client";

import React from 'react';
import DesignComparison from '../../components/demo/DesignComparison';

/**
 * Design Comparison Page
 * 
 * Interactive comparison between original and enhanced CodeSpire designs
 */

export default function DesignComparisonPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Design Enhancement Comparison
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how advanced liquid shader effects enhance your existing CodeSpire design 
            while maintaining the professional aesthetic and brand consistency you love.
          </p>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg inline-block">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Use the toggle above each section to switch between original and enhanced versions
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Comparison */}
      <DesignComparison />

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Enhance Your Design?
              </h2>
              <p className="text-lg text-gray-600">
                Modern web experiences that set you apart from the competition
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Benefits List */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                  Enhanced User Experience
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Increased Engagement</h4>
                      <p className="text-gray-600">
                        Subtle animations and interactive elements keep visitors engaged longer
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Modern Appeal</h4>
                      <p className="text-gray-600">
                        Cutting-edge visual effects demonstrate your commitment to innovation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Brand Differentiation</h4>
                      <p className="text-gray-600">
                        Stand out from competitors with unique, memorable visual experiences
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Performance Optimized</h4>
                      <p className="text-gray-600">
                        Smart performance scaling ensures great experience on all devices
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                  Technical Excellence
                </h3>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">WebGL Shaders</h4>
                      <p className="text-sm text-gray-600">
                        GPU-accelerated rendering for smooth 60fps animations
                      </p>
                    </div>

                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Noise Algorithms</h4>
                      <p className="text-sm text-gray-600">
                        Advanced Simplex noise and Fractal Brownian Motion for organic patterns
                      </p>
                    </div>

                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Performance Monitoring</h4>
                      <p className="text-sm text-gray-600">
                        Real-time FPS tracking with automatic quality adjustment
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Accessibility</h4>
                      <p className="text-sm text-gray-600">
                        Respects user preferences for reduced motion and provides fallbacks
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Browser Support</h4>
                  <p className="text-sm text-blue-800">
                    Works on all modern browsers with graceful fallbacks for older devices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Enhance Your Design?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Transform your website with advanced liquid animations while maintaining 
              your professional brand identity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-hover transition-colors duration-200 font-medium">
                Get Started
              </button>
              <button className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}