import React from 'react';
import PostProcessingDemo from '../../animations/3d/PostProcessingDemo';
import Scene3D from '../../animations/3d/Scene3D';
import FloatingGeometry from '../../animations/3d/FloatingGeometry';
import { InteractiveMeshCollection } from '../../animations/3d/InteractiveMesh';
import { Scene3DProvider } from '../../animations/3d/Scene3DProvider';

export default {
  title: '3D/Post-Processing Effects',
  component: PostProcessingDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Advanced post-processing effects including bloom, depth of field, and glow effects for 3D elements.'
      }
    }
  }
};

export const FullDemo = {
  render: () => <PostProcessingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete demonstration of post-processing effects with interactive controls.'
      }
    }
  }
};

export const BasicBloomEffect = {
  render: () => (
    <Scene3DProvider>
      <div className="w-full h-96 bg-gray-900">
        <Scene3D
          enablePostProcessing={true}
          postProcessingProps={{
            enableBloom: true,
            enableDepthOfField: false,
            bloomIntensity: 0.8,
            bloomRadius: 0.5
          }}
        >
          <FloatingGeometry
            shapes={[
              { type: 'sphere', position: [-2, 0, -1], color: '#384bff' },
              { type: 'cube', position: [2, 0, -1], color: '#5865f2' }
            ]}
            enableGlow={true}
            glowIntensity={0.6}
          />
        </Scene3D>
      </div>
    </Scene3DProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic bloom effect demonstration with glowing 3D objects.'
      }
    }
  }
};

export const DepthOfFieldEffect = {
  render: () => (
    <Scene3DProvider>
      <div className="w-full h-96 bg-gray-900">
        <Scene3D
          enablePostProcessing={true}
          postProcessingProps={{
            enableBloom: false,
            enableDepthOfField: true,
            depthOfFieldFocusDistance: 0.02,
            depthOfFieldBokehScale: 8
          }}
        >
          <FloatingGeometry
            shapes={[
              { type: 'sphere', position: [-3, 0, -2], color: '#384bff' },
              { type: 'cube', position: [0, 0, 0], color: '#5865f2' },
              { type: 'torus', position: [3, 0, -2], color: '#7289da' }
            ]}
            enableGlow={false}
          />
        </Scene3D>
      </div>
    </Scene3DProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Depth of field effect creating focus blur on distant objects.'
      }
    }
  }
};

export const InteractiveGlowEffects = {
  render: () => (
    <Scene3DProvider>
      <div className="w-full h-96 bg-gray-900">
        <Scene3D
          enablePostProcessing={true}
          postProcessingProps={{
            enableBloom: true,
            enableGlow: true,
            bloomIntensity: 0.6
          }}
        >
          <InteractiveMeshCollection
            meshes={[
              { 
                geometry: 'sphere', 
                position: [-2, 0, 0], 
                color: '#384bff',
                hoverColor: '#5865f2',
                glowIntensity: 0.8
              },
              { 
                geometry: 'cube', 
                position: [2, 0, 0], 
                color: '#5865f2',
                hoverColor: '#7289da',
                glowIntensity: 0.6
              }
            ]}
            enableGlow={true}
          />
        </Scene3D>
      </div>
    </Scene3DProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive 3D objects with hover-responsive glow effects and particle systems.'
      }
    }
  }
};

export const PerformanceComparison = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-900">
      <div>
        <h3 className="text-white text-lg mb-2">High Quality (Desktop)</h3>
        <Scene3DProvider>
          <div className="w-full h-64 bg-gray-800 rounded">
            <Scene3D
              enablePostProcessing={true}
              postProcessingProps={{
                enableBloom: true,
                enableDepthOfField: true,
                enableNoise: true,
                enableVignette: true,
                bloomIntensity: 0.8
              }}
            >
              <FloatingGeometry
                shapes={[
                  { type: 'sphere', position: [0, 0, -1], color: '#384bff' }
                ]}
                enableGlow={true}
                glowIntensity={0.8}
              />
            </Scene3D>
          </div>
        </Scene3DProvider>
      </div>
      
      <div>
        <h3 className="text-white text-lg mb-2">Optimized (Mobile)</h3>
        <Scene3DProvider>
          <div className="w-full h-64 bg-gray-800 rounded">
            <Scene3D
              enablePostProcessing={true}
              postProcessingProps={{
                enableBloom: true,
                enableDepthOfField: false,
                enableNoise: false,
                enableVignette: false,
                bloomIntensity: 0.4
              }}
            >
              <FloatingGeometry
                shapes={[
                  { type: 'sphere', position: [0, 0, -1], color: '#384bff' }
                ]}
                enableGlow={true}
                glowIntensity={0.4}
              />
            </Scene3D>
          </div>
        </Scene3DProvider>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of high-quality vs performance-optimized post-processing.'
      }
    }
  }
};