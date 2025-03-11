import { useState, useEffect, useRef } from "react";

// Define expression component types
export type EyeState = "normal" | "content" | "squint" | "leftTwitch" | "happy" | "dizzy" | "heart" | "simple" | "wink";
export type EyebrowsState = "raised" | "serious" | "angry" | "concerned" | "leftLowered";
export type MouthState = "grin" | "sad" | "openSmile" | "lips" | "open" | "serious" | "tongue";

// Define the expression types
export type ExpressionAnimationType = 
  | "godlikeSuccess" 
  | "greatSuccess" 
  | "success" 
  | "mildSuccess" 
  | "neutral" 
  | "mildFailure" 
  | "failure" 
  | "terribleFailure" 
  | "tragicFailure"
  | "happy"
  | "sad"
  | "angry"
  | "surprised"
  | "confused"
  | "excited"
  | "love"
  | "shocked"
  | "none";

// Define the full expression state
export interface ExpressionState {
  eyes: EyeState;
  eyebrows: EyebrowsState;
  mouth: MouthState;
}

// Predefined base expressions
const expressions: Record<string, ExpressionState> = {
  godlikeSuccess: {
    eyes: "heart",
    eyebrows: "raised",
    mouth: "openSmile",
  },
  greatSuccess: {
    eyes: "happy",
    eyebrows: "raised",
    mouth: "grin",
  },
  success: {
    eyes: "content",
    eyebrows: "raised",
    mouth: "openSmile",
  },
  mildSuccess: {
    eyes: "normal",
    eyebrows: "raised",
    mouth: "grin",
  },
  neutral: {
    eyes: "normal",
    eyebrows: "serious",
    mouth: "serious",
  },
  mildFailure: {
    eyes: "normal",
    eyebrows: "concerned",
    mouth: "sad",
  },
  failure: {
    eyes: "squint",
    eyebrows: "angry",
    mouth: "sad",
  },
  terribleFailure: {
    eyes: "dizzy",
    eyebrows: "angry",
    mouth: "open",
  },
  tragicFailure: {
    eyes: "dizzy",
    eyebrows: "angry",
    mouth: "open",
  },
  happy: {
    eyes: "content",
    eyebrows: "raised",
    mouth: "grin",
  },
  sad: {
    eyes: "normal",
    eyebrows: "concerned",
    mouth: "sad",
  },
  angry: {
    eyes: "squint",
    eyebrows: "angry",
    mouth: "serious",
  },
  surprised: {
    eyes: "normal",
    eyebrows: "raised",
    mouth: "open",
  },
  confused: {
    eyes: "normal",
    eyebrows: "leftLowered",
    mouth: "serious",
  },
  excited: {
    eyes: "happy",
    eyebrows: "raised",
    mouth: "openSmile",
  },
  love: {
    eyes: "heart",
    eyebrows: "raised",
    mouth: "openSmile",
  },
  shocked: {
    eyes: "dizzy",
    eyebrows: "raised",
    mouth: "open",
  }
};

/**
 * Custom hook for expression animations
 * 
 * @param animationType - Type of expression animation to perform
 * @returns Current expression state that should be applied to the BeanHead
 */
