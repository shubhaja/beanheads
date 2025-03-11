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
  | "godlikeSuccessTalk"
  | "greatSuccessTalk"
  | "successTalk"
  | "mildSuccessTalk"
  | "neutralTalk"
  | "mildFailureTalk"
  | "failureTalk"
  | "terribleFailureTalk"
  | "tragicFailureTalk"
  | "happyTalk"
  | "sadTalk"
  | "angryTalk"
  | "surprisedTalk"
  | "confusedTalk"
  | "excitedTalk"
  | "loveTalk"
  | "shockedTalk"
  | "none";

// Define the full expression state
export interface ExpressionState {
  eyes: EyeState;
  eyebrows: EyebrowsState;
  mouth: MouthState;
}

// Helper to determine if an eye state is considered "open" and should blink
const isOpenEyeState = (eyeState: EyeState): boolean => {
  const openEyeStates: EyeState[] = ["normal", "squint", "simple", "heart"];
  return openEyeStates.includes(eyeState);
};

// Helper to determine if the animation includes talking
const isTalkingAnimation = (animationType: ExpressionAnimationType): boolean => {
  return animationType.endsWith("Talk");
};

// Helper to get the base expression for a talking animation
const getBaseExpressionType = (animationType: ExpressionAnimationType): ExpressionAnimationType => {
  if (isTalkingAnimation(animationType)) {
    // Remove "Talk" from the end to get the base expression
    return animationType.slice(0, -4) as ExpressionAnimationType;
  }
  return animationType;
};

// Function to get the appropriate talking mouth state based on the expression
const getTalkingMouthState = (baseExpression: ExpressionState, expressionType: string): MouthState => {
  // Special cases for specific expression types
  if (expressionType === "failure" || expressionType === "mildFailure") {
    return "open"; // Always use fully open mouth for failure talking to make it more visible
  }
  
  // Map each expression's mouth type to an appropriate talking mouth
  switch (baseExpression.mouth) {
    case "grin":
    case "openSmile":
      return "openSmile"; // Happy talking
    case "sad":
      return "open"; // Sad talking (alternates with sad)
    case "open":
      return "open"; // Already open for talking
    case "serious":
    case "lips":
      return "open"; // Default talking mouth
    case "tongue":
      return "openSmile"; // Replace tongue with open smile for talking
    default:
      return "open"; // Default to open mouth for talking
  }
};

