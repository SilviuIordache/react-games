import React from 'react';
import { Square } from './Square';

interface Props {
  cells: number[][];
  gridSize: number;
  onSquareEnter: (i: number, j: number) => void;
}

export const Grid = ({ cells, gridSize, onSquareEnter }: Props) => {
  const newGrid: JSX.Element[] = [];

  for (let i = 0; i < gridSize; i++) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < gridSize; j++) {
      const cell = cells[i][j];

      row.push(
        <Square
          key={`${i}-${j}-${cell}`}
          cell={cell}
          x={i}
          y={j}
          onSquareEnter={onSquareEnter}
        />
      );
    }
    newGrid.push(
      <div key={i} style={{ display: 'flex' }}>
        {row}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>{newGrid}</div>
  );
};
