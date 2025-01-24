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

  const [gameState, setGameState] = useState<GameState>(GameState.START);

  const getBombChance = () => {
    const bombOccurence = 10; // value from 1 to 100
    return Math.random() * 100 < bombOccurence;
  };

  const [cells, setCells] = useState(() => generateGrid());

  function generateCells(
    gridSize: number,
    getBombChance: () => boolean
  ): Cell[][] {
    const newGrid: Cell[][] = [];
    for (let x = 0; x < gridSize; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < gridSize; y++) {
        const isBomb = getBombChance();
        const cell = {
          coordinate: { x, y },
          visible: false,
          bomb: isBomb,
          nearbyBombs: 0,
          marked: false,
        };
        row.push(cell);
      }
      newGrid.push(row);
    }
    return newGrid;
  }

  function calculateBombCounters(grid: Cell[][], gridSize: number): void {
    const directions = [
      { x: -1, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: 1, y: -1 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
    ];

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (grid[x][y].bomb) continue;

        let bombCounter = 0;
        directions.forEach(({ x: dx, y: dy }) => {
          const newX = x + dx;
          const newY = y + dy;

          if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
            if (grid[newX][newY].bomb) {
              bombCounter++;
            }
          }
        });

        grid[x][y].nearbyBombs = bombCounter;
      }
    }
  }

  function generateGrid() {
    const newGrid = generateCells(gridSize, getBombChance);
    calculateBombCounters(newGrid, gridSize);
    return newGrid;
  }

  const resetGrid = () => {
    const freshCells = generateGrid();
    setCells(freshCells);
  };

  const handleSquareClick = useCallback(
    (event, x: number, y: number) => {
      // set the cell to visible
      const newCell = cells[x][y];

      if (event.button === 0) {
        console.log('Left click');
        newCell.visible = true;
      } else if (event.button === 2) {
        console.log('Right click');
        newCell.marked = true;
      }

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
