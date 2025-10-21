'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Brain, 
  Cpu, 
  Database, 
  BarChart3, 
  Clock, 
  Shield, 
  CheckCircle, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  FileText, 
  Settings, 
  Cloud,
  Lock,
  Globe,
  Award,
  DollarSign,
  PieChart,
  Activity,
  Layers,
  Workflow,
  Bot,
  Sparkles,
  Wrench,
  Cog,
  Nut,
  Server,
  Briefcase,
  Star,
  ChevronRight,
  Play,
  Mail,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

import { Wrapper, Button } from '@/components/ui';
import { Heading, Text } from '@/components/ui/Typography';
import { FluidBackground, MorphingShapes } from '@/lib/animations/fluid';
import { ScrollAnimatedSection, ScrollRevealText } from '@/lib/animations/scroll';

export default function SmartRFQAI() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const keyFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze 2D/3D drawings to extract precise manufacturing requirements and cost factors.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Target,
      title: "Automated Quoting",
      description: "Generate accurate quotes in minutes instead of hours, with intelligent cost estimation based on material, labor, and complexity.",
      gradient: "from-blue-600 to-blue-700"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Leverage historical data and market trends to provide competitive pricing and identify cost optimization opportunities.",
      gradient: "from-blue-400 to-blue-500"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Upload CAD files and receive professional quotes within minutes, dramatically reducing RFQ response times.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Built-in validation ensures quote accuracy and consistency, reducing errors and improving customer confidence.",
      gradient: "from-blue-600 to-blue-700"
    },
    {
      icon: Settings,
      title: "Seamless Integration",
      description: "Connect with existing ERP, CRM, and CAD systems for streamlined workflow integration and data synchronization.",
      gradient: "from-blue-400 to-blue-500"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "85% Time Reduction",
      description: "Cut quote generation time from hours to minutes",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: TrendingUp,
      title: "50% Higher Win Rate",
      description: "More competitive and accurate pricing",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: DollarSign,
      title: "30% Cost Savings",
      description: "Optimized pricing and reduced manual effort",
      color: "bg-blue-50 border-blue-200"
    }
  ];

  const integrations = [
    { name: "AutoCAD", icon: Wrench },
    { name: "SolidWorks", icon: Cog },
    { name: "Fusion 360", icon: Nut },
    { name: "SAP", icon: BarChart3 },
    { name: "Oracle", icon: Server },
    { name: "Salesforce", icon: Cloud },
    { name: "Microsoft Dynamics", icon: Briefcase },
    { name: "PTC Creo", icon: Target }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "SOC 2 Type II compliant with end-to-end encryption"
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "AWS/Azure hosted with 99.9% uptime guarantee"
    },
    {
      icon: Shield,
      title: "Data Protection",
      description: "GDPR compliant with automated backup and recovery"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        {/* Subtle Animated Background */}
        <div className="absolute inset-0 z-0">
          {/* Soft floating particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Gradient waves */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"
            style={{ y, opacity }}
          />

          {/* Glassmorphism blur effect */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
        </div>

        <Wrapper className="relative z-10">
          <div className="max-w-8xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 items-start">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 lg:col-span-3 flex flex-col justify-center h-full"
              >
                {/* 3D Icons */}
                <div className="flex justify-center lg:justify-start items-center space-x-8 mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full animate-pulse" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                      <Cpu className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full animate-pulse" />
                  </motion.div>
                </div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Heading level={1} size="h1" className="mb-6 text-center lg:text-left">
                    <span className="text-primary">Smart RFQ AI</span>
                  </Heading>
                </motion.div>

                {/* Subheadline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Text size="body-lg" className="text-gray-900 max-w-3xl mx-auto lg:mx-0 mb-8 text-center lg:text-left">
                    <span className="font-semibold">
                      Intelligent Quoting for Modern Manufacturing
                    </span>
                  </Text>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Text size="body-lg" className="max-w-4xl mx-auto lg:mx-0 mb-12 text-center lg:text-left">
                    <span className="text-gray-900">Turn 2D/3D drawings into accurate, professional quotes in minutes.</span>
                    <br />
                    <span className="text-purple-600 font-semibold">Reduce manual effort, speed RFQ cycles, and win more orders with AI-powered precision.</span>
                  </Text>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex items-center justify-center lg:justify-start"
                >
                  <Link href="/schedule-demo">
                    <Button 
                      className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center">
                        Request a demo
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Video */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative lg:col-span-3 flex flex-col justify-center h-full"
              >
                <div className="relative group">
                  {/* Video Container */}
                  <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-3 shadow-2xl">
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                      {/* Video Element */}
                      {/* YouTube Video Embed */}
                      <iframe
                        className="w-full h-[350px] lg:h-[400px] rounded-2xl"
                        src="https://www.youtube.com/embed/lBFoxhMongE"
                        title="Smart RFQ AI Demo Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        aria-label="Smart RFQ AI Demo Video"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Wrapper>

        {/* Light rotating 3D object */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 opacity-10"
          animate={{ rotateY: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl transform rotate-45" />
        </motion.div>
      </section>

      {/* Key Features Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50/80 via-white/60 to-blue-50/40 overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl" />
        </div>
        
        <Wrapper className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Heading level={2} size="h1" className="mb-6 text-gray-900">
                Powerful AI Features
              </Heading>
              <Text size="body-lg" className="max-w-3xl mx-auto">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-semibold">
                  Advanced capabilities that transform your quoting process from manual to intelligent automation
                </span>
              </Text>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/60 hover:border-primary/20 hover:-translate-y-2">
                    {/* Glassmorphic effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-2xl" />
                    
                    {/* Icon with gradient background */}
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <Text color="secondary" className="leading-relaxed">
                        {feature.description}
                      </Text>
                    </div>

                    {/* Floating animation */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full"
                      animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Wrapper>
      </section>

      {/* Benefits & ROI Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background split with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Abstract pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Heading level={2} size="h1" className="mb-6 text-gray-900">
                Measurable Results
              </Heading>
              <Text size="body-lg" className="max-w-3xl mx-auto">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-semibold">
                  See the impact of AI-powered quoting on your business performance
                </span>
              </Text>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className={`relative h-full ${benefit.color} rounded-2xl p-8 border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="w-8 h-8 text-primary" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {benefit.title}
                      </h3>
                      
                      <Text color="secondary" className="leading-relaxed">
                        {benefit.description}
                      </Text>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Wrapper>
      </section>

      {/* Integrations Section */}
      <section className="relative py-24 bg-gradient-to-br from-white/80 via-gray-50/60 to-blue-50/30 overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-24 h-24 bg-primary/4 rounded-full blur-xl" />
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-blue-500/4 rounded-full blur-xl" />
        </div>
        <Wrapper className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Heading level={2} size="h1" className="mb-6 text-gray-900">
                Seamless Integrations
              </Heading>
              <Text size="body-lg" className="max-w-3xl mx-auto">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-semibold">
                  Connect with your existing tools and workflows for a unified experience
                </span>
              </Text>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-blue-50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-200/60 hover:border-blue-400/30 text-center">
                    <div className="text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                      <integration.icon className="w-8 h-8 mx-auto" />
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {integration.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Wrapper>
      </section>

      {/* Deployment & Security Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50/40 via-white/80 to-blue-50/30 overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/3 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500/4 rounded-full blur-2xl" />
        </div>
        <Wrapper className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Heading level={2} size="h1" className="mb-6 text-gray-900">
                Enterprise-Grade Security
              </Heading>
              <Text size="body-lg" className="max-w-3xl mx-auto">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-semibold">
                  Built with security and reliability at its core
                </span>
              </Text>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/60 hover:border-primary/20">
                    {/* Soft glass effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-2xl" />
                    
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-8 h-8 text-primary" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <Text color="secondary" className="leading-relaxed">
                        {feature.description}
                      </Text>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Wrapper>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-16 bg-blue-50 overflow-hidden">
        {/* Gradient background with floating particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-600/10" />
        
        {/* Floating particle animation */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        {/* Mesh lines effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <Wrapper>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Heading level={2} size="h1" className="mb-4 text-gray-900">
                Ready to Transform Your Quoting Process?
              </Heading>
              
              <Text size="body-lg" className="max-w-3xl mx-auto mb-8">
                <span className="text-gray-900">Join hundreds of manufacturing companies already using Smart RFQ AI to</span>
                <br />
                <span className="text-purple-600 font-semibold">accelerate their growth and streamline operations.</span>
              </Text>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/schedule-demo">
                  <Button 
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center">
                      Request a demo
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* 3D effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-blue-600/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button 
                    variant="outline"
                    className="group bg-white border-2 border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <span className="flex items-center">
                      Talk to sales
                      <Phone className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Contact info */}
              <div className="pt-4">
                <a 
                  href="mailto:info@codespiresolutions.com"
                  className="inline-flex items-center px-6 py-3 bg-blue-100 backdrop-blur-sm rounded-full border border-blue-200 hover:bg-blue-200 transition-all duration-300 group hover:scale-105 text-blue-700"
                >
                  <Mail className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" /> 
                  <span className="font-medium">
                    info@codespiresolutions.com
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        </Wrapper>
      </section>
    </div>
  );
}
