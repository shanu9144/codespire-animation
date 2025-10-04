'use client';

import React from 'react';
import { 
  Code2, 
  Database, 
  Cloud, 
  Cpu, 
  Zap, 
  Shield, 
  GitBranch, 
  Layers,
  Bot,
  Brain,
  Network,
  Server,
  Terminal,
  FileCode,
  Settings,
  Workflow
} from 'lucide-react';
import InfiniteCarousel from '../ui/InfiniteCarousel';

const TechnologyStackCarousel = () => {
  const technologies = [
    {
      icon: Code2,
      name: 'React',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Database,
      name: 'Node.js',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Cloud,
      name: 'AWS',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: Cpu,
      name: 'Python',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Zap,
      name: 'TensorFlow',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Shield,
      name: 'Docker',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100'
    },
    {
      icon: GitBranch,
      name: 'Git',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Layers,
      name: 'Kubernetes',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      icon: Bot,
      name: 'AI/ML',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      icon: Brain,
      name: 'Neural Networks',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      icon: Network,
      name: 'Microservices',
      color: 'text-violet-600',
      bgColor: 'bg-violet-100'
    },
    {
      icon: Server,
      name: 'DevOps',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      icon: Terminal,
      name: 'Linux',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    },
    {
      icon: FileCode,
      name: 'TypeScript',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Settings,
      name: 'CI/CD',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      icon: Workflow,
      name: 'Automation',
      color: 'text-rose-600',
      bgColor: 'bg-rose-100'
    }
  ];

  const carouselItems = technologies.map((tech, index) => {
    const Icon = tech.icon;
    return (
      <div
        key={index}
        className="w-24 h-24 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col items-center justify-center group hover:shadow-lg transition-all duration-300"
      >
        <div className={`w-14 h-14 ${tech.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-2`}>
          <Icon className={`w-7 h-7 ${tech.color} group-hover:rotate-12 transition-transform duration-300`} />
        </div>
        <span className="text-xs font-medium text-gray-700 text-center px-1">{tech.name}</span>
      </div>
    );
  });

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Technology Stack
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Cutting-edge technologies powering our AI solutions
        </p>
      </div>
      
      <InfiniteCarousel
        items={carouselItems}
        speed={20}
        direction="left"
        pauseOnHover={true}
        className="bg-gradient-to-r from-blue-50 to-purple-50"
      />
    </section>
  );
};

export default TechnologyStackCarousel;

