import React from 'react';
import { GameState } from '../types';

interface Props {
  gameState: GameState;
}

const GameFeedback = ({ gameState }: Props) => {
  if (gameState === GameState.PLAYING) return null;

  const textColor =
    gameState === GameState.WIN ? 'text-green-500' : 'text-red-500';

  const message = gameState === GameState.WIN ? 'YOU WIN' : 'GAME OVER';

  return <p className={textColor}>{message}</p>;
};

export default GameFeedback;
