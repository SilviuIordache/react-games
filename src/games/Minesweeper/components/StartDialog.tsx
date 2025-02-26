import React from 'react';
import Dialog from '../../../components/Dialog';

interface Props {
  onStartGame: () => void;
  isOpen: boolean;
}
export const StartDialog = ({ isOpen, onStartGame }: Props) => {
  const handleStartGame = () => {
    onStartGame();
  };

  return (
    <Dialog isOpen={isOpen} title="Minesweeper rules">
      <ul className="mb-4 list-disc list-inside">
        <li>👈 Left-click to reveal cells</li>
        <li>👉 Right-click to mark cells 🚩 as potential bombs</li>
        <li>🙂 Click the smiley face to restart</li>
        <li>😢 Lose condition: reveal a bomb cell 💣 </li>
        <li>🏆 Win condition: reveal all non-bombs cells</li>
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
