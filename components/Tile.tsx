'use client';

import { motion } from 'framer-motion';
import { getTileBgColor, getTileTextColor } from '@/utils/tileColors';

interface TileProps {
  value: number | null;
  isNew?: boolean;
  isMerged?: boolean;
}

export const Tile = ({ value, isNew = false, isMerged = false }: TileProps) => {
  if (value === null) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-sm" />
    );
  }

  const bgColor = getTileBgColor(value);
  const textColor = getTileTextColor(value);

  return (
    <motion.div
      initial={isNew ? { scale: 0.6, opacity: 0 } : { scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={
        isNew
          ? {
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }
          : { duration: 0.1 }
      }
      className={`w-full h-full rounded-2xl flex items-center justify-center font-bold shadow-lg transition-all duration-200 ${bgColor} ${textColor} ${
        isMerged ? 'ring-2 ring-yellow-300' : ''
      }`}
    >
      {isMerged && (
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-2xl bg-white opacity-30"
        />
      )}
      <motion.span
        className="text-2xl md:text-3xl lg:text-4xl"
        animate={isMerged ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
};
