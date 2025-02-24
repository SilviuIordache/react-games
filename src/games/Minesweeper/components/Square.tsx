import React from 'react';
import classNames from 'classnames';
import { Cell } from './types';

interface Props {
  onSquareClick: (event, x: number, y: number) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  cell: Cell;
}

export const Square = ({
  onSquareClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  cell,
}: Props) => {
  const handleContextMenu = (event) => {
    event.preventDefault();
    onSquareClick(event, cell.coordinate.x, cell.coordinate.y);
  };

  function getCellBombCountColor(cell: Cell) {
    switch (cell.nearbyBombs) {
      case 1:
        return 'text-blue-400';
      case 2:
        return 'text-green-400';
      case 3:
        return 'text-yellow-400';
      case 4:
        return 'text-red-400';
      case 5:
        return 'text-purple-400';
      case 6:
        return 'text-orange-400';
      case 7:
        return 'text-pink-400';
      case 8:
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  }

  return (
    <div
      onClick={(event) =>
        onSquareClick(event, cell.coordinate.x, cell.coordinate.y)
      }
      onContextMenu={handleContextMenu}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      className={classNames(
        'w-8 h-8  border-gray-900 hover:bg-pink-300',

        {
          'bg-gray-700 border-4 border-t-gray-500 border-l-gray-500 border-b-gray-800 border-r-gray-800':
            cell.visible === false,
          'bg-gray-800 border-t border-l': cell.visible === true,
          'bg-red-500': cell.bomb && cell.visible,
        }
      )}
    >
      <div style={{ userSelect: 'none' }}>
        <span>{cell.bomb && cell.visible ? '💣' : ''}</span>
        <span>{cell.marked && !cell.visible ? '🚩' : ''}</span>
        <span
          className={classNames('font-extrabold', getCellBombCountColor(cell))}
        >
          {cell.visible && cell.nearbyBombs > 0 && cell.nearbyBombs}
        </span>
      </div>
    </div>
  );
};
