'use client';

import React from 'react';
import InfiniteCarousel from '../ui/InfiniteCarousel';

const ClientLogosCarousel = () => {
  const clientLogos = [
    { name: 'Microsoft', logo: '🏢' },
    { name: 'Google', logo: '🔍' },
    { name: 'Amazon', logo: '📦' },
    { name: 'Tesla', logo: '⚡' },
    { name: 'Netflix', logo: '🎬' },
    { name: 'Spotify', logo: '🎵' },
    { name: 'Uber', logo: '🚗' },
    { name: 'Airbnb', logo: '🏠' },
    { name: 'Slack', logo: '💬' },
    { name: 'Zoom', logo: '📹' },
    { name: 'Salesforce', logo: '☁️' },
    { name: 'Adobe', logo: '🎨' },
    { name: 'Intel', logo: '💻' },
    { name: 'IBM', logo: '🤖' },
    { name: 'Oracle', logo: '🗄️' },
    { name: 'SAP', logo: '📊' }
  ];

  const carouselItems = clientLogos.map((client, index) => (
    <div
      key={index}
      className="w-32 h-20 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center group hover:shadow-md transition-all duration-300"
    >
      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
        {client.logo}
      </div>
      <div className="ml-3">
        <div className="text-sm font-semibold text-gray-800">{client.name}</div>
        <div className="text-xs text-gray-500">Enterprise Client</div>
      </div>
    </div>
  ));

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Trusted by Industry Leaders
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We partner with leading companies to deliver AI solutions at scale
        </p>
      </div>
      
      <InfiniteCarousel
        items={carouselItems}
        speed={25}
        direction="right"
        pauseOnHover={true}
        className="bg-gradient-to-r from-green-50 to-blue-50"
        itemClassName="w-32 h-20"
      />
    </section>
  );
};

export default ClientLogosCarousel;

