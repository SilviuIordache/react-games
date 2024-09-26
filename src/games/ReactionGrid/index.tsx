import React, { useEffect, useMemo, useReducer, useRef } from 'react';
import useDeviceSize from '../../custom-hooks/useDeviceSize';
import { EndDialog } from './EndDialog';
import { GameState, gameReducer, initialState } from './gameReducer';
import { convertMsToSeconds } from './helpers';
import { StartDialog } from './StartDialog';
import { Grid } from './Grid';

export default function ReactionGrid() {
  const isSmallDevice = useDeviceSize();
  const timerRef = useRef<number | null>(null);

  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Change the grid based on the screen size
  useEffect(() => {
    const newGridSize = isSmallDevice
      ? state.gridSizeMobile
      : state.gridSizeBigScreen;

    dispatch({
      type: 'SET_GRID_SIZE',
      payload: newGridSize,
    });
  }, [isSmallDevice]);

  // End the game when the clicks to measure are 0
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

  const handleSquareClick = (isHighlightedSquare: boolean) => {
    dispatch({
      type: 'UPDATE_REACTION_TIMES',
      payload: {
        isHighlightedSquare,
        timer: timerRef.current,
        averageReactionTime,
      },
    });

    if (isHighlightedSquare) {
      dispatch({ type: 'CHANGE_COORDS' });
    }
  };

  const handleStartGame = () => {
    dispatch({ type: 'START_GAME' });
    dispatch({ type: 'CHANGE_COORDS' });
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
        <Grid
          coords={state.coords}
          gridSize={state.gridSize}
          onSquareClick={handleSquareClick}
        />
      </div>
    </div>
  );
}
