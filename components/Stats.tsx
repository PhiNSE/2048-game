'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useEffect, useState } from 'react';

export const Stats = () => {
  const moves = useGameStore((state) => state.moves);
  const timer = useGameStore((state) => state.timer);
  const [displayTime, setDisplayTime] = useState('0:00');

  useEffect(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    setDisplayTime(
      `${minutes}:${seconds.toString().padStart(2, '0')}`
    );
  }, [timer]);

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto mb-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 shadow-sm border border-blue-100"
      >
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Moves</p>
        <motion.p
          key={moves}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-xl font-bold text-blue-700"
        >
          {moves}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 shadow-sm border border-purple-100"
      >
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Time</p>
        <motion.p
          key={displayTime}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-xl font-bold text-purple-700"
        >
          {displayTime}
        </motion.p>
      </motion.div>
    </div>
  );
};
