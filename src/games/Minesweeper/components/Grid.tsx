import React from 'react';
import { Square } from './Square';
import { Cell } from '../types';

interface Props {
  cells: Cell[][];
  gridSize: number;
  onSquareClick: (event: () => void, i: number, j: number) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
}

export const Grid = React.memo(
  ({
    cells,
    gridSize,
    onSquareClick,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  }: Props) => {
    const newGrid: JSX.Element[] = [];
    for (let i = 0; i < gridSize; i++) {
      const row: JSX.Element[] = [];

      for (let j = 0; j < gridSize; j++) {
        row.push(
          <Square
            key={`${i}-${j}-${cells[i][j]}`}
            cell={cells[i][j]}
            onSquareClick={onSquareClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
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
  }
);
