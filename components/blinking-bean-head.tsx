/** @jsxImportSource react */
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { BeanHead } from "../core/src"; // Import BeanHead from local beanheads core
import { cn } from "../../../lib/utils";

// Cast BeanHead to React component
const BeanHeadComponent = BeanHead as unknown as React.FC<any>;

type EyeState = "normal" | "content" | "squint";
type ExpressionType = "neutral" | "sleeping";

interface BlinkingBeanHeadProps {
  avatarProps: Record<string, any>;
  className?: string;
  containerStyle?: "default" | "avatar";
  expressionType?: ExpressionType;
}

export function BlinkingBeanHead({ 
  avatarProps, 
  className, 
  containerStyle = "default",
  expressionType = "neutral"
}: BlinkingBeanHeadProps) {
  const [eyeState, setEyeState] = useState<EyeState>("normal");
  
  // Create a more natural looking blink sequence
  useEffect(() => {
    // Don't run blinking animation for sleeping expression
    if (expressionType === "sleeping") {
      return;
    }

    // Initial delay before starting the animation
    const initialDelay = setTimeout(() => {
      // Function to handle one complete blink cycle
      const performBlinkCycle = () => {
        // First blink
        setEyeState("squint");
        setTimeout(() => {
          setEyeState("content");
          setTimeout(() => {
            setEyeState("normal");
            
            // Small pause before second blink
            setTimeout(() => {
              // Second blink
              setEyeState("squint");
              setTimeout(() => {
                setEyeState("content");
                setTimeout(() => {
                  setEyeState("normal");
                }, 80); // Time with eyes fully closed (second blink)
              }, 70); // Time with eyes squinted (second blink)
            }, 200 + Math.random() * 100); // Variable pause between blinks
            
          }, 80); // Time with eyes fully closed (first blink)
        }, 70); // Time with eyes squinted (first blink)
      };
      
      // Initial blink cycle
      performBlinkCycle();
      
      // Set up recurring blink cycles with random intervals
      const intervalId = setInterval(() => {
        performBlinkCycle();
      }, 4000 + Math.random() * 2000); // Random interval between 4-6 seconds
      
      return () => {
        clearInterval(intervalId);
      };
    }, 1000 + Math.random() * 1500); // Random initial delay
    
    return () => {
      clearTimeout(initialDelay);
    };
  }, [expressionType]);
  
  // Merge the current eye state with avatar props based on expression type
  const currentAvatarProps = useMemo(() => {
    if (expressionType === "sleeping") {
      // For sleeping expression: closed eyes and special mouth
      return {
        ...avatarProps,
        eyes: "content", // Closed eyes for sleeping
        mouth: "serious", // Serious/neutral mouth for sleeping
      };
    }
    
    // For neutral expression: use the blinking eye state
    return {
      ...avatarProps,
      eyes: eyeState,
    };
  }, [avatarProps, eyeState, expressionType]);
  
  // For the avatar style used in CharacterCreationView
  if (containerStyle === "avatar") {
    return (
      <div
        className={cn("relative", className)}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 300 300"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <g transform="translate(40, 120) scale(0.75)">
              <BeanHeadComponent {...currentAvatarProps} />
            </g>
          </svg>
        </div>
      </div>
    );
  }
  
  // Default style used in CharacterSelectionPage
  return (
    <div className={cn("relative", className)}>
      <BeanHeadComponent {...currentAvatarProps} />
    </div>
  );
} 