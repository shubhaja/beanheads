import { useState, useEffect, useRef } from "react";

// Define the possible mouth states and animation types
export type MouthAnimationType = "happyTalk" | "sadTalk" | "normalTalk" | "none";
export type MouthState = "openSmile" | "serious" | "grin" | "sad" | "lips" | "open" | "tongue";

/**
 * Custom hook for mouth animations
 * 
 * @param animationType - Type of mouth animation to perform
 * @returns Current mouth state that should be applied to the BeanHead
 */
export function useMouthAnimation(animationType: MouthAnimationType = "none"): MouthState {
  const [mouthState, setMouthState] = useState<MouthState>("serious");
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
    setMouthState("serious");
    
    if (animationType === "none") {
      return;
    }
    
    if (animationType === "happyTalk") {
      // Function for fast, continuous mouth movement
      const animateMouth = () => {
        // Toggle mouth state
        setMouthState(prevState => prevState === "openSmile" ? "serious" : "openSmile");
        
        // Schedule next toggle with slight irregularity (30-80ms)
        const nextToggleDelay = 30 + (Math.random() + 1) * 100;
        addTimeout(animateMouth, nextToggleDelay);
      };
      
      // Start the animation after a short delay
      addTimeout(() => {
        animateMouth();
      }, 200);
    }
    
    if (animationType === "sadTalk") {
      // Function for sad talking animation
      const animateMouth = () => {
        // Toggle mouth state between sad and serious
        setMouthState(prevState => prevState === "sad" ? "serious" : "sad");
        
        // Schedule next toggle with slight irregularity (30-80ms)
        const nextToggleDelay = 30 + (Math.random() + 1) * 100;
        addTimeout(animateMouth, nextToggleDelay);
      };
      
      // Start the animation after a short delay
      addTimeout(() => {
        animateMouth();
      }, 200);
    }
    
    if (animationType === "normalTalk") {
      // Function for normal talking animation using open mouth
      const animateMouth = () => {
        // Toggle mouth state between open and serious
        setMouthState(prevState => prevState === "open" ? "serious" : "open");
        
        // Schedule next toggle with slight irregularity (30-80ms)
        const nextToggleDelay = 30 + (Math.random() + 1) * 100;
        addTimeout(animateMouth, nextToggleDelay);
      };
      
      // Start the animation after a short delay
      addTimeout(() => {
        animateMouth();
      }, 200);
    }
    
    // Cleanup all timeouts on unmount or when animation type changes
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, [animationType]);
  
  return mouthState;
} 