'use client';

import Wrapper from "../../../components/ui/Wrapper";
import Button from "../../../components/ui/Button";
import { Download, Mail, Phone, ArrowRight, Zap, Target, TrendingUp, Brain, Cpu, Database, BarChart3, Clock, Shield, CheckCircle, Users, Settings, FileText, Calculator, Layers, Lightbulb, Send, Search, Filter, Award, Globe, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Scene3D, Scene3DProvider, FloatingGeometry } from "../../../animations/3d";
import { ScrollAnimatedSection, ScrollRevealText, ParallaxElement } from "../../../animations/scroll";
import { FluidBackground, MorphingShapes } from "../../../animations/fluid";
import Link from "next/link";

export default function SupplierMatchAI() {
  const challenges = [
    "Hidden or unlisted vendors remain untapped",
    "Missing approved suppliers delay RFQ processing", 
    "Capacity, capability, and quality are ignored during selection",
    "RFQ delays caused by incomplete submissions"
  ];

  const solutions = [
    {
      icon: Search,
      title: "AI Discovery",
      description: "Finds and ranks suppliers across internal and external databases using dynamic filters."
    },
    {
      icon: Target,
      title: "Intelligent Matching",
      description: "Matches RFQs to suppliers based on fit, capability, quality metrics, and delivery history."
    },
    {
      icon: Shield,
      title: "Pre-flight Validation",
      description: "Ensures all RFQs are complete before submission to eliminate rework."
    },
    {
      icon: Award,
      title: "Smart Ranking",
      description: "Scores suppliers by best-fit criteria — quality, cost, capacity, and lead time."
    },
    {
      icon: Brain,
      title: "Self-learning Engine",
      description: "Continuously improves supplier matching accuracy using sourcing feedback and past RFQ outcomes."
    }
  ];

  const capabilities = [
    {
      icon: Search,
      title: "Smart Supplier Discovery",
      description: "Find the right suppliers faster with intelligent search and categorization."
    },
    {
      icon: Brain,
      title: "AI Matching Engine",
      description: "Automatically matches RFQs with suppliers based on key metrics and past performance."
    },
    {
      icon: Award,
      title: "Quality & Capacity Insights",
      description: "Evaluate supplier capabilities with performance dashboards."
    },
    {
      icon: Shield,
      title: "RFQ Pre-flight Check",
      description: "Prevent delays by ensuring complete RFQ data before release."
    },
    {
      icon: Lightbulb,
      title: "Learning Engine",
      description: "Improves accuracy of matches with each sourcing cycle."
    },
    {
      icon: BarChart3,
      title: "Integrated Analytics",
      description: "Gain transparency into sourcing KPIs — supplier responsiveness, quote variance, and lead-time trends."
    }
  ];

  const deploymentFeatures = [
    {
      icon: LinkIcon,
      title: "Integration-ready",
      description: "Works seamlessly with existing ERP, MES, and procurement tools."
    },
    {
      icon: Globe,
      title: "Cloud-based SaaS",
      description: "Rapid deployment with secure access from anywhere."
    },
    {
      icon: Settings,
      title: "Enterprise support",
      description: "API-based integrations and data connectors for scalability."
    },
    {
      icon: Shield,
      title: "Security-first",
      description: "Role-based access, data encryption, and audit-ready tracking."
    }
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
          color="#8b5cf6"
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
                  <span className="text-primary font-medium">Supplier Match AI</span>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center px-6 py-3 bg-purple-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm">
                  <Users className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm font-semibold text-purple-600">Supplier Match AI</span>
                </div>
                
                {/* Main Heading */}
                <ScrollRevealText revealBy="word" staggerDelay={100}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    Supplier Match AI
                  </h1>
                </ScrollRevealText>
                
                {/* Subtitle */}
                <ScrollRevealText revealBy="word" staggerDelay={80}>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 bg-clip-text text-transparent leading-tight">
                    Smarter Supplier Selection for Modern Sourcing
                  </h2>
                </ScrollRevealText>
                
                <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
                  Discover, match, and validate suppliers in minutes. AI-powered sourcing that maximizes savings, improves quality, and accelerates RFQ closures.
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                  {[
                    "Intelligent supplier discovery using real-time data",
                    "Automated RFQ-to-supplier matching for best-fit recommendations", 
                    "Pre-check validations to eliminate incomplete RFQs"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200"
                    >
                      <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{feature}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <Button 
                    className="btn btn-primary px-8 py-4 text-lg font-semibold group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
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
                      Revolutionize Your Sourcing Process
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Supplier Match AI revolutionizes how manufacturers and procurement teams identify and engage suppliers. By leveraging AI-driven discovery, smart ranking, and real-time data validation, it helps teams eliminate delays, find the best-fit vendors, and close RFQs faster.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The system continuously learns from sourcing history, improving recommendations and optimizing supplier performance over time.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { value: "10x", label: "Discovery Speed", icon: Zap },
                      { value: "25%", label: "Cost Savings", icon: TrendingUp },
                      { value: "98%", label: "Quality Score", icon: Shield }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200"
                      >
                        <stat.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right 3D Scene */}
                <div className="relative">
                  <ParallaxElement speed={0.2} direction="vertical">
                    <div className="h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/5 to-purple-600/5 border border-purple-500/10">
                      <Scene3DProvider>
                        <Scene3D enableControls={true}>
                          <FloatingGeometry
                            shapes={[
                              { 
                                type: 'sphere', 
                                position: [0, 0, 0], 
                                color: '#8b5cf6',
                                scale: 1.5,
                                rotationSpeed: [0.002, 0.005, 0.002]
                              },
                              { 
                                type: 'torus', 
                                position: [2, 1, -1], 
                                color: '#a855f7',
                                scale: 0.8,
                                rotationSpeed: [0.003, 0.003, 0.003]
                              },
                              { 
                                type: 'octahedron', 
                                position: [-2, -1, -2], 
                                color: '#9333ea',
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
                            <span className="text-xs font-medium text-gray-700">AI Discovery</span>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-gray-700">Smart Matching</span>
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

      {/* The Challenge */}
      <section className="relative py-24 bg-gradient-to-br from-gray-50 to-white">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  The Challenge
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Traditional sourcing is riddled with inefficiencies that lead to wasted effort and higher costs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{challenge}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* The Solution */}
      <section className="relative py-24">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  The Solution
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Supplier Match AI brings structure and intelligence to the supplier discovery and RFQ matching process
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <solution.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">
                      {solution.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {solution.description}
                    </p>
                  </motion.div>
                ))}
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
                  Comprehensive AI-powered features designed to streamline your entire sourcing process
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
                    className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <capability.icon className="w-6 h-6 text-purple-600" />
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

      {/* Deployment & Integration */}
      <section className="relative py-24">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Deployment & Integration
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Seamlessly integrate with your existing systems and workflows
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {deploymentFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-gray-600">
                          {feature.description}
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

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <FluidBackground
            blobCount={8}
            size={{ min: 250, max: 600 }}
            speed={0.15}
            morphSpeed={0.1}
            color="#8b5cf6"
            opacity={0.05}
            blendMode="multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-purple-600/5 to-purple-500/10"></div>
        </div>

        <Wrapper>
          <div className="relative z-10">
            <ScrollAnimatedSection transitionType="scale" stagger={200}>
              <div className="max-w-5xl mx-auto text-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-purple-500/20 shadow-lg">
                    <Zap className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm font-semibold text-purple-600">Ready to Make Sourcing Smarter?</span>
                  </div>
                  
                  <ScrollRevealText revealBy="word" staggerDelay={120}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      Ready to make sourcing smarter?
                    </h2>
                  </ScrollRevealText>
                  
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Request a live demo or connect with our sourcing experts today.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <div className="relative group hover:scale-105 transition-transform duration-200">
                      <Button 
                        className="btn btn-primary px-8 py-4 text-lg font-semibold relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                        data-magnetic="true"
                        data-magnetic-strength="0.4"
                      >
                        <span className="relative z-10 flex items-center">
                          Request a demo
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/50 to-purple-800/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
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
                      className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200 hover:border-purple-500/30 transition-all duration-300 group hover:scale-105"
                      data-magnetic="true"
                      data-magnetic-strength="0.2"
                    >
                      <Mail className="mr-3 h-5 w-5 text-gray-600 group-hover:text-purple-600 transition-colors duration-200" /> 
                      <span className="text-gray-700 group-hover:text-purple-600 transition-colors duration-200 font-medium">
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
