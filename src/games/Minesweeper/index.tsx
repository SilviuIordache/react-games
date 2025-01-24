import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Grid } from './Grid';
import { Cell } from './types';

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

  const generateGrid = () => {
    const newGrid: Cell[][] = [];

    for (let x = 0; x < gridSize; x++) {
      const row: Cell[] = [];

      for (let y = 0; y < gridSize; y++) {
        const cell = {
          coordinate: { x, y }, 
          visible: false, 
          bomb: false, 
          marked: false, 
        };

        row.push(cell);
      }

      newGrid.push(row);
    }

    // Return the newly created grid
    return newGrid;
  };

  const [cells, setCells] = useState(() => generateGrid());

  const resetGrid = () => {
    const freshCells = generateGrid();
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
      // set the cell to visible
      const newCell = cells[x][y];
      newCell.visible = true;
      
      // update the grid
      const newGrid = cells.map((row) => [...row]);
      newGrid[x][y] = newCell;
      setCells(newGrid);
    },
    [cells]
  );


  const handleStartGame = () => {
    resetGrid();
    setGameState(GameState.PLAYING);

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
