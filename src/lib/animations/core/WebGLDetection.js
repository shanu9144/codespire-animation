/**
 * WebGL Detection and Capability Testing
 * Detects WebGL support and provides fallback mechanisms
 */

class WebGLDetection {
  constructor() {
    this.webglSupported = null;
    this.webgl2Supported = null;
    this.maxTextureSize = null;
    this.capabilities = null;
  }

  /**
   * Check if WebGL is supported
   * @returns {boolean} True if WebGL is supported
   */
  isWebGLSupported() {
    if (this.webglSupported !== null) {
      return this.webglSupported;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      this.webglSupported = !!gl;
      
      if (gl) {
        // Clean up
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }
      
      return this.webglSupported;
    } catch (e) {
      this.webglSupported = false;
      return false;
    }
  }

  /**
   * Check if WebGL2 is supported
   * @returns {boolean} True if WebGL2 is supported
   */
  isWebGL2Supported() {
    if (this.webgl2Supported !== null) {
      return this.webgl2Supported;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      this.webgl2Supported = !!gl;
      
      if (gl) {
        // Clean up
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }
      
      return this.webgl2Supported;
    } catch (e) {
      this.webgl2Supported = false;
      return false;
    }
  }

  /**
   * Get WebGL capabilities and limitations
   * @returns {Object} WebGL capabilities object
   */
  getWebGLCapabilities() {
    if (this.capabilities !== null) {
      return this.capabilities;
    }

    if (!this.isWebGLSupported()) {
      this.capabilities = {
        supported: false,
        maxTextureSize: 0,
        maxVertexTextures: 0,
        maxFragmentTextures: 0,
        maxRenderBufferSize: 0,
        extensions: []
      };
      return this.capabilities;
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      this.capabilities = {
        supported: true,
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
        maxVertexTextures: gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
        maxFragmentTextures: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
        maxRenderBufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
        maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
        maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
        extensions: gl.getSupportedExtensions() || []
      };

      // Clean up
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) {
        loseContext.loseContext();
      }

      return this.capabilities;
    } catch (e) {
      console.warn('Error getting WebGL capabilities:', e);
      this.capabilities = {
        supported: false,
        maxTextureSize: 0,
        maxVertexTextures: 0,
        maxFragmentTextures: 0,
        maxRenderBufferSize: 0,
        extensions: []
      };
      return this.capabilities;
    }
  }

  /**
   * Get recommended quality level based on WebGL capabilities
   * @returns {string} 'high', 'medium', or 'low'
   */
  getRecommendedQuality() {
    const capabilities = this.getWebGLCapabilities();
    
    if (!capabilities.supported) {
      return 'low';
    }

    // High quality: Large textures, many texture units, WebGL2 support
    if (capabilities.maxTextureSize >= 4096 && 
        capabilities.maxFragmentTextures >= 16 && 
        this.isWebGL2Supported()) {
      return 'high';
    }

    // Medium quality: Decent texture support
    if (capabilities.maxTextureSize >= 2048 && 
        capabilities.maxFragmentTextures >= 8) {
      return 'medium';
    }

    // Low quality: Basic WebGL support
    return 'low';
  }

  /**
   * Check if specific WebGL extension is supported
   * @param {string} extensionName - Name of the extension
   * @returns {boolean} True if extension is supported
   */
  isExtensionSupported(extensionName) {
    const capabilities = this.getWebGLCapabilities();
    return capabilities.extensions.includes(extensionName);
  }

  /**
   * Get fallback configuration when WebGL is not supported
   * @returns {Object} Fallback configuration
   */
  getFallbackConfig() {
    return {
      useCanvas2D: true,
      disableParticles: true,
      disable3D: true,
      useSimpleAnimations: true,
      maxAnimatedElements: 10
    };
  }
}

// Export singleton instance
export default new WebGLDetection();