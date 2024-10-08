import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';

interface Props {
  x: number;
  y: number;
  onSquareEnter: (x: number, y: number) => void;
  cell: number;
}

export const Square = ({ onSquareEnter, cell, x, y }: Props) => {
  return (
    <div
      onMouseEnter={() => onSquareEnter(x, y)}
      className={classNames('bg-black w-8 h-8', {
        'bg-black': cell === 0,
        'bg-white': cell === 1,
        'bg-red-500': cell === 2,
      })}
    ></div>
  );
};
