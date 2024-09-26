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
  | { type: 'DECREMENT_CLICKS' }
  | {
      type: 'UPDATE_REACTION_TIMES';
      payload: {
        isHighlightedSquare: boolean;
        timer: number;
        averageReactionTime: number;
      };
    }
  | { type: 'SET_END_GAME' }
  | { type: 'RESET_GAME' };

export const initialState = {
  clicksToMeasure: 20,
  reactionArr: [],
  gameState: GameState.START,
  gridSize: 20,
  gridSizeBigScreen: 20,
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
    case 'UPDATE_REACTION_TIMES':
      const { isHighlightedSquare, timer, averageReactionTime } =
        action.payload;

      if (state.gameState !== GameState.PLAYING) return state;

      let newReactionArr = [...state.reactionArr];

      if (isHighlightedSquare) {
        const reactionTime = Date.now();
        const reactionDuration = timer ? reactionTime - timer : reactionTime;
        newReactionArr.push(reactionDuration);
      } else if (state.reactionArr.length > 0) {
        const penaltyReaction =
          averageReactionTime + (averageReactionTime * 20) / 100;
        newReactionArr.push(penaltyReaction);
      }

      return {
        ...state,
        reactionArr: newReactionArr,
        clicksToMeasure: isHighlightedSquare
          ? state.clicksToMeasure - 1
          : state.clicksToMeasure,
      };

    case 'CHANGE_COORDS':
      const getRandomCoordinate = (max) => Math.floor(Math.random() * max);
      const newCoords = {
        x: getRandomCoordinate(state.gridSize),
        y: getRandomCoordinate(state.gridSize),
      };

      return { ...state, coords: newCoords, timer: Date.now() };

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
