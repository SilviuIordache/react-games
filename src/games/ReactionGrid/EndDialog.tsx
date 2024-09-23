import React, { useState } from 'react';
import Dialog from '../../components/Dialog';
import { convertMsToSeconds } from './helpers';

interface Props {
  onRestartGame: () => void;
  isOpen: boolean;
  averageReactionTime: number;
}
export const EndDialog = ({
  isOpen,
  onRestartGame,
  averageReactionTime,
}: Props) => {
  const handleRestartGame = () => {
    onRestartGame();
  };

  return (
    <Dialog isOpen={isOpen} title="Results" hideCloseButton>
      <p className="mb-4">
        Your average reaction time: {convertMsToSeconds(averageReactionTime)}s
      </p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white p-2 rounded-md"
          onClick={handleRestartGame}
        >
          Restart Game
        </button>
      </div>
    </Dialog>
  );
};
