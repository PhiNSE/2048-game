'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/utils/soundManager';

export const GameOverDialog = () => {
  const gameOver = useGameStore((state) => state.gameOver);
  const score = useGameStore((state) => state.score);
  const bestScore = useGameStore((state) => state.bestScore);
  const initGame = useGameStore((state) => state.initGame);

  const handleRestart = () => {
    soundManager.play('buttonClick');
    initGame();
  };

  return (
    <AnimatePresence>
      {gameOver && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleRestart}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-8 shadow-2xl border-2 border-orange-200 z-50 max-w-sm w-full mx-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className="text-6xl text-center mb-4"
            >
              😢
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-center text-gray-800 mb-2"
            >
              Game Over!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center text-gray-600 mb-6"
            >
              No more moves available
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              <div className="bg-white rounded-lg p-4 text-center border border-orange-200">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                  Your Score
                </p>
                <p className="text-2xl font-bold text-orange-700">{score}</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center border border-orange-200">
                <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                  Best Score
                </p>
                <p className="text-2xl font-bold text-orange-700">{bestScore}</p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg transition-all"
            >
              Try Again
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