// Function to get the closed mouth state for talking animation based on the expression
const getClosedMouthState = (baseExpression: ExpressionState, expressionType: string): MouthState => {
  // Map each expression's mouth type to an appropriate closed mouth state
  switch (baseExpression.mouth) {
    case "grin":
      return "grin"; // Return to grin when mouth closes
    case "openSmile":
      return "grin"; // Close to grin from open smile
    case "sad":
      // Special case for failure expressions - they should use serious instead of sad for the closed state
      if (expressionType === "failure" || expressionType === "mildFailure") {
        return "serious"; // Use serious for failure expressions
      }
      return "sad"; // Stay sad for other sad expressions
    case "open":
      return "serious"; // Close to serious from open
    case "serious":
      return "serious"; // Stay serious
    case "lips":
      return "lips"; // Stay with lips
    case "tongue":
      return "grin"; // Close to grin from tongue
    default:
      return "serious"; // Default closed mouth
  }
};

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
  const isFirstRender = useRef<boolean>(true);
  const finalExpressionRef = useRef<ExpressionState | null>(null);
  const isTalkingRef = useRef<boolean>(false);
  const talkingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
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
    
    // Clear any talking interval
    if (talkingIntervalRef.current) {
      clearInterval(talkingIntervalRef.current);
      talkingIntervalRef.current = null;
    }
    
    // Reset state when animation type changes
    setExpressionState(expressions.neutral);
    
    if (animationType === "none") {
      return;
    }
    
    // Check if this is a talking animation
    isTalkingRef.current = isTalkingAnimation(animationType);
    
    // Get the base expression type (without "Talk" suffix if present)
    const baseExpressionType = getBaseExpressionType(animationType);
    
    // Get target expression based on animation type
    const targetExpression = expressions[baseExpressionType] || expressions.neutral;
    finalExpressionRef.current = targetExpression;
    
    // Add talking animation if this is a talking expression
    const addTalkingEffect = (finalState: ExpressionState) => {
      if (!isTalkingRef.current) return;
      
      // Get the appropriate mouth states for this expression
      const talkingMouth = getTalkingMouthState(finalState, baseExpressionType);
      const closedMouth = getClosedMouthState(finalState, baseExpressionType);
      
      // Special case for failure expressions - need more pronounced mouth movements
      const isFailureExpression = baseExpressionType === "failure" || baseExpressionType === "mildFailure";
      
      // Function to toggle between talking and closed mouth
      const performMouthMovement = () => {
        // Toggle mouth state
        setExpressionState(prevState => {
          const isCurrentlyOpen = prevState.mouth === talkingMouth;
          
          // For failure expressions, make the open state longer than closed state
          if (isFailureExpression && !isCurrentlyOpen) {
            // When moving to open state for failures, add a slightly longer duration
            setTimeout(() => {
              setExpressionState(prevState => ({
                ...prevState,
                mouth: closedMouth
              }));
            }, 300); // Even longer duration for open mouth in failure states
            
            return {
              ...prevState,
              mouth: talkingMouth
            };
          }
          
          return {
            ...prevState,
            mouth: isCurrentlyOpen ? closedMouth : talkingMouth
          };
        });
      };
      
      // Start talking animation with irregular intervals for natural speech
      const talkingInterval = setInterval(() => {
        performMouthMovement();
        
        // Randomly adjust the interval timing for more natural speech
        if (Math.random() > 0.7) {
          if (talkingIntervalRef.current) {
            clearInterval(talkingIntervalRef.current);
            
            // Create a new interval with slight timing variation
            talkingIntervalRef.current = setInterval(performMouthMovement, 
              100 + Math.random() * 100); // 100-200ms variation for more noticeable mouth movement
          }
        }
      }, 150); // Slightly slower base talking speed for more visible movements
      
      talkingIntervalRef.current = talkingInterval;
      timeoutRefs.current.push(talkingInterval as unknown as NodeJS.Timeout);
    };
    
    // Add blinking animation for expressions with open eyes
    const addBlinkingEffect = (finalState: ExpressionState) => {
      // Only add blinking for open eye states
      if (!isOpenEyeState(finalState.eyes)) return;
      
      // Blinking cycle that keeps the same eyebrows and mouth
      const performBlinkCycle = () => {
        // First blink - squint
        setExpressionState(prevState => ({
          ...prevState,
          eyes: "squint"
        }));
        
        // Then close
        addTimeout(() => {
          setExpressionState(prevState => ({
            ...prevState,
            eyes: "content"
          }));
          
          // Return to original eye state
          addTimeout(() => {
            setExpressionState(prevState => ({
              ...prevState,
              eyes: finalState.eyes
            }));
          }, 80); // Time with eyes fully closed
        }, 70); // Time with eyes squinted
      };
      
      // Set up recurring blink cycles with random intervals
      const setupRecurringBlinks = () => {
        performBlinkCycle();
        
        // Schedule next blink cycle with a random delay
        addTimeout(setupRecurringBlinks, 4000 + Math.random() * 2000); // 4-6 seconds between blinks
      };
      
      // Start the first blink cycle after a delay
      addTimeout(setupRecurringBlinks, 2000 + Math.random() * 1000);
    };
    
    // Setup animation flow - common function for both regular and talking animations
    const setupExpressionAnimation = () => {
      // Schedule animation flow based on expression type (without "Talk" suffix)
      switch (baseExpressionType) {
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
                
                // Add talking if this is a talking animation
                addTalkingEffect(expressions.godlikeSuccess);
                
                // Add some dynamic movement at the end
                addTimeout(() => {
                  // Blink hearts
                  setExpressionState(prevState => ({
                    ...prevState,
                    eyes: "content"
                  }));
                  
                  addTimeout(() => {
                    setExpressionState(prevState => ({
                      ...prevState,
                      eyes: "heart"
                    }));
                    
                    // Add blinking for heart eyes if not talking
                    if (!isTalkingRef.current) {
                      addTimeout(() => {
                        addBlinkingEffect(expressions.godlikeSuccess);
                      }, 1000);
                    }
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
              
              // Add talking if this is a talking animation
              addTalkingEffect(expressions.greatSuccess);
              
              // Add a little dynamic eye movement
              addTimeout(() => {
                setExpressionState(prevState => ({
                  ...prevState,
                  eyes: "content"
                }));
                
                addTimeout(() => {
                  setExpressionState(prevState => ({
                    ...prevState,
                    eyes: "happy"
                  }));
                  
                  // Add blinking if not talking
                  if (!isTalkingRef.current) {
                    addTimeout(() => {
                      addBlinkingEffect(expressions.greatSuccess);
                    }, 500);
                  }
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
              
              // Add talking if this is a talking animation
              addTalkingEffect(expressions.success);
              
              // Add blinking after a delay if not talking
              if (!isTalkingRef.current) {
                addTimeout(() => {
                  addBlinkingEffect(expressions.success);
                }, 800);
              }
            }, 300);
          }, 300);
          break;
          
        case "mildSuccess":
          // Simple transition from neutral to mild success
          setExpressionState(expressions.neutral);
          
          addTimeout(() => {
            setExpressionState(expressions.mildSuccess);
            
            // Add talking if this is a talking animation
            addTalkingEffect(expressions.mildSuccess);
            
            // Add blinking after it settles if not talking
            if (!isTalkingRef.current) {
              addTimeout(() => {
                addBlinkingEffect(expressions.mildSuccess);
              }, 800);
            }
          }, 400);
          break;
          
        case "neutral":
          // Just set to neutral
          setExpressionState(expressions.neutral);
          
          // Add talking if this is a talking animation
          addTalkingEffect(expressions.neutral);
          
          // Add blinking after it settles if not talking
          if (!isTalkingRef.current) {
            addTimeout(() => {
              addBlinkingEffect(expressions.neutral);
            }, 800);
          }
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
              
              // Add talking if this is a talking animation
              addTalkingEffect(expressions.mildFailure);
              
              // Add blinking after it settles if not talking
              if (!isTalkingRef.current) {
                addTimeout(() => {
                  addBlinkingEffect(expressions.mildFailure);
                }, 800);
              }
            }, 300);
          }, 400);
          break;
          
        case "failure":
          // Start with mild failure
          setExpressionState(expressions.mildFailure);
          
          // Transition to full failure
          addTimeout(() => {
            setExpressionState(expressions.failure);
            
            // Add talking if this is a talking animation
            addTalkingEffect(expressions.failure);
            
            // Add blinking after it settles if not talking
            if (!isTalkingRef.current) {
              addTimeout(() => {
                addBlinkingEffect(expressions.failure);
              }, 800);
            }
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
                
                // Add talking if this is a talking animation
                addTalkingEffect(expressions.terribleFailure);
                
                // Dizzy eyes don't blink
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
              
              // Add talking if this is a talking animation
              addTalkingEffect(expressions.tragicFailure);
              
              // Dizzy eyes don't blink
            }, 600);
          }, 300);
          break;
          
        case "happy":
          // Simple happy animation
          setExpressionState(expressions.neutral);
          
          addTimeout(() => {
            setExpressionState(expressions.happy);
            
            // Add talking if this is a talking animation
            addTalkingEffect(expressions.happy);
            
            // Add blinking after it settles if not talking
            if (!isTalkingRef.current) {
              addTimeout(() => {
                addBlinkingEffect(expressions.happy);
              }, 800);
            }
          }, 300);
          break;
          
        case "sad":
          // Simple sad animation
          setExpressionState(expressions.neutral);
          
          addTimeout(() => {
            setExpressionState(expressions.sad);
            
            // Add talking if this is a talking animation
            addTalkingEffect(expressions.sad);
            
            // Add blinking after it settles if not talking
            if (!isTalkingRef.current) {
              addTimeout(() => {
                addBlinkingEffect(expressions.sad);
              }, 800);
            }
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
                
                // Add talking if this is a talking animation
                addTalkingEffect(expressions.angry);
                
                // Add blinking after it settles if not talking
                if (!isTalkingRef.current) {
                  addTimeout(() => {
                    addBlinkingEffect(expressions.angry);
                  }, 800);
                }
              }, 200);
            }, 200);
          }, 300);
          break;
          
        case "surprised":
          // Quick surprise reaction
          setExpressionState(expressions.neutral);
          
          addTimeout(() => {
            setExpressionState(expressions.surprised);
            
            // Add talking if this is a talking animation
            addTalkingEffect(expressions.surprised);
            
            // Add blinking after it settles if not talking
            if (!isTalkingRef.current) {
              addTimeout(() => {
                addBlinkingEffect(expressions.surprised);
              }, 800);
            }
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
              
              // Add talking if this is a talking animation
              addTalkingEffect(expressions.confused);
              
              // Add blinking after it settles if not talking
              if (!isTalkingRef.current) {
                addTimeout(() => {
                  addBlinkingEffect(expressions.confused);
                }, 800);
              }
            }, 300);
          }, 300);
          break;
          
        case "excited":
          // Build up to excited
          setExpressionState(expressions.happy);
          
          addTimeout(() => {
            setExpressionState(expressions.excited);
            
            // Add talking if this is a talking animation
            addTalkingEffect(expressions.excited);
            
            // No blinking for happy eyes
          }, 400);
          break;
          
        case "love":
          // Transition to love
          setExpressionState(expressions.happy);
          
          addTimeout(() => {
            setExpressionState(expressions.love);
            
            // Add talking if this is a talking animation
            addTalkingEffect(expressions.love);
            
            // Add blinking after it settles (for heart eyes) if not talking
            if (!isTalkingRef.current) {
              addTimeout(() => {
                addBlinkingEffect(expressions.love);
              }, 800);
            }
          }, 400);
          break;
          
        case "shocked":
          // Quick shock reaction
          setExpressionState(expressions.neutral);
          
          addTimeout(() => {
            setExpressionState(expressions.shocked);
            
            // Add talking if this is a talking animation
            addTalkingEffect(expressions.shocked);
            
            // Dizzy eyes don't blink
          }, 200);
          break;
          
        default:
          // For any undefined animations, just set the corresponding expression
          if (expressions[baseExpressionType]) {
            setExpressionState(expressions[baseExpressionType]);
            
            // Add talking if this is a talking animation
            addTalkingEffect(expressions[baseExpressionType]);
            
            // Add blinking after a delay if the eyes are open and not talking
            if (!isTalkingRef.current) {
              addTimeout(() => {
                if (expressions[baseExpressionType] && isOpenEyeState(expressions[baseExpressionType].eyes)) {
                  addBlinkingEffect(expressions[baseExpressionType]);
                }
              }, 800);
            }
          } else {
            setExpressionState(expressions.neutral);
            
            // Add talking if this is a talking animation
            addTalkingEffect(expressions.neutral);
            
            // Add blinking for neutral if not talking
            if (!isTalkingRef.current) {
              addTimeout(() => {
                addBlinkingEffect(expressions.neutral);
              }, 800);
            }
          }
      }
    };
    
    // Start the expression animation
    setupExpressionAnimation();
    
    // Cleanup all timeouts and intervals on unmount or when animation type changes
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
      
      if (talkingIntervalRef.current) {
        clearInterval(talkingIntervalRef.current);
        talkingIntervalRef.current = null;
      }
    };
  }, [animationType]);
  
  return expressionState;
} 