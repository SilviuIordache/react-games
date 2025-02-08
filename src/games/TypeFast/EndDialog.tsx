import React from 'react';
import Dialog from '../../components/Dialog';

interface Props {
  onRestartGame: () => void;
  isOpen: boolean;
  score: number;
  wordsScored: number;
  elapsedTime: number;
}

export const EndDialog = ({
  isOpen,
  onRestartGame,
  score,
  wordsScored,
  elapsedTime,
}: Props) => {
  const handleRestart = () => {
    onRestartGame();
  };

  return (
    <Dialog isOpen={isOpen} title="Game Over">
      <p>
        You typed <span className="text-green-500">{wordsScored} words</span>{' '}
        and scored
        <span className="text-blue-500"> {score} points.</span>
      </p>

      <p>
        You lasted{' '}
        <span className="text-yellow-600">{elapsedTime} seconds.</span>
      </p>

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
