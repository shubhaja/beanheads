import { useState, useMemo } from 'react';
import { BeanHead, AvatarProps, theme } from 'beanheads';
import {
  eyesMap,
  eyebrowsMap,
  mouthsMap,
  hairMap,
  facialHairMap,
  clothingMap,
  accessoryMap,
  graphicsMap,
  hatMap,
  bodyMap,
} from 'beanheads';
import { ModularBeanHead } from './ModularBeanHead';
import { EyeAnimationType } from '../hooks/useEyeAnimation';
import { MouthAnimationType } from '../hooks/useMouthAnimation';
import { ExpressionAnimationType } from '../hooks/useExpressionAnimation';
import { EmoteType } from '../hooks/useEmote';
import { emoteOptions } from '../animations/emotes';

// Create key-value pairs for dropdown options
const createOptions = (obj: Record<string, any>) => {
  return Object.keys(obj).map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
  }));
};

// Define option maps
const optionMaps = {
  skinTone: createOptions(theme.colors.skin),
  eyes: createOptions(eyesMap),
  eyebrows: createOptions(eyebrowsMap),
  mouth: createOptions(mouthsMap),
  hair: createOptions(hairMap),
  facialHair: createOptions(facialHairMap),
  clothing: createOptions(clothingMap),
  accessory: createOptions(accessoryMap),
  graphic: createOptions(graphicsMap),
  hat: createOptions(hatMap),
  body: createOptions(bodyMap),
  hairColor: createOptions(theme.colors.hair),
  clothingColor: createOptions(theme.colors.clothing),
  hatColor: createOptions(theme.colors.clothing),
  lipColor: createOptions(theme.colors.lipColors),
  circleColor: createOptions(theme.colors.bgColors),
};

// Type-safe random option selector
const getRandomOption = <T extends object>(options: T): keyof T => {
  const keys = Object.keys(options) as Array<keyof T>;
  return keys[Math.floor(Math.random() * keys.length)];
};

// Type assertions for proper typing
const getRandomOptions = (): AvatarProps => {
  const skinTone = getRandomOption(theme.colors.skin);
  const eyes = getRandomOption(eyesMap);
  const eyebrows = getRandomOption(eyebrowsMap);
  const mouth = getRandomOption(mouthsMap);
  const hair = getRandomOption(hairMap);
  const facialHair = getRandomOption(facialHairMap);
  const clothing = getRandomOption(clothingMap);
  const accessory = getRandomOption(accessoryMap);
  const graphic = getRandomOption(graphicsMap);
  const hat = getRandomOption(hatMap);
  const body = getRandomOption(bodyMap);
  const hairColor = getRandomOption(theme.colors.hair);
  const clothingColor = getRandomOption(theme.colors.clothing);
  const hatColor = getRandomOption(theme.colors.clothing);
  const lipColor = getRandomOption(theme.colors.lipColors);
  const circleColor = getRandomOption(theme.colors.bgColors);

  return {
    skinTone,
    eyes,
    eyebrows,
    mouth,
    hair,
    facialHair,
    clothing,
    accessory,
    graphic,
    hat,
    body,
    hairColor,
    clothingColor,
    hatColor,
    lipColor,
    circleColor,
    mask: true,
    faceMask: false,
    lashes: Math.random() > 0.5,
  };
};

// Eye animation options
const eyeAnimationOptions = [
  { value: "none", label: "None" },
  { value: "blink", label: "Blinking Eyes" },
  { value: "leftTwitch", label: "Left Eye Twitch" },
];

// Mouth animation options
const mouthAnimationOptions = [
  { value: "none", label: "None" },
  { value: "happyTalk", label: "Happy Talk" },
  { value: "sadTalk", label: "Sad Talk" },
  { value: "normalTalk", label: "Normal Talk" },
];

