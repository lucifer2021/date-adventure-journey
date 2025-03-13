
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
  animateIn?: string;
  animateOut?: string;
  duration?: number;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  show,
  children,
  className,
  animateIn = 'animate-fade-in',
  animateOut = 'animate-fade-out',
  duration = 300,
}) => {
  const [shouldRender, setShouldRender] = useState(show);
  const [animationClass, setAnimationClass] = useState(show ? animateIn : animateOut);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      setAnimationClass(animateOut);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, animateOut, duration]);

  useEffect(() => {
    if (show && shouldRender) {
      setAnimationClass(animateIn);
    }
  }, [show, shouldRender, animateIn]);

  if (!shouldRender) return null;

  return (
    <div className={cn(className, animationClass)} style={{ animationDuration: `${duration}ms` }}>
      {children}
    </div>
  );
};

export default AnimatedTransition;
