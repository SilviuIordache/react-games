import React from 'react';
import Dialog from '../../components/Dialog';

interface Props {
  onStartGame: () => void;
  isOpen: boolean;
}
export const StartDialog = ({ isOpen, onStartGame }: Props) => {
  const handleStartGame = () => {
    onStartGame();
  };

  return (
    <Dialog isOpen={isOpen} title="Type Fast Game">
      <ul className="mb-4 list-disc list-inside">
        <li>
          Type the words as fast as possible.
        </li>
        <li>Amount of letters = score of that word</li>
        <li>Grid is filled with words = Game Over</li>
      </ul>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white p-2 rounded-md"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    </Dialog>
  );
};
