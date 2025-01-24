import React from 'react';
import { Square } from './Square';
import { Cell } from './types';

interface Props {
  cells: Cell[][];
  gridSize: number;
  onSquareClick: (i: number, j: number) => void;
}

export const Grid = ({ cells, gridSize, onSquareClick }: Props) => {
  const newGrid: JSX.Element[] = [];

  for (let i = 0; i < gridSize; i++) {
    const row: JSX.Element[] = [];

    for (let j = 0; j < gridSize; j++) {
      const cell = cells[i][j];

      const squareCell = (
        <Square
          key={`${i}-${j}-${cell}`}
          cell={cell}
          onSquareClick={onSquareClick}
        />
      );

      row.push(squareCell);
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
