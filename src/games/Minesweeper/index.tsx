import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Grid } from './components/Grid';
import { Cell, GameState } from './types';
import SmileyButton from './components/SmileyButton';
import Confetti from '../../components/Confetti';
import useMouseDown from './hooks/useMouseDown';
import GameOptions from './components/GameOptions';
import DIFFICULTY_MODES from './globals';
import GameTimer from './components/GameTimer';
import useTimer from '../../custom-hooks/useTimer';
import GameFeedback from './components/GameFeedback';

export default function Minesweeper() {
  const { isMouseDown, handleMouseDown, handleMouseUp, handleMouseLeave } =
    useMouseDown();

  const [timer, startTimer, pauseTimer, resetTimer] = useTimer();

  const [gridSize, setGridSize] = useState(DIFFICULTY_MODES[0].gridSize);
  const [bombsCount, setBombsCount] = useState(DIFFICULTY_MODES[0].bombs);

  const [flagCounter, setFlagCounter] = useState(bombsCount);

  const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);

  const [cells, setCells] = useState(() => generateGrid(gridSize, bombsCount));

  const firstCellClicked = useRef(false);

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

  function generateGrid(newGridSize, newBombsCount) {
    const newGrid = generateCells(newGridSize, newBombsCount);
    calculateBombCounters(newGrid, newGridSize);
    return newGrid;
  }

  const resetGrid = (newGridSize, newBombsCount) => {
    const freshCells = generateGrid(newGridSize, newBombsCount);
    setCells(freshCells);
    setFlagCounter(newBombsCount);
  };

  const handleSquareClick = useCallback(
    (event, x: number, y: number) => {
      if (gameState === GameState.GAMEOVER) return;

      if (event.button === 0) {
        // handle left click

        if (!firstCellClicked.current) {
          firstCellClicked.current = true;
          startTimer();
        }
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

  const restartGame = () => {
    resetGrid(gridSize, bombsCount);
    setGameState(GameState.PLAYING);
    firstCellClicked.current = false;
    resetTimer();
    console.log('end of restartGame');
  };

  function performReveal(sourceX, sourceY) {
    const newCell = cells[sourceX][sourceY];

    // Prevent infinite recursion by checking visibility
    if (newCell.visible) return;

    newCell.visible = true;

    if (newCell.bomb) {
      pauseTimer();
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
      handleWin();
    }
  }, [cells]);

  const handleWin = () => {
    pauseTimer();
    setGameState(GameState.WIN);
  };

  const handleGameModeSelect = (modeName) => {
    const modeParams = DIFFICULTY_MODES.find((mode) => mode.name === modeName);

    if (!modeParams) return;

    setGameState(GameState.PLAYING);
    setGridSize(modeParams.gridSize);
    setBombsCount(modeParams.bombs);
    resetGrid(modeParams.gridSize, modeParams.bombs);
    resetTimer();
  };

  return (
    <div>
      {gameState === GameState.WIN && <Confetti duration={5000} />}

      <div className="h-8">
        <GameFeedback gameState={gameState} />
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex flex-col items-start">
          <div>🚩 {flagCounter}</div>

          <GameTimer timer={timer} />
        </div>

        <SmileyButton
          isMouseDown={isMouseDown}
          gameState={gameState}
          handleRestart={restartGame}
        />

        <GameOptions onGameModeSelect={handleGameModeSelect} />
      </div>

      <Grid
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseLeave={handleMouseLeave}
        onSquareClick={handleSquareClick}
        cells={cells}
        gridSize={gridSize}
      />
    </div>
  );
}
