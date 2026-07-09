'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/utils/soundManager';
import { useEffect } from 'react';

export const VictoryDialog = () => {
  const won = useGameStore((state) => state.won);
  const score = useGameStore((state) => state.score);
  const setWon = useGameStore((state) => state.setWon);
  const initGame = useGameStore((state) => state.initGame);

  useEffect(() => {
    if (won) {
      soundManager.play('victory');
    }
  }, [won]);

  const handleContinue = () => {
    soundManager.play('buttonClick');
    setWon(false);
  };

  const handleRestart = () => {
    soundManager.play('buttonClick');
    initGame();
  };

  return (
    <AnimatePresence>
      {won && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl border-2 border-purple-200 z-50 max-w-sm w-full mx-4"
          >
            {/* Confetti simulation */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: Math.random() * 100 + '%',
                    top: -10,
                    background: ['#FFD700', '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'][
                      i % 5
                    ],
                  }}
                  animate={{
                    y: 400,
                    x: (Math.random() - 0.5) * 200,
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>

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
              🎉
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-center text-purple-800 mb-2"
            >
              You Won!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center text-gray-600 mb-6"
            >
              You&apos;ve reached 2048! Continue playing or start fresh.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg p-4 text-center border border-purple-200 mb-6"
            >
              <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                Your Score
              </p>
              <p className="text-3xl font-bold text-purple-700">{score}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="py-3 rounded-lg font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg transition-all"
              >
                Continue
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                className="py-3 rounded-lg font-bold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg transition-all"
              >
                New Game
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
