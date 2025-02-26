import React from 'react';

interface Props {
  timer: number;
}
const GameTimer = ({ timer }: Props) => {
  const displayedTimer = String(timer).padStart(3, '0');

  return <div>⏱️ {displayedTimer}</div>;
};

export default GameTimer;
