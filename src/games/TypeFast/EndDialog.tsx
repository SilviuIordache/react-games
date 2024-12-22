import React from 'react';
import Dialog from '../../components/Dialog';

interface Props {
  onRestartGame: () => void;
  isOpen: boolean;
  score: number;
  wordsTyped: number;
}
export const EndDialog = ({
  isOpen,
  onRestartGame,
  score,
  wordsTyped,
}: Props) => {
  const handleRestart = () => {
    onRestartGame();
  };

  return (
    <Dialog isOpen={isOpen} title="Results" hideCloseButton>
      <p className="mb-4 mt-8">Game Over</p>

      <p>Score: {score}</p>
      <p>Words: {wordsTyped}</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white p-2 rounded-md"
          onClick={handleRestart}
        >
          Restart Game
        </button>
      </div>
    </Dialog>
  );
};