export function useExpressionAnimation(animationType: ExpressionAnimationType = "none"): ExpressionState {
  const [expressionState, setExpressionState] = useState<ExpressionState>(expressions.neutral);
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
    setExpressionState(expressions.neutral);
    
    if (animationType === "none") {
      return;
    }
    
    // Get target expression based on animation type
    const targetExpression = expressions[animationType] || expressions.neutral;
    
    // Schedule animation flow based on expression type
    switch (animationType) {
      case "godlikeSuccess":
        // Start with neutral expression
        setExpressionState(expressions.neutral);
        
        // Transition to surprised
        addTimeout(() => {
          setExpressionState(expressions.surprised);
          
          // Then to excited
          addTimeout(() => {
            setExpressionState(expressions.excited);
            
            // Finally to godlike success
            addTimeout(() => {
              setExpressionState(expressions.godlikeSuccess);
              
              // Add some dynamic movement at the end
              addTimeout(() => {
                // Blink hearts
                setExpressionState({
                  ...expressions.godlikeSuccess,
                  eyes: "content"
                });
                
                addTimeout(() => {
                  setExpressionState(expressions.godlikeSuccess);
                }, 150);
              }, 1200);
            }, 400);
          }, 400);
        }, 400);
        break;
        
      case "greatSuccess":
        // Start with neutral expression
        setExpressionState(expressions.neutral);
        
        // Transition to mild success
        addTimeout(() => {
          setExpressionState(expressions.mildSuccess);
          
          // Then to great success
          addTimeout(() => {
            setExpressionState(expressions.greatSuccess);
            
            // Add a little dynamic eye movement
            addTimeout(() => {
              setExpressionState({
                ...expressions.greatSuccess,
                eyes: "content"
              });
              
              addTimeout(() => {
                setExpressionState(expressions.greatSuccess);
              }, 300);
            }, 1000);
          }, 500);
        }, 400);
        break;
        
      case "success":
        // Start with neutral expression
        setExpressionState(expressions.neutral);
        
        // Go directly to success with a subtle transition
        addTimeout(() => {
          setExpressionState({
            ...expressions.neutral,
            eyebrows: "raised"
          });
          
          addTimeout(() => {
            setExpressionState(expressions.success);
          }, 300);
        }, 300);
        break;
        
      case "mildSuccess":
        // Simple transition from neutral to mild success
        setExpressionState(expressions.neutral);
        
        addTimeout(() => {
          setExpressionState(expressions.mildSuccess);
        }, 400);
        break;
        
      case "mildFailure":
        // Start with neutral expression
        setExpressionState(expressions.neutral);
        
        // Go to mild concern
        addTimeout(() => {
          setExpressionState({
            ...expressions.neutral,
            eyebrows: "concerned"
          });
          
          // Complete transition to mild failure
          addTimeout(() => {
            setExpressionState(expressions.mildFailure);
          }, 300);
        }, 400);
        break;
        
      case "failure":
        // Start with mild failure
        setExpressionState(expressions.mildFailure);
        
        // Transition to full failure
        addTimeout(() => {
          setExpressionState(expressions.failure);
        }, 500);
        break;
        
      case "terribleFailure":
        // Start with failure
        setExpressionState(expressions.failure);
        
        // First eye twitch
        addTimeout(() => {
          setExpressionState({
            ...expressions.failure,
            eyes: "normal"
          });
          
          // Start transition to terrible
          addTimeout(() => {
            setExpressionState({
              ...expressions.failure,
              mouth: "open"
            });
            
            // Complete transition to terrible failure
            addTimeout(() => {
              setExpressionState(expressions.terribleFailure);
            }, 200);
          }, 200);
        }, 400);
        break;
        
      case "tragicFailure":
        // Similar to terrible but with more dramatic lead-in
        setExpressionState(expressions.neutral);
        
        // Shocked expression first
        addTimeout(() => {
          setExpressionState(expressions.shocked);
          
          // Then transition to tragic failure
          addTimeout(() => {
            setExpressionState(expressions.tragicFailure);
          }, 600);
        }, 300);
        break;
        
      case "happy":
        // Simple happy animation
        setExpressionState(expressions.neutral);
        
        addTimeout(() => {
          setExpressionState(expressions.happy);
        }, 300);
        break;
        
      case "sad":
        // Simple sad animation
        setExpressionState(expressions.neutral);
        
        addTimeout(() => {
          setExpressionState(expressions.sad);
        }, 300);
        break;
        
      case "angry":
        // Transition to angry with a build-up
        setExpressionState(expressions.neutral);
        
        // First eyebrows
        addTimeout(() => {
          setExpressionState({
            ...expressions.neutral,
            eyebrows: "angry"
          });
          
          // Then eyes
          addTimeout(() => {
            setExpressionState({
              ...expressions.neutral,
              eyebrows: "angry",
              eyes: "squint"
            });
            
            // Complete angry expression
            addTimeout(() => {
              setExpressionState(expressions.angry);
            }, 200);
          }, 200);
        }, 300);
        break;
        
      case "surprised":
        // Quick surprise reaction
        setExpressionState(expressions.neutral);
        
        addTimeout(() => {
          setExpressionState(expressions.surprised);
        }, 200);
        break;
        
      case "confused":
        // Transition to confused
        setExpressionState(expressions.neutral);
        
        addTimeout(() => {
          setExpressionState({
            ...expressions.neutral,
            eyebrows: "leftLowered"
          });
          
          addTimeout(() => {
            setExpressionState(expressions.confused);
          }, 300);
        }, 300);
        break;
        
      case "excited":
        // Build up to excited
        setExpressionState(expressions.happy);
        
        addTimeout(() => {
          setExpressionState(expressions.excited);
        }, 400);
        break;
        
      case "love":
        // Transition to love
        setExpressionState(expressions.happy);
        
        addTimeout(() => {
          setExpressionState(expressions.love);
        }, 400);
        break;
        
      case "shocked":
        // Quick shock reaction
        setExpressionState(expressions.neutral);
        
        addTimeout(() => {
          setExpressionState(expressions.shocked);
        }, 200);
        break;
        
      default:
        // For any undefined animations, just set the corresponding expression
        if (expressions[animationType]) {
          setExpressionState(expressions[animationType]);
        } else {
          setExpressionState(expressions.neutral);
        }
    }
    
    // Cleanup all timeouts on unmount or when animation type changes
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, [animationType]);
  
  return expressionState;
} 