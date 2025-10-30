'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Database, 
  GitBranch, 
  Warehouse, 
  BarChart3,
  Brain,
  MessageSquare,
  Cog,
  Container,
  Workflow,
  Cloud,
  Zap,
  Target,
  Layers,
  Monitor,
  Settings,
  Code,
  Globe,
  Shield,
  TrendingUp,
  Users
} from 'lucide-react';

const ComprehensiveDataAnalytics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const dataServices = [
    {
      icon: Database,
      title: "Scalable Database Management",
      description: "Our expertise encompasses all major SQL (MySQL, PostgreSQL) and NoSQL (MongoDB, Cassandra) databases, ensuring high-performance, scalable, and reliable data storage and retrieval.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: GitBranch,
      title: "Robust Data Pipelines",
      description: "We design and build efficient and reliable data pipelines using tools like Apache Kafka, Apache Airflow, and AWS Glue for seamless data integration across diverse sources.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Warehouse,
      title: "Advanced Data Warehousing",
      description: "Constructing high-performance and scalable data warehouses on platforms like Snowflake, Google BigQuery, and Amazon Redshift for efficient data storage, access, and advanced analytics.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Actionable Business Intelligence & Reporting",
      description: "We transform raw data into clear, insightful reports and interactive dashboards using leading BI tools like Tableau, Power BI, and Looker, empowering data-driven decision-making.",
      color: "from-blue-500 to-blue-600"
    }
  ];

  const aiServices = [
    {
      icon: Brain,
      title: "Tailored Machine Learning Models",
      description: "We craft and deploy custom machine learning models to address your specific business challenges, predict future trends, and optimize performance.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageSquare,
      title: "Powerful Large Language Models (LLMs)",
      description: "Harness the power of advanced LLMs for sophisticated text analysis, content generation, and enhanced customer interactions.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Cog,
      title: "Custom AI Solutions",
      description: "Our team designs and implements innovative AI strategies to boost efficiency, automate processes, and transform your core operations.",
      color: "from-blue-500 to-blue-600"
    }
  ];

  const dataTools = [
    { name: "Apache Kafka", category: "Integration & Streaming" },
    { name: "Apache Airflow", category: "Integration & Streaming" },
    { name: "AWS Glue", category: "Integration & Streaming" },
    { name: "Snowflake", category: "Warehousing" },
    { name: "Google BigQuery", category: "Warehousing" },
    { name: "Amazon Redshift", category: "Warehousing" },
    { name: "Tableau", category: "Visualization" },
    { name: "Power BI", category: "Visualization" },
    { name: "Looker", category: "Visualization" }
  ];

  const aiTools = [
    { name: "TensorFlow", category: "Machine Learning" },
    { name: "Hugging Face", category: "LLMs & NLP" },
    { name: "GPT", category: "LLMs & NLP" },
    { name: "MLflow", category: "Deployment" },
    { name: "Kubeflow", category: "Deployment" },
    { name: "Docker", category: "DevOps & Automation" },
    { name: "Kubernetes", category: "DevOps & Automation" },
    { name: "Jenkins", category: "DevOps & Automation" },
    { name: "GitHub Actions", category: "DevOps & Automation" }
  ];
  
  return (
    <section ref={ref} className="relative py-24 lg:py-32 px-6">
      {/* Enhanced background with subtle textures */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/60 via-white/80 to-slate-50/40" />
      
      {/* Subtle mesh pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Soft depth elements */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/4 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-2xl" />
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-[#2D3748]">Comprehensive Data Services</span><br />
                <span className="text-[#6B46C1]">Building a Scalable Foundation</span>
              </h2>
            </div>
            <p className="text-xl text-[#4A5568] leading-relaxed">
              We architect and implement end-to-end data solutions, leveraging industry-leading technologies to meet your unique needs.
            </p>
          </motion.div>

          {/* Data Services Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {dataServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Hover glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                  
                  {/* Card with layered depth */}
                  <motion.div
                    className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-100/60 group-hover:border-gray-200 shadow-md group-hover:shadow-2xl transition-all duration-300 flex flex-col"
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative flex flex-col h-full">
                      {/* Icon with depth */}
                      <div className="mb-6 flex-shrink-0">
                        <div className="relative inline-block">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 blur-xl bg-blue-400/30 rounded-xl group-hover:bg-blue-400/50 transition-all`} />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-gray-900 flex-shrink-0">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* AI Services Section */}
          <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-[#2D3748]">Transformative AI Services</span><br />
              <span className="text-[#6B46C1]">Intelligent Solutions for Innovation</span>
            </h3>
            <p className="text-xl text-[#4A5568] leading-relaxed mb-12">
              Unlock new possibilities and gain a competitive edge with CodeSpire's advanced Artificial Intelligence offerings.
            </p>
          </motion.div>

          {/* AI Services Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {aiServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Hover glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                  
                  {/* Card with layered depth */}
                  <motion.div
                    className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-100/60 group-hover:border-gray-200 shadow-md group-hover:shadow-2xl transition-all duration-300 flex flex-col"
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative flex flex-col h-full">
                      {/* Icon with depth */}
                      <div className="mb-6 flex-shrink-0">
                        <div className="relative inline-block">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          {/* Glow effect */}
                          <div className={`absolute inset-0 blur-xl bg-blue-400/30 rounded-xl group-hover:bg-blue-400/50 transition-all`} />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-gray-900 flex-shrink-0">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Tools Section */}
          <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-[#2D3748]">Our Cutting-Edge</span><br />
              <span className="text-[#6B46C1]">Tooling Experience</span>
            </h3>
            <p className="text-xl text-[#4A5568] leading-relaxed mb-12">
              Our team possesses deep expertise across the latest and greatest tools in the Data and AI landscape, ensuring we deliver cutting-edge and reliable solutions.
            </p>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Data Tools */}
            <motion.div variants={itemVariants} className="space-y-6 text-center">
              <h4 className="text-2xl font-bold text-[#2D3748] mb-6">Data Tools</h4>
              <div className="space-y-4">
                {['Integration & Streaming', 'Warehousing', 'Visualization'].map((category, index) => (
                  <div key={category} className="space-y-3">
                    <h5 className="text-lg font-semibold text-[#6B46C1]">{category}:</h5>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {dataTools
                        .filter(tool => tool.category === category)
                        .map((tool, toolIndex) => (
                          <motion.span
                            key={tool.name}
                            variants={itemVariants}
                            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                          >
                            {tool.name}
                          </motion.span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Tools */}
            <motion.div variants={itemVariants} className="space-y-6 text-center">
              <h4 className="text-2xl font-bold text-[#2D3748] mb-6">AI Tools</h4>
              <div className="space-y-4">
                {['Machine Learning', 'LLMs & NLP', 'Deployment', 'DevOps & Automation'].map((category, index) => (
                  <div key={category} className="space-y-3">
                    <h5 className="text-lg font-semibold text-[#6B46C1]">{category}:</h5>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {aiTools
                        .filter(tool => tool.category === category)
                        .map((tool, toolIndex) => (
                          <motion.span
                            key={tool.name}
                            variants={itemVariants}
                            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                          >
                            {tool.name}
                          </motion.span>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComprehensiveDataAnalytics;
