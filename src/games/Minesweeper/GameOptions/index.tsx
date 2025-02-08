import React, { useState } from 'react';
import OptionsDialog from './OptionsDialog';

interface Props {
  onGameModeSelect: (mode: string) => void;
}
const GameOptions = ({ onGameModeSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <button
        className="text-2xl p-2 px-3 bg-gray-700 border border-gray-500 hover:bg-gray-400 active:bg-gray-900 rounded-md"
        onClick={openModal}
      >
        ⚙️
      </button>

      <OptionsDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onGameModeSelect={onGameModeSelect}
      />
    </div>
  );
};

export default GameOptions;
