'use client';

import { Wrapper, Button } from "@/components/ui";
import { Download, Phone, ArrowRight, Target, Brain, Cpu, Database, BarChart3, Clock, Shield, CheckCircle, Settings, FileText, Lightbulb, Search, Award, Cloud, Lock, Eye, TrendingUp, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollAnimatedSection } from "@/lib/animations/scroll";
import Link from "next/link";
import { useRef } from "react";

export default function SupplierMatchAI() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const challenges = [
    {
      icon: Eye,
      title: "Hidden or unlisted vendors remain untapped",
      description: "Limited visibility into the full supplier ecosystem leads to missed opportunities and higher costs"
    },
    {
      icon: Clock,
      title: "Missing approved suppliers delay RFQ processing", 
      description: "Incomplete supplier databases cause delays and force teams to work with suboptimal vendors"
    },
    {
      icon: Target,
      title: "Capacity, capability, and quality are ignored during selection",
      description: "Manual processes fail to match RFQ requirements with supplier capabilities effectively"
    },
    {
      icon: FileText,
      title: "RFQ delays caused by incomplete submissions",
      description: "Poor RFQ quality leads to back-and-forth clarifications and extended sourcing cycles"
    }
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
    },
    {
      icon: TrendingUp,
      title: "Predictive Insights",
      description: "Anticipates supplier risks and performance trends using AI-driven analytics - helping sourcing teams make proactive, data-backed decisions."
    }
  ];



  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-white">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Soft floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
        </div>
        {/* Gradient waves */}
        <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" style={{ y, opacity }} />
        {/* Glassmorphism blur */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-16 flex items-center justify-center overflow-hidden">
        <Wrapper>
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
                <div className="flex justify-center lg:justify-start items-center space-x-8 mb-4">
                  <motion.div initial={{ opacity: 0, scale: 0.8, rotateY: -180 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1, delay: 0.2 }} className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full animate-pulse" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8, rotateY: 180 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1, delay: 0.4 }} className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                      <Cpu className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full animate-pulse" />
                  </motion.div>
                </div>

                {/* Main Heading */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
                  <h1 className="text-2xl lg:text-4xl font-bold leading-tight tracking-tight mb-4 text-center lg:text-left">
                    <span className="text-primary">Supplier Match AI</span>
                  </h1>
                </motion.div>
                
                {/* Subheadline */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
                  <p className="text-lg md:text-xl text-gray-900 max-w-3xl mx-auto lg:mx-0 mb-4 font-semibold text-center lg:text-left">Smarter Supplier Selection for Modern Sourcing</p>
                </motion.div>

                {/* Description */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
                  <p className="text-base md:text-lg max-w-4xl mx-auto lg:mx-0 mb-6 text-gray-600 leading-relaxed text-center lg:text-left">
                    <span className="text-gray-900">Discover, match, and validate suppliers in minutes.</span>
                    <br />
                    <span className="text-purple-600 font-semibold">AI-powered sourcing that maximizes savings, improves quality, and accelerates RFQ closures.</span>
                  </p>
                </motion.div>
                  
                {/* CTA Button */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className="flex items-center justify-center lg:justify-start">
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
                      {/* YouTube Video Embed */}
                      <iframe
                        className="w-full h-[350px] lg:h-[400px] rounded-2xl"
                        src="https://www.youtube.com/embed/LzZB7EsZYxQ"
                        title="Supplier Match AI Demo Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        aria-label="Supplier Match AI Demo Video"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Wrapper>

        {/* Light rotating 3D object */}
        <motion.div className="absolute top-1/4 right-1/4 w-32 h-32 opacity-10" animate={{ rotateY: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl transform rotate-45" />
        </motion.div>
      </section>

      {/* Transform Sourcing Process Section */}
      <section className="relative py-24 bg-blue-100">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                  Transform Your Sourcing Process
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Supplier Match AI revolutionizes how manufacturers identify and engage suppliers. By leveraging AI-driven discovery, smart ranking, and real-time data validation, it helps teams eliminate delays, find the best-fit vendors, and close RFQs faster.
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { value: "10x", label: "Discovery speed" },
                  { value: "25%", label: "Cost savings" },
                  { value: "98%", label: "Quality score" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/60">
                      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{stat.value}</div>
                      <div className="text-lg font-semibold text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimatedSection>
          </div>
        </Wrapper>
      </section>

      {/* The Challenge */}
      <section className="relative py-24 bg-white overflow-hidden">
        {/* Subtle connecting background element */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent" />
        
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-8">
                <motion.h3 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                >
                  The Challenge
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-purple-600 font-semibold text-lg mb-6"
                >
                  Traditional sourcing is riddled with inefficiencies that lead to wasted effort and higher costs
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {challenges.map((challenge, index) => (
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
                          <challenge.icon className="w-7 h-7 text-blue-600" />
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
                          {challenge.title}
                        </motion.h4>
                        <motion.p 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                          viewport={{ once: true }}
                          className="text-gray-600 leading-relaxed"
                        >
                          {challenge.description}
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
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  The Solution
                </h3>
                <p className="text-purple-600 font-semibold text-lg">
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
                    className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <solution.icon className="w-6 h-6 text-blue-600" />
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
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Key Capabilities
                </h2>
                <p className="text-purple-600 font-semibold text-lg">
                  Everything you need to source smarter, match better, and close deals faster
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Search,
                    title: "Smart supplier discovery",
                    description: "Find the right suppliers faster with intelligent search and categorization",
                    color: "#2563EB"
                  },
                  {
                    icon: Brain,
                    title: "AI matching engine",
                    description: "Automatically matches RFQs with suppliers based on key metrics and past performance",
                    color: "#2563EB"
                  },
                  {
                    icon: Award,
                    title: "Quality & capacity insights",
                    description: "Evaluate supplier capabilities with performance dashboards",
                    color: "#2563EB"
                  },
                  {
                    icon: Shield,
                    title: "RFQ pre-flight check",
                    description: "Prevent delays by ensuring complete RFQ data before release",
                    color: "#2563EB"
                  },
                  {
                    icon: Lightbulb,
                    title: "Learning engine",
                    description: "Improves accuracy of matches with each sourcing cycle",
                    color: "#2563EB"
                  },
                  {
                    icon: BarChart3,
                    title: "Integrated analytics",
                    description: "Gain transparency into sourcing KPIs and supplier performance trends",
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
      <section className="relative py-24 bg-blue-50">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Benefits & ROI
                </h2>
                <p className="text-purple-600 font-semibold text-lg">
                  Real results from manufacturers using Supplier Match AI
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  {
                    theme: "blue",
                    heading: "For Procurement Teams",
                    benefits: [
                      "Reduce supplier discovery time by 80%",
                      "Improve RFQ response rates and quality"
                    ]
                  },
                  {
                    theme: "blue",
                    heading: "For Sourcing Managers",
                    benefits: [
                      "Find better-fit suppliers faster with AI matching"
                    ]
                  },
                  {
                    theme: "blue",
                    heading: "For Operations",
                    benefits: [
                      "Streamline supplier onboarding and validation processes"
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
                    className="group p-6 rounded-2xl border transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-200">
                      {benefit.heading}
                    </h3>
                    <div className="space-y-3">
                      {benefit.benefits.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
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
      <section className="relative py-24 bg-white">
        <Wrapper>
          <div className="max-w-6xl mx-auto">
            <ScrollAnimatedSection transitionType="fadeUp" stagger={200}>
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Integrations & Compatibility
                </h3>
                <p className="text-purple-600 font-semibold text-lg">
                  Works seamlessly with your existing systems and workflows
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Database,
                    title: "ERP Integration",
                    description: "Connect with SAP, Oracle, Microsoft Dynamics, and other enterprise systems"
                  },
                  {
                    icon: Cloud,
                    title: "Cloud Platforms",
                    description: "Deploy on AWS, Azure, Google Cloud with enterprise-grade security"
                  },
                  {
                    icon: Settings,
                    title: "API Access",
                    description: "RESTful APIs for custom integrations and third-party applications"
                  }
                ].map((integration, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <integration.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                      {integration.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Deployment & Security
                </h2>
                <p className="text-purple-600 font-semibold text-lg">
                  Enterprise-grade security and flexible deployment options
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Enterprise Security",
                    description: "SOC 2 Type II compliant with end-to-end encryption and role-based access control"
                  },
                  {
                    icon: Lock,
                    title: "Data Protection",
                    description: "GDPR compliant with data residency options and comprehensive audit trails"
                  },
                  {
                    icon: Cloud,
                    title: "Flexible Deployment",
                    description: "Cloud, on-premises, or hybrid deployment options to meet your security requirements"
                  }
                ].map((security, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group p-6 bg-white/80 backdrop-blur-md rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                      <security.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                      {security.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {security.description}
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
                Ready to Transform Your Sourcing Process?
              </h2>
              
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                <span className="text-gray-900">Join hundreds of manufacturing companies already using Supplier Match AI to</span>
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