// Expression animation options
const expressionAnimationOptions = [
  { value: "none", label: "None" },
  // Success levels
  { value: "", label: "---- Success Levels ----", disabled: true },
  { value: "godlikeSuccess", label: "Godlike Success" },
  { value: "greatSuccess", label: "Great Success" },
  { value: "success", label: "Success" },
  { value: "mildSuccess", label: "Mild Success" },
  { value: "neutral", label: "Neutral" },
  { value: "mildFailure", label: "Mild Failure" },
  { value: "failure", label: "Failure" },
  { value: "terribleFailure", label: "Terrible Failure" },
  { value: "tragicFailure", label: "Tragic Failure" },
  // Talking Success Levels
  { value: "", label: "---- Talking Success Levels ----", disabled: true },
  { value: "godlikeSuccessTalk", label: "Godlike Success (Talking)" },
  { value: "greatSuccessTalk", label: "Great Success (Talking)" },
  { value: "successTalk", label: "Success (Talking)" },
  { value: "mildSuccessTalk", label: "Mild Success (Talking)" },
  { value: "neutralTalk", label: "Neutral (Talking)" },
  { value: "mildFailureTalk", label: "Mild Failure (Talking)" },
  { value: "failureTalk", label: "Failure (Talking)" },
  { value: "terribleFailureTalk", label: "Terrible Failure (Talking)" },
  { value: "tragicFailureTalk", label: "Tragic Failure (Talking)" },
  // Emotions
  { value: "", label: "---- Emotions ----", disabled: true },
  { value: "happy", label: "Happy" },
  { value: "sad", label: "Sad" },
  { value: "angry", label: "Angry" },
  { value: "surprised", label: "Surprised" },
  { value: "confused", label: "Confused" },
  { value: "excited", label: "Excited" },
  { value: "love", label: "Love" },
  { value: "shocked", label: "Shocked" },
  { value: "sleeping", label: "Sleeping" },
  // Talking Emotions
  { value: "", label: "---- Talking Emotions ----", disabled: true },
  { value: "happyTalk", label: "Happy (Talking)" },
  { value: "sadTalk", label: "Sad (Talking)" },
  { value: "angryTalk", label: "Angry (Talking)" },
  { value: "surprisedTalk", label: "Surprised (Talking)" },
  { value: "confusedTalk", label: "Confused (Talking)" },
  { value: "excitedTalk", label: "Excited (Talking)" },
  { value: "loveTalk", label: "Love (Talking)" },
  { value: "shockedTalk", label: "Shocked (Talking)" },
];

