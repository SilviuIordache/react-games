import React from 'react';

interface Props {
  timer: number;
}
const GameTimer = ({ timer }: Props) => {
  let displayedTimer;

  if (timer <= 9) displayedTimer = `00${timer}`;
  else if (timer <= 99) displayedTimer = `0${timer}`;
  else displayedTimer = timer;

  return <div>⏱️ {displayedTimer}</div>;
};

export default GameTimer;
