import React, { useState } from 'react';
import Dialog from '../../../components/Dialog';
import { convertMsToSeconds } from '../helpers';
import { ReactionsChart } from './ReactionsChart';

interface Props {
  onRestartGame: () => void;
  isOpen: boolean;
  reactionArr: number[];
  averageReactionTime: number;
}
export const EndDialog = ({
  isOpen,
  onRestartGame,
  averageReactionTime,
  reactionArr,
}: Props) => {
  const handleRestartGame = () => {
    onRestartGame();
  };

  const fastestReaction = Math.min(...reactionArr);
  const slowestReaction = Math.max(...reactionArr);

  return (
    <Dialog isOpen={isOpen} title="Results" hideCloseButton>
      <p>Average: {convertMsToSeconds(averageReactionTime)}s</p>

      <p>Fastest: {convertMsToSeconds(fastestReaction)}s</p>
      <p>Slowest: {convertMsToSeconds(slowestReaction)}s</p>

      <p className="mb-4 mt-8">Performance over time</p>
      <div className="w-full h-40">
        <ReactionsChart reactionArr={reactionArr} />
      </div>

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
