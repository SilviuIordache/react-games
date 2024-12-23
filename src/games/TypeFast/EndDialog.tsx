import React from 'react';
import Dialog from '../../components/Dialog';

interface Props {
  onRestartGame: () => void;
  isOpen: boolean;
  score: number;
  wordsScored: number;
}
export const EndDialog = ({
  isOpen,
  onRestartGame,
  score,
  wordsScored,
}: Props) => {
  const handleRestart = () => {
    onRestartGame();
  };

  return (
    <Dialog isOpen={isOpen} title="Game Over" hideCloseButton>
      <p>Score: {score}</p>
      <p>Words: {wordsScored}</p>

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