const BeanHeadVisualizer = () => {
  const [options, setOptions] = useState<AvatarProps>(getRandomOptions());
  const [eyeAnimation, setEyeAnimation] = useState<EyeAnimationType>("none");
  const [mouthAnimation, setMouthAnimation] = useState<MouthAnimationType>("none");
  const [expressionAnimation, setExpressionAnimation] = useState<ExpressionAnimationType>("none");
  const [emoteType, setEmoteType] = useState<EmoteType>("none");
  const [reactCode, setReactCode] = useState<string>('');
  
  // Generate React code based on current props
  useMemo(() => {
    const code = `import { BeanHead } from 'beanheads';

const Avatar = () => (
  <BeanHead
    ${Object.entries(options)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return `${key}={${value}}`;
        }
        return `${key}="${value}"`;
      })
      .join('\n    ')}
  />
)`;
    setReactCode(code);
  }, [options]);
  
  // Type-safe prop updater
  const updateProp = <K extends keyof AvatarProps>(name: K, value: AvatarProps[K]) => {
    setOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Randomize all properties
  const randomize = () => {
    // Turn off all animations when randomizing
    setEyeAnimation("none");
    setMouthAnimation("none");
    setExpressionAnimation("none");
    setEmoteType("none");
    setOptions(getRandomOptions());
  };
  
  // Handle eye animation change
  const handleEyeAnimationChange = (value: EyeAnimationType) => {
    setEyeAnimation(value);
    // Turn off expression animation if eye animation is enabled
    if (value !== "none") {
      setExpressionAnimation("none");
    }
  };
  
  // Handle mouth animation change
  const handleMouthAnimationChange = (value: MouthAnimationType) => {
    setMouthAnimation(value);
    // Turn off expression animation if mouth animation is enabled
    if (value !== "none") {
      setExpressionAnimation("none");
    }
  };
  
  // Handle expression animation change
  const handleExpressionAnimationChange = (value: ExpressionAnimationType) => {
    setExpressionAnimation(value);
    // Turn off eye and mouth animations if expression animation is enabled
    if (value !== "none") {
      setEyeAnimation("none");
      setMouthAnimation("none");
    }
  };
  
  // Handle emote type change
  const handleEmoteTypeChange = (value: EmoteType) => {
    setEmoteType(value);
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">BeanHead Visualizer</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Avatar Display */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-64 h-64">
            <ModularBeanHead
              avatarProps={options}
              eyeAnimation={eyeAnimation}
              mouthAnimation={mouthAnimation}
              expressionAnimation={expressionAnimation}
              emoteType={emoteType}
            />
          </div>
          
          {/* Animation Controls */}
          <div className="mt-6 mb-6 w-full">
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-lg font-medium mb-2">Emotes</label>
                <select
                  value={emoteType}
                  onChange={(e) => handleEmoteTypeChange(e.target.value as EmoteType)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {emoteOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-lg font-medium mb-2">Expression Animation</label>
                <select
                  value={expressionAnimation}
                  onChange={(e) => handleExpressionAnimationChange(e.target.value as ExpressionAnimationType)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {expressionAnimationOptions.map((option) => (
                    <option key={option.value || option.label} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {expressionAnimation !== "none" && (
                  <div className="text-xs text-amber-600 mt-1">
                    Expression animations override eye and mouth animations
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-lg font-medium mb-2">Eye Animation</label>
                <select
                  value={eyeAnimation}
                  onChange={(e) => handleEyeAnimationChange(e.target.value as EyeAnimationType)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled={expressionAnimation !== "none"}
                >
                  {eyeAnimationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-lg font-medium mb-2">Mouth Animation</label>
                <select
                  value={mouthAnimation}
                  onChange={(e) => handleMouthAnimationChange(e.target.value as MouthAnimationType)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled={expressionAnimation !== "none"}
                >
                  {mouthAnimationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Randomize Button */}
          <button
            onClick={randomize}
            className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Randomize
          </button>
        </div>
        
        {/* Right: Form Controls */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Display form elements for all properties */}
            {Object.entries(optionMaps).map(([key, options]) => (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <select
                  value={String(options[key as keyof typeof options])}
                  onChange={(e) => {
                    // If changing eyes manually, turn off eye animation
                    if (key === 'eyes' && eyeAnimation !== "none") {
                      handleEyeAnimationChange("none");
                    }
                    // If changing mouth manually, turn off mouth animation
                    if (key === 'mouth' && mouthAnimation !== "none") {
                      handleMouthAnimationChange("none");
                    }
                    // Type assertion as any to bypass strict type checking
                    updateProp(key as keyof AvatarProps, e.target.value as any);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  disabled={(key === 'eyes' && eyeAnimation !== "none") || (key === 'mouth' && mouthAnimation !== "none")}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {(key === 'eyes' && eyeAnimation !== "none") && (
                  <div className="text-xs text-amber-600 mt-1">
                    Controlled by eye animation
                  </div>
                )}
                {(key === 'mouth' && mouthAnimation !== "none") && (
                  <div className="text-xs text-amber-600 mt-1">
                    Controlled by mouth animation
                  </div>
                )}
              </div>
            ))}
            
            {/* Boolean properties */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lashes</label>
              <select
                value={String(options.lashes)}
                onChange={(e) => updateProp('lashes', e.target.value === 'true')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Face Mask</label>
              <select
                value={String(options.faceMask)}
                onChange={(e) => updateProp('faceMask', e.target.value === 'true')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Code Display */}
      <div className="mt-8 bg-gray-100 p-4 rounded-md">
        <h2 className="text-xl font-medium mb-2">Code</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
          <code>{reactCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default BeanHeadVisualizer; 