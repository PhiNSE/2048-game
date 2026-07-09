/**
 * Sound Manager Interface
 * Placeholder for sound effects in the 2048 game
 */

export interface SoundManager {
  play(soundName: string): void;
}

export class GameSoundManager implements SoundManager {
  private sounds: Record<string, boolean> = {
    move: true,
    merge: true,
    victory: true,
    lose: true,
    buttonClick: true,
    tileSpawn: true,
  };

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds(): void {
    // Initialize sound effects here
    // This is a placeholder for actual sound file loading
  }

  play(soundName: string): void {
    if (!this.sounds[soundName]) {
      console.warn(`Sound "${soundName}" not found or disabled`);
      return;
    }

    // Placeholder for actual sound playback
    // In a real implementation, this would play audio files
    // console.log(`[Sound] Playing: ${soundName}`);
  }

  enable(soundName: string): void {
    if (soundName in this.sounds) {
      this.sounds[soundName] = true;
    }
  }

  disable(soundName: string): void {
    if (soundName in this.sounds) {
      this.sounds[soundName] = false;
    }
  }

  isEnabled(soundName: string): boolean {
    return this.sounds[soundName] ?? false;
  }
}

export const soundManager = new GameSoundManager();
