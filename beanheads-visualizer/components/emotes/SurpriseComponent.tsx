import { CSSProperties } from 'react';

export interface SurpriseProps {
  showSurprise?: boolean;
  surpriseDelay?: number;
}

const surpriseContainerStyle: CSSProperties = {
  position: 'absolute',
  top: '-5px',
  right: '0px',
  pointerEvents: 'none'
};

// Animation keyframes as a string
const popInKeyframes = `
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  20% {
    opacity: 1;
    transform: scale(1.2);
  }
  30% {
    transform: scale(1) rotate(5deg);
  }
  40% {
    transform: scale(1) rotate(-5deg);
  }
  50% {
    transform: scale(1) rotate(3deg);
  }
  60% {
    transform: scale(1) rotate(-3deg);
  }
  70% {
    transform: scale(1) rotate(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0) rotate(0); }
  5%, 25%, 45%, 65%, 85% { transform: translateX(-2px) rotate(-1deg); }
  15%, 35%, 55%, 75%, 95% { transform: translateX(2px) rotate(1deg); }
}
`;

// SVG for exclamation mark
const ExclamationSVG = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4V16" stroke="#FF3A3A" strokeWidth="4" strokeLinecap="round" />
    <circle cx="12" cy="22" r="2" fill="#FF3A3A" />
  </svg>
);

export function SurpriseComponent({ showSurprise = false, surpriseDelay = 0 }: SurpriseProps) {
  if (!showSurprise) return null;
  
  return (
    <>
      {/* Insert the keyframes into the document */}
      <style dangerouslySetInnerHTML={{ __html: popInKeyframes }} />
      
      <div style={surpriseContainerStyle}>
        {/* First exclamation mark */}
        <div style={{
          position: 'absolute',
          right: '40px',
          top: '20px',
          opacity: 0,
          animation: `popIn 0.8s ease-in-out forwards, shake 0.7s ease-in-out ${surpriseDelay}s infinite`,
          animationDelay: `${surpriseDelay}s`
        }}>
          <ExclamationSVG />
        </div>
        
        {/* Second exclamation mark */}
        <div style={{
          position: 'absolute',
          right: '60px',
          top: '15px',
          opacity: 0,
          animation: `popIn 0.8s ease-in-out forwards, shake 0.7s ease-in-out ${surpriseDelay}s infinite`,
          animationDelay: `${surpriseDelay}s`
        }}>
          <ExclamationSVG />
        </div>
      </div>
    </>
  );
} 