"use client";

import React, { useState, useEffect } from 'react';
import { AdvancedLiquidEffect } from '../fluid';

/**
 * LiquidShaderIntegration Component
 * 
 * Example of integrating advanced liquid shader effects into existing UI components
 */

const LiquidShaderIntegration = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Trigger visibility after component mounts
    setTimeout(() => setIsVisible(true), 100);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="liquid-shader-integration">
      {/* Hero Section with Liquid Background */}
      <section className="hero-section">
        <div className="liquid-background">
          {dimensions.width > 0 && (
            <AdvancedLiquidEffect
              width={dimensions.width}
              height={600}
              colors={['#384bff', '#5865f2', '#7c3aed']}
              opacity={0.4}
              flowSpeed={0.3}
              turbulence={0.8}
              viscosity={0.4}
              flowDirection={[1.0, 0.3]}
              enableMouseInteraction={true}
              enablePerformanceScaling={true}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1
              }}
            />
          )}
        </div>
        
        <div className="hero-content">
          <h1 className={`hero-title ${isVisible ? 'visible' : ''}`}>
            Advanced Liquid Animations
          </h1>
          <p className={`hero-subtitle ${isVisible ? 'visible' : ''}`}>
            Experience the future of web animations with GPU-accelerated liquid effects
          </p>
          <button className={`cta-button ${isVisible ? 'visible' : ''}`}>
            Explore Features
          </button>
        </div>
      </section>

      {/* Card Section with Liquid Hover Effects */}
      <section className="cards-section">
        <div className="container">
          <h2>Interactive Cards</h2>
          <div className="cards-grid">
            {[
              {
                title: 'Fluid Dynamics',
                description: 'Real-time fluid simulation with advanced noise algorithms',
                color: '#384bff'
              },
              {
                title: 'Performance Optimized',
                description: 'Automatic quality scaling for smooth 60fps animations',
                color: '#5865f2'
              },
              {
                title: 'Interactive Effects',
                description: 'Mouse-responsive liquid density fields and distortions',
                color: '#7c3aed'
              }
            ].map((card, index) => (
              <div key={index} className="liquid-card">
                <div className="card-liquid-bg">
                  <AdvancedLiquidEffect
                    width={300}
                    height={200}
                    colors={[card.color, '#ffffff', card.color]}
                    opacity={0.3}
                    flowSpeed={0.2}
                    turbulence={0.5}
                    viscosity={0.6}
                    enableMouseInteraction={true}
                    enablePerformanceScaling={true}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      borderRadius: '12px'
                    }}
                  />
                </div>
                <div className="card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Subtle Liquid Animation */}
      <section className="footer-section">
        <div className="footer-liquid">
          <AdvancedLiquidEffect
            width={dimensions.width}
            height={200}
            colors={['#1a1a1a', '#333333', '#555555']}
            opacity={0.2}
            flowSpeed={0.1}
            turbulence={0.3}
            viscosity={0.8}
            enableMouseInteraction={false}
            enablePerformanceScaling={true}
            style={{
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        </div>
        <div className="footer-content">
          <p>Powered by Advanced WebGL Shaders</p>
        </div>
      </section>

      <style jsx>{`
        .liquid-shader-integration {
          position: relative;
          overflow-x: hidden;
        }

        .hero-section {
          position: relative;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .liquid-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          max-width: 600px;
          padding: 0 20px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .hero-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 30px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out 0.2s;
        }

        .hero-subtitle.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cta-button {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 15px 30px;
          font-size: 1.1rem;
          border-radius: 50px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(30px);
        }

        .cta-button.visible {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.8s ease-out 0.4s, background 0.3s ease, border-color 0.3s ease;
        }

        .cta-button:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .cards-section {
          padding: 80px 0;
          background: #f8f9fa;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .cards-section h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 50px;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .liquid-card {
          position: relative;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 280px;
        }

        .liquid-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-liquid-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 200px;
          z-index: 1;
        }

        .card-content {
          position: relative;
          z-index: 2;
          padding: 160px 20px 20px;
          background: linear-gradient(transparent 0%, white 40%);
        }

        .card-content h3 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 10px;
        }

        .card-content p {
          color: #666;
          line-height: 1.6;
        }

        .footer-section {
          position: relative;
          height: 200px;
          background: #1a1a1a;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .footer-liquid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .footer-content {
          position: relative;
          z-index: 2;
          color: #888;
          text-align: center;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .cards-grid {
            grid-template-columns: 1fr;
          }
          
          .liquid-card {
            height: 250px;
          }
          
          .card-content {
            padding: 140px 20px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default LiquidShaderIntegration;