import { motion, useInView, useAnimation } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

type IParams = {
  children: ReactNode;
};

export function Reveal({ children }: IParams) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <motion.span
      ref={ref}
      style={{ display: 'block' }}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {children}
    </motion.span>
  );
}
