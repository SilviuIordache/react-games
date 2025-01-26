import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Grid } from './Grid';
import { Cell, GameState } from './types';
import SmileyButton from './SmileyButton';
import Confetti from '../../components/Confetti';

export default function Minesweeper() {
  const gridSize = 7;
  const bombsCount = 3;


  const [flagCounter, setFlagCounter] = useState(bombsCount);

  const [gameState, setGameState] = useState<GameState>(GameState.START);

  const [cells, setCells] = useState(() => generateGrid());

  function generateCells(gridSize: number, bombCount: number): Cell[][] {
    const newGrid: Cell[][] = [];
    const bombCoordinates = new Set<string>();

    // Generate unique bomb coordinates
    while (bombCoordinates.size < bombCount) {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      bombCoordinates.add(`${x},${y}`);
    }

    for (let x = 0; x < gridSize; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < gridSize; y++) {
        const isBomb = bombCoordinates.has(`${x},${y}`);

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
        if (grid[x][y].bomb) {
          grid[x][y].nearbyBombs = 0;
          continue; // Skip to the next cell if a bomb is found
        }

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
    const newGrid = generateCells(gridSize, bombsCount); 
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

      if (event.button === 0) {
        // handle left click
        performReveal(x, y);
      } else if (event.button === 2) {
        // handle right click
        if (cells[x][y].visible) return;

        // mark cell as potential bomb
        const newCell = { ...cells[x][y] };

        if (newCell.marked === false) {
          newCell.marked = true;
          setFlagCounter((val) => val - 1);
        } else {
          newCell.marked = false;
          setFlagCounter((val) => val + 1);
        }
        updateGridWithNewCell(x, y, newCell);
      }
    },
    [cells]
  );

  function updateGridWithNewCell(x: number, y: number, newCell: Cell) {
    const newGrid = cells.map((row) => [...row]);
    newGrid[x][y] = newCell;
    setCells(newGrid);
  }

  const handleStartGame = () => {
    resetGrid();
    setGameState(GameState.PLAYING);
  };

  function revealBoard() {
    for (let x = 0; x < gridSize; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < gridSize; y++) {}
    }
  }

  function performReveal(sourceX, sourceY) {
    const newCell = cells[sourceX][sourceY];

    // Prevent infinite recursion by checking visibility
    if (newCell.visible) return;

    newCell.visible = true;

    if (newCell.bomb) {
      setGameState(GameState.GAMEOVER);
    }

    updateGridWithNewCell(sourceX, sourceY, newCell);

    if (newCell.nearbyBombs > 0) return;

    // Only reveal neighbors if no nearby bombs
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

    directions.forEach(({ x: dx, y: dy }) => {
      const newX = sourceX + dx;
      const newY = sourceY + dy;

      if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
        if (!cells[newX][newY].bomb && !cells[newX][newY].visible) {
          performReveal(newX, newY);
        }
      }
    });
  }

  // game state checker
  useEffect(() => {
    const revealedCells = cells.flat().filter((cell) => cell.visible === true);

    const revealedCellsCount = revealedCells.length;

    const cellsToBeRevealed = gridSize * gridSize - bombsCount;

    if (revealedCellsCount === cellsToBeRevealed) {
      setGameState(GameState.END);
    }
  }, [cells]);

  return (
    <div>
      {gameState === GameState.END && <Confetti duration={5000} />}
      <SmileyButton gameState={gameState} handleStartGame={handleStartGame} />

      <div className="flex justify-between">
        <div>bombs: {bombsCount}</div>

        <div>flags: {flagCounter}</div>
      </div>

      <Grid
        onSquareClick={handleSquareClick}
        cells={cells}
        gridSize={gridSize}
      />
    </div>
  );
}
