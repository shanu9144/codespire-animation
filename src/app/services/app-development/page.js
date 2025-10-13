"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wrapper, Button } from '@/shared/ui';
import { ArrowRight, ArrowDown, ChevronRight } from 'lucide-react';

const AppDevelopmentPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"></div>
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="2" fill="#60A5FA" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <Wrapper>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative z-10 text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">Application Development & Testing</h1>
            <h2 className="text-2xl lg:text-3xl font-medium text-black mb-10">UI/UX Design, Scalable Engineering, and Enterprise-Grade Quality</h2>
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center space-y-2 cursor-pointer"
              onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-white text-sm font-medium">Scroll Down</span>
              <ArrowDown className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
        </Wrapper>
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-6 left-6 z-20"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <Link href="/" className="hover:text-white hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-white hover:underline">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Application Development & Testing</span>
          </div>
        </motion.nav>
      </section>

      {/* Main Content */}
      <section id="main-content" className="py-16 lg:py-24 bg-white">
        <Wrapper>
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Left Sidebar - All Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">All Services</h3>
                <nav className="space-y-1">
                  {[
                    { title: 'Digital Engineering', href: '/services/digital-engineering', active: false },
                    { title: 'AI POD as a Service', href: '/services/ai-pod', active: false },
                    { title: 'Application Development & Testing', href: '/services/app-development', active: true },
                    { title: 'Data, Analytics And AI', href: '/services/data-analytics', active: false },
                    { title: 'Salesforce And ServiceNow', href: '/services/salesforce-servicenow', active: false },
                  ].map((service, idx) => (
                    <Link
                      key={idx}
                      href={service.href}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 group cursor-pointer hover:cursor-pointer ${
                        service.active
                          ? 'bg-primary text-white shadow-lg border-l-4 border-blue-300'
                          : 'text-gray-700 hover:bg-white hover:text-primary hover:border-l-4 hover:border-primary/30 hover:shadow-md'
                      }`}
                    >
                      <span className="text-sm font-medium">{service.title}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                        service.active ? 'text-white' : 'text-gray-400 group-hover:text-primary group-hover:translate-x-1'
                      }`} />
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Main Column */}
            <div className="lg:col-span-3">
              <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">UI/UX Design</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      At Codespire Solutions, we craft tailor–made application development solutions that power your business with the latest and greatest technologies. Whether you need robust software built from scratch or expert support to scale your vision, we deliver bespoke services in Java, .NET, Python, APIs, databases, DevOps, and more. Our flexible staffing and capacity models, including dedicated POD structures, ensure seamless collaboration and results that exceed expectations. From startups to enterprises, we’re your partner in turning ideas into high–performing applications.
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
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-gradient-to-r from-primary to-blue-600 p-8 lg:p-12 rounded-2xl text-white text-center"
          >
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Build Faster. Ship Better.</h3>
            <p className="text-white/90 mb-8">Let’s turn your idea into a secure, scalable product with exceptional UX.</p>
            <Button className="bg-primary text-white hover:bg-primary px-8 py-4 rounded-xl shadow-lg font-semibold cursor-pointer">Get a Free Consultation <ArrowRight className="ml-2 inline h-5 w-5" /></Button>
          </motion.div>
        </Wrapper>
      </section>

      {/* Back to Top */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 z-50"
        >
          <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
        </motion.button>
      )}
    </div>
  );
};

export default AppDevelopmentPage;


