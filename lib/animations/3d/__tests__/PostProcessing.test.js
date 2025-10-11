import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import PostProcessing, { 
  AdaptivePostProcessing, 
  MobilePostProcessing, 
  DesktopPostProcessing 
} from '../PostProcessing';
import { Scene3DProvider } from '../Scene3DProvider';
import { Canvas } from '@react-three/fiber';

// Mock the postprocessing library
vi.mock('@react-three/postprocessing', () => ({
  EffectComposer: ({ children, ...props }) => <div data-testid="effect-composer" {...props}>{children}</div>,
  Bloom: (props) => <div data-testid="bloom-effect" {...props} />,
  DepthOfField: (props) => <div data-testid="depth-of-field" {...props} />,
  Noise: (props) => <div data-testid="noise-effect" {...props} />,
  Vignette: (props) => <div data-testid="vignette-effect" {...props} />,
  ChromaticAberration: (props) => <div data-testid="chromatic-aberration" {...props} />,
  SMAA: (props) => <div data-testid="smaa-effect" {...props} />
}));

vi.mock('postprocessing', () => ({
  BlendFunction: {
    SCREEN: 'screen',
    NORMAL: 'normal',
    OVERLAY: 'overlay',
    MULTIPLY: 'multiply'
  },
  KernelSize: {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
  }
}));

const TestWrapper = ({ children }) => (
  <Scene3DProvider>
    <Canvas>
      {children}
    </Canvas>
  </Scene3DProvider>
);

describe('PostProcessing', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <PostProcessing />
      </TestWrapper>
    );
  });

  it('renders bloom effect when enabled', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <PostProcessing enableBloom={true} />
      </TestWrapper>
    );
    
    expect(getByTestId('bloom-effect')).toBeInTheDocument();
  });

  it('renders depth of field when enabled', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <PostProcessing enableDepthOfField={true} />
      </TestWrapper>
    );
    
    expect(getByTestId('depth-of-field')).toBeInTheDocument();
  });

  it('does not render effects when disabled', () => {
    const { queryByTestId } = render(
      <TestWrapper>
        <PostProcessing 
          enableBloom={false} 
          enableDepthOfField={false}
          enableNoise={false}
        />
      </TestWrapper>
    );
    
    expect(queryByTestId('bloom-effect')).not.toBeInTheDocument();
    expect(queryByTestId('depth-of-field')).not.toBeInTheDocument();
    expect(queryByTestId('noise-effect')).not.toBeInTheDocument();
  });
});

describe('AdaptivePostProcessing', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <AdaptivePostProcessing />
      </TestWrapper>
    );
  });
});

describe('MobilePostProcessing', () => {
  it('renders with mobile-optimized settings', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <MobilePostProcessing />
      </TestWrapper>
    );
    
    expect(getByTestId('effect-composer')).toBeInTheDocument();
  });
});

describe('DesktopPostProcessing', () => {
  it('renders with desktop-optimized settings', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <DesktopPostProcessing />
      </TestWrapper>
    );
    
    expect(getByTestId('effect-composer')).toBeInTheDocument();
  });
});