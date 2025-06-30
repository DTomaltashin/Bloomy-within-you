import { useEffect } from 'react';

interface SmoothScrollOptions {
  behavior?: 'smooth' | 'auto';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
}

export const useSmoothScroll = () => {
  const scrollToElement = (
    elementId: string, 
    options: SmoothScrollOptions = { behavior: 'smooth', block: 'start' }
  ) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView(options);
    }
  };

  const scrollToTop = (smooth = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  const scrollToBottom = (smooth = true) => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  return {
    scrollToElement,
    scrollToTop,
    scrollToBottom
  };
};