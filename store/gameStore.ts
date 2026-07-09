import { create } from 'zustand';

export type Board = (number | null)[][];

export interface GameState {
  board: Board;
  score: number;
  bestScore: number;
  moves: number;
  timer: number;
  gameOver: boolean;
  won: boolean;
  history: Board[];
  
  // Actions
  initGame: () => void;
  moveUp: () => void;
  moveDown: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  undo: () => void;
  restart: () => void;
  setWon: (won: boolean) => void;
  incrementTimer: () => void;
  resetTimer: () => void;
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

const BOARD_SIZE = 4;

const createEmptyBoard = (): Board => {
  return Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
};

const addNewTile = (board: Board): Board => {
  const empty: [number, number][] = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === null) empty.push([i, j]);
    }
  }
  
  if (empty.length === 0) return board;
  
  const [row, col] = empty[Math.floor(Math.random() * empty.length)];
  const newBoard = board.map(r => [...r]);
  newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
};

const rotate = (board: Board, times: number): Board => {
  let result = board.map(r => [...r]);
  for (let i = 0; i < times; i++) {
    result = result[0].map((_, colIndex) =>
      result.map(row => row[colIndex]).reverse()
    );
  }
  return result;
};

const slideLeft = (row: (number | null)[]): [number | null][] => {
  const filtered = row.filter((val) => val !== null) as number[];
  const merged: number[] = [];
  
  for (let i = 0; i < filtered.length; i++) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      merged.push(filtered[i] * 2);
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }
  
  const padding = BOARD_SIZE - merged.length;
  return [...merged, ...Array(padding).fill(null)] as [number | null][];
};

const moveLeftBoard = (board: Board): [Board, number] => {
  let newBoard = board.map(r => [...r]);
  let scoreGain = 0;
  
  for (let i = 0; i < BOARD_SIZE; i++) {
    const [movedRow, rowScore] = moveLine(newBoard[i]);
    newBoard[i] = movedRow;
    scoreGain += rowScore;
  }
  
  return [newBoard, scoreGain];
};

const moveLine = (line: (number | null)[]): [(number | null)[], number] => {
  const filtered = line.filter((val) => val !== null) as number[];
  const merged: number[] = [];
  let score = 0;
  
  for (let i = 0; i < filtered.length; i++) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const merged_value = filtered[i] * 2;
      merged.push(merged_value);
      score += merged_value;
      i++;
    } else {
      merged.push(filtered[i]);
    }
  }
  
  const padding = BOARD_SIZE - merged.length;
  const result = [...merged, ...Array(padding).fill(null)];
  return [result as (number | null)[], score];
};

const boardsEqual = (a: Board, b: Board): boolean => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (a[i][j] !== b[i][j]) return false;
    }
  }
  return true;
};

const checkGameOver = (board: Board): boolean => {
  // Check if any empty spaces
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === null) return false;
    }
  }
  
  // Check if any moves possible
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const current = board[i][j];
      if (i + 1 < BOARD_SIZE && board[i + 1][j] === current) return false;
      if (j + 1 < BOARD_SIZE && board[i][j + 1] === current) return false;
    }
  }
  
  return true;
};

const checkWon = (board: Board): boolean => {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === 2048) return true;
    }
  }
  return false;
};

const STORAGE_KEY = '2048-game-state';

