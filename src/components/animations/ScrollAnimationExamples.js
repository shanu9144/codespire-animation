/**
 * ScrollAnimationExamples - Examples of how to integrate scroll animations
 * Shows practical usage patterns for the scroll animation components
 */

'use client';

import React from 'react';
import {
  ScrollAnimatedSection,
  ScrollRevealText,
  ScrollTriggeredCounter,
  ParallaxElement,
  MorphingIcon,
  StaggeredGrid,
  ParallaxBackground
} from './index';

// Example 1: Basic Section Animation
export const BasicSectionExample = () => (
  <ScrollAnimatedSection 
    className="py-20 bg-gray-50"
    transitionType="fadeUp"
    stagger={200}
  >
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-8">Basic Section Animation</h2>
      <p className="text-xl text-center text-gray-600">
        This entire section animates in with a fade-up effect when scrolled into view.
      </p>
    </div>
  </ScrollAnimatedSection>
);

// Example 2: Text Reveal Animation
export const TextRevealExample = () => (
  <div className="py-20">
    <div className="container mx-auto px-4 text-center">
      <ScrollRevealText 
        className="text-5xl font-bold mb-8"
        revealBy="word"
        staggerDelay={200}
      >
        Beautiful Text Animations
      </ScrollRevealText>
      
      <ScrollRevealText 
        className="text-xl text-gray-600 max-w-3xl mx-auto"
        revealBy="character"
        staggerDelay={20}
      >
        Watch as text reveals itself character by character, creating engaging reading experiences.
      </ScrollRevealText>
    </div>
  </div>
);

// Example 3: Statistics with Counters
export const StatisticsExample = () => (
  <ScrollAnimatedSection className="py-20 bg-blue-50">
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
);

// Example 4: Parallax Background
export const ParallaxBackgroundExample = () => (
  <ParallaxBackground
    height="60vh"
    speed={0.5}
    backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    overlay="rgba(0,0,0,0.3)"
  >
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold mb-4">Parallax Background</h2>
      <p className="text-xl">This background moves at a different speed as you scroll</p>
    </div>
  </ParallaxBackground>
);

// Example 5: Staggered Grid
export const StaggeredGridExample = () => (
  <div className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16">Staggered Grid Animation</h2>
      
      <StaggeredGrid
        columns={3}
        gap="2rem"
        animationType="scaleIn"
        staggerDelay={150}
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white p-8 rounded-lg shadow-lg text-center">
            <MorphingIcon
              preset="heartFill"
              size={48}
              className="mx-auto mb-4 text-blue-600"
              triggers={['hover']}
            />
            <h3 className="text-xl font-semibold mb-3">Feature {item}</h3>
            <p className="text-gray-600">This card animates in with a staggered delay</p>
          </div>
        ))}
      </StaggeredGrid>
    </div>
  </div>
);

// Example 6: Parallax Elements
export const ParallaxElementsExample = () => (
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
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8">Parallax Elements</h2>
        <p className="text-xl text-gray-600">
          Notice the floating elements that move at different speeds as you scroll
        </p>
      </div>
    </div>
  </div>
);

// Example 7: Interactive Icons
export const InteractiveIconsExample = () => (
  <div className="py-20">
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
          <p className="text-sm">Menu to X (Hover)</p>
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
          <p className="text-sm">Heart Fill (Hover)</p>
        </div>
        
        <div className="text-center">
          <MorphingIcon
            preset="arrowRotate"
            size={64}
            className="text-purple-600 mb-4"
            triggers={['hover']}
          />
          <p className="text-sm">Arrow Rotate (Hover)</p>
        </div>
      </div>
    </div>
  </div>
);

// Complete Example Component
const ScrollAnimationExamples = () => {
  return (
    <div className="scroll-animation-examples">
      <BasicSectionExample />
      <TextRevealExample />
      <StatisticsExample />
      <ParallaxBackgroundExample />
      <StaggeredGridExample />
      <ParallaxElementsExample />
      <InteractiveIconsExample />
    </div>
  );
};

export default ScrollAnimationExamples;