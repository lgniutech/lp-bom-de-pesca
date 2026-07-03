'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
}

export default function AnimateOnScroll({ children, direction = 'left' }: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      },
      { threshold: 0.1, rootMargin: '50px' } 
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const baseClass = "transition-all duration-[1200ms] ease-out w-full will-change-transform";
  const hiddenClass = direction === 'left' ? "opacity-0 -translate-x-16" : "opacity-0 translate-x-16";
  const visibleClass = "opacity-100 translate-x-0";

  return (
    <div ref={ref} className={`${baseClass} ${isVisible ? visibleClass : hiddenClass}`}>
      {children}
    </div>
  );
}