/**
 * Test Setup Configuration
 * Global test setup for TypeScript and React Testing
 */

import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: vi.fn(),
    pop: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
  }),
}));

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn(),
  }),
  usePathname: () => '/',
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock WebGL context
const mockWebGLContext = {
  getParameter: vi.fn(),
  getExtension: vi.fn(),
  createShader: vi.fn(),
  createProgram: vi.fn(),
  createBuffer: vi.fn(),
  createTexture: vi.fn(),
  createFramebuffer: vi.fn(),
  createRenderbuffer: vi.fn(),
  shaderSource: vi.fn(),
  compileShader: vi.fn(),
  attachShader: vi.fn(),
  linkProgram: vi.fn(),
  useProgram: vi.fn(),
  bindBuffer: vi.fn(),
  bufferData: vi.fn(),
  bindTexture: vi.fn(),
  texImage2D: vi.fn(),
  texParameteri: vi.fn(),
  bindFramebuffer: vi.fn(),
  bindRenderbuffer: vi.fn(),
  renderbufferStorage: vi.fn(),
  framebufferTexture2D: vi.fn(),
  framebufferRenderbuffer: vi.fn(),
  viewport: vi.fn(),
  clear: vi.fn(),
  clearColor: vi.fn(),
  drawArrays: vi.fn(),
  drawElements: vi.fn(),
  enable: vi.fn(),
  disable: vi.fn(),
  enableVertexAttribArray: vi.fn(),
  vertexAttribPointer: vi.fn(),
  getAttribLocation: vi.fn(),
  getUniformLocation: vi.fn(),
  uniform1f: vi.fn(),
  uniform2f: vi.fn(),
  uniform3f: vi.fn(),
  uniform4f: vi.fn(),
  uniform1i: vi.fn(),
  uniformMatrix4fv: vi.fn(),
  activeTexture: vi.fn(),
  generateMipmap: vi.fn(),
  deleteShader: vi.fn(),
  deleteProgram: vi.fn(),
  deleteBuffer: vi.fn(),
  deleteTexture: vi.fn(),
  deleteFramebuffer: vi.fn(),
  deleteRenderbuffer: vi.fn(),
  checkFramebufferStatus: vi.fn(() => 36053), // FRAMEBUFFER_COMPLETE
  getShaderParameter: vi.fn(() => true),
  getProgramParameter: vi.fn(() => true),
  getShaderInfoLog: vi.fn(() => ''),
  getProgramInfoLog: vi.fn(() => ''),
  canvas: {
    width: 800,
    height: 600,
    clientWidth: 800,
    clientHeight: 600,
  },
};

// Mock WebGL2 context
const mockWebGL2Context = {
  ...mockWebGLContext,
  createVertexArray: vi.fn(),
  bindVertexArray: vi.fn(),
  deleteVertexArray: vi.fn(),
  isVertexArray: vi.fn(),
  createTransformFeedback: vi.fn(),
  bindTransformFeedback: vi.fn(),
  deleteTransformFeedback: vi.fn(),
  isTransformFeedback: vi.fn(),
  beginTransformFeedback: vi.fn(),
  endTransformFeedback: vi.fn(),
  transformFeedbackVaryings: vi.fn(),
  getTransformFeedbackVarying: vi.fn(),
  pauseTransformFeedback: vi.fn(),
  resumeTransformFeedback: vi.fn(),
  getUniformBlockIndex: vi.fn(),
  uniformBlockBinding: vi.fn(),
  getActiveUniformBlockName: vi.fn(),
  getActiveUniformBlockParameter: vi.fn(),
  bindBufferBase: vi.fn(),
  bindBufferRange: vi.fn(),
  getIndexedParameter: vi.fn(),
  getUniformIndices: vi.fn(),
  getActiveUniforms: vi.fn(),
  getInternalformatParameter: vi.fn(),
  invalidateFramebuffer: vi.fn(),
  invalidateSubFramebuffer: vi.fn(),
  invalidateTexImage: vi.fn(),
  invalidateTexSubImage: vi.fn(),
  multiDrawArrays: vi.fn(),
  multiDrawElements: vi.fn(),
  multiDrawElementsInstanced: vi.fn(),
  multiDrawArraysInstanced: vi.fn(),
  drawArraysInstanced: vi.fn(),
  drawElementsInstanced: vi.fn(),
  vertexAttribDivisor: vi.fn(),
  drawArraysInstancedBaseInstance: vi.fn(),
  drawElementsInstancedBaseVertex: vi.fn(),
  drawElementsInstancedBaseVertexBaseInstance: vi.fn(),
  drawRangeElements: vi.fn(),
  drawRangeElementsBaseVertex: vi.fn(),
  drawBuffers: vi.fn(),
  clearBufferfv: vi.fn(),
  clearBufferiv: vi.fn(),
  clearBufferuiv: vi.fn(),
  clearBufferfi: vi.fn(),
  createQuery: vi.fn(),
  deleteQuery: vi.fn(),
  isQuery: vi.fn(),
  beginQuery: vi.fn(),
  endQuery: vi.fn(),
  queryCounter: vi.fn(),
  getQuery: vi.fn(),
  getQueryParameter: vi.fn(),
  createSampler: vi.fn(),
  deleteSampler: vi.fn(),
  isSampler: vi.fn(),
  bindSampler: vi.fn(),
  samplerParameteri: vi.fn(),
  samplerParameterf: vi.fn(),
  getSamplerParameter: vi.fn(),
  fenceSync: vi.fn(),
  isSync: vi.fn(),
  deleteSync: vi.fn(),
  clientWaitSync: vi.fn(),
  waitSync: vi.fn(),
  getSyncParameter: vi.fn(),
};

// Mock canvas getContext
HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((contextType: string) => {
  switch (contextType) {
    case 'webgl':
      return mockWebGLContext;
    case 'webgl2':
      return mockWebGL2Context;
    case '2d':
      return {
        fillRect: vi.fn(),
        clearRect: vi.fn(),
        getImageData: vi.fn(() => ({ data: new Array(4) })),
        putImageData: vi.fn(),
        createImageData: vi.fn(() => ({ data: new Array(4) })),
        setTransform: vi.fn(),
        drawImage: vi.fn(),
        save: vi.fn(),
        fillText: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
        translate: vi.fn(),
        scale: vi.fn(),
        rotate: vi.fn(),
        arc: vi.fn(),
        fill: vi.fn(),
        measureText: vi.fn(() => ({ width: 0 })),
        transform: vi.fn(),
        rect: vi.fn(),
        clip: vi.fn(),
      };
    default:
      return null;
  }
});

// Mock performance API
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
    getEntriesByName: vi.fn(() => []),
    clearMarks: vi.fn(),
    clearMeasures: vi.fn(),
  },
});

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  return setTimeout(cb, 16) as unknown as number;
});

global.cancelAnimationFrame = vi.fn((id) => {
  clearTimeout(id);
});

// Mock console methods for cleaner test output
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is deprecated') ||
      args[0].includes('Warning: validateDOMNesting'))
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};

console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('componentWillReceiveProps has been renamed')
  ) {
    return;
  }
  originalConsoleWarn.call(console, ...args);
};
