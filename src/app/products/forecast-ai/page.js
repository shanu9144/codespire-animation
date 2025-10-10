'use client';

import Wrapper from "../../../components/ui/Wrapper";
import Button from "../../../components/ui/Button";
import { Download, Mail, Phone, ArrowRight, Zap, Target, TrendingUp, Brain, Cpu, Database, BarChart3, Clock, Shield, CheckCircle, Users, Settings, FileText, Calculator, Layers, Lightbulb, Send, Search, Filter, Award, Globe, Link as LinkIcon, Eye, Activity, PieChart, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Scene3D, Scene3DProvider, FloatingGeometry } from "../../../animations/3d";
import { ScrollAnimatedSection, ScrollRevealText, ParallaxElement } from "../../../animations/scroll";
import { FluidBackground, MorphingShapes } from "../../../animations/fluid";
import Link from "next/link";

export default function ForecastAI() {
  const painPoints = [
    "Forecasting remains manual, fragmented, and reactive",
    "Sales and operations teams operate in silos with inconsistent data", 
    "Missed trends cause lost sales or overproduction",
    "Inaccurate planning impacts margins and agility"
  ];

  const solutions = [
    {
      icon: BarChart3,
      title: "Holistic forecasting",
      description: "From sales and revenue to operations, supply chain, and inventory."
    },
    {
      icon: Eye,
      title: "Proactive intelligence",
      description: "Early alerts on demand surges, market shifts, or performance dips."
    },
    {
      icon: Calculator,
      title: "Scenario simulation",
      description: "\"What-if\" analysis for price changes, campaigns, or supply fluctuations."
    },
    {
      icon: Layers,
      title: "Unified visibility",
      description: "A single predictive lens across the business."
    },
    {
      icon: Brain,
      title: "Continuous learning",
      description: "Models evolve with new data, improving accuracy and foresight."
    }
  ];

  const capabilities = [
    {
      icon: BarChart3,
      title: "AI-Driven Sales Forecasting",
      description: "Predict revenue and demand across regions, products, or channels using advanced AI models."
    },
    {
      icon: Settings,
      title: "Operational & Resource Planning",
      description: "Align production, logistics, and workforce allocation to forecasted demand."
    },
    {
      icon: PieChart,
      title: "Financial & Revenue Projections",
      description: "Anticipate quarterly outcomes and optimize budget allocation with predictive accuracy."
    },
    {
      icon: Calculator,
      title: "Scenario Simulation Engine",
      description: "Model alternate business conditions — pricing, promotions, supply delays — and see their impact instantly."
    },
    {
      icon: Eye,
      title: "Early Trend Detection",
      description: "Identify hidden signals in data to act before the market shifts."
    },
    {
      icon: LineChart,
      title: "Unified Analytics Dashboard",
      description: "Centralized forecasting, KPI tracking, and cross-department insights for leadership teams."
    }
  ];

  const benefits = [
    {
      category: "For sales teams",
      items: ["Improve quota accuracy and pipeline predictability", "Optimize sales strategy using demand intelligence"]
    },
    {
      category: "For operations & supply chain", 
      items: ["Balance production and inventory to match forecasted demand"]
    },
    {
      category: "For finance & strategy",
      items: ["Enhance revenue visibility and improve financial planning cycles"]
    },
    {
      category: "For leadership",
      items: ["Make proactive, data-driven strategic decisions with confidence"]
    }
  ];

  const measurableImpact = [
    { metric: "20–30%", description: "improvement in forecast accuracy" },
    { metric: "15–25%", description: "reduction in planning cycle time" },
    { metric: "Up to 20%", description: "savings in working capital tied to inventory" }
  ];

  const integrations = [
    { category: "ERP & CRM", description: "Connects with SAP, Oracle, Salesforce, HubSpot, etc." },
    { category: "BI Tools", description: "Power BI, Tableau, Looker, and more." },
    { category: "Data Lakes & APIs", description: "Integrates with Snowflake, AWS, Azure, or your enterprise data stack." },
    { category: "Collaboration Tools", description: "Share insights via Slack, Teams, or embedded dashboards." }
  ];

  const deploymentFeatures = [
    {
      icon: Globe,
      title: "Flexible deployment",
      description: "Cloud-hosted or on-premises setup."
    },
    {
      icon: Shield,
      title: "Enterprise-grade security",
      description: "Encryption at rest/in transit, RBAC, and compliance-ready logging."
    },
    {
      icon: Settings,
      title: "Scalable architecture",
      description: "Handles large data volumes and complex models without performance lag."
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
          color="#06b6d4"
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
                  <span className="text-primary font-medium">Forecast AI</span>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center px-6 py-3 bg-cyan-500/10 rounded-full border border-cyan-500/20 backdrop-blur-sm">
                  <BarChart3 className="w-5 h-5 text-cyan-600 mr-3" />
                  <span className="text-sm font-semibold text-cyan-600">Forecast AI</span>
                </div>
                
                {/* Main Heading */}
                <ScrollRevealText revealBy="word" staggerDelay={100}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    Forecast AI
                  </h1>
                </ScrollRevealText>
                
                {/* Subtitle */}
                <ScrollRevealText revealBy="word" staggerDelay={80}>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-600 bg-clip-text text-transparent leading-tight">
                    Predict What's Next, Plan with Confidence
                  </h2>
                </ScrollRevealText>
                
                <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
                  AI-powered forecasting that identifies demand shifts, predicts revenue trends, and empowers smarter business planning across sales, operations, and supply chains.
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                  {[
                    "AI-driven forecasting for sales, operations, and finance",
                    "Real-time trend detection and scenario simulations", 
                    "Smarter planning that drives profitability and agility"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200"
                    >
                      <CheckCircle className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{feature}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                  <Button 
                    className="btn btn-primary px-8 py-4 text-lg font-semibold group bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800"
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
                      Transform Your Business Planning
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Forecast AI is an advanced predictive intelligence platform that empowers organizations to plan proactively — not reactively. It uses deep learning models to identify hidden trends, detect demand fluctuations early, and forecast outcomes across sales, inventory, operations, and revenue.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      By combining internal business data with external market indicators, Forecast AI delivers the clarity leaders need to make confident, data-backed decisions — faster, and with measurable impact.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6">
                    {[
                      { value: "92%", label: "Accuracy", icon: Target },
                      { value: "5x", label: "Planning Speed", icon: Clock },
                      { value: "+30%", label: "ROI Impact", icon: TrendingUp }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200"
                      >
                        <stat.icon className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right 3D Scene */}
                <div className="relative">
                  <ParallaxElement speed={0.2} direction="vertical">
                    <div className="h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/5 to-cyan-600/5 border border-cyan-500/10">
                      <Scene3DProvider>
                        <Scene3D enableControls={true}>
                          <FloatingGeometry
                            shapes={[
                              { 
                                type: 'sphere', 
                                position: [0, 0, 0], 
                                color: '#06b6d4',
                                scale: 1.5,
                                rotationSpeed: [0.002, 0.005, 0.002]
                              },
                              { 
                                type: 'torus', 
                                position: [2, 1, -1], 
                                color: '#0891b2',
                                scale: 0.8,
                                rotationSpeed: [0.003, 0.003, 0.003]
                              },
                              { 
                                type: 'octahedron', 
                                position: [-2, -1, -2], 
                                color: '#0e7490',
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
                            <span className="text-xs font-medium text-gray-700">AI Forecasting</span>
                          </div>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-gray-700">Trend Analysis</span>
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
                  Modern businesses operate in volatile environments — markets shift, demand fluctuates, and consumer behavior changes rapidly. Yet most organizations still rely on static reports or spreadsheets to plan ahead.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white rounded-xl border border-gray-200 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{point}</p>
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
                  Forecast AI transforms how enterprises forecast, plan, and respond. It unifies data across departments, applies AI-driven predictive modeling, and provides real-time insights for proactive planning.
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
                    className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <solution.icon className="w-6 h-6 text-cyan-600" />
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
                  Comprehensive AI-powered features designed to transform your forecasting and planning process
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
                    className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <capability.icon className="w-6 h-6 text-cyan-600" />
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="p-8 bg-white rounded-2xl border border-gray-200 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">
                      {benefit.category}
                    </h4>
                    <div className="space-y-4">
                      {benefit.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-600">{item}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Measurable Impact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                className="p-8 bg-gradient-to-r from-cyan-500/5 to-cyan-600/5 rounded-2xl border border-cyan-500/20"
              >
                <h4 className="text-2xl font-semibold text-gray-900 mb-6">Measurable Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {measurableImpact.map((impact, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-cyan-600 mb-2">{impact.metric}</div>
                      <div className="text-gray-600">{impact.description}</div>
                    </div>
                  ))}
                </div>
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
                    className="p-6 bg-white rounded-xl border border-gray-200 hover:border-cyan-500/30 transition-all duration-300"
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
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Deployment & Security
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Enterprise-ready deployment options with robust security and scalability
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {deploymentFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white rounded-xl border border-gray-200 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
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
            color="#06b6d4"
            opacity={0.05}
            blendMode="multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-cyan-600/5 to-cyan-500/10"></div>
        </div>

        <Wrapper>
          <div className="relative z-10">
            <ScrollAnimatedSection transitionType="scale" stagger={200}>
              <div className="max-w-5xl mx-auto text-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-cyan-500/20 shadow-lg">
                    <Zap className="w-5 h-5 text-cyan-600 mr-3" />
                    <span className="text-sm font-semibold text-cyan-600">Ready to Forecast Your Business Future?</span>
                  </div>
                  
                  <ScrollRevealText revealBy="word" staggerDelay={120}>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      Ready to forecast your business future?
                    </h2>
                  </ScrollRevealText>
                  
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    See how Forecast AI transforms planning and decision-making across your organization.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <div className="relative group hover:scale-105 transition-transform duration-200">
                      <Button 
                        className="btn btn-primary px-8 py-4 text-lg font-semibold relative overflow-hidden bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800"
                        data-magnetic="true"
                        data-magnetic-strength="0.4"
                      >
                        <span className="relative z-10 flex items-center">
                          Request a demo
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600/50 to-cyan-800/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
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
                      className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200 hover:border-cyan-500/30 transition-all duration-300 group hover:scale-105"
                      data-magnetic="true"
                      data-magnetic-strength="0.2"
                    >
                      <Mail className="mr-3 h-5 w-5 text-gray-600 group-hover:text-cyan-600 transition-colors duration-200" /> 
                      <span className="text-gray-700 group-hover:text-cyan-600 transition-colors duration-200 font-medium">
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
