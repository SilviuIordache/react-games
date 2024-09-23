import React, { useState } from 'react';
import Dialog from '../../components/Dialog';

interface Props {
  onStartGame: () => void;
  isOpen: boolean;
}
export const StartDialog = ({ onStartGame }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleStartGame = () => {
    onStartGame();
    setIsOpen(false);
  };

  return (
    <Dialog isOpen={isOpen} title="Reaction Grid" hideCloseButton>
      <p className="mb-4">
        Click on the <span className="text-blue-500">blue square</span> as fast
        as you can. Avoid misclicking.
      </p>

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
