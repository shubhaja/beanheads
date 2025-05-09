import { useMemo } from 'react';
import { BeanHead, AvatarProps } from "../../core/src";
import { cn } from "../utils/cn";
import { useEyeAnimation, EyeAnimationType } from "../hooks/useEyeAnimation";
import { useMouthAnimation, MouthAnimationType } from "../hooks/useMouthAnimation";
import { useExpressionAnimation, ExpressionAnimationType } from "../hooks/useExpressionAnimation";
import { useEmote, EmoteType } from "../hooks/useEmote";
import { EmoteComponent } from "./emotes/EmoteComponent";

interface ModularBeanHeadProps {
  avatarProps: AvatarProps;
  eyeAnimation?: EyeAnimationType;
  mouthAnimation?: MouthAnimationType;
  expressionAnimation?: ExpressionAnimationType;
  emoteType?: EmoteType;
  className?: string;
  containerStyle?: "default" | "avatar";
}

export function ModularBeanHead({
  avatarProps,
  eyeAnimation = "none",
  mouthAnimation = "none",
  expressionAnimation = "none",
  emoteType = "none",
  className,
  containerStyle = "default"
}: ModularBeanHeadProps) {
  // Use our custom hooks to get the current states
  const eyeState = useEyeAnimation(eyeAnimation);
  const mouthState = useMouthAnimation(mouthAnimation);
  const expressionState = useExpressionAnimation(expressionAnimation);
  const emoteConfig = useEmote(emoteType, expressionAnimation);
  
  // Merge the current states with avatar props
  const currentAvatarProps = useMemo(() => {
    // If expression animation is active, it overrides individual eye/mouth animations
    if (expressionAnimation !== "none") {
      return {
        ...avatarProps,
        eyes: expressionState.eyes,
        eyebrows: expressionState.eyebrows,
        mouth: expressionState.mouth,
      };
    }
    
    // Otherwise use individual eye/mouth animations
    return {
      ...avatarProps,
      eyes: eyeState,
      mouth: mouthState,
    };
  }, [avatarProps, eyeState, mouthState, expressionAnimation, expressionState]);

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
              <BeanHead {...currentAvatarProps} />
            </g>
          </svg>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <EmoteComponent emoteType={emoteType} emoteConfig={emoteConfig} />
          </div>
        </div>
      </div>
    );
  }

  // Default style used in CharacterSelectionPage
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 1000 990"
        style={{ width: "100%", height: "100%" }}
      >
        <BeanHead {...currentAvatarProps} />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <EmoteComponent emoteType={emoteType} emoteConfig={emoteConfig} />
      </div>
    </div>
  );
} 