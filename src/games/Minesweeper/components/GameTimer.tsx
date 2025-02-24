import React from 'react';

interface Props {
  timer: number;
}
const GameTimer = ({ timer }) => {
  return <div>⏱️ {timer}</div>;
};

export default GameTimer;
