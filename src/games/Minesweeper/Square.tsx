import React from 'react';
import classNames from 'classnames';
import { Cell } from './types';

interface Props {
  onSquareClick: (event, x: number, y: number) => void;
  cell: Cell;
}

export const Square = ({ onSquareClick, cell }: Props) => {
  const handleContextMenu = (event) => {
    event.preventDefault();
    onSquareClick(event, cell.coordinate.x, cell.coordinate.y);
  };

  return (
    <div
      onClick={(event) =>
        onSquareClick(event, cell.coordinate.x, cell.coordinate.y)
      }
      onContextMenu={handleContextMenu}
      className={classNames(
        'bg-gray-700 w-8 h-8 border border-gray-500 hover:bg-gray-400 border-t-slate-400',
        {
          'bg-gray-700': cell.visible === false,
          'bg-gray-800': cell.visible === true,
        }
      )}
    >
      <div style={{ userSelect: 'none' }}>
        <span className="text-red-600">
          {cell.bomb && cell.visible ? '●' : ''}
        </span>
        <span>{cell.marked && !cell.visible ? '🚩' : ''}</span>
        <span>{cell.visible && cell.nearbyBombs}</span>
      </div>
    </div>
  );
};
