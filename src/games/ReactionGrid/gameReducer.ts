export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  END = 'END',
}

export type GameStateType = keyof typeof GameState;

export type ReducerAction =
  | { type: 'SET_GRID_SIZE'; payload: number }
  | { type: 'START_GAME' }
  | { type: 'CHANGE_COORDS' }
  | { type: 'ADD_REACTION_TIME'; payload: number }
  | { type: 'DECREMENT_CLICKS' }
  | { type: 'SET_END_GAME' }
  | { type: 'RESET_GAME' };

export const initialState = {
  clicksToMeasure: 20,
  reactionArr: [],
  gameState: GameState.START,
  gridSize: 20,
  gridSizeMobile: 10,
  coords: { x: -1, y: -1 },
  timer: null,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GRID_SIZE':
      return { ...state, gridSize: action.payload };
    case 'START_GAME':
      return {
        ...state,
        clicksToMeasure: initialState.clicksToMeasure,
        reactionArr: [],
        gameState: GameState.PLAYING,
      };
    case 'CHANGE_COORDS':
      const getRandomCoordinate = (max) => Math.floor(Math.random() * max);
      const newCoords = {
        x: getRandomCoordinate(state.gridSize),
        y: getRandomCoordinate(state.gridSize),
      };

      return { ...state, coords: newCoords, timer: Date.now() };
    case 'ADD_REACTION_TIME':
      return {
        ...state,
        reactionArr: [...state.reactionArr, action.payload],
      };
    case 'DECREMENT_CLICKS':
      return { ...state, clicksToMeasure: state.clicksToMeasure - 1 };
    case 'SET_END_GAME':
      return { ...state, gameState: GameState.END };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};
