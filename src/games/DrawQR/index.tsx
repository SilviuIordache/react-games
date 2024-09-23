import React from 'react';
import { useState } from 'react';
import Square from './Square';

export default function DrawQR() {
  const columns = 20;
  const totalSquares = columns * columns;
  const squares = Array.from({ length: totalSquares });

  const [spaceIsPressed, setSpaceIsPressed] = useState(false);

  document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      setSpaceIsPressed(true);
    }
  });
  document.addEventListener('keyup', () => {
    setSpaceIsPressed(false);
  });

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {squares.map((_, index) => (
        <Square key={index} spaceIsPressed={spaceIsPressed} />
      ))}
    </div>
  );
}
