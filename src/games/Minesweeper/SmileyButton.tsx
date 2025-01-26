import React from 'react';
import { GameState } from './types';

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
    if (isMouseDown) {
      return '😯';
    }

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
      {/* <div>GameState: {gameState}</div> */}

      <button
        className="text-2xl mb-4 bg-gray-700 border border-gray-500  hover:bg-gray-400 active:bg-gray-900 rounded-md p-2 px-3"
        onClick={handleStartGame}
      >
        {emoji()}
      </button>
    </>
  );
};

export default SmileyButton;
