import React, { useRef } from 'react';
import { useState, useMemo, useReducer, useCallback } from 'react';
import { Square } from './Square';
import { gameStateReducer, GameState } from './gameStateReducer';
import Dialog from '../../components/Dialog';
import { StartDialog } from './StartDialog';

export default function ReactionGrid() {
  // TODO: 30x30 for large screens, 10x10 for mobile
  const gridSize = 20;
  const clicksCount = 15;

  const timerRef = useRef<number | null>(null);

  const [reactionArr, setReactionArr] = useState<number[]>([]);

  const [clicksToMeasure, setClicksToMeasure] = useState(clicksCount);
  const [coords, setCoords] = useState({ x: -1, y: -1 });

  const [gameState, setGameState] = useReducer(
    gameStateReducer,
    GameState.START
  );

  const averageReactionTime = useMemo(() => {
    const sum = reactionArr.reduce((sum, value) => sum + value, 0);

    const avg = sum / reactionArr.length;

    return avg;
  }, [reactionArr]);

  const convertMsToSeconds = (value) => {
    const valueInSeconds = value / 1000;

    const toFixedValue = parseFloat(valueInSeconds.toFixed(3));

    return toFixedValue;
  };

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
      <StartDialog
        onStartGame={handleStartGame}
        isOpen={gameState === GameState.START}
      />

      <div>Game state: {gameState}</div>

      {gameState === GameState.PLAYING && (
        <button
          className="bg-blue-800 text-white p-2 rounded-md"
          onClick={handleResetGame}
        >
          Reset
        </button>
      )}

      <div>
        {reactionArr.map((reaction) => (
          <span key={reaction}>{reaction}, </span>
        ))}
      </div>
      <div className="flex justify-between mb-4">
        <div>Avg reaction time : {convertMsToSeconds(averageReactionTime)}</div>
        <div>Clicks left: {clicksToMeasure}</div>
      </div>
      <div className="flex">{grid}</div>
    </div>
  );
}
