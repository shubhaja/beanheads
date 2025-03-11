import React, { CSSProperties } from 'react';

export interface QuestionMarkProps {
  showQuestion?: boolean;
  questionDelay?: number;
}

const questionContainerStyle: CSSProperties = {
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

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
`;

// SVG for question mark
const QuestionMarkSVG = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17V18" stroke="#FF8A00" strokeWidth="3" strokeLinecap="round" />
    <path d="M12 14C12 11 15 10.5 15 8.5C15 6.5 13.5 5 12 5C10.5 5 9 6.5 9 8" stroke="#FF8A00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function QuestionMarkComponent({ showQuestion = false, questionDelay = 0 }: QuestionMarkProps) {
  if (!showQuestion) return null;
  
  return (
    <>
      {/* Insert the keyframes into the document */}
      <style dangerouslySetInnerHTML={{ __html: popInKeyframes }} />
      
      <div style={questionContainerStyle}>
        {/* Question mark */}
        <div style={{
          position: 'absolute',
          right: '35px',
          top: '5px',
          opacity: 0,
          animation: `popIn 0.8s ease-in-out forwards, float 2s ease-in-out ${questionDelay}s infinite`,
          animationDelay: `${questionDelay}s`
        }}>
          <QuestionMarkSVG />
        </div>
      </div>
    </>
  );
} 