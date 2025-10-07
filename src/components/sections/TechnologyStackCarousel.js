'use client';

import React, { useMemo, useCallback } from 'react';
import InfiniteCarousel from '../ui/InfiniteCarousel';
import { 
  SiReact, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiGithub, 
  SiJenkins, 
  SiGooglecloud, 
  SiSalesforce, 
  SiTensorflow, 
  SiPytorch, 
  SiJest, 
  SiMocha, 
  SiJasmine, 
  SiPostman, 
  SiSelenium, 
  SiCypress, 
  SiAdobe, 
  SiMeta, 
  SiHuggingface 
} from 'react-icons/si';
import { Database, Brain, Wrench, TestTube, ShieldCheck } from 'lucide-react';

// SVG icon wrappers: use official SVGs from public/
const SvgImg = ({ src, alt, size = 24, ...props }) => (
  <img src={src} alt={alt} width={size} height={size} {...props} />
);

const ServiceNowIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/servicenow.svg" alt="ServiceNow" size={size} {...props} />
);
const AWSIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/aws.svg" alt="AWS" size={size} {...props} />
);
const AzureIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/azure.svg" alt="Azure" size={size} {...props} />
);
const GCPIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/gcp.svg" alt="Google Cloud" size={size} {...props} />
);
const GitLabIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/gitlab-svgrepo-com.svg" alt="GitLab" size={size} {...props} />
);
const FigmaIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/figma.svg" alt="Figma" size={size} {...props} />
);
const DockerIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/docker.svg" alt="Docker" size={size} {...props} />
);
const KubernetesIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/kubernetes-svgrepo-com.svg" alt="Kubernetes" size={size} {...props} />
);

// Use GPT logo from public/
const GPTIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/gpt.svg" alt="GPT" size={size} {...props} />
);

const TechnologyStackCarousel = React.memo(() => {
  // Memoize tech stacks to prevent recreation on every render
  const techStacks = useMemo(() => [
    { name: 'LLaMA', icon: SiMeta, color: '#1877F2' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#000000' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'GitHub', icon: SiGithub, color: '#181717' },
    { name: 'Jenkins', icon: SiJenkins, color: '#D24939' },
    { name: 'GitLab', icon: GitLabIcon, color: '#FC6D26' },
    { name: 'Figma', icon: FigmaIcon, color: '#F24E1E' },
    { name: 'Docker', icon: DockerIcon, color: '#2496ED' },
    { name: 'Kubernetes', icon: KubernetesIcon, color: '#326CE5' },
    { name: 'AWS', icon: AWSIcon, color: '#FF9900' },
    { name: 'Azure', icon: AzureIcon, color: '#0078D4' },
    { name: 'GCP', icon: GCPIcon, color: '#4285F4' },
    { name: 'ServiceNow', icon: ServiceNowIcon, color: '#00D2BE' },
    { name: 'Salesforce', icon: SiSalesforce, color: '#00A1E0' },
    { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
    { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
    { name: 'Jest', icon: SiJest, color: '#C21325' },
    { name: 'Mocha', icon: SiMocha, color: '#8D6748' },
    { name: 'Jasmine', icon: SiJasmine, color: '#8A4182' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { name: 'Newman', icon: TestTube, color: '#FF6C37' },
    { name: 'Pact', icon: ShieldCheck, color: '#3EAAAF' },
    { name: 'Selenium', icon: SiSelenium, color: '#43B02A' },
    { name: 'Cypress', icon: SiCypress, color: '#17202C' },
    { name: 'Adobe', icon: SiAdobe, color: '#FF0000' },
    { name: 'SQL', icon: Database, color: '#336791' },
    { name: 'GPT', icon: GPTIcon, color: '#10A37F' },
    { name: 'BERT', icon: SiHuggingface, color: '#FF9B00' },
    { name: 'React', icon: SiReact, color: '#61DAFB' }
  ], []);

  // Memoize carousel items to prevent recreation
  const carouselItems = useMemo(() => techStacks.map((tech, index) => {
    const IconComponent = tech.icon;
    return (
      <div
        key={`${tech.name}-${index}`}
        className="w-32 h-20 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center group hover:shadow-lg hover:border-primary/20 transition-all duration-200"
      >
        <div className="flex flex-col items-center justify-center space-y-2 relative">
          <div className="relative">
            <IconComponent 
              className="text-3xl transition-transform duration-200 ease-out group-hover:scale-110" 
              style={{ color: tech.color }}
            />
          </div>
          <div className="text-xs font-semibold text-gray-800 text-center leading-tight transition-colors duration-200 group-hover:text-primary">
            {tech.name}
          </div>
        </div>
      </div>
    );
  }), [techStacks]);

  return (
    <section className="py-4">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-blue-600 mb-4 ">
          Our Technology Stack
        </h2>
        <p className="text-lg font-bold text-black-700 max-w-2xl mx-auto">Cutting-edge technologies and</p>
        <p className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight max-w-2xl mx-auto ">
           Frameworks for Innovative AI Solutions
        </p>
      </div>
      
      <InfiniteCarousel
        items={carouselItems}
        speed={30}
        direction="right"
        pauseOnHover={true}
        className="bg-gradient-to-r from-blue-50 to-purple-50"
        itemClassName="w-32 h-20 flex-shrink-0"
      />
    </section>
  );
});

TechnologyStackCarousel.displayName = 'TechnologyStackCarousel';

export default TechnologyStackCarousel;

