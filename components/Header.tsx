'use client';

import { motion } from 'framer-motion';

export const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-center mb-8"
    >
      <div className="flex items-center justify-center mb-4">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500"
        >
          2048
        </motion.div>
      </div>
      <p className="text-gray-600 text-sm">Combine tiles to reach 2048!</p>
    </motion.div>
  );
};
