import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Grid } from './Grid';

type Coordinate = { x: number; y: number };

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  END = 'END',
}
export default function FlippySquares() {
  const gridSize = 5;
  const redCells = 2;
  const cellsToFill = gridSize * gridSize - redCells;
  const [score, setScore] = useState(0);

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

  const filledCells = useMemo(() => {
    let blackCellCount = 0;

    for (const row of cells) {
      for (const cell of row) {
        if (cell === 0) {
          blackCellCount++;
        }
      }
    }

    return blackCellCount;
  }, [cells]);

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
          return;
        case 1:
          setScore((score) => score + 10);
          const newCells = cells.map((row) => [...row]);
          newCells[x][y] = 0;

          setCells(newCells);
          return;
        case 2:
          setScore((score) => score - 25);

          return;
        default:
          return;
      }
    },
    [cells]
  );

  const handleStartGame = () => {
    resetGrid();
    setGameState(GameState.PLAYING);

    const newRedCoords = generateRedCoords(redCells);
    setRedCoords(newRedCoords);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>{score}</div>
        <div>
          {filledCells} / {cellsToFill}
        </div>
      </div>
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
