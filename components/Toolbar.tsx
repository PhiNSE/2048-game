'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/utils/soundManager';

export const Toolbar = () => {
  const undo = useGameStore((state) => state.undo);
  const restart = useGameStore((state) => state.restart);
  const initGame = useGameStore((state) => state.initGame);
  const history = useGameStore((state) => state.history);

  const handleUndo = () => {
    soundManager.play('buttonClick');
    undo();
  };

  const handleRestart = () => {
    soundManager.play('buttonClick');
    restart();
  };

  const handleNewGame = () => {
    soundManager.play('buttonClick');
    initGame();
  };

  const canUndo = history.length > 1;

  const buttonVariants = {
    hover: { scale: 1.05, y: -2 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex gap-3 w-full max-w-md mx-auto"
    >
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleUndo}
        disabled={!canUndo}
        className="flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md"
      >
        ↶ Undo
      </motion.button>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleRestart}
        className="flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-all bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-md"
      >
        ⟳ Restart
      </motion.button>

      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleNewGame}
        className="flex-1 px-4 py-3 rounded-lg font-semibold text-white transition-all bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md"
      >
        + New Game
      </motion.button>
    </motion.div>
  );
};
