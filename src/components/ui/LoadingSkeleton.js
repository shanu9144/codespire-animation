import React from 'react';

export const HeroSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white animate-pulse">
    <div className="wrapper py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="h-16 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-12 bg-gray-200 rounded w-32"></div>
            <div className="h-12 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="aspect-[4/3] bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  </div>
);

export const SectionSkeleton = () => (
  <div className="py-8 lg:py-12 animate-pulse">
    <div className="space-y-6">
      <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  </div>
);

