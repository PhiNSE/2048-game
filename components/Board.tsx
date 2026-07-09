'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { Tile } from './Tile';

export const Board = () => {
  const board = useGameStore((state) => state.board);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full aspect-square max-w-md mx-auto mb-8"
    >
      <div className="grid grid-cols-4 gap-3 p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl shadow-xl backdrop-blur-sm">
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              layout
              className="aspect-square"
              layoutId={`tile-${rowIndex}-${colIndex}`}
            >
              <Tile value={value} isNew={false} />
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};
