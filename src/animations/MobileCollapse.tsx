import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

type IParams = {
  children: React.ReactNode;
};
export default function MobileCollapse({ children }: IParams) {
  return (
    <motion.div
      style={{
        height: 'inherit',
        background: 'gray.850',
        position: 'fixed',
        width: '100%',
        zIndex: 9,
        top: 96,
      }}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
