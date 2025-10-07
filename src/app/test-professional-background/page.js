'use client';

import React, { useState } from 'react';
import { ProfessionalB2BBackground } from '../../components/backgrounds';

const TestProfessionalBackground = () => {
  const [intensity, setIntensity] = useState('medium');
  const [enableAnimation, setEnableAnimation] = useState(true);

  const intensityOptions = [
    { value: 'subtle', label: 'Subtle', description: 'Minimal visual elements for maximum readability' },
    { value: 'medium', label: 'Medium', description: 'Balanced design for professional presentation' },
    { value: 'prominent', label: 'Prominent', description: 'More visible elements for dynamic feel' }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Professional B2B Background */}
      <ProfessionalB2BBackground 
        intensity={intensity}
        enableAnimation={enableAnimation}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100/50">
          <div className="wrapper py-6">
            <div className="flex-between">
              <div>
                <h1 className="text-h1 text-gray-900">Professional B2B Background</h1>
                <p className="text-body-lg text-gray-600 mt-2">
                  Sophisticated canvas for enterprise-grade AI websites
                </p>
              </div>
              
              {/* Controls */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">Intensity:</label>
                  <select 
                    value={intensity} 
                    onChange={(e) => setIntensity(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white/90 backdrop-blur-sm"
                  >
                    {intensityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">Animation:</label>
                  <button
                    onClick={() => setEnableAnimation(!enableAnimation)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      enableAnimation 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {enableAnimation ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="wrapper py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-hero text-gray-900 mb-6">
              Enterprise-Grade AI Solutions
            </h2>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Transform your business with cutting-edge artificial intelligence. 
              Our sophisticated platform delivers enterprise-grade AI solutions 
              that drive innovation and growth.
            </p>
            <div className="flex-center gap-4">
              <button className="btn btn-primary px-8 py-4 text-lg">
                Get Started
              </button>
              <button className="btn btn-secondary px-8 py-4 text-lg">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid-3 mb-16">
            {[
              {
                title: "Advanced Analytics",
                description: "Leverage powerful AI-driven insights to make data-driven decisions and optimize your business processes.",
                icon: "📊"
              },
              {
                title: "Automated Workflows",
                description: "Streamline operations with intelligent automation that adapts to your business needs and scales efficiently.",
                icon: "⚡"
              },
              {
                title: "Enterprise Security",
                description: "Bank-grade security protocols ensure your data and operations remain protected at all times.",
                icon: "🔒"
              }
            ].map((feature, index) => (
              <div key={index} className="card card-spacing">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-h3 text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-body text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-blue-100/50">
            <div className="grid-4 text-center">
              {[
                { number: "500+", label: "Enterprise Clients" },
                { number: "99.9%", label: "Uptime Guarantee" },
                { number: "24/7", label: "Expert Support" },
                { number: "50+", label: "AI Models" }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Content for Readability */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-blue-100/50">
            <h3 className="text-h2 text-gray-900 mb-6">Readability Test</h3>
            <div className="space-y-4">
              <p className="text-body text-gray-700">
                This section demonstrates how text content remains fully readable over the professional background. 
                The subtle gradient and minimal visual elements ensure excellent contrast and legibility.
              </p>
              <p className="text-body text-gray-600">
                The background uses a sophisticated color palette of white, light blue, and blue tones that 
                create depth without overwhelming the content. Abstract wave patterns and circular shapes 
                add visual interest while maintaining the professional, enterprise-grade aesthetic.
              </p>
              <div className="bg-blue-50/80 p-4 rounded-lg border border-blue-200/50">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> The background automatically adapts to different intensity levels 
                  and can be toggled between static and animated modes for optimal performance and user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Intensity Descriptions */}
          <div className="mt-16">
            <h3 className="text-h2 text-gray-900 mb-8 text-center">Intensity Levels</h3>
            <div className="grid-3">
              {intensityOptions.map((option) => (
                <div key={option.value} className="card card-spacing">
                  <h4 className="text-h3 text-gray-900 mb-3">{option.label}</h4>
                  <p className="text-body text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestProfessionalBackground;
