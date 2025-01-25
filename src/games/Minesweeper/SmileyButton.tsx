import React from 'react';
import { GameState } from './types';

interface SmileyButtonProps {
  gameState: GameState;
  handleStartGame: () => void;
}
const SmileyButton = ({ gameState, handleStartGame }: SmileyButtonProps) => {
  const emoji = () => {
    switch (gameState) {
      case GameState.START:
        return '🙂';
      case GameState.PLAYING:
        return '🤔';
      case GameState.END:
        return '😎';
      case GameState.GAMEOVER:
        return '😵';
      default:
        return '🤓';
    }
  };
  return (
    <>
      <div>GameState: {gameState}</div>

      <button
        className="mb-4 bg-blue-600 hover:bg-blue-400 active:bg-blue-700 rounded-md p-2"
        onClick={handleStartGame}
      >
        {emoji()}
      </button>
    </>
  );
};

export default SmileyButton;
