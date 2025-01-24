import React from 'react';
import classNames from 'classnames';

interface Props {
  x: number;
  y: number;
  onSquareClick: (x: number, y: number) => void;
  cell: number;
}

export const Square = ({ onSquareClick, cell, x, y }: Props) => {
  return (
    <div
      onClick={() => onSquareClick(x, y)}
      className={classNames(
        'bg-black w-8 h-8 border border-gray-500 hover:bg-gray-600',
        {
          'bg-black': cell === 0,
          'bg-white': cell === 1,
          'bg-red-500': cell === 2,
        }
      )}
    ></div>
  );
};
