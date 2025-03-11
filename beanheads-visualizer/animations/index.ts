import { AvatarProps } from 'beanheads';

// Types for animation system
export type AnimationUpdateFn = (
  avatarProps: AvatarProps,
  updateProp: <K extends keyof AvatarProps>(name: K, value: AvatarProps[K]) => void,
  setAnimationState: (state: string) => void
) => void;

export type AnimationCleanupFn = () => void;

export interface Animation {
  name: string;
  description: string;
  setup: (
    avatarProps: AvatarProps,
    updateProp: <K extends keyof AvatarProps>(name: K, value: AvatarProps[K]) => void,
    setAnimationState: (state: string) => void
  ) => AnimationCleanupFn;
}

// Animation states for blinking
export const eyeBlinkStates = ['normal', 'squint', 'content'] as const;
export type EyeBlinkState = typeof eyeBlinkStates[number];

// Create the blinking animation
const createBlinkAnimation = (): Animation => {
  let originalEyeType: string | undefined;
  let blinkIntervalId: NodeJS.Timeout | null = null;
  let animationInProgress = false;
  // Keep track of all timeouts to clean up properly
  const timeouts: NodeJS.Timeout[] = [];
  
  return {
    name: 'blink',
    description: 'Natural eye blinking animation with double-blink pattern',
    
    setup: (avatarProps, updateProp, setAnimationState) => {
      // Save the original eye type when starting animation
      originalEyeType = avatarProps.eyes as string;
      
      // Set the initial state to normal eyes
      setAnimationState('normal');
      updateProp('eyes', 'normal' as any);
      
      // Create a single blink sequence - much slower than before
      const executeBlinkSequence = () => {
        if (animationInProgress) return; // Prevent overlapping animations
        
        animationInProgress = true;
        
        // Start with normal eyes
        setAnimationState('normal');
        updateProp('eyes', 'normal' as any);
        
        // First blink sequence after delay
        const t1 = setTimeout(() => {
          // To half-closed
          setAnimationState('squint');
          updateProp('eyes', 'squint' as any);
          
          // To fully closed
          const t2 = setTimeout(() => {
            setAnimationState('content');
            updateProp('eyes', 'content' as any);
            
            // Stay closed a bit
            const t3 = setTimeout(() => {
              // Back to half-closed
              setAnimationState('squint');
              updateProp('eyes', 'squint' as any);
              
              // Finally back to open
              const t4 = setTimeout(() => {
                setAnimationState('normal');
                updateProp('eyes', 'normal' as any);
                
                // Short pause between blinks in double-blink sequence
                const t5 = setTimeout(() => {
                  // Start second blink - half-closed
                  setAnimationState('squint');
                  updateProp('eyes', 'squint' as any);
                  
                  // Second blink - fully closed
                  const t6 = setTimeout(() => {
                    setAnimationState('content');
                    updateProp('eyes', 'content' as any);
                    
                    // Stay closed a bit longer on second blink
                    const t7 = setTimeout(() => {
                      // Back to half-closed
                      setAnimationState('squint');
                      updateProp('eyes', 'squint' as any);
                      
                      // Finally back to open
                      const t8 = setTimeout(() => {
                        setAnimationState('normal');
                        updateProp('eyes', 'normal' as any);
                        
                        // Animation sequence complete
                        animationInProgress = false;
                      }, 250); // Much slower opening - 250ms
                      timeouts.push(t8);
                    }, 300); // Stay closed longer - 300ms
                    timeouts.push(t7);
                  }, 200); // Slower to close - 200ms
                  timeouts.push(t6);
                }, 1200); // Pause between blinks - 1200ms
                timeouts.push(t5);
              }, 250); // Slower opening - 250ms
              timeouts.push(t4);
            }, 200); // Slightly longer on first closed position - 200ms
            timeouts.push(t3);
          }, 200); // Slower closing - 200ms
          timeouts.push(t2);
        }, 200); // Slower to start closing - 200ms
        timeouts.push(t1);
        
        console.log('Blink animation started');
      };
      
      // Start blinking at random intervals
      blinkIntervalId = setInterval(() => {
        if (!animationInProgress) {
          executeBlinkSequence();
        }
      }, Math.random() * 2000 + 4000); // Random time between 4-6 seconds
      
      // Start the first blink after a short delay
      const initialDelay = setTimeout(() => {
        executeBlinkSequence();
      }, 2000); // Start first blink after 2 seconds
      timeouts.push(initialDelay);
      
      // Return cleanup function
      return () => {
        // Clean up interval
        if (blinkIntervalId) {
          clearInterval(blinkIntervalId);
          blinkIntervalId = null;
        }
        
        // Clean up all stored timeouts
        timeouts.forEach(timeout => clearTimeout(timeout));
        timeouts.length = 0;
        
        // Reset animation state
        animationInProgress = false;
        
        // Restore original eye type when stopping
        if (originalEyeType) {
          updateProp('eyes', originalEyeType as any);
        }
      };
    }
  };
};

// Available animations collection
export const animations: Record<string, Animation> = {
  blink: createBlinkAnimation(),
  none: {
    name: 'none',
    description: 'No animation',
    setup: () => () => {} // Empty setup and cleanup functions
  }
};

export const animationOptions = Object.values(animations).map(anim => ({
  value: anim.name,
  label: anim.name.charAt(0).toUpperCase() + anim.name.slice(1) + ' - ' + anim.description
})); 