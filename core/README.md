# Bean Heads

A delightful avatar generation library with animations and emotes for React applications.

<p align="center">
  <img alt="Bean Heads Demo" src="https://raw.githubusercontent.com/shubhaja/beanheads/main/demo/demo.gif" />
</p>

## Features
- 🎨 Customizable avatar components
- ✨ Advanced facial animations and expressions
- 😄 Interactive emote system
- 🛠️ Comprehensive visualizer for testing
- 🔧 Fully typed TypeScript support

## Installation

### 1. Configure GitHub Packages
Create or edit `.npmrc` in your project root:

```bash
@shubhaja:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

### 2. Install the package
```bash
# Using npm
npm install @shubhaja/beanheads

# Using yarn
yarn add @shubhaja/beanheads
```

## Basic Usage

```tsx
import { Grumpy, AllInOne, Random } from '@shubhaja/beanheads';

// Simple avatar
function MyAvatar() {
  return <Grumpy />;
}

// With animations
function AnimatedAvatar() {
  return (
    <ModularBeanHead 
      avatarProps={avatarProps}
      eyeAnimation="blink"
      mouthAnimation="happyTalk"
      expressionAnimation="happy"
    />
  );
}

// With emotes
function EmotingAvatar() {
  return (
    <ModularBeanHead 
      avatarProps={avatarProps}
      emoteType="surprise" 
      expressionAnimation="surprised"
    />
  );
}
```

## Available Components

### Base Avatars
- `<BeanHead />` - The core avatar component
- `<ModularBeanHead />` - Enhanced component with animation support
- `<AllInOne />` - Component with all variations
- `<Random />` - Randomly selected avatar configuration

## Animation System

This package includes a comprehensive animation system with three animation layers and emote effects:

### Eye Animations
Available types:
```tsx
type EyeAnimationType = "blink" | "leftTwitch" | "none";
```

### Mouth Animations
Available types:
```tsx
type MouthAnimationType = "happyTalk" | "sadTalk" | "normalTalk" | "none";
```

### Expression Animations
Controls the overall facial expression:
```tsx
type ExpressionAnimationType = 
  // Basic expressions
  | "happy" | "sad" | "angry" | "surprised" | "confused" 
  | "excited" | "love" | "shocked" | "sleeping" | "neutral"
  
  // Success/failure states
  | "godlikeSuccess" | "greatSuccess" | "success" | "mildSuccess"
  | "mildFailure" | "failure" | "terribleFailure" | "tragicFailure"
  
  // Talking variations (adds mouth movement)
  | "happyTalk" | "sadTalk" | "angryTalk" | "surprisedTalk" 
  | "confusedTalk" | "excitedTalk" | "loveTalk" | "shockedTalk"
  | "godlikeSuccessTalk" | "greatSuccessTalk" | "successTalk" 
  | "mildSuccessTalk" | "neutralTalk" | "mildFailureTalk" 
  | "failureTalk" | "terribleFailureTalk" | "tragicFailureTalk"
  
  | "none";
```

### Emotes
Visual effects that appear above the avatar:
```tsx
type EmoteType = "sleep" | "surprise" | "question" | "none";
```

## Component Props

### ModularBeanHead Props
```tsx
interface ModularBeanHeadProps {
  avatarProps: AvatarProps; // Standard avatar configuration
  eyeAnimation?: EyeAnimationType;
  mouthAnimation?: MouthAnimationType;
  expressionAnimation?: ExpressionAnimationType;
  emoteType?: EmoteType;
  className?: string;
  containerStyle?: "default" | "avatar";
}
```

## Using the Visualizer

The visualizer is an interactive development tool that lets you experiment with all possible avatar configurations.

### Running the Visualizer Locally

```bash
# From the root directory
npm run start:visualizer
# or
yarn start:visualizer

# The visualizer will be available at http://localhost:3000
```

### Visualizer Features
- 🎨 Live preview of all avatar variations and colors
- 🎭 Test all expression animations
- 👁️ Try different eye animations (blinking, twitching)
- 👄 Experiment with mouth animations (talking effects)
- 💬 Add emotes (sleep, surprise, question)
- 🔄 Random generation for inspiration
- 📱 Responsive design testing
- 📋 Copy code for your selected configuration

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Robert Broersma](LICENSE) 