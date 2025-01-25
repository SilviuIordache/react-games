export interface Cell {
  coordinate: { x: number; y: number };
  visible: boolean;
  bomb: boolean;
  nearbyBombs: number;
  marked: boolean;
}

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  GAMEOVER = 'GAMEOVER',
  END = 'END',
}
