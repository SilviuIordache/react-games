import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Grid } from './Grid';

type Coordinate = { x: number; y: number };

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  END = 'END',
}
export default function Minesweeper() {
  const gridSize = 7;
  const redCells = 4;

  const [gameState, setGameState] = useState<GameState>(GameState.START);

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

  // init grid
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

  const handleSquareClick = useCallback(
    (x: number, y: number) => {
      // 0 = hidden cell
      // 1 = flag cell
      // 2 = revealed cell
      // 3 = bomb cell

      switch (cells[x][y]) {
        case 0:
          return;
        case 1:
          const newCells = cells.map((row) => [...row]);
          newCells[x][y] = 0;

          setCells(newCells);
          return;
        case 2:
          return;
        default:
          return;
      }
    },
    [cells]
  );

  const initGrid = () => {
    const newRedCoords = generateRedCoords(redCells);
  };

  initGrid();

  const handleStartGame = () => {
    resetGrid();
    setGameState(GameState.PLAYING);

    initGrid();
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
        onSquareClick={handleSquareClick}
        cells={cells}
        gridSize={gridSize}
      />
    </div>
  );
}
