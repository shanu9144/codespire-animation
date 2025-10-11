'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Cpu, 
  Cloud, 
  Brain, 
  BarChart3, 
  Code, 
  Shield,
  Settings
} from 'lucide-react';

const ServicesSidebar = () => {
  const [activeItem, setActiveItem] = useState('Digital Engineering');
  const [expandedItems, setExpandedItems] = useState(new Set(['Digital Engineering']));
  
  const services = [
    {
      id: 'Digital Engineering',
      label: 'Digital Engineering',
      icon: Cpu,
      isActive: true,
      subItems: [
        'AI-Powered Design',
        'Simulation & Modeling',
        'Digital Twins',
        'IoT Integration'
      ]
    },
    {
      id: 'Cloud Solutions',
      label: 'Cloud Solutions',
      icon: Cloud,
      subItems: [
        'Cloud Migration',
        'Multi-Cloud Strategy',
        'DevOps & CI/CD',
        'Container Orchestration'
      ]
    },
    {
      id: 'AI & Machine Learning',
      label: 'AI & Machine Learning',
      icon: Brain,
      subItems: [
        'ML Model Development',
        'Deep Learning',
        'Computer Vision',
        'Natural Language Processing'
      ]
    },
    {
      id: 'Data Analytics',
      label: 'Data Analytics',
      icon: BarChart3,
      subItems: [
        'Data Engineering',
        'Business Intelligence',
        'Real-time Analytics',
        'Data Visualization'
      ]
    },
    {
      id: 'Application Development',
      label: 'Application Development',
      icon: Code,
      subItems: [
        'Web Applications',
        'Mobile Apps',
        'API Development',
        'Microservices'
      ]
    },
    {
      id: '24x7 QRE Support',
      label: '24x7 QRE Support',
      icon: Shield,
      subItems: [
        'Incident Response',
        'Performance Monitoring',
        'Security Operations',
        'Disaster Recovery'
      ]
    }
  ];
  
  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };
  
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  };
  
  const subItemVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };
  
  return (
    <motion.aside
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="fixed left-0 top-0 w-80 h-full bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-xl z-40 overflow-y-auto"
    >
      <div className="p-6">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          custom={0}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2">Services</h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </motion.div>
        
        {/* Services List */}
        <nav className="space-y-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedItems.has(service.id);
            const isActive = service.isActive;
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                custom={index + 1}
                className="relative"
              >
                {/* Main Service Item */}
                <motion.button
                  onClick={() => toggleExpanded(service.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                    <span className="font-semibold text-sm">{service.label}</span>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  </motion.div>
                </motion.button>
                
                {/* Sub Items */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      variants={subItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="ml-8 mt-2 space-y-1 overflow-hidden"
                    >
                      {service.subItems.map((subItem, subIndex) => (
                        <motion.div
                          key={subItem}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: subIndex * 0.05 }}
                          className="p-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                        >
                          {subItem}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </nav>
        
        {/* Footer */}
        <motion.div
          variants={itemVariants}
          custom={services.length + 1}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Settings className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Need Help?</p>
              <p className="text-xs text-gray-500">Contact our experts</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default ServicesSidebar;
