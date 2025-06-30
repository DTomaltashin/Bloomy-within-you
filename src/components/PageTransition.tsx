import React from 'react';
import { usePageTransition } from '../hooks/usePageTransition';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { isTransitioning } = usePageTransition();

  return (
    <div 
      className={`
        transition-all duration-300 ease-out
        ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
      `}
    >
      {children}
    </div>
  );
};

export default PageTransition;