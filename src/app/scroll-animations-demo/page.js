/**
 * Scroll Animations Demo Page
 * Showcases all the scroll-triggered animation components
 */

'use client';

import React from 'react';
import {
  ScrollAnimatedSection,
  ScrollRevealText,
  ScrollTriggeredCounter,
  ScrollProgressBar,
  ScrollMorphingLogo,
  ParallaxElement,
  ParallaxBackground,
  MorphingIcon,
  StaggeredGrid
} from '../../components/animations';

export default function ScrollAnimationsDemoPage() {
  return (
    <div className="scroll-animations-demo">
      {/* Progress Bar */}
      <ScrollProgressBar 
        progressColor="#384bff"
        showPercentage={true}
      />

      {/* Hero Section with Parallax Background */}
      <ParallaxBackground
        height="100vh"
        speed={0.5}
        backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        overlay="rgba(0,0,0,0.3)"
        className="flex items-center justify-center"
      >
        <div className="text-center text-white z-10">
          <ScrollMorphingLogo size={80} className="mx-auto mb-8" />
          <ScrollRevealText 
            className="text-6xl font-bold mb-4"
            revealBy="word"
            staggerDelay={100}
          >
            Scroll Animations Demo
          </ScrollRevealText>
          <ScrollRevealText 
            className="text-xl opacity-90"
            revealBy="character"
            staggerDelay={30}
          >
            Experience the power of scroll-triggered animations
          </ScrollRevealText>
        </div>
      </ParallaxBackground>

      {/* Statistics Section */}
      <ScrollAnimatedSection 
        className="py-20 bg-gray-50"
        transitionType="fadeUp"
        stagger={200}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <ScrollTriggeredCounter
                from={0}
                to={1000}
                duration={2000}
                suffix="+"
                className="text-5xl font-bold text-blue-600 block"
              />
              <p className="text-xl mt-4">Projects Completed</p>
            </div>
            <div className="text-center">
              <ScrollTriggeredCounter
                from={0}
                to={500}
                duration={2500}
                suffix="+"
                className="text-5xl font-bold text-blue-600 block"
              />
              <p className="text-xl mt-4">Happy Clients</p>
            </div>
            <div className="text-center">
              <ScrollTriggeredCounter
                from={0}
                to={99}
                duration={3000}
                suffix="%"
                className="text-5xl font-bold text-blue-600 block"
              />
              <p className="text-xl mt-4">Success Rate</p>
            </div>
          </div>
        </div>
      </ScrollAnimatedSection>

      {/* Features Grid */}
      <ScrollAnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <ScrollRevealText 
            className="text-4xl font-bold text-center mb-16"
            revealBy="word"
          >
            Amazing Features
          </ScrollRevealText>
          
          <StaggeredGrid
            columns={3}
            gap="2rem"
            animationType="scaleIn"
            staggerDelay={150}
            className="max-w-6xl mx-auto"
          >
            {[
              { icon: 'menuToX', title: 'Scroll Triggers', desc: 'Animations triggered by scroll position' },
              { icon: 'playToPause', title: 'Parallax Effects', desc: 'Multi-layer parallax scrolling' },
              { icon: 'heartFill', title: 'Morphing Icons', desc: 'Smooth SVG path transformations' },
              { icon: 'arrowRotate', title: 'Section Transitions', desc: 'Smooth transitions between sections' },
              { icon: 'menuToX', title: 'Staggered Animations', desc: 'Coordinated child element animations' },
              { icon: 'playToPause', title: 'Performance Optimized', desc: 'GPU accelerated and efficient' }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <MorphingIcon
                  preset={feature.icon}
                  size={48}
                  className="mx-auto mb-4 text-blue-600"
                  triggers={['hover']}
                />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </StaggeredGrid>
        </div>
      </ScrollAnimatedSection>

      {/* Parallax Elements Section */}
      <div className="py-20 bg-gray-100 relative overflow-hidden">
        <ParallaxElement speed={0.3} className="absolute top-10 left-10">
          <div className="w-20 h-20 bg-blue-500 rounded-full opacity-20"></div>
        </ParallaxElement>
        <ParallaxElement speed={-0.2} className="absolute top-20 right-20">
          <div className="w-16 h-16 bg-purple-500 rounded-full opacity-30"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.4} className="absolute bottom-20 left-1/4">
          <div className="w-12 h-12 bg-green-500 rounded-full opacity-25"></div>
        </ParallaxElement>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollAnimatedSection transitionType="slideUp">
            <h2 className="text-4xl font-bold text-center mb-8">Parallax Elements</h2>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
              Notice the floating elements that move at different speeds as you scroll. 
              This creates depth and visual interest in your designs.
            </p>
          </ScrollAnimatedSection>
        </div>
      </div>

      {/* Text Reveal Section */}
      <ScrollAnimatedSection className="py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollRevealText 
            className="text-5xl font-bold mb-8"
            revealBy="word"
            staggerDelay={200}
          >
            Beautiful Text Animations
          </ScrollRevealText>
          
          <ScrollRevealText 
            className="text-xl text-gray-600 max-w-4xl mx-auto mb-12"
            revealBy="character"
            staggerDelay={20}
          >
            Watch as text reveals itself character by character or word by word, 
            creating engaging reading experiences that capture attention and guide the eye.
          </ScrollRevealText>

          <ScrollRevealText 
            className="text-2xl font-semibold text-blue-600"
            revealBy="word"
            staggerDelay={100}
          >
            Every word matters. Every animation counts.
          </ScrollRevealText>
        </div>
      </ScrollAnimatedSection>

      {/* Morphing Icons Showcase */}
      <ScrollAnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Interactive Icons</h2>
          
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <MorphingIcon
                preset="menuToX"
                size={64}
                className="text-blue-600 mb-4"
                triggers={['hover']}
              />
              <p className="text-sm">Menu to X</p>
            </div>
            
            <div className="text-center">
              <MorphingIcon
                preset="playToPause"
                size={64}
                className="text-green-600 mb-4"
                triggers={['click']}
              />
              <p className="text-sm">Play/Pause (Click)</p>
            </div>
            
            <div className="text-center">
              <MorphingIcon
                preset="heartFill"
                size={64}
                className="text-red-600 mb-4"
                triggers={['hover']}
              />
              <p className="text-sm">Heart Fill</p>
            </div>
            
            <div className="text-center">
              <MorphingIcon
                preset="arrowRotate"
                size={64}
                className="text-purple-600 mb-4"
                triggers={['hover']}
              />
              <p className="text-sm">Arrow Rotate</p>
            </div>
          </div>
        </div>
      </ScrollAnimatedSection>

      {/* Final CTA Section */}
      <ScrollAnimatedSection 
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        transitionType="liquid"
        stagger={300}
      >
        <div className="container mx-auto px-4 text-center">
          <ScrollRevealText 
            className="text-4xl font-bold mb-6"
            revealBy="word"
          >
            Ready to Get Started?
          </ScrollRevealText>
          
          <ScrollRevealText 
            className="text-xl mb-8 opacity-90"
            revealBy="character"
            staggerDelay={30}
          >
            Implement these animations in your own projects today
          </ScrollRevealText>
          
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>
      </ScrollAnimatedSection>

      {/* Spacer for scroll testing */}
      <div className="h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-2xl text-gray-600">Scroll back up to see animations again!</p>
      </div>
    </div>
  );
}