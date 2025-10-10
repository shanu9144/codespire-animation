'use client';

import Wrapper from "../../components/ui/Wrapper";
import Button from "../../components/ui/Button";
import { Download, Mail, Phone, ArrowRight, Zap, Target, TrendingUp, Brain, Cpu, Database, BarChart3, Users, Clock, Shield, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Scene3D, Scene3DProvider, FloatingGeometry } from "../../animations/3d";
import { ScrollAnimatedSection, ScrollRevealText, ParallaxElement } from "../../animations/scroll";
import { FluidBackground, MorphingShapes } from "../../animations/fluid";
import Link from "next/link";

export default function Products() {
  const products = [
    {
      id: 'smart-rfq-ai',
      title: 'Smart RFQ AI',
      subtitle: 'Intelligent quoting for modern manufacturing',
      description: 'Turn 2D/3D drawings into accurate, professional quotes in minutes. Reduce manual effort, speed RFQ cycles, and win more orders.',
      icon: Target,
      color: '#384bff',
      gradient: 'from-blue-500 to-blue-600',
      features: [
        'Automated CAD-to-quote processing',
        'Data-driven costing estimates',
        'Instant professional delivery'
      ],
      stats: [
        { label: 'Time Saved', value: '85%', icon: Clock },
        { label: 'Accuracy', value: '95%', icon: Shield },
        { label: 'Win Rate', value: '+40%', icon: TrendingUp }
      ]
    },
    {
      id: 'supplier-match-ai',
      title: 'Supplier Match AI',
      subtitle: 'Smarter Supplier Selection for Modern Sourcing',
      description: 'Discover, match, and validate suppliers in minutes. AI-powered sourcing that maximizes savings, improves quality, and accelerates RFQ closures.',
      icon: Users,
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-purple-600',
      features: [
        'Intelligent supplier discovery',
        'Automated RFQ-to-supplier matching',
        'Pre-check validations'
      ],
      stats: [
        { label: 'Discovery Speed', value: '10x', icon: Zap },
        { label: 'Cost Savings', value: '25%', icon: TrendingUp },
        { label: 'Quality Score', value: '98%', icon: Shield }
      ]
    },
    {
      id: 'forecast-ai',
      title: 'Forecast AI',
      subtitle: 'Predict What\'s Next, Plan with Confidence',
      description: 'AI-powered forecasting that identifies demand shifts, predicts revenue trends, and empowers smarter business planning across sales, operations, and supply chains.',
      icon: BarChart3,
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-cyan-600',
      features: [
        'AI-driven forecasting',
        'Real-time trend detection',
        'Scenario simulations'
      ],
      stats: [
        { label: 'Accuracy', value: '92%', icon: Target },
        { label: 'Planning Speed', value: '5x', icon: Clock },
        { label: 'ROI Impact', value: '+30%', icon: TrendingUp }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Primary Fluid Background */}
        <FluidBackground
          blobCount={8}
          size={{ min: 300, max: 800 }}
          speed={0.15}
          morphSpeed={0.1}
          color="#384bff"
          opacity={0.04}
          blendMode="multiply"
        />
        
        {/* Secondary Floating Elements */}
        <div className="absolute inset-0">
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-primary/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-primary/20 animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '2s'
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary/20 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 md:pt-24 pb-12 md:pb-16">
        <Wrapper>
          <div className="max-w-6xl mx-auto text-center px-4 md:px-6">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="space-y-6 md:space-y-8">
                
                {/* Subtitle */}
                <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight max-w-4xl mx-auto">
                  <ScrollRevealText revealBy="word" staggerDelay={80}>
                    <span className="text-gray-700">Explore our AI products built to</span>
                  </ScrollRevealText>
                  <br />
                  <ScrollRevealText revealBy="word" staggerDelay={100}>
                    <span className="bg-gradient-to-r from-primary via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                      Accelerate Manufacturing, Sourcing, and Planning
                    </span>
                  </ScrollRevealText>
                </div>
                
                <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Transform your business operations with intelligent automation, 
                  predictive analytics, and seamless integration across your entire workflow.
                </p>
                  </div>
                </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* Products Grid Section */}
      <section className="relative pb-16 md:pb-24">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Morphing Shapes */}
          <MorphingShapes
            shapes={[
              {
                x: '5%',
                y: '15%',
                radius: 200,
                color: '#384bff',
                opacity: 0.03,
                morphSpeed: 0.008,
                complexity: 8
              },
              {
                x: '95%',
                y: '85%',
                radius: 220,
                color: '#8b5cf6',
                opacity: 0.025,
                morphSpeed: 0.01,
                complexity: 10
              },
              {
                x: '50%',
                y: '50%',
                radius: 150,
                color: '#06b6d4',
                opacity: 0.02,
                morphSpeed: 0.012,
                complexity: 6
              }
            ]}
            className="w-full h-full"
          />
          
          {/* Floating Tech Elements */}
          <div className="absolute inset-0">
            {/* Circuit-like Lines */}
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse"></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Floating Icons */}
            <div className="absolute top-1/3 left-1/4 w-8 h-8 text-primary/20 animate-bounce" style={{ animationDuration: '3s' }}>
              <Brain className="w-full h-full" />
            </div>
            <div className="absolute top-2/3 right-1/4 w-8 h-8 text-purple-500/20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <Cpu className="w-full h-full" />
            </div>
            <div className="absolute top-1/2 left-1/2 w-8 h-8 text-cyan-500/20 animate-bounce" style={{ animationDuration: '5s', animationDelay: '2s' }}>
              <Database className="w-full h-full" />
            </div>
          </div>
          
          {/* Animated Dots Pattern */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        <Wrapper>
          <div className="relative z-10">
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4 md:px-6 relative">
              {/* Floating Particles Around Cards */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/20 rounded-full animate-ping"
                    style={{
                      left: `${20 + (i * 5)}%`,
                      top: `${30 + (i * 3)}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + (i % 3)}s`
                    }}
                  ></div>
                ))}
              </div>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                  className="group"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-full min-h-[600px] bg-white rounded-2xl md:rounded-3xl border border-gray-200 hover:border-gray-300 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:-translate-y-2 cursor-pointer shadow-lg hover:shadow-2xl flex flex-col group-hover:scale-[1.02] group-hover:rotate-1">
                      {/* Card Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                      
                      {/* Enhanced Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`}></div>
                      
                      {/* Animated Border */}
                      <div className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]`}>
                        <div className="w-full h-full bg-white rounded-2xl md:rounded-3xl"></div>
                      </div>
                      
                      {/* 3D Icon Container */}
                      <div className="relative p-6 md:p-8 pb-4 md:pb-6 flex flex-col h-full">
                        <div className="relative">
                          {/* 3D Icon Background */}
                          <div className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br ${product.gradient} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 relative group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl`}>
                            <product.icon className="w-9 h-9 md:w-12 md:h-12 text-white" />
                            
                            {/* Floating 3D Elements */}
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-white/30 rounded-full animate-pulse delay-100"></div>
                    </div>
                    
                          {/* Micro 3D Animation Elements */}
                          <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <Scene3DProvider>
                              <Scene3D enableControls={false}>
                          <FloatingGeometry
                            shapes={[
                              { 
                                      type: 'sphere', 
                                position: [0, 0, 0], 
                                      color: product.color,
                                      scale: 0.3,
                                      rotationSpeed: [0.01, 0.01, 0.01]
                                    }
                                  ]}
                                  mouseInfluence={0.2}
                                  animationSpeed={1.5}
                            enableGlow={true}
                                  glowIntensity={0.4}
                          />
                        </Scene3D>
                      </Scene3DProvider>
                          </div>
                        </div>
                        
                        {/* Product Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300 leading-tight">
                          {product.title}
                        </h3>
                        
                        {/* Product Subtitle */}
                        <p className="text-lg md:text-xl font-semibold text-gray-700 mb-4 group-hover:text-gray-800 transition-colors duration-300 leading-tight">
                          {product.subtitle}
                        </p>
                        
                        {/* Product Description */}
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                          {product.description}
                        </p>
                      </div>
                      
                      {/* Features List */}
                      <div className="px-6 md:px-8 pb-4 md:pb-6 flex-grow">
                        <div className="space-y-2 md:space-y-3">
                          {product.features.map((feature, featureIndex) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: (index * 0.15) + (featureIndex * 0.1) + 0.3, ease: "easeOut" }}
                              className="flex items-center space-x-3 group/feature"
                            >
                              <div className={`w-2 h-2 bg-gradient-to-r ${product.gradient} rounded-full group-hover/feature:scale-150 transition-transform duration-200`}></div>
                              <span className="text-base text-gray-600 group-hover/feature:text-gray-800 transition-colors duration-200 font-medium">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Stats Section */}
                      <div className="px-6 md:px-8 pb-4 md:pb-6 mt-auto">
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                          {product.stats.map((stat, statIndex) => (
                            <motion.div
                              key={statIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: (index * 0.15) + (statIndex * 0.1) + 0.5, ease: "easeOut" }}
                              className="text-center p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl group-hover:bg-gray-100 transition-colors duration-300"
                            >
                              <stat.icon className={`w-4 h-4 md:w-5 md:h-5 mx-auto mb-1 md:mb-2 text-gray-600 group-hover:text-gray-800 transition-colors duration-300`} />
                              <div className="text-sm md:text-lg font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                                {stat.value}
                              </div>
                              <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
                                {stat.label}
                              </div>
                            </motion.div>
                        ))}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="px-6 md:px-8 pb-6 md:pb-8 mt-auto">
                        <div className="flex flex-col gap-2 md:gap-3">
                          <Button 
                            className={`w-full bg-gradient-to-r ${product.gradient} text-white hover:shadow-xl hover:scale-105 group/btn transition-all duration-300 py-4 px-6 rounded-xl font-semibold text-base border-0 shadow-lg relative overflow-hidden`}
                            data-magnetic="true"
                            data-magnetic-strength="0.2"
                          >
                            {/* Button Ripple Effect */}
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            {/* Button Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-0 group-hover/btn:opacity-50 blur-lg transition-opacity duration-300 -z-10`}></div>
                            <span className="flex items-center justify-center">
                              Request a demo
                              <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                            </span>
                          </Button>
                          
                          <Button 
                            className={`w-full bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:scale-105 group/btn transition-all duration-300 py-4 px-6 rounded-xl font-semibold text-base shadow-md hover:shadow-lg relative overflow-hidden`}
                            variant="outline"
                            data-magnetic="true"
                            data-magnetic-strength="0.1"
                          >
                            {/* Button Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            <span className="flex items-center justify-center">
                              <Download className="mr-2 h-5 w-5 group-hover/btn:scale-110 transition-transform duration-200" />
                              Download datasheet
                            </span>
                          </Button>
                      </div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl -z-10`}></div>
                      
                      {/* Corner Accent */}
                      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-bl-3xl`}></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
              </div>
          </div>
        </Wrapper>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <FluidBackground
            blobCount={10}
            size={{ min: 300, max: 700 }}
            speed={0.12}
            morphSpeed={0.08}
            color="#384bff"
            opacity={0.06}
            blendMode="multiply"
          />
          
          {/* Floating Action Elements */}
          <div className="absolute inset-0">
            {/* Animated Lines */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-pulse" style={{ animationDuration: '3s' }}></div>
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
            
            {/* Floating Call-to-Action Icons */}
            <div className="absolute top-1/4 left-1/3 w-12 h-12 text-primary/20 animate-bounce" style={{ animationDuration: '4s' }}>
              <Phone className="w-full h-full" />
            </div>
            <div className="absolute top-1/4 right-1/3 w-12 h-12 text-purple-500/20 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
              <Mail className="w-full h-full" />
            </div>
            <div className="absolute bottom-1/4 left-1/2 w-12 h-12 text-cyan-500/20 animate-bounce" style={{ animationDuration: '6s', animationDelay: '2s' }}>
              <Calendar className="w-full h-full" />
            </div>
          </div>
          
          {/* Sparkle Effects */}
          <div className="absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/10"></div>
        </div>

        <Wrapper>
          <div className="relative z-10">
            <ScrollAnimatedSection transitionType="scale" stagger={200}>
              <div className="max-w-5xl mx-auto text-center px-4 md:px-6">
                <div className="space-y-6 md:space-y-8">
                  {/* Badge */}
                  <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-lg">
                    <Zap className="w-5 h-5 text-primary mr-3" />
                    <span className="text-sm font-semibold text-primary">Ready to Transform Your Business?</span>
                  </div>
                  
                  
                  {/* Subtitle */}
                  <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Join hundreds of companies already using our AI-powered solutions to accelerate their growth and streamline operations.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 md:pt-8">
                    <div className="relative group hover:scale-105 transition-transform duration-200">
                      <Button 
                        className="btn btn-primary px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold relative overflow-hidden rounded-lg md:rounded-xl"
                        data-magnetic="true"
                        data-magnetic-strength="0.4"
                      >
                        <span className="relative z-10 flex items-center">
                          Request a demo
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                        
                        {/* Ripple Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/50 to-purple-600/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                      </Button>
                    </div>
                    
                    <div className="relative group hover:scale-105 transition-transform duration-200">
                      <a 
                        href="tel:+16028373370" 
                        className="btn btn-secondary px-6 py-3 md:py-4 text-base md:text-lg font-semibold inline-flex items-center relative overflow-hidden rounded-lg md:rounded-xl"
                        data-magnetic="true"
                        data-magnetic-strength="0.3"
                      >
                        <Phone className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" /> 
                        (602) 837-3370
                      </a>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="pt-6 md:pt-8">
                    <a 
                      href="mailto:info@codespiresolutions.com"
                      className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200 hover:border-primary/30 transition-all duration-300 group hover:scale-105 text-sm md:text-base"
                      data-magnetic="true"
                      data-magnetic-strength="0.2"
                    >
                      <Mail className="mr-3 h-5 w-5 text-gray-600 group-hover:text-primary transition-colors duration-200" /> 
                      <span className="text-gray-700 group-hover:text-primary transition-colors duration-200 font-medium">
                        info@codespiresolutions.com
                      </span>
                    </a>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="pt-8 md:pt-12 border-t border-gray-200/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
                      {[
                        { number: "50+", label: "Skilled Experts" },
                        { number: "7+", label: "Satisfied Clients" },
                        { number: "5+", label: "Global Industries" }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="space-y-1 md:space-y-2"
                        >
                          <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                          <div className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
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