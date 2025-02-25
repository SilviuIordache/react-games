import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { Grid } from './components/Grid';
import { Cell, GameState } from './types';
import SmileyButton from './components/SmileyButton';
import Confetti from '../../components/Confetti';
import useMouseDown from './hooks/useMouseDown';
import GameOptions from './components/GameOptions';
import DIFFICULTY_MODES from './modes';
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
      if (gameState !== GameState.PLAYING) return;

      if (event.button === 0) {
        handleLeftClick(x, y);
      } else if (event.button === 2) {
        handleRightClick(x, y);
      }
    },
    [gameState]
  );

  const handleLeftClick = (x: number, y: number) => {
    setCells((prevCells) => {
      const newGrid = prevCells.map((row) => [...row]);

      // Create a new object to avoid direct mutation
      const newCell = { ...newGrid[x][y] };

      if (newCell.marked) {
        newCell.marked = false;
        setFlagCounter((prev) => prev + 1);
      }

      if (!firstCellClicked.current) {
        firstCellClicked.current = true;
        startTimer();
      }

      // Update the new grid with the modified cell
      newGrid[x][y] = newCell;

      performReveal(x, y);
      return newGrid;
    });
  };

  const handleRightClick = (x: number, y: number) => {
    setCells((prevCells) => {
      const newGrid = prevCells.map((row) => [...row]);
      const newCell = { ...newGrid[x][y] };

      if (newCell.visible) return prevCells;

      if (newCell.marked) {
        newCell.marked = false;
        setFlagCounter((prev) => prev + 1);
      } else {
        newCell.marked = true;
        setFlagCounter((prev) => prev - 1);
      }

      newGrid[x][y] = newCell;

      return newGrid;
    });
  };

  function initializeGame(gridSize: number, bombsCount: number) {
    firstCellClicked.current = false;

    setGridSize(gridSize);
    setBombsCount(bombsCount);
    resetGrid(gridSize, bombsCount);
    resetTimer();
    setGameState(GameState.PLAYING);
  }

  const restartGame = () => {
    initializeGame(gridSize, bombsCount);
  };

  function performReveal(sourceX, sourceY) {
    setCells((prevCells) => {
      const newGrid = prevCells.map((row) => [...row]);
      const newCell = { ...newGrid[sourceX][sourceY] };

      if (newCell.visible) return prevCells;

      newCell.visible = true;

      if (newCell.marked) {
        newCell.marked = false;
        setFlagCounter((prev) => prev + 1);
      }

      if (newCell.bomb) {
        handleGameOver();
        return prevCells;
      }

      newGrid[sourceX][sourceY] = newCell;

      if (newCell.nearbyBombs > 0) return newGrid;

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

        if (
          newX >= 0 &&
          newX < gridSize &&
          newY >= 0 &&
          newY < gridSize &&
          newGrid[newX]?.[newY]
        ) {
          // console.log({ newGrid });
          if (!newGrid[newX][newY]?.bomb && !newGrid[newX][newY]?.visible) {
            performReveal(newX, newY);
          }
        }
      });

      return newGrid;
    });
  }

  function revealAllBombs() {
    setCells((prevCells) => {
      const newGrid = prevCells.map((row) => [...row]);

      newGrid.forEach((row) =>
        row.forEach((cell) => {
          if (cell.bomb) cell.visible = true;
        })
      );

      return newGrid;
    });
  }

  // game state checker
  useEffect(() => {
    const revealedCellsCount = cells.reduce(
      (acc, row) => acc + row.filter((cell) => cell.visible).length,
      0
    );

    const cellsToBeRevealed = gridSize * gridSize - bombsCount;

    if (revealedCellsCount === cellsToBeRevealed) {
      handleWin();
    }
  }, [cells]);

  const handleGameOver = () => {
    setGameState(GameState.GAMEOVER);
    revealAllBombs();
    pauseTimer();
  };

  const handleWin = () => {
    pauseTimer();
    setGameState(GameState.WIN);
  };

  const handleGameModeSelect = (modeName) => {
    const modeParams = DIFFICULTY_MODES.find((mode) => mode.name === modeName);

    if (!modeParams) return;

    initializeGame(modeParams.gridSize, modeParams.bombs);
  };

  return (
    <div>
      {gameState === GameState.WIN && <Confetti duration={5000} />}

      <div className="h-8">
        <GameFeedback gameState={gameState} />
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex flex-col items-start">
          <p>🚩 {flagCounter}</p>

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
