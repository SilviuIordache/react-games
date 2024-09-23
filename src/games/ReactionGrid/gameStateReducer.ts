export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  END = 'END'
}

export type GameStateType = keyof typeof GameState;

export type ReducerAction = 'setStart' | 'setPlaying' | 'setEnd';

export function gameStateReducer(
  currentState: GameState,
  action: ReducerAction
): GameState {
  switch (action) {
    case 'setStart':
      return GameState.START;
    case 'setPlaying':
      return GameState.PLAYING;
    case 'setEnd':
      return GameState.END;
    default:
      return currentState;
  }
}

