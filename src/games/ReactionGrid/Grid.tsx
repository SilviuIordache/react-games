import React from 'react';
import { Square } from './Square';

interface Props {
  coords: { x: number; y: number };
  gridSize: number;
  onSquareClick: (isHighlightedSquare: boolean) => void;
}

export const Grid = ({ coords, gridSize, onSquareClick }: Props) => {
  const newGrid: JSX.Element[] = [];
  for (let i = 0; i < gridSize; i++) {
    const row: JSX.Element[] = [];
    for (let j = 0; j < gridSize; j++) {
      const isHighlightedSquare = i === coords.x && j === coords.y;

      row.push(
        <Square
          key={`${i}-${j}-${isHighlightedSquare}`}
          isHighlighted={isHighlightedSquare}
          onClick={() => onSquareClick(isHighlightedSquare)}
        />
      );
    }
    newGrid.push(<div key={i}>{row}</div>);
  }
  return newGrid;
};
