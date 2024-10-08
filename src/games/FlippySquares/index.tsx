import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Grid } from './Grid';

type Coordinate = { x: number; y: number };

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  END = 'END',
}
export default function FlippySquares() {
  const gridSize = 15;

  const [gameState, setGameState] = useState<GameState>(GameState.START);

  // Define the type for the cells

  const generateGridWithBlackSquares = () => {
    const newGrid = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(1)
    );

    return newGrid;
  };

  const [cells, setCells] = useState(() => generateGridWithBlackSquares());

  const resetGrid = () => {
    const freshCells = generateGridWithBlackSquares();
    setCells(freshCells);
  };

  useEffect(() => {
    resetGrid();
  }, []);

  const [redCoords, setRedCoords] = useState<Coordinate[]>();

  const generateRedCoords = (amount: number): Coordinate[] => {
    const coords: Coordinate[] = [];
    for (let i = 0; i < amount; i++) {
      coords.push({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      });
    }
    return coords;
  };

  useEffect(() => {
    if (!cells) return;
    const newCells = cells.map((row) => [...row]);
    if (redCoords) {
      redCoords.forEach(({ x, y }) => {
        newCells[x][y] = 2;
      });
    }
    setCells(newCells);
  }, [redCoords]);

  const handleSquareEnter = useCallback(
    (x: number, y: number) => {
      switch (cells[x][y]) {
        case 0:
          // console.log('you clicked a black square');
          return;
        case 1:
          const newCells = cells.map((row) => [...row]);
          newCells[x][y] = 0;
          setCells(newCells);
          return;
        case 2:
          console.log('you clicked a red square');
          return;
        default:
          console.log('you clicked a red square');
      }
    },
    [cells]
  );

  const handleStartGame = () => {
    resetGrid();
    setGameState(GameState.PLAYING);

    const newRedCoords = generateRedCoords(10);
    setRedCoords(newRedCoords);
  };

  return (
    <div>
      <div>GameState: {gameState}</div>

      <button
        className="mb-4 bg-blue-600 hover:bg-blue-400 active:bg-blue-700 rounded-md p-2"
        onClick={handleStartGame}
      >
        {gameState === GameState.START ? 'Restart' : 'Start'}
      </button>

      <Grid
        onSquareEnter={handleSquareEnter}
        cells={cells}
        gridSize={gridSize}
      />
    </div>
  );
}
