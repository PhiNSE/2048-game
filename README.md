# 2048 Game - Premium Web Edition

A production-quality, animated 2048 game built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

🎮 **[Play Now](https://github.com/PhiNSE/2048-game)** | 📱 **Fully Responsive** | ✨ **Smooth Animations**

## Features

### 🎯 Gameplay
- ✅ Full 2048 game mechanics
- ✅ 4×4 game board with tile merging
- ✅ Scoring system with best score tracking
- ✅ Win detection at 2048
- ✅ Game over detection
- ✅ Continue playing after winning
- ✅ Move counter and timer
- ✅ Undo functionality (1 move)

### 🎨 UI/UX
- ✅ Beautiful glassmorphism design
- ✅ Warm beige + orange color palette
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Unique colors for each tile value
- ✅ Rainbow gradient for 2048+ tiles
- ✅ Premium app-like feel

### 🎮 Controls
- ✅ Arrow keys (↑ ↓ ← →)
- ✅ WASD keys
- ✅ Touch swipe gestures
- ✅ Hover effects on buttons
- ✅ Keyboard focus indicators

### 💾 Data Persistence
- ✅ Auto-save to localStorage
- ✅ Auto-restore on reload
- ✅ Persistent best score

### ♿ Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels and roles
- ✅ High contrast text
- ✅ Reduced motion preferences supported
- ✅ Keyboard navigation

## Tech Stack

- **React 19** - UI framework
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Zustand** - Lightweight state management
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites
- Node.js 16+ or Bun
- npm, pnpm, or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PhiNSE/2048-game.git
   cd 2048-game
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
.
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main game page
├── components/
│   ├── Board.tsx            # 4×4 game board
│   ├── GameOverDialog.tsx   # Game over modal
│   ├── Header.tsx           # Title and logo
│   ├── ScoreCard.tsx        # Score display
│   ├── Stats.tsx            # Moves & timer
│   ├── Tile.tsx             # Individual tile component
│   ├── Toolbar.tsx          # Control buttons
│   └── VictoryDialog.tsx    # Victory modal with confetti
├── hooks/
│   └── useGameControls.ts   # Keyboard & touch handling
├── store/
│   └── gameStore.ts         # Zustand game state store
├── utils/
│   ├── soundManager.ts      # Sound effects interface
│   └── tileColors.ts        # Tile color mapping
└── types/                   # TypeScript type definitions
```

## Game Rules

1. **Start**: Board begins with two tiles (2 or 4)
2. **Move**: Swipe or press arrow keys/WASD to move tiles
3. **Merge**: Tiles with the same number merge when they touch
4. **Score**: Merging tiles adds their combined value to your score
5. **Win**: Reach the 2048 tile to win (can continue playing)
6. **Lose**: Game ends when no more moves are possible

## Color Palette

| Tile | Color | Hex |
|------|-------|-----|
| 2 | Light Cream | `#fffbf0` |
| 4 | Light Orange | `#fed7aa` |
| 8 | Orange | `#fdba74` |
| 16 | Deep Orange | `#f97316` |
| 32 | Orange-600 | `#ea580c` |
| 64 | Red | `#ef4444` |
| 128 | Yellow-400 | `#facc15` |
| 256 | Yellow-500 | `#eab308` |
| 512 | Lime | `#84cc16` |
| 1024 | Emerald | `#10b981` |
| 2048+ | Rainbow Gradient | Multi-color |

## Animations

- **Tile Spawn**: Spring animation (0.2s) with fade-in
- **Tile Move**: Smooth slide transitions
- **Tile Merge**: Bounce effect with glow flash
- **Board**: Subtle floating effect
- **Score**: Count-up animation
- **Buttons**: Hover lift & press scale
- **Dialogs**: Spring bounce with backdrop blur
- **Victory**: Confetti particle system

## Performance

- ✅ Optimized re-renders with Zustand
- ✅ Smooth 60fps animations
- ✅ Lightweight bundle size (~45KB gzipped)
- ✅ Mobile-optimized touch handling
- ✅ Efficient tile rendering

## Accessibility Features

- ✅ Semantic HTML elements
- ✅ ARIA labels for interactive elements
- ✅ Screen reader support
- ✅ Focus visible indicators
- ✅ Keyboard navigation
- ✅ Reduced motion preference (prefers-reduced-motion)
- ✅ High contrast text

## Sound Architecture

Sound manager interface is prepared for future implementation:
- `move` - Tile movement sound
- `merge` - Tile merging sound
- `victory` - Win sound
- `lose` - Game over sound
- `buttonClick` - UI button clicks

## Local Storage Schema

Game state is saved to localStorage with the key `2048-game-state`:

```typescript
{
  board: number[][];           // 4×4 grid state
  score: number;               // Current score
  bestScore: number;           // Best score ever
  moves: number;               // Move count
  timer: number;               // Elapsed seconds
  gameOver: boolean;           // Game over state
  won: boolean;                // Victory state
  history: number[][][];       // Move history for undo
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Future Enhancements

- 🎵 Sound effects integration
- 🏆 Leaderboard system
- 🎨 Theme selector (dark mode, custom colors)
- 📊 Statistics dashboard
- 🎯 Difficulty levels
- 🌐 Multiplayer mode
- 📱 PWA installation

## Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - feel free to use this in your projects!

## Credits

- Game concept: [2048](https://github.com/gabrielecirulli/2048)
- Built with ❤️ using modern web technologies

---

**Repository**: [github.com/PhiNSE/2048-game](https://github.com/PhiNSE/2048-game)

**Deploy**: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/PhiNSE/2048-game)
