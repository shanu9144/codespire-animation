'use client';

import Wrapper from "../../../components/ui/Wrapper";
import Button from "../../../components/ui/Button";
import { Download, Mail, Phone, ArrowRight, Zap, Target, TrendingUp, Brain, Cpu, Database, BarChart3, Clock, Shield, CheckCircle, Users, Settings, FileText, Calculator, Layers, Lightbulb, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Scene3D, Scene3DProvider, FloatingGeometry } from "../../../animations/3d";
import { ScrollAnimatedSection, ScrollRevealText, ParallaxElement } from "../../../animations/scroll";
import { FluidBackground, MorphingShapes } from "../../../animations/fluid";
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <FluidBackground
          blobCount={6}
          size={{ min: 200, max: 500 }}
          speed={0.2}
          morphSpeed={0.15}
          color="#384bff"
          opacity={0.03}
          blendMode="multiply"
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="space-y-8">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Link href="/products" className="hover:text-primary transition-colors duration-200">
                    Products
                  </Link>
                  <span>/</span>
                  <span className="text-primary font-medium">Smart RFQ AI</span>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm">
                  <Target className="w-5 h-5 text-primary mr-3" />
                  <span className="text-sm font-semibold text-primary">Smart RFQ AI</span>
                </div>
                
                {/* Main Heading */}
                <ScrollRevealText revealBy="word" staggerDelay={100}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    Smart RFQ AI
                  </h1>
                </ScrollRevealText>
                
                {/* Subtitle */}
                <ScrollRevealText revealBy="word" staggerDelay={80}>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent leading-tight">
                    Intelligent quoting for modern manufacturing
                  </h2>
                </ScrollRevealText>
                
                <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
                  Turn 2D/3D drawings into accurate, professional quotes in minutes. Reduce manual effort, speed RFQ cycles, and win more orders.
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                  {[
                    "Automated CAD-to-quote: auto-interpret 2D & 3D designs and extract manufacturing requirements",
                    "Data-driven costing: precise machining time, material, and overhead estimates", 
                    "Instant, professional delivery: generate and send quotes that are bid-ready"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200"
                    >
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{feature}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <Button 
                    className="btn btn-primary px-8 py-4 text-lg font-semibold group"
                    data-magnetic="true"
                    data-magnetic-strength="0.3"
                  >
                    Request a demo
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                  <Button 
                    className="btn btn-secondary px-6 py-4 text-lg font-semibold group" 
                    variant="secondary"
                    data-magnetic="true"
                    data-magnetic-strength="0.2"
                  >
                    <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" /> 
                    Download datasheet
                  </Button>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* Product Overview */}
      <section className="relative py-24">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                      Transform Your RFQ Process
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Smart RFQ AI automates the entire RFQ process for manufacturing businesses of all sizes. Upload drawings or CAD files and let the platform extract geometry, predict processes (machining, fabrication, finishing), calculate cycle times and costs, then assemble accurate quotes ready for delivery — all within minutes.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The system learns from your past RFQs to continuously improve accuracy and win rates.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { value: "85%", label: "Time Saved", icon: Clock },
                      { value: "95%", label: "Accuracy", icon: Shield },
                      { value: "+40%", label: "Win Rate", icon: TrendingUp }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200"
                      >
                        <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right 3D Scene */}
                <div className="relative">
                  <ParallaxElement speed={0.2} direction="vertical">
                    <div className="h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/10">
                      <Scene3DProvider>
                        <Scene3D enableControls={true}>
                          <FloatingGeometry
                            shapes={[
                              { 
                                type: 'cube', 
                                position: [0, 0, 0], 
                                color: '#384bff',
                                scale: 1.5,
                                rotationSpeed: [0.002, 0.005, 0.002]
                              },
                              { 
                                type: 'torus', 
                                position: [2, 1, -1], 
                                color: '#3b82f6',
                                scale: 0.8,
                                rotationSpeed: [0.003, 0.003, 0.003]
                              },
                              { 
                                type: 'octahedron', 
                                position: [-2, -1, -2], 
                                color: '#1d4ed8',
                                scale: 0.6,
                                rotationSpeed: [0.004, 0.002, 0.004]
                              }
                            ]}
                            mouseInfluence={0.4}
                            animationSpeed={0.8}
                            enableGlow={true}
                            glowIntensity={0.2}
                          />
                        </Scene3D>
                      </Scene3DProvider>
                      
                      {/* Overlay Elements */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-gray-700">CAD Processing</span>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-gray-700">AI Analysis</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ParallaxElement>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* Key Capabilities */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Key Capabilities
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Comprehensive AI-powered features designed to streamline your entire quoting process
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <capability.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {capability.title}
                    </h4>
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
      <section className="relative py-24">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Benefits & ROI
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Transform your business operations with measurable improvements across all departments
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-primary/30 transition-all duration-300"
                  >
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">
                      {benefit.category}
                    </h4>
                    <div className="space-y-4">
                      {benefit.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600">{item}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Real Impact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl border border-primary/20"
              >
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Real Impact</h4>
                <p className="text-lg text-gray-600">
                  Reduce manual effort and accelerate RFQ cycles; increase throughput while improving quote accuracy.
                </p>
              </motion.div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* Integrations & Compatibility */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Integrations & Compatibility
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Seamlessly integrate with your existing systems and workflows
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {integrations.map((integration, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white rounded-xl border border-gray-200 hover:border-primary/30 transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {integration.category}
                    </h4>
                    <p className="text-gray-600">
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
      <section className="relative py-24">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Deployment & Security
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-white rounded-xl border border-gray-200">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                        <Settings className="w-5 h-5 text-primary mr-2" />
                        Flexible deployment
                      </h4>
                      <p className="text-gray-600">
                        Cloud-hosted SaaS for rapid roll-out, with on-prem options for sensitive environments.
                      </p>
                    </div>
                    
                    <div className="p-6 bg-white rounded-xl border border-gray-200">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                        <Shield className="w-5 h-5 text-primary mr-2" />
                        Enterprise-grade controls
                      </h4>
                      <p className="text-gray-600">
                        Role-based access, audit trails, and data export for compliance.
                      </p>
                    </div>
                    
                    <div className="p-6 bg-white rounded-xl border border-gray-200">
                      <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                        <Database className="w-5 h-5 text-primary mr-2" />
                        Integration-ready APIs
                      </h4>
                      <p className="text-gray-600">
                        Secure data exchange with existing systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <ParallaxElement speed={0.3} direction="vertical">
                    <div className="h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/10">
                      <Scene3DProvider>
                        <Scene3D enableControls={false}>
                          <FloatingGeometry
                            shapes={[
                              { 
                                type: 'sphere', 
                                position: [0, 0, 0], 
                                color: '#384bff',
                                scale: 1.2,
                                rotationSpeed: [0.01, 0.01, 0.01]
                              },
                              { 
                                type: 'cube', 
                                position: [2, 1, -1], 
                                color: '#3b82f6',
                                scale: 0.8,
                                rotationSpeed: [0.005, 0.01, 0.005]
                              }
                            ]}
                            mouseInfluence={0.3}
                            animationSpeed={1.0}
                            enableGlow={true}
                            glowIntensity={0.3}
                          />
                        </Scene3D>
                      </Scene3DProvider>
                    </div>
                  </ParallaxElement>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <FluidBackground
            blobCount={8}
            size={{ min: 250, max: 600 }}
            speed={0.15}
            morphSpeed={0.1}
            color="#384bff"
            opacity={0.05}
            blendMode="multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-primary/10"></div>
        </div>

        <Wrapper>
          <div className="relative z-10">
            <ScrollAnimatedSection transitionType="scale" stagger={200}>
              <div className="max-w-5xl mx-auto text-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-lg">
                    <Zap className="w-5 h-5 text-primary mr-3" />
                    <span className="text-sm font-semibold text-primary">Ready to Transform Your RFQ Process?</span>
                  </div>
                  
                  <ScrollRevealText revealBy="word" staggerDelay={120}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      Ready to see Smart RFQ AI in action?
                    </h2>
                  </ScrollRevealText>
                  
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Join manufacturing companies already using Smart RFQ AI to accelerate their quoting process and win more orders.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <div className="relative group hover:scale-105 transition-transform duration-200">
                      <Button 
                        className="btn btn-primary px-8 py-4 text-lg font-semibold relative overflow-hidden"
                        data-magnetic="true"
                        data-magnetic-strength="0.4"
                      >
                        <span className="relative z-10 flex items-center">
                          Request a demo
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/50 to-blue-600/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </Button>
                    </div>
                    
                    <div className="relative group hover:scale-105 transition-transform duration-200">
                      <a 
                        href="tel:+16028373370" 
                        className="btn btn-secondary px-6 py-4 text-lg font-semibold inline-flex items-center relative overflow-hidden"
                        data-magnetic="true"
                        data-magnetic-strength="0.3"
                      >
                        <Phone className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" /> 
                        (602) 837-3370
                      </a>
                    </div>
                  </div>
                  
                  <div className="pt-8">
                    <a 
                      href="mailto:info@codespiresolutions.com"
                      className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200 hover:border-primary/30 transition-all duration-300 group hover:scale-105"
                      data-magnetic="true"
                      data-magnetic-strength="0.2"
                    >
                      <Mail className="mr-3 h-5 w-5 text-gray-600 group-hover:text-primary transition-colors duration-200" /> 
                      <span className="text-gray-700 group-hover:text-primary transition-colors duration-200 font-medium">
                        info@codespiresolutions.com
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>
    </div>
  );
}
