import React, { useState } from 'react';
import Dialog from '../../components/Dialog';
import { ReactionsChart } from './EndDialog/ReactionsChart';

interface Props {
  onStartGame: () => void;
  isOpen: boolean;
}
export const StartDialog = ({ isOpen, onStartGame }: Props) => {
  const handleStartGame = () => {
    onStartGame();
  };

  return (
    <Dialog isOpen={isOpen} title="Reaction Grid" hideCloseButton>
      <p className="mb-4">
        Click on the <span className="text-blue-500">blue square</span> as fast
        as you can. Clicking on the wrong square will result in a penalty.
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
