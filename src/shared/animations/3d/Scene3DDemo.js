import React from 'react';
import { Scene3D, Scene3DProvider, FloatingGeometry, InteractiveMeshCollection } from './index';
import { Card3D, Button3D, FeatureCard3D, StatCard3D } from './TiltIntegration';

/**
 * Demo component showcasing all 3D interactive elements
 */
const Scene3DDemo = () => {
  return (
    <Scene3DProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              3D Interactive Elements Demo
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience advanced 3D animations with floating geometry, 
              interactive meshes, and tilt effects for cards and buttons.
            </p>
          </div>

          {/* 3D Scene with Floating Geometry */}
          <div className="relative">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Floating 3D Geometry
            </h2>
            <div className="h-96 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10">
              <Scene3D enableControls={true}>
                <FloatingGeometry
                  shapes={[
                    { type: 'sphere', position: [-2, 1, -1], color: '#384bff' },
                    { type: 'cube', position: [2, -1, -2], color: '#5865f2' },
                    { type: 'torus', position: [0, 2, -3], color: '#7289da' },
                    { type: 'octahedron', position: [-3, -1, -1], color: '#99aab5' }
                  ]}
                  mouseInfluence={0.8}
                  animationSpeed={1.2}
                />
              </Scene3D>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Move your mouse to influence the floating shapes. Use mouse to orbit the scene.
            </p>
          </div>

          {/* Interactive 3D Meshes */}
          <div className="relative">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Interactive 3D Meshes
            </h2>
            <div className="h-96 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10">
              <Scene3D>
                <InteractiveMeshCollection
                  meshes={[
                    { 
                      geometry: 'sphere', 
                      position: [-2, 0, 0], 
                      color: '#384bff',
                      hoverColor: '#5865f2'
                    },
                    { 
                      geometry: 'cube', 
                      position: [0, 0, 0], 
                      color: '#5865f2',
                      hoverColor: '#7289da'
                    },
                    { 
                      geometry: 'dodecahedron', 
                      position: [2, 0, 0], 
                      color: '#7289da',
                      hoverColor: '#384bff'
                    }
                  ]}
                  onMeshClick={(event, mesh, index) => {
                    console.log(`Clicked mesh ${index}:`, mesh);
                  }}
                  onMeshHover={(event, mesh, index) => {
                    console.log(`Hovering mesh ${index}:`, mesh);
                  }}
                />
              </Scene3D>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Hover and click on the 3D shapes to see interactive effects.
            </p>
          </div>

          {/* 3D Tilt Cards */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              3D Tilt Effect Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <FeatureCard3D
                icon={
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Advanced Animations"
                description="Sophisticated 3D animations with WebGL acceleration and performance optimization."
              />

              <FeatureCard3D
                icon={
                  <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                }
                title="Interactive Elements"
                description="Mouse-responsive 3D elements that create engaging user experiences."
              />

              <FeatureCard3D
                icon={
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                }
                title="Performance Optimized"
                description="Automatic quality scaling based on device capabilities and performance."
              />
            </div>
          </div>

          {/* Statistics Cards */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              3D Statistics Cards
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard3D value="60" suffix="fps" label="Performance" />
              <StatCard3D value="1000" suffix="+" label="Particles" />
              <StatCard3D value="3D" label="Graphics" />
              <StatCard3D value="WebGL" label="Acceleration" />
            </div>
          </div>

          {/* Interactive Buttons */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              3D Interactive Buttons
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button3D variant="primary" size="lg">
                Primary Button
              </Button3D>
              <Button3D variant="secondary" size="md">
                Secondary Button
              </Button3D>
              <Button3D variant="ghost" size="sm">
                Ghost Button
              </Button3D>
            </div>
          </div>

          {/* Advanced Card Example */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              Advanced 3D Card
            </h2>
            <div className="max-w-md mx-auto">
              <Card3D variant="advanced" className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Premium Experience
                  </h3>
                  <p className="text-gray-300">
                    Advanced 3D effects with glare, shadows, and smooth animations
                    that respond to your mouse movements.
                  </p>
                </div>
                <Button3D variant="primary" className="w-full">
                  Get Started
                </Button3D>
              </Card3D>
            </div>
          </div>

        </div>
      </div>
    </Scene3DProvider>
  );
};

export default Scene3DDemo;