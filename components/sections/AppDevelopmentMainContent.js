'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AppDevelopmentMainContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };
  
  return (
    <section ref={ref} className="relative py-20 px-6">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50" />
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }} />
      </div>
      
      {/* Soft blurred shapes for depth */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Main Content Section */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 lg:p-12 border border-gray-100/50 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">UI/UX Design</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  At Codespire Solutions, we craft tailor–made application development solutions that power your business with the latest and greatest technologies. Whether you need robust software built from scratch or expert support to scale your vision, we deliver bespoke services in Java, .NET, Python, APIs, databases, DevOps, and more. Our flexible staffing and capacity models, including dedicated POD structures, ensure seamless collaboration and results that exceed expectations. From startups to enterprises, we&apos;re your partner in turning ideas into high–performing applications.
                </p>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Our Top 10 Technology Expertise</h4>
                <div className="space-y-3 text-gray-800">
                  <p><span className="font-semibold">Java & .NET:</span> Building secure, scalable, and enterprise–grade applications with industry–leading frameworks.</p>
                  <p><span className="font-semibold">UI/UX with React and Node.js:</span> Crafting intuitive, responsive interfaces paired with powerful backend solutions.</p>
                  <p><span className="font-semibold">DevOps:</span> Streamlining development with CI/CD pipelines, automation, and deployment excellence.</p>
                  <p><span className="font-semibold">Microservices:</span> Designing modular, agile architectures for flexibility and rapid innovation.</p>
                  <p><span className="font-semibold">Cloud Enablement:</span> Leveraging AWS, Azure, and Google Cloud for cost–efficient, scalable apps.</p>
                  <p><span className="font-semibold">Integration Using APIs:</span> Connecting systems seamlessly with custom, secure API solutions.</p>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop"
                  alt="Application Development Illustration"
                  className="w-full rounded-2xl shadow-xl mx-auto"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppDevelopmentMainContent;