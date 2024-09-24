import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import useDeviceSize from '../../custom-hooks/useDeviceSize';
import { EndDialog } from './EndDialog';
import { GameState, gameReducer, initialState } from './gameReducer';
import { convertMsToSeconds } from './helpers';
import { Square } from './Square';
import { StartDialog } from './StartDialog';

export default function ReactionGrid() {
  const isSmallDevice = useDeviceSize();
  const timerRef = useRef<number | null>(null);

  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'SET_GRID_SIZE',
      payload: isSmallDevice ? state.gridSizeMobile : state.gridSize,
    });
  }, [isSmallDevice]);

  useEffect(() => {
    if (state.clicksToMeasure === 0) {
      dispatch({ type: 'SET_END_GAME' });
    }
  }, [state.clicksToMeasure]);

  const averageReactionTime = useMemo(() => {
    const sum = state.reactionArr.reduce((sum, value) => sum + value, 0);

    const avg = sum / state.reactionArr.length;

    return avg;
  }, [state.reactionArr]);

  const changeCoords = () => {
    dispatch({ type: 'CHANGE_COORDS' });

    timerRef.current = Date.now();
  };

  const updateReactionTimes = (isHighlightedSquare) => {
    if (state.gameState === GameState.PLAYING) {
      if (isHighlightedSquare) {
        dispatch({ type: 'DECREMENT_CLICKS' });

        const reactionTime = Date.now();

        const reactionDuration = timerRef.current
          ? reactionTime - timerRef.current
          : reactionTime;

        dispatch({ type: 'ADD_REACTION_TIME', payload: reactionDuration });
        changeCoords();
      } else {
        if (state.reactionArr.length > 0) {
          const penaltyReaction =
            averageReactionTime + (averageReactionTime * 20) / 100;

          dispatch({ type: 'ADD_REACTION_TIME', payload: penaltyReaction });
        }
      }
    }
  };

  const Grid = () => {
    const tempGrid: JSX.Element[] = [];
    for (let i = 0; i < state.gridSize; i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < state.gridSize; j++) {
        const isHighlightedSquare =
          i === state.coords.x && j === state.coords.y;
        row.push(
          <Square
            key={`${i}-${j}`}
            isHighlighted={isHighlightedSquare}
            onClick={() => updateReactionTimes(isHighlightedSquare)}
          />
        );
      }
      tempGrid.push(<div key={i}>{row}</div>);
    }
    return tempGrid;
  };

  const handleStartGame = () => {
    dispatch({ type: 'START_GAME' });
    changeCoords();
  };

  return (
    <div>
      <StartDialog
        onStartGame={handleStartGame}
        isOpen={state.gameState === GameState.START}
      />

      <EndDialog
        reactionArr={state.reactionArr}
        isOpen={state.gameState === GameState.END}
        onRestartGame={handleStartGame}
        averageReactionTime={averageReactionTime}
      />

      <div className="flex justify-end mb-1">
        <button
          className="border border-gray-500 text-white p-1 text-sm rounded-md hover:bg-gray-600"
          onClick={handleStartGame}
        >
          Restart
        </button>
      </div>

      <div className="flex justify-between mb-1">
        <div>Avg: {convertMsToSeconds(averageReactionTime) || '-'}</div>
        <div>Clicks left: {state.clicksToMeasure}</div>
      </div>

      <div className="flex">
        <Grid />
      </div>
    </div>
  );
}
