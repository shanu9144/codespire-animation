'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin } from 'lucide-react';
import { Wrapper } from '@/components/ui';

interface FormData {
  fullName: string;
  workEmail: string;
  companyName: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  companyName?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    workEmail: '',
    companyName: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Form validation
  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const freeEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (domain && freeEmailDomains.includes(domain)) return 'Tip: Use your work email for faster response';
    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'This field is required';
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = 'This field is required';
    } else {
      const emailError = validateEmail(formData.workEmail);
      if (emailError) newErrors.workEmail = emailError;
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'This field is required';
    if (!formData.message.trim()) newErrors.message = 'This field is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#667eea] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#764ba2]/20 via-transparent to-[#667eea]/20"></div>
        
        <Wrapper>
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
            >
              Let&apos;s Transform Your Business
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              See how our AI solutions can help you scale<br />
              Get a personalized demo from our team.
            </motion.p>
          </div>
        </Wrapper>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-[#F5F3FF]">
        <Wrapper>
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-12 shadow-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className={`w-full h-12 px-4 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-0 ${
                        errors.fullName 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="workEmail"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full h-12 px-4 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-0 ${
                          errors.workEmail 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]'
                        }`}
                      />
                      {formData.workEmail && !errors.workEmail && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.workEmail && (
                      <p className="mt-1 text-sm text-red-600">{errors.workEmail}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Phone *
                  </label>
                  <input
                    type="tel"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className={`w-full h-12 px-4 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-0 ${
                      errors.companyName 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]'
                    }`}
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg transition-all duration-300 focus:outline-none focus:ring-0 resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)]'
                    }`}
                    placeholder="Tell us about your project or inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="sticky top-8"
            >
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-[#667eea] mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Visit Our Office</h3>
                </div>
                
                <div className="h-96 bg-gradient-to-br from-[#667eea]/10 to-[#764ba2]/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#667eea] mx-auto mb-4" />
                    <p className="text-gray-600">Interactive map coming soon</p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">CodeSpire AI</h4>
                  <p className="text-sm text-gray-600">
                    25th Floor, Gold Tower, Wave One<br />
                    2514, Sector 18, Noida<br />
                    Uttar Pradesh 201301<br />
                    <a href="tel:+91-120-1234567" className="text-[#667eea] hover:underline">
                      +91 (120) 123-4567
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Wrapper>
      </section>
    </div>
  );
}
