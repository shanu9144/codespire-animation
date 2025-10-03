/**
 * LoadingScreen Test Page
 * Demo page to test the LoadingScreen component functionality
 */

'use client';

import { useState, useEffect } from 'react';
import { LoadingScreen } from '../../components/ui';

export default function TestLoadingScreenPage() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [animationIntensity, setAnimationIntensity] = useState('normal');
  const [isAutoProgress, setIsAutoProgress] = useState(false);

  // Auto progress simulation
  useEffect(() => {
    if (!isAutoProgress) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsAutoProgress(false);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isAutoProgress]);

  const handleTransitionComplete = () => {
    console.log('Loading transition complete!');
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  const resetDemo = () => {
    setProgress(0);
    setIsVisible(true);
    setIsAutoProgress(false);
  };

  const startAutoProgress = () => {
    resetDemo();
    setTimeout(() => setIsAutoProgress(true), 100);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          LoadingScreen Component Test
        </h1>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Progress Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Progress: {Math.round(progress)}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full"
                disabled={isAutoProgress}
              />
            </div>

            {/* Theme Control */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            {/* Animation Intensity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Animation Intensity
              </label>
              <select
                value={animationIntensity}
                onChange={(e) => setAnimationIntensity(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="minimal">Minimal</option>
                <option value="normal">Normal</option>
                <option value="enhanced">Enhanced</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={startAutoProgress}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
              disabled={isAutoProgress}
            >
              {isAutoProgress ? 'Auto Progress Running...' : 'Start Auto Progress'}
            </button>
            
            <button
              onClick={resetDemo}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Reset Demo
            </button>
            
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              {isVisible ? 'Hide Loading Screen' : 'Show Loading Screen'}
            </button>
          </div>
        </div>

        {/* Component Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Component Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Accessibility Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• ARIA progressbar role</li>
                <li>• Screen reader announcements</li>
                <li>• Reduced motion support</li>
                <li>• Keyboard navigation friendly</li>
                <li>• High contrast mode support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Animation Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Smooth percentage counter</li>
                <li>• Hardware-accelerated animations</li>
                <li>• Configurable animation intensity</li>
                <li>• Responsive design</li>
                <li>• Brand-consistent styling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* LoadingScreen Component */}
      <LoadingScreen
        progress={progress}
        isVisible={isVisible}
        theme={theme}
        animationIntensity={animationIntensity}
        onTransitionComplete={handleTransitionComplete}
        showBranding={true}
        showProgressBar={true}
      />
    </div>
  );
}