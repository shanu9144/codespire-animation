'use client';

import { Wrapper, Button } from "@/components/ui";
import { Download, Mail, Phone, ArrowRight, Zap, Target, TrendingUp, Brain, Cpu, Database, BarChart3, Clock, Shield, CheckCircle, Users, Settings, FileText, Calculator, Layers, Lightbulb, Send, Search, Filter, Award, Globe, Link as LinkIcon, Eye, Activity, PieChart, LineChart, FileCheck, DollarSign, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollAnimatedSection, ScrollRevealText, ParallaxElement } from "@/lib/animations/scroll";
import { FluidBackground, MorphingShapes } from "@/lib/animations/fluid";
import Link from "next/link";

import { useRef } from "react";

export default function ForecastAI() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
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
    },
    {
      icon: Settings,
      title: "Adaptive Planning",
      description: "Automatically recalibrates forecasts and plans in real time as new data, trends, or disruptions emerge."
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
    { category: "Data Lakes & APIs", description: "Integrates with Snowflake, AWS, Azure, or your enterprise data." },
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
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-white">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Soft floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div key={i} className="absolute w-2 h-2 bg-primary/20 rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
          ))}
        </div>
        {/* Gradient waves */}
        <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" style={{ y, opacity }} />
        {/* Glassmorphism blur */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-24 flex items-center justify-center overflow-hidden">
        <Wrapper>
          <div className="max-w-6xl mx-auto text-center px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              {/* 3D Icons */}
              <div className="flex justify-center items-center space-x-8 mb-8">
                <motion.div initial={{ opacity: 0, scale: 0.8, rotateY: -180 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1, delay: 0.2 }} className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full animate-pulse" />
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.8, rotateY: 180 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1, delay: 0.4 }} className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                    <Cpu className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full animate-pulse" />
                </motion.div>
              </div>

              {/* Main Heading */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-4xl mx-auto mb-6">
                  <span className="text-primary">Forecast AI</span>
                </h1>
              </motion.div>

              {/* Subheadline */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
                <p className="text-lg md:text-xl text-gray-900 max-w-3xl mx-auto mb-8 font-semibold">Predict What's Next, Plan with Confidence</p>
              </motion.div>

              {/* Description */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
                <p className="text-base md:text-lg max-w-4xl mx-auto mb-12 text-gray-600 leading-relaxed">
                  <span className="text-gray-900">AI-powered forecasting that identifies demand shifts, predicts revenue trends, and empowers smarter business planning.</span>
                  <br />
                  <span className="text-purple-600 font-semibold">Across sales, operations, and supply chains.</span>
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className="flex items-center justify-center">
                <Link href="/schedule-demo">
                  <Button className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <span className="relative z-10 flex items-center">
                      Request a demo
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Wrapper>

        {/* Light rotating 3D object */}
        <motion.div className="absolute top-1/4 right-1/4 w-32 h-32 opacity-10" animate={{ rotateY: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl transform rotate-45" />
        </motion.div>
      </section>

      {/* Transform Business Planning Section */}
      <section className="relative py-24 bg-blue-50">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
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
                    className="group p-8 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden"
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/0 to-blue-50/0 group-hover:from-blue-50/20 group-hover:via-blue-50/10 group-hover:to-blue-50/20 transition-all duration-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <div className="relative z-10 flex items-start space-x-4">
                      <motion.div 
                        className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0"
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
                          <point.icon className="w-7 h-7 text-blue-600" />
                        </motion.div>
                      </motion.div>
                      <div className="flex-1">
                        <motion.h4 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                          viewport={{ once: true }}
                          className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200"
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
                    className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <solution.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
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
                    color: "#2563EB"
                  },
                  {
                    icon: Settings,
                    title: "Operational planning",
                    description: "Align production, logistics, and workforce allocation to forecasted demand",
                    color: "#2563EB"
                  },
                  {
                    icon: PieChart,
                    title: "Financial projections",
                    description: "Anticipate quarterly outcomes and optimize budget allocation with predictive accuracy",
                    color: "#2563EB"
                  },
                  {
                    icon: Calculator,
                    title: "Scenario simulation",
                    description: "Model alternate business conditions and see their impact instantly",
                    color: "#2563EB"
                  },
                  {
                    icon: Eye,
                    title: "Early trend detection",
                    description: "Identify hidden signals in data to act before the market shifts",
                    color: "#2563EB"
                  },
                  {
                    icon: LineChart,
                    title: "Unified analytics dashboard",
                    description: "Centralized forecasting, KPI tracking, and cross-department insights",
                    color: "#2563EB"
                  }
                ].map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: `${capability.color}15` }}
                    >
                      <capability.icon className="w-6 h-6" style={{ color: capability.color }} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
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
      <section className="relative py-24 bg-blue-50">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
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
                      "Improve quota accuracy and pipeline predictability"
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
                    className="group p-6 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl bg-white"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200">
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
                          <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 bg-blue-100">
                            <CheckCircle className="w-3 h-3 text-blue-600" />
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
      <section className="relative py-24 bg-white overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Integrations & Compatibility
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent font-semibold">
                  Seamlessly integrate with your existing systems and workflows
                </span>
              </p>
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
                  <div className="bg-white backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 hover:border-blue-400/30 text-center">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                      {integration.category}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {integration.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
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
                    className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
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
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
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
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Business Planning?
              </h2>
              
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                <span className="text-gray-900">Join hundreds of manufacturing companies already using Forecast AI to</span>
                <br />
                <span className="text-purple-600 font-semibold">accelerate their growth and streamline operations.</span>
              </p>

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