export const useGameStore = create<GameState>((set) => ({
  board: createEmptyBoard(),
  score: 0,
  bestScore: 0,
  moves: 0,
  timer: 0,
  gameOver: false,
  won: false,
  history: [],
  
  initGame: () => {
    let board = createEmptyBoard();
    board = addNewTile(board);
    board = addNewTile(board);
    
    set({
      board,
      score: 0,
      moves: 0,
      timer: 0,
      gameOver: false,
      won: false,
      history: [board],
    });
  },
  
  moveUp: () => {
    set((state) => {
      if (state.gameOver || state.won) return state;
      
      let newBoard = rotate(state.board, 3);
      const [movedBoard, scoreGain] = moveLeftBoard(newBoard);
      newBoard = rotate(movedBoard, 1);
      
      if (boardsEqual(newBoard, state.board)) return state;
      
      newBoard = addNewTile(newBoard);
      const newScore = state.score + scoreGain;
      const newWon = !state.won && checkWon(newBoard);
      
      const newState: Partial<GameState> = {
        board: newBoard,
        score: newScore,
        moves: state.moves + 1,
        history: [...state.history, newBoard],
        gameOver: checkGameOver(newBoard),
      };
      
      if (newWon) newState.won = true;
      if (newScore > state.bestScore) newState.bestScore = newScore;
      
      return newState;
    });
  },
  
  moveDown: () => {
    set((state) => {
      if (state.gameOver || state.won) return state;
      
      let newBoard = rotate(state.board, 1);
      const [movedBoard, scoreGain] = moveLeftBoard(newBoard);
      newBoard = rotate(movedBoard, 3);
      
      if (boardsEqual(newBoard, state.board)) return state;
      
      newBoard = addNewTile(newBoard);
      const newScore = state.score + scoreGain;
      const newWon = !state.won && checkWon(newBoard);
      
      const newState: Partial<GameState> = {
        board: newBoard,
        score: newScore,
        moves: state.moves + 1,
        history: [...state.history, newBoard],
        gameOver: checkGameOver(newBoard),
      };
      
      if (newWon) newState.won = true;
      if (newScore > state.bestScore) newState.bestScore = newScore;
      
      return newState;
    });
  },
  
  moveLeft: () => {
    set((state) => {
      if (state.gameOver || state.won) return state;
      
      const [newBoard, scoreGain] = moveLeftBoard(state.board);
      
      if (boardsEqual(newBoard, state.board)) return state;
      
      const movedBoard = addNewTile(newBoard);
      const newScore = state.score + scoreGain;
      const newWon = !state.won && checkWon(movedBoard);
      
      const newState: Partial<GameState> = {
        board: movedBoard,
        score: newScore,
        moves: state.moves + 1,
        history: [...state.history, movedBoard],
        gameOver: checkGameOver(movedBoard),
      };
      
      if (newWon) newState.won = true;
      if (newScore > state.bestScore) newState.bestScore = newScore;
      
      return newState;
    });
  },
  
  moveRight: () => {
    set((state) => {
      if (state.gameOver || state.won) return state;
      
      let newBoard = rotate(state.board, 2);
      const [movedBoard, scoreGain] = moveLeftBoard(newBoard);
      newBoard = rotate(movedBoard, 2);
      
      if (boardsEqual(newBoard, state.board)) return state;
      
      newBoard = addNewTile(newBoard);
      const newScore = state.score + scoreGain;
      const newWon = !state.won && checkWon(newBoard);
      
      const newState: Partial<GameState> = {
        board: newBoard,
        score: newScore,
        moves: state.moves + 1,
        history: [...state.history, newBoard],
        gameOver: checkGameOver(newBoard),
      };
      
      if (newWon) newState.won = true;
      if (newScore > state.bestScore) newState.bestScore = newScore;
      
      return newState;
    });
  },
  
  undo: () => {
    set((state) => {
      if (state.history.length <= 1) return state;
      
      const history = state.history.slice(0, -1);
      const board = history[history.length - 1];
      const newScore = state.moves > 0 ? Math.max(0, state.score - 50) : 0;
      
      return {
        board,
        score: newScore,
        moves: Math.max(0, state.moves - 1),
        history,
        gameOver: false,
      };
    });
  },
  
  restart: () => {
    set((state) => {
      let board = createEmptyBoard();
      board = addNewTile(board);
      board = addNewTile(board);
      
      return {
        board,
        score: 0,
        moves: 0,
        timer: 0,
        gameOver: false,
        won: false,
        history: [board],
      };
    });
  },
  
  setWon: (won: boolean) => {
    set({ won });
  },
  
  incrementTimer: () => {
    set((state) => ({ timer: state.timer + 1 }));
  },
  
  resetTimer: () => {
    set({ timer: 0 });
  },
  
  loadFromStorage: () => {
    if (typeof window === 'undefined') return;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        set({
          board: data.board,
          score: data.score,
          bestScore: data.bestScore,
          moves: data.moves,
          timer: data.timer,
          gameOver: data.gameOver,
          won: data.won,
          history: data.history,
        });
      } catch (error) {
        console.error('Failed to load game state:', error);
      }
    }
  },
  
  saveToStorage: () => {
    if (typeof window === 'undefined') return;
    
    set((state) => {
      const data = {
        board: state.board,
        score: state.score,
        bestScore: state.bestScore,
        moves: state.moves,
        timer: state.timer,
        gameOver: state.gameOver,
        won: state.won,
        history: state.history,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return state;
    });
  },
}));
