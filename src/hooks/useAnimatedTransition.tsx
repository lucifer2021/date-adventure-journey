
import { useState, useEffect } from 'react';

export function useAnimatedTransition(initialState: boolean, delay: number = 300) {
  const [isVisible, setIsVisible] = useState(initialState);
  const [shouldRender, setShouldRender] = useState(initialState);
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isVisible) {
      setShouldRender(true);
    } else {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, delay);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible, delay]);
  
  return {
    isVisible,
    shouldRender,
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false)
  };
}
