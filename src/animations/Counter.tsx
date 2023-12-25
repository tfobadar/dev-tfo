import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

type IParams = {
  value: number;
  direction?: 'up' | 'down';
  decimal?: number;
};

export default function Counter({
  value,
  direction = 'up',
  decimal = 0,
}: IParams) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 300,
    stiffness: 300,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [counterValue, setCounterValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : value);
    }
  }, [motionValue, isInView, direction, value]);

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        setCounterValue(latest.toFixed(decimal));
      }),
    [springValue, decimal],
  );

  return <span ref={ref}>{counterValue}</span>;
}
