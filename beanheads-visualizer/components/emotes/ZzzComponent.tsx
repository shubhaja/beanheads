import { CSSProperties } from 'react';

export interface ZzzProps {
  showZzz?: boolean;
  zDelay?: number;
}

const zzzContainerStyle: CSSProperties = {
  position: 'absolute',
  top: '-15px',
  right: '-10px',
  pointerEvents: 'none'
};

// Animation keyframes as a string
const floatUpKeyframes = `
@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-30px);
  }
}
`;

// SVG for small z character
const SmallZSVG = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 5H14L6 15H14" stroke="#9DA7FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SVG for large z character
const LargeZSVG = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 6.5H21L7 21.5H21" stroke="#9DA7FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export function ZzzComponent({ showZzz = false, zDelay = 0 }: ZzzProps) {
  if (!showZzz) return null;
  
  return (
    <>
      {/* Insert the keyframes into the document */}
      <style dangerouslySetInnerHTML={{ __html: floatUpKeyframes }} />
      
      <div style={zzzContainerStyle}>
        
        <div style={{
          position: 'absolute',
          right: '30px',
          top: '15px',
          opacity: 0,
          animation: `floatUp 3.5s ease-in-out infinite`,
          animationDelay: `${zDelay + 0.2}s`
        }}>
          <SmallZSVG />
        </div>
        
        <div style={{
          position: 'absolute',
          right: '60px',
          top: '35px',
          opacity: 0,
          animation: `floatUp 3.5s ease-in-out infinite`,
          animationDelay: `${zDelay}s`
        }}>
          <LargeZSVG />
        </div>
      </div>
    </>
  );
} 