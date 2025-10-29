'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Mail, Phone, ArrowRight, MessageCircle, Clock, Building2, Users, Zap, Brain } from 'lucide-react';
import { Wrapper } from '@/components/ui';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    phoneNumber: '',
    jobTitle: '',
    companySize: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  // Form validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const freeEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (domain && freeEmailDomains.includes(domain)) return 'Tip: Use your work email for faster response';
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'This field is required';
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'This field is required';
    } else {
      const emailError = validateEmail(formData.workEmail);
      if (emailError) newErrors.workEmail = emailError;
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'This field is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'This field is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'This field is required';
    if (!formData.companySize.trim()) newErrors.companySize = 'This field is required';
    if (!formData.message.trim()) newErrors.message = 'This field is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-[600px] lg:min-h-[700px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
          {/* Left Column - Content Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-blue-50 px-8 md:px-16 lg:px-24 py-16 lg:py-24 flex flex-col justify-center"
          >
            <div className="max-w-2xl">
              {/* Branding */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <span className="text-blue-600 font-bold text-xl">CodeSpire Solutions</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900"
              >
                Let's Transform Your Business<span className="text-blue-600"></span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 leading-relaxed mb-8"
              >
                We help enterprises conceive, build, and scale AI-powered products. Our AI POD as a Service delivers managed AI teams, slashing costs by 60% versus in-house hires while delivering solutions 70% faster.
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-6"
              >
                <motion.div 
                  className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl font-bold text-gray-900 mb-2">60%</div>
                  <div className="text-sm font-semibold text-gray-600">Cost Reduction</div>
                </motion.div>
                <motion.div 
                  className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl font-bold text-gray-900 mb-2">70%</div>
                  <div className="text-sm font-semibold text-gray-600">Faster Delivery</div>
                </motion.div>
                <motion.div 
                  className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
                  <div className="text-sm font-semibold text-gray-600">Reliability</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Professional Team Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative min-h-[400px] lg:min-h-[700px] overflow-hidden"
          >
            {/* Professional Team Image */}
            <div className="relative w-full h-full">
              <Image
                src="/assets/krakenimages-376KN_ISplE-unsplash.jpg"
                alt="Professional team collaboration - two business professionals celebrating success"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              {/* Subtle overlay for better text readability if needed */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Options Section */}
      <section className="py-20 bg-gray-50">
        <Wrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Preferred Contact Method</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you need a quick demo, technical support, or want to discuss enterprise solutions, we're here to help.
            </p>
          </div>

          <div className="flex justify-center">
            {/* Sales Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-lg w-full"
            >
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Talk to Sales</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Interested in our AI solutions? Schedule a personalized demo with our sales team to see how we can transform your business.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span className="text-lg font-semibold text-gray-900">+510-543-7536</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span className="text-lg font-semibold text-gray-900">info@codespiresolutions.com</span>
                </div>
                <div className="text-center pt-2">
                  <a 
                    href="mailto:info@codespiresolutions.com" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </Wrapper>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <Wrapper>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 lg:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full h-12 px-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 bg-white ${
                        errors.fullName 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-200'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="workEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                      Work Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="workEmail"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleInputChange}
                        placeholder="your.email@company.com"
                        className={`w-full h-12 px-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 bg-white ${
                          errors.workEmail 
                            ? 'border-red-400 focus:border-red-500' 
                            : 'border-gray-200'
                        }`}
                      />
                      {formData.workEmail && !errors.workEmail && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.workEmail && (
                      <p className="mt-1 text-sm text-red-500">{errors.workEmail}</p>
                    )}
                  </div>
                </div>

                {/* Company Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className={`w-full h-12 px-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 bg-white ${
                        errors.companyName 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-200'
                      }`}
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+91 (XXX) XXX-XXXX"
                      className={`w-full h-12 px-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 bg-white ${
                        errors.phoneNumber 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-200'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 focus:outline-none focus:ring-0 resize-none bg-white ${
                      errors.message 
                        ? 'border-red-400' 
                        : 'border-gray-200'
                    }`}
                    placeholder="Tell us about your project, current challenges, and how we can help..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <a
                  href="mailto:info@codespiresolutions.com"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group inline-flex items-center justify-center gap-3"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </form>
            </motion.div>
          </div>
        </Wrapper>
      </section>
    </div>
  );
}

