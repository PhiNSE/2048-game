'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

interface ScoreCardProps {
  type: 'current' | 'best';
}

export const ScoreCard = ({ type }: ScoreCardProps) => {
  const score = useGameStore((state) =>
    type === 'current' ? state.score : state.bestScore
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: type === 'best' ? 0.1 : 0 }}
      className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 shadow-md border border-orange-100 flex-1"
    >
      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
        {type === 'current' ? 'Score' : 'Best'}
      </p>
      <motion.p
        key={score}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="text-2xl font-bold text-orange-700"
      >
        {score}
      </motion.p>
    </motion.div>
  );
};
