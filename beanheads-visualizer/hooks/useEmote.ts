import { useState, useEffect, useRef } from "react";
import { ExpressionAnimationType } from "./useExpressionAnimation";

// Define emote types
export type EmoteType = 
  | "sleep"
  | "surprise"
  | "none";

// Define emote configuration
export interface EmoteConfig {
  showEmote: boolean;
  zDelay?: number; // Specific to ZZZ emote
  surpriseDelay?: number; // Specific to surprise emote
}

export function useEmote(
  emoteType: EmoteType = "none", 
  expressionAnimation: ExpressionAnimationType = "none"
): EmoteConfig {
  // Check if we should show sleep emote based on the expression
  const shouldShowSleepEmote = expressionAnimation === "sleeping" || emoteType === "sleep";

  // Initialize with default values based on emote type and expression
  const [emoteConfig, setEmoteConfig] = useState<EmoteConfig>({
    showEmote: emoteType !== "none" || shouldShowSleepEmote,
    zDelay: (emoteType === "sleep" || shouldShowSleepEmote) ? 0.2 : undefined,
    surpriseDelay: emoteType === "surprise" ? 0.1 : undefined
  });
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  
  // Clear all timeouts on cleanup
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    timeoutsRef.current = [];
  };
  
  // Add a timeout and store its reference for cleanup
  const addTimeout = (callback: () => void, ms: number) => {
    const timeoutId = setTimeout(callback, ms);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  };

  useEffect(() => {
    // Determine if we should show the sleep emote based on expression type
    const shouldShowSleepEmote = expressionAnimation === "sleeping" || emoteType === "sleep";
    
    // Reset state when emote type or expression animation changes
    setEmoteConfig({
      showEmote: emoteType !== "none" || shouldShowSleepEmote,
      zDelay: (emoteType === "sleep" || shouldShowSleepEmote) ? 0.2 : undefined,
      surpriseDelay: emoteType === "surprise" ? 0.1 : undefined
    });
    
    // Clean up previous timeouts
    clearAllTimeouts();
    
    // Return cleanup function
    return () => {
      clearAllTimeouts();
    };
  }, [emoteType, expressionAnimation]);
  
  return emoteConfig;
} 