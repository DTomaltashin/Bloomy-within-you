import React, { useEffect, useState } from 'react';

interface SmoothTransitionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const SmoothTransition: React.FC<SmoothTransitionProps> = ({ 
  children, 
  delay = 0, 
  duration = 300,
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`
        transition-all ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${className}
      `}
      style={{ 
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {children}
    </div>
  );
};

export default SmoothTransition;