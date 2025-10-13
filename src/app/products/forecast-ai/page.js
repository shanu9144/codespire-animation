'use client';

import { Wrapper, Button } from "@/shared/ui";
import { Download, Mail, Phone, ArrowRight, Zap, Target, TrendingUp, Brain, Cpu, Database, BarChart3, Clock, Shield, CheckCircle, Users, Settings, FileText, Calculator, Layers, Lightbulb, Send, Search, Filter, Award, Globe, Link as LinkIcon, Eye, Activity, PieChart, LineChart, FileCheck, DollarSign, Star } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollAnimatedSection, ScrollRevealText, ParallaxElement } from "@/shared/animations/scroll";
import { FluidBackground, MorphingShapes } from "@/shared/animations/fluid";
import Link from "next/link";

export default function ForecastAI() {
  const painPoints = [
    {
      icon: Clock,
      title: "Forecasting remains manual, fragmented, and reactive",
      description: "Traditional methods are slow, prone to errors, and can't keep up with market changes."
    },
    {
      icon: Users,
      title: "Sales and operations teams operate in silos with inconsistent data",
      description: "Lack of unified data leads to misaligned strategies and missed opportunities."
    },
    {
      icon: TrendingUp,
      title: "Missed trends cause lost sales or overproduction",
      description: "Inability to detect and react to market shifts results in significant financial losses."
    },
    {
      icon: BarChart3,
      title: "Inaccurate planning impacts margins and agility",
      description: "Poor planning leads to inefficient resource allocation and reduced competitive edge."
    }
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
        
        {/* Floating geometric shapes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.1, 0],
              scale: [0, 1, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 4 + Math.random() * 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center space-y-8">
                {/* Breadcrumb */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center space-x-2 text-sm"
                >
                  <Link href="/products" className="text-white/80 hover:text-white transition-colors duration-200">
                    Products
                  </Link>
                  <span className="text-white">/</span>
                  <span className="text-white font-medium">Forecast AI</span>
                </motion.div>

                {/* Premium Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight" style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}>
                    Forecast AI
                  </h1>
                </motion.div>
                
                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/95 leading-tight" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}>
                    Predict What's Next, Plan with Confidence
                  </h2>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg md:text-xl text-white/80 max-w-4xl mx-auto leading-relaxed"
                >
                  AI-powered forecasting that identifies demand shifts, predicts revenue trends, and empowers smarter business planning across sales, operations, and supply chains.
                </motion.p>

                {/* Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-12">
                  {[
                    "AI-driven forecasting for sales, operations, and finance",
                    "Real-time trend detection and scenario simulations", 
                    "Smarter planning that drives profitability and agility"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group p-8 bg-white/10 backdrop-blur-[20px] rounded-[20px] border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#4F46E5] to-[#667eea] rounded-[12px] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white font-medium leading-relaxed">{feature}</p>
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
                      <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                        <Download className="mr-3 h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" /> 
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

      {/* Transform Business Planning Section */}
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
                  Transform Your Business Planning
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Forecast AI uses deep learning models to identify hidden trends, detect demand fluctuations early, and forecast outcomes across sales, inventory, operations, and revenue. Get instant insights with measurable impact.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { value: "92%", label: "Forecast accuracy" },
                  { value: "5x", label: "Planning speed" },
                  { value: "30%", label: "ROI improvement" }
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

      {/* The Challenge */}
      <section className="relative py-24 bg-white overflow-hidden">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <motion.h3 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                >
                  The Challenge
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
                >
                  Modern businesses operate in volatile environments — markets shift, demand fluctuates, and consumer behavior changes rapidly. Yet most organizations still rely on static reports or spreadsheets to plan ahead.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.15,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -12, 
                      scale: 1.03,
                      transition: { duration: 0.3 }
                    }}
                    className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-red-300 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden"
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-red-50/0 via-red-50/0 to-red-50/0 group-hover:from-red-50/20 group-hover:via-red-50/10 group-hover:to-red-50/20 transition-all duration-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <div className="relative z-10 flex items-start space-x-4">
                      <motion.div 
                        className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center flex-shrink-0"
                        whileHover={{ 
                          scale: 1.15,
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          <point.icon className="w-7 h-7 text-red-600" />
                        </motion.div>
                      </motion.div>
                      <div className="flex-1">
                        <motion.h4 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                          viewport={{ once: true }}
                          className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-200"
                        >
                          {point.title}
                        </motion.h4>
                        <motion.p 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                          viewport={{ once: true }}
                          className="text-gray-600 leading-relaxed"
                        >
                          {point.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* The Solution */}
      <section className="relative py-24 bg-white">
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
                  className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg mb-6"
                >
                  <span className="text-sm font-semibold text-purple-600">Capabilities</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Key Capabilities
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Everything you need to forecast smarter, plan better, and make data-driven decisions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: BarChart3,
                    title: "AI-driven sales forecasting",
                    description: "Predict revenue and demand across regions, products, or channels using advanced AI models",
                    color: "#4F46E5"
                  },
                  {
                    icon: Settings,
                    title: "Operational planning",
                    description: "Align production, logistics, and workforce allocation to forecasted demand",
                    color: "#10B981"
                  },
                  {
                    icon: PieChart,
                    title: "Financial projections",
                    description: "Anticipate quarterly outcomes and optimize budget allocation with predictive accuracy",
                    color: "#F59E0B"
                  },
                  {
                    icon: Calculator,
                    title: "Scenario simulation",
                    description: "Model alternate business conditions and see their impact instantly",
                    color: "#8B5CF6"
                  },
                  {
                    icon: Eye,
                    title: "Early trend detection",
                    description: "Identify hidden signals in data to act before the market shifts",
                    color: "#EC4899"
                  },
                  {
                    icon: LineChart,
                    title: "Unified analytics dashboard",
                    description: "Centralized forecasting, KPI tracking, and cross-department insights",
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
                  Real results from businesses using Forecast AI
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  {
                    theme: "purple",
                    heading: "For sales teams",
                    benefits: [
                      "Improve quota accuracy and pipeline predictability",
                      "Optimize sales strategy using demand intelligence"
                    ]
                  },
                  {
                    theme: "blue",
                    heading: "For operations & supply chain",
                    benefits: [
                      "Balance production and inventory to match forecasted demand"
                    ]
                  },
                  {
                    theme: "green",
                    heading: "For finance & strategy",
                    benefits: [
                      "Enhance revenue visibility and improve financial planning cycles"
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

      {/* Integrations & Compatibility */}
      <section className="relative py-24 bg-white">
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
      <section className="relative py-24 bg-white">
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
                    Ready to forecast your business future?
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
                  >
                    Join hundreds of businesses who've already made the switch
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
                        className="relative px-8 py-4 text-lg font-semibold bg-[#8B5CF6] border-2  text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                        data-magnetic="true"
                        data-magnetic-strength="0.4"
                      >
                        <span className="relative z-10 flex items-center">
                          Request a demo
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                        <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="relative px-6 py-4 text-lg font-semibold bg-transparent border-2 border-white text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                        data-magnetic="true"
                        data-magnetic-strength="0.3"
                      >
                        <span className="relative z-10 flex items-center">
                          Talk to sales
                          <Phone className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
