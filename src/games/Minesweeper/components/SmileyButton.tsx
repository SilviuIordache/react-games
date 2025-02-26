import React from 'react';
import { GameState } from '../types';

interface SmileyButtonProps {
  gameState: GameState;
  handleRestart: () => void;
  isMouseDown: boolean;
}
const SmileyButton = ({
  gameState,
  handleRestart,
  isMouseDown,
}: SmileyButtonProps) => {
  const emoji = () => {
    if (isMouseDown && gameState === GameState.PLAYING) {
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
      className="text-2xl p-2 px-4 bg-gray-700 border border-gray-500 hover:bg-gray-400 active:bg-gray-900 rounded-md"
      onClick={handleRestart}
    >
      {emoji()}
    </button>
  );
};

export default SmileyButton;
