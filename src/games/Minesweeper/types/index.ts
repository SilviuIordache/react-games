export interface Cell {
  coordinate: { x: number; y: number };
  visible: boolean;
  bomb: boolean;
  nearbyBombs: number;
  marked: boolean;
}

export enum GameState {
  PLAYING = 'PLAYING',
  GAMEOVER = 'GAMEOVER',
  WIN = 'WIN',
}

export type DIFFICULTY_MODE = {
  name: 'Debug' | 'Easy' | 'Medium' | 'Hard';
  gridSize: number;
  bombs: number;
};
