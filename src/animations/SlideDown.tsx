import { motion } from 'framer-motion';
import React from 'react';

type IParams = {
  children: React.ReactNode;
};
export default function SlideDown({ children }: IParams) {
  return (
    <motion.div
      style={{ height: 'inherit' }}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
