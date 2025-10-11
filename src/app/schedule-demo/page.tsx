'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wrapper, Button } from '../../../components/ui';
import { ArrowRight, Calendar, Users, CheckCircle } from 'lucide-react';

const ScheduleDemoPage: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <Wrapper>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-16"
          >
            {/* Demo Benefits Section */}
            <motion.div variants={cardVariants} className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-blue-600 mb-6 tracking-tight">
                  Why Schedule a Demo?
                </h2>
                <p className="text-xl font-semibold text-gray-700 max-w-3xl mx-auto mb-2">Discover how our AI solutions can</p>
                <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight max-w-3xl mx-auto">
                  Transform Your Business in 30 Minutes
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 hover:border-primary transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                    <Calendar className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">30-Minute Session</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">Quick, focused demo tailored to your specific business needs and challenges.</p>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200 hover:border-primary transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Consultation</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">Meet with our AI specialists to discuss your unique requirements and solutions.</p>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200 hover:border-primary transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Solutions</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">See how our AI services can be customized for your industry and use cases.</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Calendly Integration Section */}
            <motion.div variants={cardVariants} className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Book Your Demo</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Ready to see how AI can transform your business? Schedule a 30-minute demo with our experts.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-primary to-blue-600 p-8 rounded-2xl text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">Schedule Your 30-Minute Demo</h3>
                  <p className="text-white/90 mb-6">Choose a time that works for you and let&apos;s discuss your AI transformation journey.</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="https://calendly.com/vik-codespiresolutions/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-primary hover:bg-gray-50 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold cursor-pointer hover:cursor-pointer"
                    >
                      Book Demo Now <ArrowRight className="ml-2 inline h-5 w-5" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* What to Expect Section */}
            <motion.div variants={cardVariants} className="bg-white rounded-3xl p-8 lg:p-16 shadow-2xl border border-gray-100">
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-blue-600 mb-6 tracking-tight">
                  What to Expect
                </h2>
                <p className="text-xl font-semibold text-gray-700 max-w-3xl mx-auto mb-2">Your journey from demo to deployment is</p>
                <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight max-w-3xl mx-auto">
                  Designed for Maximum Value and Clarity
                </p>
              </div>
          
              <div className="grid lg:grid-cols-2 gap-8">
                {/* During the Demo */}
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="relative h-full"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 relative overflow-hidden h-full flex flex-col">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">During the Demo</h3>
                      </div>
                      <div className="space-y-4 flex-1">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-start group"
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">Live demonstration of our AI solutions tailored to your industry</span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-start group"
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">Deep dive into your specific business challenges and pain points</span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-start group"
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">Custom solution recommendations with real-world examples</span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex items-start group"
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">ROI analysis & implementation timeline discussion</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* After the Demo */}
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="relative h-full"
                >
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200 relative overflow-hidden h-full flex flex-col">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4 shadow-lg">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">After the Demo</h3>
                      </div>
                      <div className="space-y-4 flex-1">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-start group"
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">Comprehensive proposal with transparent pricing and timelines</span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-start group"
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">Detailed implementation roadmap with milestones</span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-start group"
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">Dedicated follow-up consultation and support</span>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex items-start group"
                        >
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700 text-lg leading-relaxed">Exclusive access to our AI resources and documentation</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Alternative Section */}
            <motion.div 
              variants={cardVariants}
              className="bg-gradient-to-r from-primary to-blue-600 p-8 lg:p-12 rounded-2xl text-white text-center"
            >
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Prefer to Talk First?
              </h3>
              <p className="text-lg mb-8 leading-relaxed opacity-90">
                Have questions before scheduling? Contact us directly for a quick consultation.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-primary hover:bg-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:cursor-pointer">
                  <span className="text-primary">Contact Us</span> <ArrowRight className="ml-2 h-5 w-5 text-primary" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Wrapper>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 z-50 cursor-pointer hover:cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
        </motion.button>
      )}
    </div>
  );
};

export default ScheduleDemoPage;
