'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { animate } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
  postfix?: string;
}

export default function AnimatedCounter({ target, duration = 1.5, className, postfix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, target, { duration, onUpdate: (value) => setCount(Math.round(value)) });
      return () => controls.stop();
    }
  }, [inView, target, duration]);

  return <div ref={ref} className={className}>{count}{postfix}</div>;
}