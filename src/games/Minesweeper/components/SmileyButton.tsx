import React from 'react';
import { GameState } from '../types';

interface SmileyButtonProps {
  gameState: GameState;
  handleStartGame: () => void;
  isMouseDown: boolean;
}
const SmileyButton = ({
  gameState,
  handleStartGame,
  isMouseDown,
}: SmileyButtonProps) => {
  const emoji = () => {
    if (isMouseDown && gameState !== GameState.GAMEOVER) {
      return '😯';
    }

    switch (gameState) {
      case GameState.PLAYING:
        return '🙂';
      case GameState.WIN:
        return '😎';
      case GameState.GAMEOVER:
        return '😵';
      default:
        return '🤓';
    }
  };
  return (
    <button
      className="text-2xl p-2 px-3 bg-gray-700 border border-gray-500 hover:bg-gray-400 active:bg-gray-900 rounded-md"
      onClick={handleStartGame}
    >
      {emoji()}
    </button>
  );
};

export default SmileyButton;
