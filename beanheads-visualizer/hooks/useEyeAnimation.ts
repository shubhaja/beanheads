import { useState, useEffect, useRef } from "react";

// Define the possible eye states
export type EyeAnimationType = "blink" | "leftTwitch" | "none";
export type EyeState = "normal" | "content" | "squint" | "leftTwitch";

/**
 * Custom hook for eye animations
 * 
 * @param animationType - Type of eye animation to perform
 * @returns Current eye state that should be applied to the BeanHead
 */
export function useEyeAnimation(animationType: EyeAnimationType = "none"): EyeState {
  const [eyeState, setEyeState] = useState<EyeState>("normal");
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  
  useEffect(() => {
    // Helper to add timeouts to the ref array for later cleanup
    const addTimeout = (callback: () => void, ms: number) => {
      const timeout = setTimeout(callback, ms);
      timeoutRefs.current.push(timeout);
      return timeout;
    };
    
    // Clear existing timeouts when animation type changes
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
    
    // Reset state when animation type changes
    setEyeState("normal");
    
    if (animationType === "none") {
      return;
    }
    
    if (animationType === "blink") {
      // Function to handle one complete blink cycle
      const performBlinkCycle = () => {
        // First blink
        setEyeState("squint");
        
        addTimeout(() => {
          setEyeState("content");
          
          addTimeout(() => {
            setEyeState("normal");
            
            // Small pause before second blink
            addTimeout(() => {
              // Second blink
              setEyeState("squint");
              
              addTimeout(() => {
                setEyeState("content");
                
                addTimeout(() => {
                  setEyeState("normal");
                }, 80); // Time with eyes fully closed (second blink)
              }, 70); // Time with eyes squinted (second blink)
            }, 200 + (Math.random() + 1) * 100); // Variable pause between blinks
            
          }, 80); // Time with eyes fully closed (first blink)
        }, 70); // Time with eyes squinted (first blink)
      };
      
      // Initial delay before starting the animation
      addTimeout(() => {
        // Initial blink cycle
        performBlinkCycle();
        
        // Set up recurring blink cycles with random intervals
        const intervalId = setInterval(() => {
          performBlinkCycle();
        }, 4000 + Math.random() * 2000); // Random interval between 4-6 seconds
        
        // Store interval for cleanup
        const intervalTimeout = {
          unref: () => clearInterval(intervalId)
        } as unknown as NodeJS.Timeout;
        timeoutRefs.current.push(intervalTimeout);
        
      }, 1000 + Math.random() * 1500); // Random initial delay
    }
    
    if (animationType === "leftTwitch") {
      // Function to handle one normal moment cycle
      const performNormalMomentCycle = () => {
        // Switch to normal eyes
        setEyeState("normal");
        
        // Stay in normal state for longer (800-1200ms)
        addTimeout(() => {
          // Switch back to twitching
          setEyeState("leftTwitch");
          
          // Stay in leftTwitch state briefly (300-500ms)
          addTimeout(() => {
            // Back to normal for another period
            setEyeState("normal");
            
            // Stay in normal state again (700-1000ms)
            addTimeout(() => {
              // Another brief twitch
              setEyeState("leftTwitch");
              
              // Sometimes add a third normal moment
              if (Math.random() > 0.4) {
                addTimeout(() => {
                  setEyeState("normal");
                  
                  // Stay in normal state again (600-900ms)
                  addTimeout(() => {
                    setEyeState("leftTwitch");
                  }, 600 + Math.random() * 300);
                }, 200 + Math.random() * 100);
              }
            }, 700 + Math.random() * 300);
          }, 300 + Math.random() * 200);
        }, 800 + Math.random() * 400);
      };
      
      // Set initial state to leftTwitch
      setEyeState("leftTwitch");
      
      // Initial delay before first cycle
      addTimeout(() => {
        // Initial cycle
        performNormalMomentCycle();
        
        // Set up recurring cycles with random intervals
        const intervalId = setInterval(() => {
          performNormalMomentCycle();
        }, 5000 + Math.random() * 3000); // Longer interval between cycles (5-8 seconds)
        
        // Store interval for cleanup
        const intervalTimeout = {
          unref: () => clearInterval(intervalId)
        } as unknown as NodeJS.Timeout;
        timeoutRefs.current.push(intervalTimeout);
        
      }, 1000 + Math.random() * 500); // Initial delay before first animation
    }
    
    // Cleanup all timeouts on unmount or when animation type changes
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, [animationType]);
  
  return eyeState;
} 