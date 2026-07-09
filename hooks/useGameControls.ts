import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/utils/soundManager';

export const useGameControls = () => {
  const moveUp = useGameStore((state) => state.moveUp);
  const moveDown = useGameStore((state) => state.moveDown);
  const moveLeft = useGameStore((state) => state.moveLeft);
  const moveRight = useGameStore((state) => state.moveRight);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (['arrowup', 'w'].includes(key)) {
        e.preventDefault();
        moveUp();
        soundManager.play('move');
      } else if (['arrowdown', 's'].includes(key)) {
        e.preventDefault();
        moveDown();
        soundManager.play('move');
      } else if (['arrowleft', 'a'].includes(key)) {
        e.preventDefault();
        moveLeft();
        soundManager.play('move');
      } else if (['arrowright', 'd'].includes(key)) {
        e.preventDefault();
        moveRight();
        soundManager.play('move');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moveUp, moveDown, moveLeft, moveRight]);

  // Touch controls
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };

      const deltaX = touchEnd.x - touchStartRef.current.x;
      const deltaY = touchEnd.y - touchStartRef.current.y;
      const threshold = 50;

      // Determine direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > threshold) {
          moveRight();
          soundManager.play('move');
        } else if (deltaX < -threshold) {
          moveLeft();
          soundManager.play('move');
        }
      } else {
        // Vertical swipe
        if (deltaY > threshold) {
          moveDown();
          soundManager.play('move');
        } else if (deltaY < -threshold) {
          moveUp();
          soundManager.play('move');
        }
      }

      touchStartRef.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, false);
    window.addEventListener('touchend', handleTouchEnd, false);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [moveUp, moveDown, moveLeft, moveRight]);
};
