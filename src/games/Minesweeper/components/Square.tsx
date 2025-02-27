import React, { memo, useState } from 'react';
import classNames from 'classnames';
import { Cell } from '../types';

interface Props {
  onSquareClick: (event, x: number, y: number) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  cell: Cell;
}

export const Square = memo(
  ({ onSquareClick, onMouseDown, onMouseUp, cell }: Props) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleContextMenu = (event) => {
      event.preventDefault();
      onSquareClick(event, cell.coordinate.x, cell.coordinate.y);
    };

    const handleMouseDown = () => {
      setIsMouseDown(true);
      onMouseDown();
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      onMouseUp();
    };

    const handleMouseEnter = () => {
      setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
      setIsMouseOver(false);
    };

    function getCellBombCountColor(cell: Cell) {
      const colors = [
        'text-blue-400', // 1
        'text-green-400', // 2
        'text-yellow-400', // 3
        'text-red-400', // 4
        'text-purple-400', // 5
        'text-orange-400', // 6
        'text-pink-400', // 7
        'text-gray-400', // 8
      ];
      return colors[cell.nearbyBombs - 1] || 'text-gray-400';
    }

    return (
      <div
        onClick={(event) =>
          onSquareClick(event, cell.coordinate.x, cell.coordinate.y)
        }
        onContextMenu={handleContextMenu}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={classNames('w-8 h-8 border-gray-900 cursor-default', {
          'hover:bg-pink-300': !isMouseDown,
          'bg-gray-700 border-4 border-t-gray-500 border-l-gray-500 border-b-gray-800 border-r-gray-800':
            cell.visible === false,
          'bg-gray-800 border-t border-l': cell.visible === true,
          'bg-red-500': cell.bomb && cell.visible,
          'bg-gray-800': isMouseDown && isMouseOver,
        })}
      >
        <div className="pt-0.5">
          {/* <span>{cell.bomb && '💣'}</span> */}
          <span>{cell.bomb && cell.visible ? '💣' : ''}</span>
          <span>{cell.marked && !cell.visible ? '🚩' : ''}</span>
          <span
            className={classNames(
              'font-extrabold',
              getCellBombCountColor(cell)
            )}
          >
            {cell.visible && cell.nearbyBombs > 0 && cell.nearbyBombs}
          </span>
        </div>
      </div>
    );
  }
);
