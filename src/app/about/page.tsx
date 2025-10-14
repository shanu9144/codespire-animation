'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Linkedin, Users, Award, Globe, Heart } from 'lucide-react';
import Image from 'next/image';

import { Wrapper } from '@/components/ui';
import IndustriesWeServe from '@/components/sections/IndustriesWeServe';

const OurTeamPage = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('team-stats');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const founders = [
    {
      name: 'Ankit Vij',
      role: 'Founder & CEO',
      image: '/assets/team/alex-johnson.svg',
      bio: 'Visionary leader with 15+ years in AI and enterprise solutions. Passionate about transforming businesses through innovative technology.',
      linkedin: 'https://linkedin.com/in/alexjohnson',
    },
    {
      name: 'Vik Sahni',
      role: 'Co-Founder & CTO',
      image: '/assets/team/sarah-chen.svg',
      bio: 'Technical architect and AI researcher with expertise in machine learning and scalable systems. Leading our innovation initiatives.',
      linkedin: 'https://linkedin.com/in/sarahchen',
    },
  ];

  const teamStats = [
    { icon: Users, label: 'Skilled Experts', value: '50+' },
    { icon: Heart, label: 'Satisfied Clients', value: '10+' },
    { icon: Globe, label: 'Global Industries', value: '5+' },
    { icon: Award, label: 'Projects Delivered', value: '30+' },
    { icon: ChevronDown, label: 'Technical Certifications', value: '70+' },
    { icon: ChevronDown, label: 'Delivery Centers', value: '2+' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 flex items-center justify-center overflow-hidden bg-gray-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0">
          {/* Subtle background patterns */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-lg opacity-30"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-blue-100 rounded-lg opacity-20"></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side - Feature Cards */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Left Card - AI Startup */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative"
            >
              <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">AI Startup</h3>
                    <p className="text-gray-600 text-xs">Innovation Hub</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Bottom Left Card - Our Founders */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Our Founders</h3>
                    <p className="text-gray-600 text-xs">Leadership Team</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Content */}
          <div className="lg:col-span-6 text-center space-y-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 whitespace-nowrap">Revolutionizing </span>
                  <span className="block text-xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-purple-400 text-center"> B2B Market By AI</span>
                </h1>
              </div>

              {/* Central Team Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative mx-auto max-w-sm"
              >
                <div className="w-full h-48 bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-gray-600 font-medium text-sm">Our AI Team</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                CodeSpire is home to 50+ passionate AI experts with expertise across diverse disciplines—machine learning specialists, data scientists, engineers, and more.
              </p>

              {/* Discover More Button */}
              <motion.button
                onClick={scrollToNextSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
              >
                Discover more
                <div className="w-6 h-6 rounded flex items-center justify-center">
                  <ChevronDown className="w-6 h-6 text-white" />
                </div>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative"
            >
              <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">AI Expert</h3>
                    <p className="text-gray-600 text-xs">Specialist Team</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Bottom Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="relative"
            >
              <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Global Team</h3>
                    <p className="text-gray-600 text-xs">Worldwide Reach</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries with enhanced animations */}
      <Wrapper>
        <IndustriesWeServe />
      </Wrapper>
      
      {/* Team Stats Section */}
      <section id="team-stats" className="py-16 bg-white">
        <Wrapper>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Team</span> at a Glance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;re a diverse group of AI innovators, creators, and problem-solvers working together to revolutionize B2B markets.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-black font-medium text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Wrapper>
      </section>

      {/* Founders Section */}
      <section className="py-16 bg-gray-50">
        <Wrapper>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Leadership</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The visionary leaders who founded CodeSpire and continue to drive our AI revolution forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 border border-gray-100">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-40 h-40 mx-auto relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* LinkedIn Link - Appear on Hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-full shadow-lg p-3"
                    >
                      <motion.a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 group/social"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-5 h-5 text-white group-hover/social:scale-110 transition-transform duration-300" />
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{founder.role}</p>
                    <p className="text-gray-600 leading-relaxed text-sm">{founder.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Wrapper>
      </section>
    </div>
  );
};

export default OurTeamPage;
