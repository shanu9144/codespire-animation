'use client';

import React from 'react';



// Professional stat item component
const ProfessionalStatItem = ({ number, suffix, label }) => {
  return (
    <div className="text-center">
      <div className="text-4xl lg:text-5xl font-semibold text-gray-800 mb-2">
        {number}{suffix}
      </div>
      <div className="text-sm text-gray-600 font-medium">
        {label}
      </div>
    </div>
  );
};

const StatsBanner = () => {
  
  // Updated stats data to match reference
  const stats = [
    {
      number: 50,
      suffix: '+',
      label: 'Skilled Experts',
      delay: 0
    },
    {
      number: 7,
      suffix: '+',
      label: 'Satisfied Clients',
      delay: 1
    },
    {
      number: 5,
      suffix: '+',
      label: 'Global Industries',
      delay: 2
    },
    {
      number: 2.5,
      suffix: 'B',
      label: 'Revenue Generated',
      delay: 3
    }
  ];

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4">

        {/* Professional Stats Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 lg:p-12 shadow-lg border border-blue-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Description */}
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                From Idea to Enterprise-Grade AI in a Blink
              </h3>
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed font-medium">
                We build AI-powered products and scalable platforms for businesses who want tomorrow&apos;s innovation today.
              </p>
            </div>

            {/* Right side - Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => (
                <ProfessionalStatItem
                  key={index}
                  number={stat.number}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;