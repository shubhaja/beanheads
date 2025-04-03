/** @jsxImportSource react */
import * as React from "react";
import { Avatar } from "../core/src";
import { cn } from "../../../lib/utils";

export interface BeanAvatarProps {
  className?: string;
  accessory?: "none" | "roundGlasses" | "tinyGlasses" | "shades";
  body?: "chest" | "breasts";
  circleColor?: "blue";
  clothing?: "naked" | "shirt" | "dressShirt" | "vneck" | "tankTop" | "dress";
  clothingColor?: "white" | "blue" | "black" | "green" | "red";
  eyebrows?: "raised" | "leftLowered" | "serious" | "angry" | "concerned";
  eyes?:
    | "normal"
    | "leftTwitch"
    | "happy"
    | "content"
    | "squint"
    | "simple"
    | "dizzy"
    | "wink"
    | "heart";
  facialHair?: "none" | "none2" | "none3" | "stubble" | "mediumBeard";
  graphic?: "none" | "redwood" | "gatsby" | "vue" | "react" | "graphQL";
  hair?:
    | "none"
    | "long"
    | "bun"
    | "short"
    | "pixie"
    | "balding"
    | "buzz"
    | "afro"
    | "bob";
  hairColor?:
    | "blonde"
    | "orange"
    | "black"
    | "white"
    | "brown"
    | "blue"
    | "pink";
  hat?: "none" | "none2" | "none3" | "none4" | "none5" | "beanie" | "turban";
  hatColor?: "white" | "blue" | "black" | "green" | "red";
  lashes?: boolean | string;
  lipColor?: "red" | "purple" | "pink" | "turqoise" | "green";
  mask?: boolean | string;
  faceMask?: boolean | string;
  mouth?: "grin" | "sad" | "openSmile" | "lips" | "open" | "serious" | "tongue";
  skinTone?: "light" | "yellow" | "brown" | "dark" | "red" | "black";
}

const defaultProps = {
  accessory: "none",
  body: "chest",
  circleColor: "blue",
  clothing: "shirt",
  clothingColor: "blue",
  eyebrows: "serious",
  eyes: "normal",
  facialHair: "none",
  graphic: "none",
  hair: "short",
  hairColor: "black",
  hat: "none",
  hatColor: "blue",
  lashes: false,
  lipColor: "red",
  mask: false,
  faceMask: false,
  mouth: "serious",
  skinTone: "light",
} as const;

function convertToBoolean(value: boolean | string | undefined): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return false;
}

export function BeanAvatar({ className, ...props }: BeanAvatarProps = {}) {
  const avatarProps = React.useMemo(() => {
    return {
      accessory: props.accessory || defaultProps.accessory,
      body: props.body || defaultProps.body,
      circleColor: props.circleColor || defaultProps.circleColor,
      clothing: props.clothing || defaultProps.clothing,
      clothingColor: props.clothingColor || defaultProps.clothingColor,
      eyebrows: props.eyebrows || defaultProps.eyebrows,
      eyes: props.eyes || defaultProps.eyes,
      facialHair: props.facialHair || defaultProps.facialHair,
      graphic: props.graphic || defaultProps.graphic,
      hair: props.hair || defaultProps.hair,
      hairColor: props.hairColor || defaultProps.hairColor,
      hat: props.hat || defaultProps.hat,
      hatColor: props.hatColor || defaultProps.hatColor,
      lashes: convertToBoolean(props.lashes),
      lipColor: props.lipColor || defaultProps.lipColor,
      mask: convertToBoolean(props.mask),
      faceMask: convertToBoolean(props.faceMask),
      mouth: props.mouth || defaultProps.mouth,
      skinTone: props.skinTone || defaultProps.skinTone,
    } as const;
  }, [props]);

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
            <Avatar {...(avatarProps as any)} />
          </g>
        </svg>
      </div>
    </div>
  );
}