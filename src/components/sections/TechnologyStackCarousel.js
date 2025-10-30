'use client';

import React, { useMemo, useCallback } from 'react';
import InfiniteCarousel from '../ui/InfiniteCarousel';
import { 
  SiGithub, 
  SiGooglecloud, 
  SiMongodb,
  SiPostgresql,
  SiTerraform,
  SiPrometheus,
  SiGrafana,
  SiOpenai,
  SiAnthropic,
  SiKubernetes
} from 'react-icons/si';
// Removed unused Lucide React imports since we're now using actual logo files

// SVG icon wrappers: use official SVGs from public/
const SvgImg = ({ src, alt, size = 24, ...props }) => (
  <img src={src} alt={alt} width={size} height={size} {...props} />
);

const GCPIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/gcp.svg" alt="Google Cloud" size={size} {...props} />
);
const KubernetesIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/kubernetes-svgrepo-com.svg" alt="Kubernetes" size={size} {...props} />
);
const GPTIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/gpt.svg" alt="OpenAI" size={size} {...props} />
);
const GeminiIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/gemini.webp" alt="Gemini" size={size} {...props} />
);
const GitHubActionsIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/githubActions.png" alt="GitHub Actions" size={size} {...props} />
);
const ApacheApisixIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/apacheApisix.svg" alt="Apache APISIX" size={size} {...props} />
);
const OpenTelemetryIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/opentelementry.png" alt="OpenTelemetry" size={size} {...props} />
);
const SonarQubeIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/sonarqube.png" alt="SonarQube" size={size} {...props} />
);
const ApigeeIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/apigee.png" alt="Apigee" size={size} {...props} />
);
const BigQueryIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/bigQuery.png" alt="BigQuery" size={size} {...props} />
);
const DatastreamIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/Datastream.svg" alt="Datastream" size={size} {...props} />
);
const LookerIcon = ({ size = 24, ...props }) => (
  <SvgImg src="/assets/images/Looker.svg" alt="Looker" size={size} {...props} />
);

const TechnologyStackCarousel = React.memo(() => {
  // Memoize tech stacks to prevent recreation on every render
  const techStacks = useMemo(() => [
    { name: 'GitHub', icon: SiGithub, color: '#181717' },
    { name: 'GitHub Actions', icon: GitHubActionsIcon, color: '#2088FF' },
    { name: 'GCP', icon: GCPIcon, color: '#4285F4' },
    { name: 'Kubernetes', icon: KubernetesIcon, color: '#326CE5' },
    { name: 'Terraform', icon: SiTerraform, color: '#7B42BC' },
    { name: 'Apache APISIX', icon: ApacheApisixIcon, color: '#E2211C' },
    { name: 'OpenTelemetry', icon: OpenTelemetryIcon, color: '#000000' },
    { name: 'Prometheus', icon: SiPrometheus, color: '#E6522C' },
    { name: 'SonarQube', icon: SonarQubeIcon, color: '#4E9BCD' },
    { name: 'Grafana', icon: SiGrafana, color: '#F46800' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
    { name: 'OpenAI', icon: GPTIcon, color: '#10A37F' },
    { name: 'Gemini', icon: GeminiIcon, color: '#4285F4' },
    { name: 'Anthropic', icon: SiAnthropic, color: '#D97706' },
    { name: 'Apigee', icon: ApigeeIcon, color: '#00A1E0' },
    { name: 'BigQuery', icon: BigQueryIcon, color: '#4285F4' },
    { name: 'Datastream', icon: DatastreamIcon, color: '#4285F4' },
    { name: 'Looker', icon: LookerIcon, color: '#4285F4' }
  ], []);

  // Memoize carousel items to prevent recreation
  const carouselItems = useMemo(() => techStacks.map((tech, index) => {
    const IconComponent = tech.icon;
    return (
      <div
        key={`${tech.name}-${index}`}
        className="w-32 h-20 bg-white rounded-xl shadow-lg border border-blue-100/50 flex items-center justify-center group hover:shadow-2xl hover:border-blue-300/50 hover:bg-white hover:-translate-y-1 transition-all duration-300 ease-out"
        style={{ willChange: 'transform' }}
      >
        <div className="flex flex-col items-center justify-center space-y-2 relative">
          <div className="relative">
            <IconComponent 
              className="text-3xl transition-all duration-300 ease-out group-hover:scale-125 group-hover:rotate-3" 
              style={{ color: tech.color }}
            />
          </div>
          <div className="text-xs font-semibold text-gray-800 text-center leading-tight transition-all duration-300 group-hover:text-blue-600 group-hover:font-bold">
            {tech.name}
          </div>
        </div>
      </div>
    );
  }), [techStacks]);

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-blue-50/20 to-blue-50/40 overflow-hidden">
      {/* Simplified animated background - reduced from 7 to 2 shapes for better performance */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-15 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '8s', willChange: 'opacity' }} />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-200 rounded-full blur-2xl opacity-10 -translate-y-1/2 animate-pulse" style={{ animationDuration: '9s', animationDelay: '1s', willChange: 'opacity' }} />
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-blue-600 mb-6 tracking-tight">
            Our Technology Stack
          </h2>
          <p className="text-xl font-semibold text-gray-700 max-w-3xl mx-auto mb-2">Cutting-edge technologies and</p>
          <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight max-w-3xl mx-auto">
             Frameworks for Innovative AI Solutions
          </p>
        </div>
        
        <InfiniteCarousel
          items={carouselItems}
          speed={60}
          direction="right"
          pauseOnHover={true}
          className="bg-white/90 rounded-3xl p-6 shadow-xl border border-blue-100/30"
          itemClassName="w-32 h-20 flex-shrink-0"
        />
      </div>
    </section>
  );
});

TechnologyStackCarousel.displayName = 'TechnologyStackCarousel';

export default TechnologyStackCarousel;

