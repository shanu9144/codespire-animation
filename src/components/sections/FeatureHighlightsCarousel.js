'use client';

import React from 'react';
import { 
  Zap, 
  Shield, 
  Rocket, 
  Brain, 
  Lock, 
  TrendingUp, 
  Users, 
  Globe,
  Award,
  Target,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import InfiniteCarousel from '../ui/InfiniteCarousel';

const FeatureHighlightsCarousel = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time AI processing',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Rocket,
      title: 'Scalable Solutions',
      description: 'Grows with your business',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Brain,
      title: 'Advanced AI',
      description: 'Machine learning powered',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Lock,
      title: 'Data Privacy',
      description: 'GDPR compliant',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: TrendingUp,
      title: 'Performance',
      description: '99.9% uptime',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      title: 'Team Support',
      description: 'Dedicated experts',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Worldwide deployment',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Industry certified',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Accurate results',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Cutting-edge tech',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: CheckCircle,
      title: 'Reliable',
      description: 'Proven solutions',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  const carouselItems = features.map((feature, index) => {
    const Icon = feature.icon;
    return (
      <div
        key={index}
        className="w-48 h-32 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col items-center justify-center p-4 group hover:shadow-lg transition-all duration-300"
      >
        <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-3`}>
          <Icon className={`w-6 h-6 ${feature.color} group-hover:rotate-12 transition-transform duration-300`} />
        </div>
        <h3 className="text-sm font-semibold text-gray-800 text-center mb-1">{feature.title}</h3>
        <p className="text-xs text-gray-600 text-center">{feature.description}</p>
      </div>
    );
  });

  return (
    <section className="py-16">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          Why Choose CodeSpire?
        </h2>
        <p className="text-lg font-bold text-gray-700 max-w-2xl mx-auto">
          Our trusted partner <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"> in AI journey</span>
        </p>
      </div>
      
      <InfiniteCarousel
        items={carouselItems}
        speed={30}
        direction="left"
        pauseOnHover={false}
        className="bg-gradient-to-r from-purple-50 to-pink-50"
        itemClassName="w-48 h-32"
      />
    </section>
  );
};

export default FeatureHighlightsCarousel;

