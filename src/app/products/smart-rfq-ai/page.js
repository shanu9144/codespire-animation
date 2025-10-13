'use client';

import { Wrapper, Button } from "@/shared/ui";
import { Download, Mail, Phone, ArrowRight, Zap, Target, TrendingUp, Brain, Cpu, Database, BarChart3, Clock, Shield, CheckCircle, Users, Settings, FileText, Calculator, Layers, Lightbulb, Send, FileCheck, DollarSign, PieChart, Award, Cloud, Lock, Star } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollAnimatedSection, ScrollRevealText, ParallaxElement } from "@/shared/animations/scroll";
import { FluidBackground, MorphingShapes } from "@/shared/animations/fluid";
import Link from "next/link";

export default function SmartRFQAI() {
  const capabilities = [
    {
      icon: Layers,
      title: "2D & 3D design mapping",
      description: "Automatically interprets common CAD and drawing formats, identifies features and dimensions, and translates design intent into manufacturing operations."
    },
    {
      icon: Brain,
      title: "AI Quoting Engine",
      description: "Produces accurate, configurable quotes in minutes — combining material, machining, finishing, overheads, vendor rates and margin rules."
    },
    {
      icon: Target,
      title: "Process prediction",
      description: "Identifies the most likely machining, fabrication, and finishing routes and recommends the optimal sequence for cost and lead-time."
    },
    {
      icon: Calculator,
      title: "Machining time calculation",
      description: "Calculates precise cycle times using feature-level analysis and production parameters to avoid guesswork."
    },
    {
      icon: Settings,
      title: "Cost setup & management",
      description: "Centralize and manage overheads, vendor rates, material prices and custom cost rules so quotes reflect true costs."
    },
    {
      icon: Lightbulb,
      title: "AI insights & learning",
      description: "Learns from historical RFQs to improve estimates and recommend optimized pricing, processes, and supplier choices."
    },
    {
      icon: Send,
      title: "Auto quote delivery",
      description: "Generates professional, branded quote documents and sends them directly to customers or your CRM with audit trails and versioning."
    }
  ];

  const benefits = [
    {
      category: "For estimators & quoting teams",
      items: ["Cut manual quoting time dramatically", "Eliminate repetitive data entry", "Improve quote accuracy and consistency"]
    },
    {
      category: "For operations & production", 
      items: ["More accurate cycle times", "Clearer operation breakdowns", "Reduce production surprises and rework"]
    },
    {
      category: "For sales & management",
      items: ["Faster response times", "Professional quotes improve win rates", "Better customer perception"]
    }
  ];

  const integrations = [
    { category: "CAD & drawings", description: "supports common 2D and 3D CAD formats for automated interpretation" },
    { category: "ERP / MES / PLM", description: "integrate quoted items, part numbers and supplier info into your backend systems via API or standard connectors" },
    { category: "Supplier & vendor management", description: "bring vendor rates into cost build-ups for realistic pricing" },
    { category: "CRM & email", description: "automatic quote delivery and status updates to sales systems" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Glassmorphism Background */}
      <div className="absolute inset-0 z-0">
        {/* Vibrant purple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#667eea]"></div>
        
        {/* Animated gradient overlay for depth */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-[#764ba2]/20 via-transparent to-[#667eea]/20"
          animate={{ 
            background: [
              "linear-gradient(45deg, rgba(118, 75, 162, 0.2) 0%, transparent 50%, rgba(102, 126, 234, 0.2) 100%)",
              "linear-gradient(225deg, rgba(102, 126, 234, 0.2) 0%, transparent 50%, rgba(118, 75, 162, 0.2) 100%)",
              "linear-gradient(45deg, rgba(118, 75, 162, 0.2) 0%, transparent 50%, rgba(102, 126, 234, 0.2) 100%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating geometric shapes for visual interest */}
        <div className="absolute inset-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${10 + (i * 20)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      </div>

      {/* Premium Glassmorphism Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <Wrapper>
          <div className="max-w-6xl mx-auto text-center">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="space-y-8 md:space-y-12">
                {/* Breadcrumb */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center space-x-2 text-sm text-white/80"
                >
                  <Link href="/products" className="hover:text-white transition-colors duration-200">
                    Products
                  </Link>
                  <span>/</span>
                  <span className="text-white font-medium">Smart RFQ AI</span>
                </motion.div>

                
                {/* Premium Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}>
                    Smart RFQ AI
                  </h1>
                </motion.div>
                
                {/* Premium Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/95 leading-tight max-w-4xl mx-auto" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>
                    Intelligent quoting for modern manufacturing
                  </h2>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed"
                >
                  Turn 2D/3D drawings into accurate, professional quotes in minutes. Reduce manual effort, speed RFQ cycles, and win more orders.
                </motion.p>

                {/* Premium Glassmorphism Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-12">
                  {[
                    { 
                      title: "Automated CAD-to-quote", 
                      text: "Auto-interpret 2D & 3D designs and extract manufacturing requirements", 
                      icon: Layers 
                    },
                    { 
                      title: "Data-driven costing", 
                      text: "Precise machining time, material, and overhead estimates", 
                      icon: Calculator 
                    }, 
                    { 
                      title: "Instant delivery", 
                      text: "Generate and send quotes that are bid-ready", 
                      icon: Send 
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group p-8 bg-white/10 backdrop-blur-[20px] rounded-[20px] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-400"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5] to-[#667eea] rounded-[12px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-white/80 font-medium leading-relaxed">
                        {feature.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced CTA Buttons */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 pt-12 md:pt-16 pb-8 md:pb-12 justify-center items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="relative px-10 py-5 text-lg font-semibold bg-[#4F46E5] text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group overflow-hidden border-0"
                      data-magnetic="true"
                      data-magnetic-strength="0.3"
                      style={{ 
                        boxShadow: '0 10px 40px rgba(79, 70, 229, 0.4)',
                        borderRadius: '16px'
                      }}
                    >
                      <span className="relative z-10 flex items-center">
                        Request a demo
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#4F46E5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="relative px-10 py-5 text-lg font-semibold bg-[#8B5CF6] text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-[#A78BFA]" 
                      variant="secondary"
                      data-magnetic="true"
                      data-magnetic-strength="0.2"
                      style={{ 
                        borderRadius: '16px',
                        backgroundColor: '#8B5CF6',
                        borderColor: '#A78BFA'
                      }}
                    >
                      <span className="relative z-10 flex items-center">
                        <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" /> 
                        Download datasheet
                      </span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* Transform RFQ Process Section */}
      <section className="relative py-24 bg-[#F5F3FF]">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg mb-6"
                >
                  <span className="text-sm font-semibold text-purple-600">How it works</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Transform Your RFQ Process
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Upload CAD files (STEP, IGES, DXF, DWG), our AI extracts features, tolerances, and material specs. Get instant cost breakdowns with machining time, material costs, and overhead—all in a professional PDF quote ready to send.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { value: "85%", label: "Faster quoting" },
                  { value: "95%", label: "Accuracy rate" },
                  { value: "60%", label: "Cost reduction" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* Key Capabilities */}
      <section className="relative py-24 bg-white">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-lg mb-6"
                >
                  <span className="text-sm font-semibold text-blue-600">Capabilities</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Key Capabilities
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Everything you need to quote faster, more accurately, and win more business
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: FileCheck,
                    title: "Intelligent file parsing",
                    description: "Automatically extract dimensions, tolerances, materials, and manufacturing specs from 2D/3D files",
                    color: "#4F46E5"
                  },
                  {
                    icon: DollarSign,
                    title: "AI-powered costing",
                    description: "Calculate precise costs using real machine rates, material pricing, and historical data",
                    color: "#10B981"
                  },
                  {
                    icon: Users,
                    title: "Multi-user collaboration",
                    description: "Teams can review, adjust, and approve quotes together with role-based permissions",
                    color: "#F59E0B"
                  },
                  {
                    icon: Zap,
                    title: "Lightning-fast turnaround",
                    description: "Generate complete quotes in minutes instead of hours or days",
                    color: "#8B5CF6"
                  },
                  {
                    icon: PieChart,
                    title: "Cost analysis & margins",
                    description: "See detailed breakdowns and optimize your pricing strategy",
                    color: "#EC4899"
                  },
                  {
                    icon: Award,
                    title: "Accuracy & training",
                    description: "ML models improve over time, learning from your corrections and feedback",
                    color: "#06B6D4"
                  }
                ].map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: `${capability.color}15` }}
                    >
                      <capability.icon className="w-6 h-6" style={{ color: capability.color }} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-200">
                      {capability.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {capability.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* Benefits & ROI */}
      <section className="relative py-24 bg-[#F5F3FF]">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg mb-6"
                >
                  <span className="text-sm font-semibold text-purple-600">Why choose us</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Benefits & ROI
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Real results from manufacturers using Smart RFQ AI
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  {
                    theme: "purple",
                    heading: "For production & quoting teams",
                    benefits: [
                      "Cut quoting time by 85%",
                      "Reduce errors by 95%",
                      "Handle 3x more RFQs"
                    ]
                  },
                  {
                    theme: "blue",
                    heading: "For operations & production",
                    benefits: [
                      "Standardize pricing",
                      "Improve margins",
                      "Data-driven decisions"
                    ]
                  },
                  {
                    theme: "green",
                    heading: "For sales & management",
                    benefits: [
                      "Win more RFQs",
                      "Respond 10x faster",
                      "Scale without hiring"
                    ]
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`group p-6 rounded-2xl border transition-all duration-300 shadow-lg hover:shadow-xl ${
                      benefit.theme === 'purple' ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200' :
                      benefit.theme === 'blue' ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' :
                      'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
                    }`}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-200">
                      {benefit.heading}
                    </h3>
                    <div className="space-y-3">
                      {benefit.benefits.map((item, itemIndex) => (
                        <motion.div 
                          key={itemIndex} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: (index * 0.2) + (itemIndex * 0.1) }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3"
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            benefit.theme === 'purple' ? 'bg-purple-100' :
                            benefit.theme === 'blue' ? 'bg-blue-100' :
                            'bg-green-100'
                          }`}>
                            <CheckCircle className={`w-3 h-3 ${
                              benefit.theme === 'purple' ? 'text-purple-600' :
                              benefit.theme === 'blue' ? 'text-blue-600' :
                              'text-green-600'
                            }`} />
                          </div>
                          <p className="text-gray-700 font-medium text-sm">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* Integrations */}
      <section className="relative py-24 bg-white">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-lg mb-6"
                >
                  <span className="text-sm font-semibold text-blue-600">Integrations</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Integrations & Compatibility
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Works seamlessly with your existing tools and workflows
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "CAD Formats",
                    description: "STEP, IGES, STL, DXF, DWG, Solidworks, Fusion 360, and more"
                  },
                  {
                    title: "ERP / CRM / PLM",
                    description: "Integrate with SAP, Oracle, Salesforce, Microsoft Dynamics, and custom APIs"
                  },
                  {
                    title: "Popular business tools (optional)",
                    description: "Export to Excel, PDF, CSV. Connect via Zapier, webhooks, or REST API"
                  },
                  {
                    title: "CRM export",
                    description: "Push quotes directly to HubSpot, Salesforce, Pipedrive, and other CRM systems"
                  }
                ].map((integration, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-200">
                      {integration.title}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {integration.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* Deployment & Security */}
      <section className="relative py-24 bg-[#F5F3FF]">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg mb-6"
                >
                  <span className="text-sm font-semibold text-purple-600">Enterprise-ready</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Deployment & Security
                </h2>
              </div>

              <div className="max-w-4xl mx-auto space-y-5">
                {[
                  {
                    icon: Cloud,
                    title: "Flexible deployment",
                    description: "Cloud-hosted (AWS/Azure) or on-premise installation for maximum security",
                    color: "#4F46E5"
                  },
                  {
                    icon: Shield,
                    title: "SOC 2 Type II compliant",
                    description: "Bank-level encryption, regular audits, and comprehensive access controls",
                    color: "#10B981"
                  },
                  {
                    icon: Lock,
                    title: "Enterprise-class SSO",
                    description: "SAML, OAuth, Active Directory integration with role-based permissions",
                    color: "#8B5CF6"
                  }
                ].map((security, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                        style={{ backgroundColor: `${security.color}15` }}
                      >
                        <security.icon className="w-6 h-6" style={{ color: security.color }} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-200">
                          {security.title}
                        </h3>
                        <p className="text-gray-600 font-medium">
                          {security.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        <Wrapper>
          <div className="relative z-10">
            <ScrollAnimatedSection transitionType="scale" stagger={200}>
              <div className="max-w-4xl mx-auto text-center">
                <div className="space-y-8">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white leading-tight"
                    style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)' }}
                  >
                    Ready to transform your quoting process?
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
                  >
                    Join hundreds of manufacturers who've already made the switch
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="relative px-8 py-4 text-lg font-semibold bg text-gray-600 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-gray-200"
                        data-magnetic="true"
                        data-magnetic-strength="0.4"
                      >
                        <span className="relative z-10 flex items-center">
                          Request a demo
                        </span>
                        <div className="absolute inset-0 bg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="relative px-6 py-4 text-lg font-semibold bg-[#8B5CF6] border-2  text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                        data-magnetic="true"
                        data-magnetic-strength="0.3"
                      >
                        <span className="relative z-10 flex items-center">
                          Talk to sales
                          <Phone className="ml-3 h-5 w-5 text-white  transition-transform duration-200" />
                        </span>
                        <div className="absolute inset-0 bg opacity-0  transition-opacity duration-300"></div>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>
    </div>
  );
}
