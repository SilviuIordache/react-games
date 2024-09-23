import React, { useEffect, useRef } from 'react';
import { useState, useMemo, useReducer, useCallback } from 'react';
import { Square } from './Square';
import { gameStateReducer, GameState } from './gameStateReducer';
import { StartDialog } from './StartDialog';
import { EndDialog } from './EndDialog';
import { convertMsToSeconds } from './helpers';

export default function ReactionGrid() {
  // TODO: 30x30 for large screens, 10x10 for mobile
  const gridSize = 20;
  const clicksCount = 3;

  const timerRef = useRef<number | null>(null);

  const [reactionArr, setReactionArr] = useState<number[]>([]);

  const [clicksToMeasure, setClicksToMeasure] = useState(clicksCount);
  const [coords, setCoords] = useState({ x: -1, y: -1 });

  const [gameState, setGameState] = useReducer(
    gameStateReducer,
    GameState.START
  );

  useEffect(() => {
    if (reactionArr.length === clicksCount) {
      setGameState('setEnd');
    }
  }, [reactionArr]);

  const averageReactionTime = useMemo(() => {
    const sum = reactionArr.reduce((sum, value) => sum + value, 0);

    const avg = sum / reactionArr.length;

    return avg;
  }, [reactionArr]);

  const getRandomCoordinate = (max) => {
    return Math.floor(Math.random() * max);
  };

  const changeCoords = useCallback(() => {
    const newX = getRandomCoordinate(gridSize);
    const newY = getRandomCoordinate(gridSize);

    setCoords({ x: newX, y: newY });

    timerRef.current = Date.now();
  }, [gridSize]);

  const updateReactionTimes = (isHighlightedSquare) => {
    if (gameState === GameState.PLAYING) {
      if (isHighlightedSquare) {
        setClicksToMeasure((clicksToMeasure) => clicksToMeasure - 1);

        const reactionTime = Date.now();

        const reactionDuration = timerRef.current
          ? reactionTime - timerRef.current
          : reactionTime;

        setReactionArr((prevArr) => [...prevArr, reactionDuration]);
        changeCoords();
      } else {
        const penaltyReaction =
          averageReactionTime + (averageReactionTime * 20) / 100;

        setReactionArr((prevArr) => [...prevArr, penaltyReaction]);
      }
    }
  };

  const grid = useMemo(() => {
    const tempGrid: JSX.Element[] = [];
    for (let i = 0; i < gridSize; i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < gridSize; j++) {
        const isHighlightedSquare = i === coords.x && j === coords.y;
        row.push(
          <Square
            key={`${i}-${j}`}
            isHighlighted={isHighlightedSquare}
            handleClick={() => updateReactionTimes(isHighlightedSquare)}
          />
        );
      }
      tempGrid.push(<div key={i}>{row}</div>);
    }
    return tempGrid;
  }, [changeCoords, coords.x, coords.y]);

  const handleStartGame = () => {
    setClicksToMeasure(clicksCount);
    setReactionArr([]);
    setGameState('setPlaying');
    changeCoords();
  };

  return (
    <div>
      <StartDialog
        onStartGame={handleStartGame}
        isOpen={gameState === GameState.START}
      />

      <EndDialog
        reactionArr={reactionArr}
        isOpen={gameState === GameState.END}
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
        <div>Avg: {convertMsToSeconds(averageReactionTime)}</div>
        <div>Clicks left: {clicksToMeasure}</div>
      </div>

      <div className="flex">{grid}</div>
    </div>
  );
}
