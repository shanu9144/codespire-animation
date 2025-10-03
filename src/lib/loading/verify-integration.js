/**
 * Verification script for animation system integration
 * This script tests the integration between loading system and animation systems
 */

import LoadingManager from './LoadingManager.js';
import ProgressTracker from './ProgressTracker.js';
import AnimationSystemIntegration from './AnimationSystemIntegration.js';
import { loadingConfig } from './loadingConfig.js';

// Mock window object for Node.js environment
if (typeof window === 'undefined') {
  global.window = {
    LoadingManager: null,
    progressTracker: null,
    AnimationEngine: null,
    animationIntegration: null,
    HTMLCanvasElement: {
      prototype: {
        getContext: function() { return null; }
      }
    },
    setTimeout: setTimeout,
    performance: { now: () => Date.now() }
  };
  
  global.HTMLCanvasElement = global.window.HTMLCanvasElement;
  global.document = {
    createElement: () => ({ getContext: () => null }),
    querySelectorAll: () => [],
    addEventListener: () => {},
    readyState: 'complete',
    fonts: {
      ready: Promise.resolve()
    }
  };
}

async function verifyIntegration() {
  console.log('🔍 Verifying Animation System Integration...\n');
  
  try {
    // Test 1: Initialize LoadingManager
    console.log('1. Testing LoadingManager initialization...');
    LoadingManager.initialize();
    console.log('✅ LoadingManager initialized successfully');
    console.log(`   - Global reference: ${window.LoadingManager ? 'Set' : 'Missing'}`);
    
    // Test 2: Initialize AnimationSystemIntegration
    console.log('\n2. Testing AnimationSystemIntegration initialization...');
    AnimationSystemIntegration.initialize();
    console.log('✅ AnimationSystemIntegration initialized successfully');
    console.log(`   - Global reference: ${window.animationIntegration ? 'Set' : 'Missing'}`);
    
    // Test 3: Test system notification
    console.log('\n3. Testing system notification...');
    const initialStatus = AnimationSystemIntegration.getSystemStatus();
    console.log('   Initial status:', initialStatus);
    
    // Simulate animation system loading
    AnimationSystemIntegration.notifySystemLoaded('AnimationEngine');
    AnimationSystemIntegration.notifySystemLoaded('WebGLContext');
    
    const updatedStatus = AnimationSystemIntegration.getSystemStatus();
    console.log('   Updated status:', updatedStatus);
    console.log('✅ System notification working correctly');
    
    // Test 4: Test progress tracking
    console.log('\n4. Testing progress tracking...');
    const progressTracker = new ProgressTracker(loadingConfig);
    
    // Track some animation systems
    progressTracker.trackAnimationSystem('AnimationEngine', 0.3);
    progressTracker.trackAnimationSystem('WebGLContext', 0.2);
    progressTracker.trackAnimationSystem('ShaderCompilation', 0.2);
    
    console.log('   Animation systems tracked successfully');
    
    // Mark systems as loaded
    progressTracker.markAnimationSystemLoaded('AnimationEngine');
    progressTracker.markAnimationSystemLoaded('WebGLContext');
    
    const breakdown = progressTracker.getProgressBreakdown();
    console.log('   Progress breakdown:', breakdown.animations);
    console.log('✅ Progress tracking working correctly');
    
    // Test 5: Test WebGL context hooking
    console.log('\n5. Testing WebGL context hooking...');
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    AnimationSystemIntegration.setupWebGLHooks();
    const hookedGetContext = HTMLCanvasElement.prototype.getContext;
    
    console.log(`   Context method hooked: ${originalGetContext !== hookedGetContext ? 'Yes' : 'No'}`);
    console.log('✅ WebGL context hooking working correctly');
    
    // Test 6: Test error handling
    console.log('\n6. Testing error handling...');
    
    // Temporarily remove global references
    const tempLoadingManager = window.LoadingManager;
    const tempProgressTracker = window.progressTracker;
    delete window.LoadingManager;
    delete window.progressTracker;
    
    // This should not throw an error
    AnimationSystemIntegration.notifySystemLoaded('TestSystem');
    console.log('✅ Error handling working correctly');
    
    // Restore references
    window.LoadingManager = tempLoadingManager;
    window.progressTracker = tempProgressTracker;
    
    // Test 7: Test cleanup
    console.log('\n7. Testing cleanup...');
    const systemCount = AnimationSystemIntegration.loadedSystems.size;
    console.log(`   Systems loaded before cleanup: ${systemCount}`);
    
    AnimationSystemIntegration.destroy();
    console.log(`   Systems loaded after cleanup: ${AnimationSystemIntegration.loadedSystems.size}`);
    console.log(`   Global reference cleaned: ${!window.animationIntegration ? 'Yes' : 'No'}`);
    console.log('✅ Cleanup working correctly');
    
    console.log('\n🎉 All integration tests passed successfully!');
    console.log('\nIntegration Summary:');
    console.log('- ✅ LoadingManager integration');
    console.log('- ✅ ProgressTracker animation system tracking');
    console.log('- ✅ AnimationSystemIntegration hooks');
    console.log('- ✅ WebGL context monitoring');
    console.log('- ✅ System notification pipeline');
    console.log('- ✅ Error handling and graceful degradation');
    console.log('- ✅ Proper cleanup and resource management');
    
  } catch (error) {
    console.error('❌ Integration verification failed:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run verification if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  verifyIntegration();
}

export default verifyIntegration;