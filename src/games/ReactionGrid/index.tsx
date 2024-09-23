import React, { useRef } from 'react';
import { useState, useMemo, useReducer, useCallback } from 'react';
import { Square } from './Square';
import { gameStateReducer, GameState } from './gameStateReducer';

export default function ReactionGrid() {
  // TODO: 30x30 for large screens, 10x10 for mobile
  const gridSize = 20;
  const clicksCount = 15;

  const timerRef = useRef<number | null>(null);

  const [reactionArr, setReactionArr] = useState<number[]>([]);

  const [gameState, setGameState] = useReducer(
    gameStateReducer,
    GameState.START
  );

  const averageReactionTime =
    reactionArr.reduce((sum, value) => sum + value, 0) / reactionArr.length;

  const [clicksToMeasure, setClicksToMeasure] = useState(clicksCount);
  const [coords, setCoords] = useState({ x: -1, y: -1 });

  const getRandomCoordinate = (max) => {
    return Math.floor(Math.random() * max);
  };

  const changeCoords = useCallback(() => {
    const newX = getRandomCoordinate(gridSize);
    const newY = getRandomCoordinate(gridSize);

    setCoords({ x: newX, y: newY });

    timerRef.current = Date.now();
  }, [gridSize]);

  const calculateScore = (isHighlightedSquare) => {
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
            handleClick={() => calculateScore(isHighlightedSquare)}
          />
        );
      }
      tempGrid.push(<div key={i}>{row}</div>);
    }
    return tempGrid;
  }, [changeCoords, coords.x, coords.y]);

  const handleStartGame = () => {
    setGameState('setPlaying');
    changeCoords();
  };

  const handleResetGame = () => {
    setGameState('setStart');
    setClicksToMeasure(clicksCount);
    setReactionArr([]);
  };

  return (
    <div>
      <div>Game state: {gameState}</div>
      {gameState === 'PLAYING' ? (
        <button
          className="bg-blue-800 text-white p-2 rounded-md"
          onClick={handleResetGame}
        >
          Reset
        </button>
      ) : (
        <button
          className="bg-blue-800 text-white p-2 rounded-md"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      )}

      <div className="flex justify-between mb-4">
        <div>Avg reaction time : {averageReactionTime}</div>
        <div>Clicks left: {clicksToMeasure}</div>
      </div>
      <div className="flex">{grid}</div>
    </div>
  );
}
