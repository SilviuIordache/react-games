import React from 'react';
import classNames from 'classnames';
import { Cell } from './types';

interface Props {
  onSquareClick: (x: number, y: number) => void;
  cell: Cell;
}

export const Square = ({ onSquareClick, cell }: Props) => {
  return (
    <div
      onClick={() => onSquareClick(cell.coordinate.x, cell.coordinate.y)}
      className={classNames(
        'bg-black w-8 h-8 border border-gray-500 hover:bg-gray-600',
        {
          'bg-black': cell.visible === false,
          'bg-white': cell.visible === true,
          'bg-red-500': cell.bomb === true,
        }
      )}
    ></div>
  );
};
