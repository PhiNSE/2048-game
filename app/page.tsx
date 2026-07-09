'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useGameControls } from '@/hooks/useGameControls';
import { Header } from '@/components/Header';
import { ScoreCard } from '@/components/ScoreCard';
import { Board } from '@/components/Board';
import { Toolbar } from '@/components/Toolbar';
import { Stats } from '@/components/Stats';
import { GameOverDialog } from '@/components/GameOverDialog';
import { VictoryDialog } from '@/components/VictoryDialog';

export default function Home() {
  const initGame = useGameStore((state) => state.initGame);
  const loadFromStorage = useGameStore((state) => state.loadFromStorage);
  const saveToStorage = useGameStore((state) => state.saveToStorage);
  const incrementTimer = useGameStore((state) => state.incrementTimer);
  const gameOver = useGameStore((state) => state.gameOver);
  const won = useGameStore((state) => state.won);

  // Initialize game on mount
  useEffect(() => {
    loadFromStorage();
    initGame();
  }, []);

  // Save game state to localStorage
  useEffect(() => {
    saveToStorage();
  }, []);

  // Timer interval
  useEffect(() => {
    const gameActive = !gameOver && !won;
    if (!gameActive) return;

    const interval = setInterval(() => {
      incrementTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver, won, incrementTimer]);

  // Keyboard and touch controls
  useGameControls();

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <Header />

        {/* Score Cards */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto mb-8"
        >
          <ScoreCard type="current" />
          <ScoreCard type="best" />
        </motion.div>

        {/* Game Board */}
        <Board />

        {/* Stats */}
        <Stats />

        {/* Controls */}
        <Toolbar />

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center max-w-md mx-auto"
        >
          <div className="bg-white bg-opacity-60 rounded-lg p-4 border border-orange-200">
            <h3 className="font-semibold text-gray-800 mb-2">How to Play</h3>
            <ul className="text-sm text-gray-600 space-y-1 text-left">
              <li>• Use <span className="font-mono">arrow keys</span>, <span className="font-mono">WASD</span>, or <span className="font-mono">swipe</span> to move</li>
              <li>• When two tiles with the same number touch, they merge</li>
              <li>• Each merge increases your score</li>
              <li>• Reach 2048 to win! 🎉</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Dialogs */}
      <GameOverDialog />
      <VictoryDialog />
    </main>
  );
}
